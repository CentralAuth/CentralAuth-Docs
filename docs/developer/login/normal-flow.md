---
sidebar_position: 2
---

# Default authentication flow (recommended)

The way you can start an authentication flow depends on the type of application you are developing, a web application or a native Android or iOS app.

## Web application

### CentralAuth NPM library

When using the CentralAuth NPM library, you can start the authentication flow by calling the `login` method on the `CentralAuthClass` instance. This method will redirect the user to the CentralAuth login page. The `login` method takes a `Request` object as an argument and returns a `Response` object. The `Response` object will contain the redirect URL to the CentralAuth login page. The second argument of the `login` method is an optional config object that can be used to customize the login flow. The config object can contain the following properties:

- `returnTo`: The URL to redirect the user to after a successful login. The origin of the URL must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. If this property is not set, the user will be redirected any `return_to` query parameter in the URL. If there is no `return_to` query parameter, the user will be redirected to the referrer URL. Lastly, if there is no referrer URL, the user will be redirected to the origin of the current request URL.
- `email`: The email address of the user to log in. Only use this property if you are sure which user is about to log in.
- `state`: A string that will be passed to the callback URL. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. It is recommended to use a random but verifiable string for this parameter, unique to this user, to prevent CSRF attacks.
- `errorMessage`: An error message to show at the top of the CentralAuth login page. This way you can inform the user about the error that occurred while starting a new login flow.
- `translations`: An object that contains the translations for the CentralAuth login page. This object can be used to customize the text on the login page. See the [translations page](/developer/translations) section for more information.
- `affirm`: A boolean that indicates whether the user should affirm their existing session instead of logging in. If this property is set to `true`, the user will be asked to affirm their existing session. See the [affirming existing sessions](/developer/affirmation) section for more information.

:::info
When using the `CentralAuthHTTPClass` subclass, the login method is called `loginHTTP`. This method takes an `IncomingMessage` and `ServerResponse` object. The `loginHTTP` method does not return a `Response` object, but instead sends the redirect response directly to the client.
:::

### Manual integration

If you cannot use the NPM library, you can start the authentication flow by redirecting the user to the CentralAuth login page. The base URL for the login page is `https://centralauth.com/login`, your CentralAuth subdomain or use your own [custom domain](/admin/dashboard/organization/settings#custom-domains), e.g. `https://auth.example.com/login`.

The login page URL must contain at least the following query parameters:
- `client_id`: The client ID of your application. This is the ID of your organization found on the CentralAuth dashboard. See the [integration](/admin/dashboard/organization/integration) section for more information.
- `response_type`: The type of response you want to receive. This must always be set to `code`.
- `redirect_uri`: The URL to redirect the user to after a successful login. The origin of the URL must match any registered [whitelist domain](/admin/dashboard/organization/settings#whitelist-domains) on the CentralAuth organization. Any `return_to` parameter should be appended as a query parameter of this URL.
- `state`: A string that will be passed to the callback URL. This string can be used to store any information you want to pass to the callback URL. The `state` parameter is a way to maintain state between the request and callback. It is recommended to use a random but verifiable string for this parameter, unique to this user, to prevent CSRF attacks.
- `code_challenge`: A PKCE code challenge is required to prevent CSRF and authorization code injection attacks. Generate a random code verifier and use the hashing algorithm SHA-256 to create the code challenge. Save the code verifier securely (for instance in the browser's cookies) and use it during the callback step to verify the code challenge. Check the [PKCE documentation](https://oauth.net/2/pkce) for more information.
- `code_challenge_method`: The method used to create the code challenge. This must be set to `S256` to indicate that the SHA-256 hashing algorithm is used.

The login page URL can also contain the following optional query parameters:
- `email`: The email address of the user to log in. Only use this property if you are sure which user is about to log in.
- `error_message`: An error message to show at the top of the CentralAuth login page. This way you can inform the user about the error that occurred while starting a new login flow.
- `translations`: A base64 stringified JSON object that contains the translations for the CentralAuth login page. This object can be used to customize the text on the login page. See the [translations page](/developer/translations) section for more information.
- `affirm`: A boolean that indicates whether the user should affirm their existing session instead of logging in. If this property is set to `1`, the user will be asked to affirm their existing session. See the [affirming existing sessions](/developer/affirmation) section for more information.

## Native app

### React Native (Expo)

The CentralAuth NPM package provides a wrapper for apps built with React Native (Expo). If you don't use Expo, see the [manual integration](#manual-integration-1) on how to use CentralAuth in your native app.

The [configuration](/developer/configuration#react-native-expo) page shows how to set up your Expo app using the `CentralAuthProvider` wrapper component. Every component inside this wrapper will have access to the CentralAuth context using the `useCentralAuth` hook. This hook returns the current authentication state and methods to trigger login, callback and logout. Use the `login` method to initiate the login flow.

**Example:**

```tsx
import { useCentralAuth } from "centralauth/native";
import { Button, Text, View } from "react-native";
import { Button } from "@/components/Button";

export default function Index() {
  const { login } = useCentralAuth();

  return <View>
      <Button onPress={login}>Log in</Button>
    </View>
}

```

### Manual integration

If you cannot use the CentralAuth NPM package, you can start the authentication flow in roughly the same way as with a web application. Check the [manual integration](#manual-integration) section for more information. 

The additional parameters for a native app login flow:
- `app_id`: The bundle ID / package name for your app.
- `device_id`: A unique identifier for the user's device. This can be any unique string that identifies the device, such as a UUID or a hash of the device's hardware information and will be used when requesting the user info. This is optional but recommended.
- `redirect_uri`: The URI to redirect to after a successful login. This URI has to link back to your app, not to your backend server.

Both the `app_id` and `redirect_uri` have to be configured as a native app registration on the [integration page](/admin/dashboard/organization/integration) of the CentralAuth dashboard. This way, the user will be redirected to your app after a successful login. Your app has to handle the incoming link and extract the authorization code from the URL. See the [Handling the callback](/developer/callback) section for more information.

:::tip
Open the login URL inside an embedded system browser instead of using a WebView or switching to the system browser app. See the [Android documentation](https://developer.android.com/develop/ui/views/layout/webapps/overview-of-android-custom-tabs) or the [iOS documentation](https://developer.apple.com/documentation/authenticationservices/authenticating-a-user-through-a-web-service) for more information.
:::

## Next step

After the user has logged in, they will be redirected to the callback URL. See the [Handling the callback](/developer/callback) section for more information.