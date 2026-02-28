---
sidebar_position: 12
---

# Logging out

## CentralAuth NPM library

When using the CentralAuth NPM library, you can log out a user by calling the `logout` method on the `CentralAuthClass` instance. This method takes a `Request` object of the current request as an argument. It will return a `Response` object that removes the session from the user's cookie and redirects the user to the `return_to` URL. The second argument of the `logout` method is an optional config object that can contain the following properties:

- `return_to`: The URL to redirect the user to after logging out. 
- `logoutSessionWide`: A boolean value that indicates whether to log out the user from all applications. If this value is set to `true`, the user will be logged out from all applications that are using this user session. If this value is set to `false`, the user will only be logged out from the current application. The default value is `false`.

:::note
The `logoutSessionWide` option is only applicable when you have enabled the `autologin` option. See the [organization settings](/admin/dashboard/organization/settings#organization-settings) section for more information.
:::

:::note
When using the `CentralAuthHTTPClass` subclass, the logout method is called `logoutHTTP`. This method takes an `IncomingMessage` and `ServerResponse` object. The `logoutHTTP` method does not return a `Response` object, but instead sends the redirect response directly to the client.
:::

## Manual integration

If you cannot use the NPM library, you can log out a user manually. Simply deleting the user's access token from local storage or cookies will log the user out from your application. If you have enabled the `autologin` option and want to log out the user from all applications, you have to make a POST request to the CentralAuth logout endpoint. The base URL for the logout endpoint is `https://centralauth.com/api/v1/logout`. The POST body must contain the user's access token as plain text.

Set the `Authorization` header of the request to a base64 encoded string of the client ID and client secret of your application, separated by a colon. The client ID and client secret can be found on the CentralAuth dashboard. The format of the header is `Basic base64(client_id:client_secret)`. The `client_id` and `client_secret` can be found on the [integration](/admin/dashboard/organization/integration) page of the CentralAuth dashboard.

<details>
<summary>CURL example</summary>

Replace `CLIENT_ID`, `CLIENT_SECRET` and `ACCESS_TOKEN` with the values of your application and the user's session. 

```bash
# Create the Authorization header by base64 encoding "CLIENT_ID:CLIENT_SECRET"
AUTH_HEADER=$(echo -n "CLIENT_ID:CLIENT_SECRET" | base64)

curl -X POST https://centralauth.com/api/v1/logout \
  -H "Authorization: Basic $AUTH_HEADER" \
  -H "Content-Type: text/plain" \
  -d "ACCESS_TOKEN"
```
</details>

The request will return an empty response with a 200 OK status code. If the request fails, the response will contain an [error message](/developer/error-handling).

:::info
Both an access token and ID token can be used to log out the user.
:::

## Native app

To log out a user from a native app, simply delete the user's access token from local storage or secure storage. You don't have to make a request to the CentralAuth logout endpoint, because the session is only stored in the app itself. If you use the CentralAuth NPM library, you can call the `logout` method from the `useCentralAuth` hook to log out the user.