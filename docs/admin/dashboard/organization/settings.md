---
sidebar_position: 5
---

# Settings

This tab allows you to configure the settings of the organization.

## General settings

- **Organization name**: The name of the organization. This name is displayed on the login screen.
- **Logo URL**: The URL of the organization's logo. The logo is displayed on the login screen.
- **Custom domain**: The custom domain of the organization. Setting a custom domain is optional, but recommended. See the [custom domains](#custom-domains) section for more information.

### Custom domains

:::note
A custom domain is only available on the **Pro** and **Enterprise** plans.
:::

Custom domains allow you to use your own domain for the CentralAuth login screen. This is useful if you want to use a domain that is easier to remember and more recognizable to your users. Passkeys will also be saved specifically for this domain, meaning users will only have the choice between passkeys for this specific domain.

To set up a custom domain, follow these steps:
- Enter the custom domain in the `Custom domain` field under general settings.
- Add a CNAME record to your domain's DNS settings. Ask your development team or hosting provider for help if you're not sure how to do this. Since CentralAuth is available in multiple regions, make sure to point the CNAME record to the correct CentralAuth domain based on your organization's region:
  - Use the Global zone at `custom.centralauth.com.` when your backend servers are located in multiple regions or you don't know their location. The closest CentralAuth server location will be used automatically.
  - Use the EMEA zone at `custom-eu.centralauth.com.` when your backend server is located in Europe, the Middle East or Africa.
  - Use the Americas zone at `custom-am.centralauth.com.` when your backend server is located in North or South America.
  - Use the APAC zone at `custom-as.centralauth.com.` when your backend server is located in Asia, Australia or Oceania.
- Add a TXT record as `_centralauth` to your domain's DNS settings with the domain verification code shown on the settings page. This is required to verify that you own the domain. This is needed because multiple organizations can use the same custom domain. Since all custom domains are pointed to the same CentralAuth server, anyone would be able to use your custom domain otherwise. The verification code is the same for all organizations with the same custom domain under the same tenant. If you have multiple custom domains, you can add additional `_centralauth` TXT records for each domain.
- Wait for the DNS changes to propagate. This can take up to 24 hours.
- Your custom domain will automatically be verified once the DNS changes have propagated. A certificate will be issued for your domain, and the login screen will be available at your custom domain. When the certificate cannot be issued automatically, make sure that the DNS settings are correct and that the changes have fully propagated. Remove and re-add the custom domain if necessary.
- You should see the confirmation message `Domain is configured correctly` on the settings page.

:::warning
When using a custom domain, any OAuth provider using the default CentralAuth credentials will not be enabled on the login screen. You have to use your own credentials for these providers and set them up to redirect users to your custom domain. See the [OAuth providers](/admin/dashboard/organization/connections#oauth-providers) section for more information.
:::

:::info
If you don't know which region your backend servers are located in, use the Global zone. Keep in mind that using the Global zone may introduce slightly higher latency when resolving DNS records.
:::

## Whitelist domains

You can whitelist domains to restrict access to the CentralAuth login screen to users from specific domains. This adds an extra layer of security to your organization's login screen.

To whitelist a domain, click the `Add domain` button and enter the top-level domain you want to whitelist, starting with `https://` and without any subpath. You can whitelist multiple domains by adding them one by one. 

You can use the wildcard character `*` to whitelist all subdomains of a domain. For example, `https://*.example.com` will whitelist all subdomains of `example.com`. Remember that domains using a wildcard character cannot be used for autologin.

To remove a domain from the whitelist, click the trash icon next to the domain you want to remove.

:::caution
If you don't add any domains to the whitelist, all domains are allowed by default. It is recommended to whitelist at least one domain to restrict access to the login screen.
:::

## Organization settings

An organization will inherit the settings of the parent tenant by default. You can override these settings by enabling the `Override tenant settings` option. A new form will appear where you can configure the following settings:

- **Max session time**: The maximum time in seconds a user can stay logged in, regardless if the user is active or not. The session will expire after this time. A value of zero disables this setting.
- **Max inactivity time**: The maximum time in seconds a user can stay logged in without any activity. The session will expire after this time. A value of zero disables this setting.
- **Enable user creation**: When this setting is checked, a new user can be created by logging in to your organization. If this setting is unchecked, user creation is disabled and users must be created through the [API](https://centralauth.com/api_doc#post-/api/v1/user) or the dashboard.
- **Allow localhost**: When this setting is checked, `localhost` will be allowed as referrer and domain. Only use this if you want to log in at a development environment, otherwise leave this unchecked.
- **Check referrer during login**: When this setting is checked, the referrer of the request is checked against the whitelisted domains. Leave this checked for added security. Only uncheck this when the referrer cannot be forwarded to CentralAuth.
- **Enable hijack protection**: When this setting is checked, user sessions will be validated on every request. It is not recommended to disable this setting. When enabled, the following options are available:
  - **IP address**: When this option is checked, the IP address of the user will be validated on every request. If the IP address changes, the session will be invalidated and the user will be logged out.
  - **User agent**: When this option is checked, the user agent of the browser will be validated on every request. If the user agent changes, the session will be invalidated and the user will be logged out.
  - **Device ID**: When this option is checked, the device ID of the user will be validated on every request. If the device ID changes, the session will be invalidated and the user will be logged out. This option is only used for native apps.
- **Enable autologin**: When this setting is checked, the user will be logged in automatically at all whitelisted domains, except for domains with a wildcard. Remember that the callback paths on all domains must be the same. This setting is only available when there are at least two whitelisted domains on the organization. See the [Whitelist domains](#whitelist-domains) section for more information.

:::note
Autologin is not available on the **Free** plan.
:::

- **Default login type**: A dropdown defining the login type when the user receives an authentication email. This setting is only used when authenticating for a web application. For native apps, the login type is always `One-time code`.
  - **One-time code**: the user receives an email with a 5-digit code to enter in the browser. This is the most secure login type (recommended and default).
  - **Challenge**: the user will be presented with three numbers and has to click the correct number shown on the screen. This is a fast and secure login type.
  - **Login link**: a one-time login link the user clicks to log in. This is the fastest login type, but less secure.
- **Default login method**: A dropdown defining where the user logs in, based on the device that receives the authentication email with a login link. This option is only available when the default login type is set to `Login link`.
  - **Local**: the user will be logged in on the device that receives the authentication email.
  - **Remote**: the user will be logged in on the device on which they start the authentication flow.
  - **User choice**: let the user decide on which device to log in. The email will contain two login links.
- **Use default SMTP server**: When this setting is checked, the default CentralAuth SMTP server will be used for sending authentication emails. If you uncheck this option, you can provide your own SMTP server settings:
  - **SMTP host**: The hostname of the SMTP server, e.g. `smtp.example.com`.
  - **SMTP port**: The port of the SMTP server, e.g. `587`.
  - **SMTP from address**: The email address from which authentication emails will be sent.
  - **SMTP user**: The username to authenticate with the SMTP server.
  - **SMTP password**: The password to authenticate with the SMTP server.

:::note
A custom SMTP server is only available on the **Pro** and **Enterprise** plans.
:::

## Delete organization

To delete the organization, click the **Delete this organization** button. You will be prompted to confirm the deletion. Type the confirmation text and click **Delete** to proceed with the deletion. 

:::warning
Deleting an organization will delete all users and data associated with the organization. This action cannot be undone!
:::