---
sidebar_position: 11
---

# Caching

Normally the user info is fetched from the CentralAuth server on every request. This can lead to performance issues and increased latency, especially when the user info is requested multiple times in a short period of time. To mitigate this, you can enable caching of the user info.

## Caching user info with the NPM library

When using the CentralAuth NPM library, you can enable caching by passing a `cache` object to the constructor of the `CentralAuthClass` or `CentralAuthHTTPClass`. The `cache` object can have the following properties:
- `ttl`: The time-to-live for the cache in milliseconds. This is the duration for which the cached user info is considered valid. After this duration, the user info will be fetched from the CentralAuth server again. Find out what a good value is for your application. A good starting point is 5 minutes (300000 milliseconds).
- `storage`: The storage methods to use for caching. The Axios Cache Interceptor library is used for caching, so you can use any storage method supported by the library. See the [Axios Cache Interceptor documentation](https://axios-cache-interceptor.js.org/guide/storages) for more information.

:::tip
Not all storage methods are suitable for all server types. See the [Server Types and Caching Considerations](#server-types-and-caching-considerations) section for more information and tips on choosing the right storage method for your server type.
:::

## Server Types and Caching Considerations

The effectiveness of caching depends heavily on your server architecture. Understanding the differences between stateful and serverless environments will help you choose the right caching strategy.

### Stateful Servers

Stateful servers (traditional web servers, VPS, dedicated servers) maintain state between requests and have persistent memory. This makes them ideal for caching:

- **In-memory caching**: The default memory storage works well since the server process persists
- **Shared cache**: Multiple requests can benefit from the same cached data
- **Long-lived cache**: Cache can persist for the full TTL duration
- **Cost-effective**: No external dependencies required for basic caching

**Recommendation**: Use the default in-memory storage with a TTL of about 5 minutes for optimal performance.

For instance, for an Apache or Nginx server, the in-memory cache will remain available as long as the server is running, and you can use the PHP session or other mechanisms to save cached data across requests.

#### Example for a Node.js server

When using a Node.js server, you can instantiate the `CentralAuthClass` with [node-cache](https://github.com/node-cache/node-cache) as follows:

```typescript
import { CentralAuthClass } from "centralauth/server";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 });

const cacheStorage = buildStorage({
  find(key: string) {
    return cache.get(key);
  },

  set(key: string, value: any) {
    cache.set(key, value);
  },

  remove(key: string) {
    cache.del(key);
  },
});

const centralAuth = new CentralAuthClass({
  clientId: process.env.AUTH_ORGANIZATION_ID,
  secret: process.env.AUTH_SECRET,
  authBaseUrl: process.env.AUTH_BASE_URL,
  callbackUrl: `${process.env.BASE_URL}/api/auth/callback`,
  cache: {
    ttl: 60 * 1000,
    storage: cacheStorage
  },
});
```

### Serverless Environments

Serverless functions (AWS Lambda, Vercel Functions, Cloudflare Workers) have different characteristics that affect caching:

- **Ephemeral nature**: Functions may be destroyed after handling requests, losing in-memory cache
- **Cold starts**: New function instances start with empty cache
- **Scaling behavior**: Each function instance has its own cache, reducing cache hit rates

**Recommendations for serverless**:
- Use external storage (Redis, DynamoDB) for persistent caching across function invocations
- Implement cache warming strategies if possible
- Evaluate if the caching overhead is worth the performance gain in your specific use case
- Use any built-in caching mechanisms provided by your framework or platform

#### Example for Next.js

Next.js provided a Data Cache layer that can be used to cache the user info, even in a serverless environment. Check the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/caching) for more information. Unfortunately, there are no methods to get or store data in the cache directly, so you cannot set the `cache` object in the `CentralAuthClass`. As a workaround, you can use the `unstable_cache` function to store the user info in the cache. The `unstable_cache` function takes a function that returns the user info. The function will be called again when the cache expires. Adding to the example from the [quick example](/developer/quick-example#step-9-handle-the-actions) page, you can use the `unstable_cache` function as follows:

```typescript
import { getCentralAuthClient } from "@/global/auth";
import { unstable_cache } from "next/cache";
import { cookies, headers } from "next/headers";

export async function GET(req: Request, props: { params: Promise<{ action: string }> }) {
  const params = await props.params;
  const { action } = params;
  const headerList = await headers();
  const cookieList = await cookies();
  const accessToken = cookieList.get("access_token")?.value;

  const authClient = getCentralAuthClient(req.headers);

  let response = Response.json(null);
  if (action == "user" && accessToken) {
    //Fetch user data with caching when available
    const cachedResponse = await unstable_cache(
      async () => {
        //Fetch user data from CentralAuth
        const response = await authClient.user(headerList);
        return {
          body: await response.json(),
          headers: response.headers
        }
      },
      ["sessionData", accessToken], //Set the cache key based on the user's accessToken
      { revalidate: 60 } //Revalidate the cache every 60 seconds
    )();
    //Construct a new Response object with the cached data
    response = Response.json(cachedResponse.body, { headers: cachedResponse.headers });
  }

  return response;
}
```

:::tip
In this example, the access token is stored in a cookie. If you are passing the access token in the `Authorization` header, you can use that instead.
:::