---
sidebar_position: 3
---

# Connections

This tab allows you to configure the available authentication connections of the organization.

- **Enable passkey connection**: When this option is checked, users can log in using passkeys. Passkeys are a secure and convenient way to authenticate users without the need for passwords and the recommended authentication method. When enabled, the passkey option will be shown at the top of the login screen.

:::note
Passkey connections are not available on the **Free** plan.
:::

- **Enable email connection**: When this option is checked, users can log in using their email address. Multiple options for email login are available. See the [organization settings](/admin/dashboard/organization/settings#organization-settings) section for more information.

:::info
When no authentication connections are available, email authentication is enabled regardless of this setting.
:::

## OAuth providers

This section shows all third-party OAuth providers you have enabled for this organization.

:::note
OAuth providers are not available on the **Free** plan.
:::

### Adding a new OAuth provider

Click the `Add OAuth provider` button to add a new OAuth provider. You can choose from the following providers:

- Google
- Microsoft
- Facebook
- X
- GitHub

:::tip
More providers will be added in the future. Check back soon for updates.
:::

### OAuth credentials

All OAuth providers work out of the box with the default CentralAuth credentials. Using the default credentials, users see the CentralAuth logo when they log in with an OAuth provider. You can, however, use your own credentials to show your organization's logo instead. 

To use your own credentials, select the `Use your own credentials` option for each OAuth provider you enable and enter the following information:

- **Client ID**: The unique ID for this provider to use in your application.
- **Client Secret**: The secret key for this provider to use in your application.

Both client ID and client secret can be found in the developer console of the respective provider. Please check the provider's documentation for more information:

- [Google Identity docs](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft Entra ID docs](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- [Facebook Login docs](https://developers.facebook.com/docs/facebook-login/)
- [X Authentication docs](https://docs.x.com/fundamentals/authentication/oauth-2-0/authorization-code)
- [GitHub OAuth docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

When setting up your own OAuth app, make sure to start the redirect URL to `https://centralauth.com/api/oauth/callback` if you're not using a custom domain or CentralAuth subdomain. 

If you are using a custom domain, use that instead. For example, if your custom domain is `login.example.com`, the redirect URL should be `https://login.example.com/api/oauth/callback`.

You can also use a CentralAuth subdomain. For example, if your CentralAuth subdomain is `my-org.centralauth.com`, the redirect URL should be `https://my-org.centralauth.com/api/oauth/callback`.

:::warning
OAuth providers using the default CentralAuth credentials only work with the default CentralAuth domain. If you want to use your own custom domain or a CentralAuth subdomain, you have to use your own credentials. Any OAuth provider using the default CentralAuth credentials will not be enabled on the login screen domains other than the default CentralAuth domain. You can find more info in the [Which domain should I use?](/admin/dashboard/organization/integration#which-domain-should-i-use) section.
:::

### Disabling an OAuth provider

To disable an OAuth provider, click the trash icon next to the provider you want to disable and click `Save`.