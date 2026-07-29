---
sidebar_position: 15
---

# CentralAuth API

You can use the official CentralAuth API for an advanced integration between your application and CentralAuth. The CentralAuth API is a RESTful API that allows you to perform various operations, such as managing tenants, organizations and users. To use the API, you need an API key from your [tenant](/admin/dashboard/tenant/api-keys) or [organization](/admin/dashboard/organization/api-keys) and set it as a Bearer token in the `Authorization` header of your requests. 

## Using the CentralAuth NPM library

The CentralAuth NPM library provides an SDK to interact with the CentralAuth API. To get started with the SDK, first import the client and set the API key as bearer token:

```javascript
import { client } from "centralauth/api/client";

client.setConfig({
  headers: {
    Authorization: `Bearer ${YOUR_API_KEY}`
  }
});
```

Then you can use all exposed methods to interact with the API. The client is automatically generated from the OpenAPI specification of the CentralAuth API, so you can use it in a type-safe way.

Example of getting an organization by ID:

```typescript
import { getApiV2OrganizationById } from 'centralauth/api/sdk';

const organizationData = await getApiV2OrganizationById({
  path: {
    id: YOUR_ORGANIZATION_ID
  }
});
```

Example of updating the name of an organization:

```typescript
import { postApiV2OrganizationById } from 'centralauth/api/sdk';

const newOrganizationData = await postApiV2OrganizationById({
  path: {
    id: YOUR_ORGANIZATION_ID
  },
  body: {
    name: "New organization name"
  }
});
```

## Manual integration

If you cannot use the NPM library, you can use the CentralAuth API manually. The base URL for the API is `https://centralauth.com/api`, followed by the version number and endpoint name. Set the API key as Bearer token in the `Authorization` header of your requests.

CURL example of getting an organization by ID:

```bash
curl -X GET "https://centralauth.com/api/v2/organization/YOUR_ORGANIZATION_ID" \
 -H "accept: application/json" \
 -H "authorization: Bearer YOUR_API_KEY"
```

CURL example of updating the name of an organization:

```bash
curl -X POST "https://centralauth.com/api/v2/organization/YOUR_ORGANIZATION_ID" \
 -H "accept: application/json" \
 -H "authorization: Bearer YOUR_API_KEY" \
 -H "content-type: application/json" \
 -d '{"name":"New organization name"}'
```

## API explorer

You can also use the [API explorer](https://centralauth.com/api_doc) to test the API endpoints. The API explorer provides a user-friendly interface to interact with the API and see the responses in real-time. You can also generate CURL commands from the API explorer to use in your own applications.

## OpenAPI specification

The CentralAuth API is built using the OpenAPI specification, which is a standard way to describe RESTful APIs. The OpenAPI specification provides a machine-readable format that describes the API endpoints, request and response formats, authentication methods, and other details. This makes it easy to generate client libraries, documentation, and other tools for the API.

The CentralAuth SDK is made with the [Hey API](https://heyapi.dev/) library to convert the OpenAPI specification to TypeScript. You can find the OpenAPI specification of the CentralAuth API in the [OpenAPI spec file](https://centralauth.com/api/openapi). You can use this file to generate your own client or use it with any OpenAPI-compatible library.

## Rate limiting

The CentralAuth API enforces rate limiting to ensure fair usage and protect the service from abuse. If you exceed the allowed number of requests, you will receive a `429 Too Many Requests` response. 

Rate limiting is enforced on a per-tenant basis, meaning that all API keys under the same tenant (including the API keys of the tenant's organizations) share the same rate limit. For instance, if you have a **Pro** tenant with an API key that made 20 requests in an hour and an organization under that tenant with its own API key that made 40 requests in an hour, the total number of requests made by both API keys in that hour is 60. If the rate limit for the tenant is 50 requests per hour, all subsequent requests will have returned a `429 Too Many Requests` response.

In addition to the individual rate limits defined for specific endpoints, a global rate limiting mechanism is enforced across the entire website as a security measure. This global rate limiting helps protect the system from abuse and ensures fair resource allocation among all users.

### Rate limit per plan

The rate limits for the CentralAuth API depend on the plan you are subscribed to:

|                     | Free | Basic | Pro  | Enterprise |
| ------------------- | ---- | ----- | ---- | ---------- |
| Requests per minute | 1    | 5     | 10   | 25         |
| Requests per hour   | 10   | 50    | 100  | 250        |
| Requests per day    | 100  | 500   | 1000 | 2500       |

### Best practices

To avoid hitting the rate limit, consider the following best practices:

- Implement exponential backoff in your application to gracefully handle `429 Too Many Requests` responses.
- Monitor your application's usage of the API and adjust your request patterns as needed.
- If you need higher rate limits, contact CentralAuth support to discuss your use case.