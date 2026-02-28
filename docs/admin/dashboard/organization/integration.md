---
sidebar_position: 2
---

# Integration

This tab shows all the information needed to integrate CentralAuth with your application. You can find the following information:

- **Domain**: The domain to which you can redirect users to log in. This is `centralauth.com` by default, but you can change it to your own [custom domain](/admin/dashboard/organization/settings#custom-domains) or CentralAuth subdomain. You don't have to choose here which domain to use; you can use any of them interchangeably. However, there are some differences between the domains. See the [Which domain should I use?](#which-domain-should-i-use) section for more information.
- **Client ID**: The unique ID for this organization to use in your application.
- **Client Secret**: The secret key for this organization to use in your application.

:::tip
To integrate CentralAuth with your application, you require some technical knowledge. If you need help, contact your development team or check the [developer documentation](/category/developers).
:::

## Which domain should I use?

You can use any of the following domains to redirect users to log in:

- **`centralauth.com`**: This is the default domain and will work for most use cases. The default OAuth providers (like Google, Facebook, etc.) will also work out of the box with this domain without any additional configuration. Passkeys will also work, but all passkeys will be created under the `centralauth.com` domain for all organizations using this domain. This might be confusing for users having multiple accounts on different organizations using the same domain. It is recommended to use a custom domain or subdomain when using passkeys.
- **Your CentralAuth subdomain**: When you created your organization, a subdomain was automatically created for you (e.g. `your-organization.centralauth.com`). You can use this subdomain to redirect users to log in. This way, users will see your organization's name in the URL, which increases trust. However, the default OAuth providers will not work out of the box with this domain. You have to configure each OAuth provider to accept logins from this subdomain. Check the [OAuth provider documentation](/admin/dashboard/organization/connections#oauth-providers) for more information.
- **Your own custom domain**: If you have a custom domain set up, you can use it to redirect users to the login page. This way, users will see your own domain in the URL, which increases trust even more. However, the default OAuth providers will not work out of the box with this domain. You have to configure each OAuth provider to accept logins from this custom domain. Check the [OAuth provider documentation](/admin/dashboard/organization/connections#oauth-providers) for more information.

## Generating a new client secret

You need a client secret to connect your application to CentralAuth. You cannot retrieve the client secret after it has been generated. When you create a new organization, you have to generate a new client secret.

To generate a new client secret:
- Click on the `Generate new secret` button.
- A popup will appear with the new client secret. Copy the client secret and set it in your application. You will not be able to retrieve it again.

:::caution
Please ensure that you save the client secret in a secure place. Treat it like a password and do not share it with anyone outside your team.
:::

- When the secret has been generated, it will not be activated immediately. You can activate it by clicking on the `Activate now` button.
- If you are not in the position to activate the secret immediately, you can activate it later by clicking on the `Activate later` button. This is useful if you cannot redeploy your application immediately.

:::note
If you choose to activate the secret later, you can activate it by clicking on the `Activate secret` button on the bottom of the page. You will be asked to enter the generated secret to activate it.
:::

- Once the secret is activated, any old secrets will be invalidated and cannot be used anymore. You can only have one active secret at a time. Any application using the old secret will stop working.

:::caution
If you lose the client secret, you will have to generate a new one. The old secret will be invalidated and cannot be used anymore.
:::

## Native app registration

:::tip
Setting up CentralAuth with a native app requires technical knowledge. If you need help, contact your development team or check the [developer documentation](/category/developers).
:::

When integrating CentralAuth with web applications, you can use a backend server to store secrets and perform actions. When integrating CentralAuth with native apps, this works a little bit differently.  Because it is not possible to safely store a client secret in a native app, we have to perform the login flow with PKCE (Proof Key for Code Exchange). See the [OAuth documentation](https://www.oauth.com/oauth2-servers/oauth-native-apps) for more information.

### Native mobile app registration

To integrate CentralAuth with an Android or iOS app, you have to register your app's bundle ID / package name and App Link / Universal Link to establish a two-way trust between your app and CentralAuth. After that, you have to register the app's hash on your website to verify that you own the domain and that you are allowed to open the app from this domain.

To add a new native app registration:
- Click on the `Add app` button.
- Select the app type `Mobile`.
- Fill in the required fields, including the app's name, bundle ID / package name, and App Link / Universal Link.
- Click on the `Save` button to create the new app registration.

The App Link / Universal Link is the website hosting the `apple-app-site-association` and `assetlinks.json` file. This file is used to verify that you own the domain and that you are allowed to open the app from this domain. See the [Apple documentation](https://developer.apple.com/documentation/xcode/supporting-associated-domains) and [Google documentation](https://developer.android.com/training/app-links/verify-site-associations) for more information. If you are using Expo, check out their [documentation](https://docs.expo.dev/guides/linking) for more information. The App Link / Universal Link must be a valid HTTPS URL that can be opened in a web browser, but should not be the same as your main website. For example, if your website is `https://example.com`, your App Link / Universal Link could be `https://app.example.com`.

#### Why custom schemes are not allowed

CentralAuth does not support custom URL schemes (like `myapp://`) for native app integrations. Custom schemes are easier to spoof than App Links / Universal Links because any app can register the same custom scheme, potentially intercepting authentication flows and there's no verification mechanism to prove ownership of a custom scheme.

App Links (Android) and Universal Links (iOS) provide cryptographic verification that you own both the domain and the app, making them significantly more secure for authentication purposes.

### Native desktop app registration

Unfortunately, there is no standard way to link a desktop application to a website. Therefore, integrating CentralAuth with a desktop app is a little more involved and requires an extra layer of client attestation. CentralAuth will use the SHA256 of your app's certificate as a way to verify that the app is genuine and that you are allowed to open the app from your website. 

Also, because deeplinking is not generally supported on desktop apps, you will have to implement a loopback server in your app to receive the authentication response from CentralAuth. 

The general flow for integrating CentralAuth with a desktop app is as follows:
- Build your desktop app and sign it with a certificate. It is recommended to use a code signing certificate from a trusted certificate authority, but you can also use a self-signed certificate.
- Calculate the SHA256 hash of your app's certificate and register it on your CentralAuth dashboard.
- Before starting the login flow in your app, make a request to your backend server to generate a nonce for this login attempt. Encode this nonce in a JWT token and pass it as the `client_assertion` parameter when starting the login flow with PKCE.
- Implement a loopback server in your app to receive the authentication response from CentralAuth.
- After receiving the authentication response, the flow is the same as for a native mobile app.

To register a new native desktop app:
- Click on the `Add app` button.
- Select the app type `Desktop`.
- Fill in the required fields, including the app's identifier and the local loopback URL.
- Fill in the SHA256 thumbprint of your app's certificate.
- Click on the `Save` button to create the new app registration.

For a practical example of a desktop app, check out the [CentralAuth Rust demo](https://github.com/CentralAuth/CentralAuth-Rust-Demo) repository. This repository contains a simple desktop application built with Rust and shows you step-by-step how to integrate CentralAuth with it.