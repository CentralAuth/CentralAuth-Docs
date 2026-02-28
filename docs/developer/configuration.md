---
sidebar_position: 6
---

# Configuration

Configuration of your application depends on the type of application you are developing, a web application or a native Android or iOS app.

## Web application

### CentralAuth NPM library

When using the CentralAuth NPM library, you first need to choose between the two available classes: `CentralAuthClass` and `CentralAuthHTTPClass`. Based on your web server, you can choose the class that best fits your needs. When using a [Fetch API server](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (like Next.js), you should use the `CentralAuthClass`. When using an [HTTP server](https://nodejs.org/api/http.html) (like Express), you should use the `CentralAuthHTTPClass`.

#### Class constructor

Every step in the authentication flow is handled by a method in the class. The constructor of the class takes an object with the following properties:
- `clientId`: The organization ID you got from the CentralAuth dashboard. See the [integration page](/admin/dashboard/organization/integration) for more information. 
- `secret`: The secret you got from the CentralAuth dashboard.
- `authBaseUrl`: The base URL of the CentralAuth server. This will either be `https://centralauth.com`, your CentralAuth subdomain or your own [custom domain](/admin/dashboard/organization/settings#custom-domains).
- `callbackUrl`: The URL to redirect to after the user has authenticated. This should be the URL of your application where you want to handle the authentication response.
- `debug`: Optional. If set to `true`, the debug information will be logged to the console.
- `cache`: Optional. An object with caching options. Use this to cache the user data locally to prevent multiple requests to the CentralAuth server. See the [caching documentation](/developer/caching) for more information. The object can have the following properties:
  - `ttl`: The time-to-live for the cache in milliseconds.
  - `storage`: The storage methods to use for caching. The Axios Cache Interceptor library is used for caching, so you can use any storage method supported by the library. See the [Axios Cache Interceptor documentation](https://axios-cache-interceptor.js.org/guide/storages) for more information.
- `unsafeIncludeUser`: Optional. If set to `true`, the session token will include the user information. This will make it easier and faster to fetch the user information, but will bypass session hijacking and other security measures. This is not recommended for production use.

**Example:**

```typescript
import { CentralAuthClass } from "centralauth/server";

const authClient = new CentralAuthClass({
  clientId: process.env.AUTH_ORGANIZATION_ID,
  secret: process.env.AUTH_SECRET,
  authBaseUrl: process.env.AUTH_BASE_URL,
  callbackUrl: `https://example.com/api/auth/callback`
});
```

:::caution
Make sure you use a new instance of the class for every request to prevent session leakage between users. The user data will be stored in the instance of the class, so never reuse the same instance across sessions.
:::

### Manual configuration

If you cannot use the NPM library, you can still use CentralAuth by manually configuring the authentication flow. It is recommended to use an OAuth 2.0 library for your programming language to handle the authentication flow. You can find more information about the OAuth 2.0 flow in the docs of the library you choose.

CentralAuth provides an OpenID Connect discovery endpoint that contains all the necessary OAuth 2.0 configuration details at `https://centralauth.com/.well-known/openid-configuration`. This endpoint returns a JSON document with all the OAuth 2.0 endpoints, supported scopes, response types, and other configuration details needed for authentication. Most OAuth 2.0 libraries support automatic configuration using the discovery URL. Simply provide the discovery URL to your OAuth library, and it will automatically fetch and configure the necessary endpoints.

:::tip
If you are using a [custom domain](/admin/dashboard/organization/settings#custom-domains) or CentralAuth subdomain, replace `centralauth.com` in the `authorization_endpoint` with your custom domain or subdomain.
:::

## Native mobile app

### React Native (Expo)

When developing a React Native app with Expo, you can use the `CentralAuthProvider` in the CentralAuth NPM package. Update the wrapper from `centralauth/native` and wrap you entire app with it. 

**Example for Expo Router:**

```tsx
import { CentralAuthProvider } from 'centralauth/native';
import { Stack } from "expo-router";

export default function RootLayout() {
  return <CentralAuthProvider clientId="YOUR_CLIENT_ID" appId="YOUR_APP_ID" deviceId="UNIQUE_DEVICE_ID" authBaseUrl="AUTH_BASE_URL_OR_CUSTOM_DOMAIN" callbackUrl="APP_LINK_WITH_CALLBACK_PATH">
    <Stack />
  </CentralAuthProvider>;
}
```

The `CentralAuthProvider` component takes the following props:
- `clientId`: The client ID you got from the CentralAuth dashboard. See the [integration page](/admin/dashboard/organization/integration) for more information.
- `appId`: The bundle ID / package name for your app. This is set in your app and must match an app registration on the [integration page](/admin/dashboard/organization/integration#native-app-registration).
- `deviceId`: A unique device ID for the user's device. This can be any unique string that identifies the device, such as a UUID or a hash of the device's hardware information and will be used when requesting the user info. This is optional but recommended.
- `authBaseUrl`: The base URL of the CentralAuth server. This will either be `https://centralauth.com`, your CentralAuth subdomain or your own [custom domain](/admin/dashboard/organization/settings#custom-domains).
- `callbackUrl`: The URL to redirect to after the user has authenticated. The callback URL has to be configured as an App Link / Universal Link  and must match an app registration on the [integration page](/admin/dashboard/organization/integration#native-app-registration).

### Manual configuration

If you cannot use the NPM library, you can still use CentralAuth by manually configuring the authentication flow. It is recommended to use an OAuth 2.0 library for your programming language to handle the authentication flow. You can find more information about the OAuth 2.0 flow in the docs of the library you choose.

## Native desktop app

When developing a Windows, MacOS or Linux desktop app, you can use any OAuth 2.0 library for your programming language to handle the authentication flow. However, an extra layer of protection is required to securely authenticate users without exposing the client secret. To achieve this, you have to sign your app with a code signing certificate and register the app's hash on the CentralAuth dashboard. This way, CentralAuth can verify that the authentication request is coming from your app and not from a malicious actor misusing your client ID. 

See the Native app registration section on the [integration page](/admin/dashboard/organization/integration#native-desktop-app-registration) for more information about registering your app and the documentation about starting the [authentication flow](/developer/login/normal-flow#native-desktop-app).