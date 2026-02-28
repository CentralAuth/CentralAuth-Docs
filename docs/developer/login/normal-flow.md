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

## Native mobile app

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

## Native desktop app

Implementing CentralAuth in Windows, MacOS and Linux apps is a bit more challenging due to some pitfalls that make them harder to secure than web or mobile apps:

- Unlike web applications with backend servers, desktop apps run on user devices where any embedded data can be inspected or extracted. It's impossible to safely store a client secret in a desktop app, as users have full access to the app's code and memory.
- Mobile apps benefit from App Links (Android) and Universal Links (iOS), which provide cryptographic verification that proves you own both the domain and the app. Desktop platforms lack this standardized mechanism, making it impossible to establish cryptographic trust between your app and website the same way.
- While mobile apps can receive callbacks through verified deep links, desktop apps must typically implement a local loopback HTTP server (e.g. `http://localhost:12120`) to receive authentication responses.
- Without proper verification, anyone could use your `client_id` to impersonate your app and potentially intercept authentication flows. The `client_assertion` mechanism, signed with your app's certificate, is necessary to prove that the authentication request genuinely comes from your app and not from a malicious actor misusing your client ID.

These challenges are why desktop authentication requires the extra step of certificate-based client attestation through the `client_assertion` parameter.

### Implementation steps

Use the same base flow as the [manual integration](#manual-integration) for web, plus the parameters listed in [native mobile app manual integration](#manual-integration-1), and the extra desktop behavior below.

1. Generate or retrieve a stable `device_id` for the local device.
2. Request a nonce from `https://centralauth.com/api/v1/client_challenge/{client_id}`.
3. Create a short-lived JWT `client_assertion` that includes this nonce. In a production build, this JWT must be signed with the SHA256 thumbprint of your app's signing certificate. For debug builds, see the [notes below](#notes-on-development-and-testing).
4. Open the login URL in the system browser.
5. Receive the [callback](/developer/callback) in a local loopback HTTP server.
6. Exchange the authorization code with PKCE verifier.

How to get the SHA256 thumbprint depends on your development environment. See the documentation for your platform and language for how to create and sign JWTs with a certificate thumbprint. 

The desktop login URL should include:
- Standard OAuth parameters: `client_id`, `response_type=code`, `redirect_uri`, `state`, `code_challenge`, `code_challenge_method=S256`.
- Native parameters: `app_id`, `device_id`.
- Desktop client challenge parameter: `client_assertion`.

### Client challenge

Before starting login, request a nonce from CentralAuth and include it in a signed JWT:
- Use `iss` as your `client_id`.
- Use `sub` as the current `device_id`.
- Use `aud` as your CentralAuth base URL.
- Include `iat` and a short `exp` of 60 seconds from now.
- Include the server nonce as a private claim.

This JWT is sent as `client_assertion` in the login URL. CentralAuth validates this token before continuing the flow.

You can use any JWT library that supports signing with an SHA256 secret to create the `client_assertion`. For testing purposes, you can create an unsigned JWT with the nonce, but never use this in production as it completely bypasses the security of the client assertion mechanism (see the [notes below](#notes-on-development-and-testing)).

### Local loopback server

Unlike mobile deep links, desktop apps commonly use a local callback such as `http://localhost:12120`:
1. Start a local HTTP listener before opening the browser. Remember to register this loopback `redirect_uri` in the [integration page](/admin/dashboard/organization/integration#native-desktop-app-registration).
2. Parse `code` and `state` from the first incoming request.
3. Redirect the browser to a success page or print a success message.
4. Shut down the listener after handling the callback.

After receiving the code, exchange it on the verify endpoint with the PKCE verifier and the same native context (`app_id`, `device_id`).

:::tip
Prefer the system browser for desktop authentication instead of an embedded web view. This keeps credentials out of your app UI and aligns with OAuth best practices for native clients.
:::

### Notes on development and testing

During development, you don't have to sign your app to test the authentication flow. You can use an API key when requesting the client challenge nonce to bypass the client assertion verification. You can create an unsigned JWT with this nonce and use it as the `client_assertion` parameter in the login URL.

**CURL example**
```bash
# Get nonce with API key
curl -H "Authorization: Bearer {API_KEY}" https://centralauth.com/api/v1/client_challenge/{client_id}
# Create unsigned JWT with nonce
# You can use any JWT library that support unsecured JWTs
HEADER='{"alg":"none"}'
PAYLOAD='{"iss":"{client_id}","sub":"{device_id}","aud":"https://centralauth.com","iat":{current_time},"exp":{current_time_plus_60_seconds},"nonce":"{nonce}"}'
JWT=$(echo -n "$HEADER" | openssl base64 -e -A | tr '+/' '-_' | tr -d '=').$(echo -n "$PAYLOAD" | openssl base64 -e -A | tr '+/' '-_' | tr -d '=').
```

:::caution
Never use the API key or unsigned JWT in production. This completely bypasses the client assertion security and can allow attackers to impersonate your desktop app or get unauthorized access to your data.
:::

### Example

For a practical example using Rust, check out the [CentralAuth Rust demo](https://github.com/CentralAuth/CentralAuth-Rust-Demo) repository. This repository contains a simple desktop application built with Rust and shows you step-by-step how to integrate CentralAuth with it.

## Next step

After the user has logged in, they will be redirected to the callback URL. See the [Handling the callback](/developer/callback) section for more information.