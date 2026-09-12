---
sidebar_position: 17
---

# Theme settings

:::note
Theming is not available on the **Free** plan.
:::

When starting the login flow, you can pass an object with theme settings as a query parameter. This allows you to override the theme set on the organization. This is especially useful when you want to customize the login page dynamically based on a specific theme in your application. For example, if your application has a dark mode, you can pass the dark theme settings to the login page when the user is in dark mode.

## CentralAuth NPM library

When using the CentralAuth NPM library, you can pass the `themeSettings` object as config parameter to the `login` or `loginHTTP` method, for example:

```typescript
await authClient.login(req, {
  themeSettings: {
    primaryColor: "#007bff",
    neutralColor: "#6c757d"
  }
});
```

## Manual integration

If you cannot use the NPM library, you can pass the theme settings object as a base64 stringified JSON object in the `theme_settings` query parameter of the login URL. For example:

```typescript
const themeSettings = {
  primaryColor: "#007bff",
  neutralColor: "#6c757d"
};

const themeSettingsBase64String = Buffer.from(JSON.stringify(themeSettings)).toString("base64");

const loginUrl = `https://centralauth.com/login?theme_settings=${themeSettingsBase64String}&client_id=CLIENT_ID&response_type=code&redirect_uri=REDIRECT_URI&state=STATE`;
```

## Available theme settings

You can set the following theme settings:

- `loginBlockLayout`: The layout of the login block. Possible values are `default` and `compact`.
- `loginPageLayout`: The layout of the login page. Possible values are `default`, `compact`, `alignLeft`, `alignRight`, `fullLeft` and `fullRight`.
- `imageUrl`: The URL of the image to display on the login page.
- `customFont`: The font name to use for all texts on the login page. All fonts from [Google Fonts](https://fonts.google.com/) are available.
- `primaryColor`: The HEX code of the primary color for the theme.
- `backgroundColor`: The HEX code of the background color for the theme.
- `contentColor`: The HEX code of the content color for the theme.
- `neutralColor`: The HEX code of the neutral color for the theme.

All settings are optional. If a setting is not provided, the default value from the organization will be used. More information about the available theme settings can be found on the [theme page](/admin/dashboard/organization/theme).