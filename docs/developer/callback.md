---
sidebar_position: 8
---

# Handling the callback

The way you handle the callback after authentication depends on the type of application you are developing, a web application or a native Android, iOS or desktop app.

## Web application

### CentralAuth NPM library

When using the CentralAuth NPM library, you can handle the callback by calling the `callback` method on the `CentralAuthClass` instance. This method will handle the callback when a successfully authenticated user returns to your application from CentralAuth. The `callback` method takes a `Request` object as an argument and returns a `Response` object. The `Response` object will contain the return URL to redirect the user to your application. The second argument of the `callback` method is an optional config object that can be used to hook into the callback flow. The config object can contain the following properties:

- `onStateReceived`: A method that will be called with the `state` parameter from the callback URL. This callback can be used to verify the state and perform any additional actions you want to take when the state is received. This method takes two arguments: the request object that was passed to the `callback` method and the state parameter from the callback URL. Return `true` to continue the callback flow or `false` to abort.
- `onAfterCallback`: A method that can be used to perform any additional actions you want to take after the callback flow is completed. This method takes three arguments: the request object that was passed to the `callback` method, the response object that will be returned from the `callback` method and the user object of the currently logged in user. You can use this method to perform any additional actions you want to take after the callback flow is completed, such as redirecting the user to a different page. The callback should return a `Response` object or `null` to return the original response object.

:::note
When using the `CentralAuthHTTPClass` subclass, the callback method is called `callbackHTTP`. This method takes an `IncomingMessage` and `ServerResponse` object. The `callbackHTTP` method does not return a `Response` object, but instead sends the redirect response directly to the client.
:::

:::note
When using the `CentralAuthHTTPClass` subclass, the `onAfterCallback` method takes four arguments: the request object that was passed to the `callbackHTTP` method, the response object that will be returned from the `callbackHTTP` method, the `Response` object constructed in the callback method and the user object. If you want to alter the response from the callback, use the `Response` object for this. It will later be converted to the `ServerResponse` object.
:::

#### Handling the callback

Your callback URL will be called with a `code` and `state` query parameter. 

The `state` parameter is the same string that was passed to the login method. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. You can verify the state using the `onStateReceived` callback. 

:::warning
If you have enabled autologin, the `state` parameter will be checked multiple times. Be sure to be able to verify the state for every whitelist domain on your organization.
:::

The `code` parameter is a short-lived code that can be exchanged for a long-lived access token. This exchange will be handled automatically by the library.

The long-lived access token will be stored in a cookie in the user's browser. This cookie will be used to authenticate the user on subsequent requests. The cookie will be set with the `HttpOnly` and `Secure` flags, which means that it cannot be accessed by JavaScript and will only be sent over HTTPS connections.

### Manual integration

If you cannot use the NPM library, you can handle the callback manually. The callback URL will be called with a `code` and `state` query parameter.

The `state` parameter is the same string that was passed to the login URL. Verify that this string is the same as the one you passed to the login URL, otherwise the request might be a CSRF attack. Abort the callback flow if the state does not match.

:::warning
If you have enabled autologin, the `state` parameter will be checked multiple times. Be sure to be able to verify the state for every whitelist domain on your organization.
:::

The `code` parameter is a short-lived code that can be exchanged for a long-lived access token. Your OAuth library should handle this exchange automatically by using a `getToken` method or similar. 

If you have to handle this manually, you have to make a POST request to the CentralAuth token verification endpoint. The base URL for the token endpoint is `https://centralauth.com/api/v1/verify`. The POST body must contain the following parameters:
- `code`: The code that was returned in the callback URL.
- `redirect_uri`: The callback URL of your application. This URL must match the `redirect_uri` parameter that was passed to the login URL.
- `code_verifier`: The code verifier that was used to create the code challenge. This value must match the original code verifier that was [generated during the login flow](/developer/login/normal-flow#manual-integration).

:::note
Keep in mind that the short-lived code your application is called with has nothing to do with the code verifier or code challenge. The code verifier and code challenge are used to verify the identity of your application, while the short-lived code is used to authenticate the user.
:::

When using a client secret, set the `Authorization` header of the request to a base64 encoded string of the client ID and client secret of your application, separated by a colon. The client ID and client secret can be found on the CentralAuth dashboard. The format of the header is `Basic base64(client_id:client_secret)`. The `client_id` and `client_secret` can be found on the [integration](/admin/dashboard/organization/integration) page of the CentralAuth dashboard.

Alternatively, you can also pass the `client_id` and `client_secret` as POST parameters in the body of the request. However, this is less secure than using the `Authorization` header and is not recommended.

<details>
<summary>CURL example (with client secret in header)</summary>

Replace `CLIENT_ID`, `CLIENT_SECRET`, `RECEIVED_CODE`, `CODE_VERIFIER` and `REDIRECT_URI` with the values of your application. 

```bash
# Create the Authorization header by base64 encoding "CLIENT_ID:CLIENT_SECRET"
AUTH_HEADER=$(echo -n "CLIENT_ID:CLIENT_SECRET" | base64)

curl -X POST https://centralauth.com/api/v1/verify \
  -H "Authorization: Basic $AUTH_HEADER" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "code=RECEIVED_CODE" \
  -d "redirect_uri=REDIRECT_URI" \
  -d "code_verifier=CODE_VERIFIER"
```
</details>

<details>
<summary>CURL example (with client secret in POST body)</summary>

Replace `CLIENT_ID`, `CLIENT_SECRET`, `RECEIVED_CODE`, `CODE_VERIFIER` and `REDIRECT_URI` with the values of your application. 

```bash
curl -X POST https://centralauth.com/api/v1/verify \
  -H "Authorization: Basic $AUTH_HEADER" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "code=RECEIVED_CODE" \
  -d "redirect_uri=REDIRECT_URI" \
  -d "code_verifier=CODE_VERIFIER" \
  -d "client_id=CLIENT_ID" \
  -d "client_secret=CLIENT_SECRET"
```
</details>

The response of the request will contain the following parameters:
- `access_token`: The long-lived access token that can be used to authenticate the user on subsequent requests. It does not contain the user information, but can be be used to request the user information from the CentralAuth server.
- `id_token`: The ID token is an access token that also contains the user information. This token is a JWE token that can be decoded using your client secret for direct access to the user information. Please note that while this is a faster way to retrieve the user information, it is also less secure. See the [getting the user info](/developer/userinfo) section for more information.
- `expires_in`: The time in seconds until the access token expires. 
- `expires_at`: The datetime when the access token expires.

## Native app

### React Native (Expo)

When using the `CentralAuthProvider` wrapper component, add a new screen to your app at the location you have defined for handling the callback (the `callbackUrl` prop). When using Expo Router, links to your app are automatically configured. On the callback screen, you can use the `useCentralAuth` hook to access the authentication state and methods. Call the `handleCallback` method with the search params of the callback URL. The code verification will be handled automatically and the access token will be stored in secure storage. You can use the access token as a Bearer token in the Authorization header for any request to your backend server that requires a logged in user.

**Example:**

```tsx
import { useCentralAuth } from "centralauth/native";
import { ReactNativeCallbackParams } from "centralauth/types";
import { ActivityIndicator, View } from "react-native";

export default function CallbackScreen() {
  const globalSearchParams = useGlobalSearchParams() as ReactNativeCallbackParams;
  const { handleCallback } = useCentralAuth();

  useEffect(() => {
      handleCallback(globalSearchParams)
        .then(tokenResponse => {
          //The token will be stored automatically and set in the state of the CentralAuth context
          //You can access the token using the useCentralAuth hook
          //You may want to navigate the user to a different screen at this point
        })
        .catch(error => {
          //Handle errors, e.g. show an error message to the user or navigate to an error screen
        });
    }
  }, [handleCallback, globalSearchParams]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

```

### Manual integration

If you cannot use the CentralAuth NPM package, you can handle the callback manually. This is similar to the manual integration for web applications. The callback URL will be called with a `code` and `state` query parameter.

:::note
To receive the code and state in a desktop app, you have to set up a local loopback server to listen for the callback URL. See the documentation of your programming language for more information on how to set up a local server and handle incoming requests. Remember to set the loopback URL as the callback URL in your [integration settings](/admin/dashboard/organization/integration#native-desktop-app-registration) on the CentralAuth dashboard.
:::

The `state` parameter is the same string that was passed to the login URL. Verify that this string is the same as the one you passed to the login URL, otherwise the request might be a CSRF attack. Abort the callback flow if the state does not match.

The `code` parameter is a short-lived code that can be exchanged for a long-lived access token. Your OAuth library should handle this exchange automatically by using a `getToken` method or similar. 

If you have to handle this manually, you have to make a POST request to the CentralAuth token verification endpoint. The base URL for the token endpoint is `https://centralauth.com/api/v1/verify`. The POST body must contain the following parameters:
- `code`: The code that was returned in the callback URL.
- `redirect_uri`: The callback URL of your app. This URL must match the `redirect_uri` parameter that was passed to the login URL.
- `code_verifier`: The code verifier that was used to create the code challenge. This value must match the original code verifier that was generated during the login flow. 

:::note
Keep in mind that the short-lived code your app is called with has nothing to do with the code verifier or code challenge. The code verifier and code challenge (PKCE) are used to verify the identity of your application, while the short-lived code is used to authenticate the user.
:::

<details>
<summary>CURL example </summary>

Replace `RECEIVED_CODE`, `REDIRECT_URI` and `CODE_VERIFIER` with the values of your application. 

```bash
curl -X POST https://centralauth.com/api/v1/verify \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "code=RECEIVED_CODE" \
  -d "redirect_uri=REDIRECT_URI" \
  -d "code_verifier=CODE_VERIFIER"
```
</details>

The response of the request will contain the following parameters:
- `access_token`: The long-lived access token that can be used to authenticate the user on subsequent requests. It does not contain the user information, but can be be used to request the user information from the CentralAuth server.
- `id_token`: The ID token is an access token that also contains the user information. This token is a JWE token that can be decoded using your client secret for direct access to the user information. Please note that while this is a faster way to retrieve the user information, it is also less secure. See the [getting the user info](/developer/userinfo) section for more information.
- `expires_in`: The time in seconds until the access token expires. 
- `expires_at`: The datetime when the access token expires.
 
## Error handling

If something went wrong during the authentication process, the callback URL will be called with an `error` and `error_description` query parameter. The error code is an enum that can be used to identify the error. The error message is a human readable string that describes the error. The error message can be used to display an error message to the user. See the [error handling](/developer/error-handling) section for more information on how to handle errors.