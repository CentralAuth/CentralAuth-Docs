---
sidebar_position: 5
---

# Theme

This tab allows you to configure the theme of the organization.

:::note
Theming is not available on the **Free** plan.
:::

### Colors

- **Primary color**: The primary color of the organization. This color is used for buttons, borders etc.
- **Neutral color**: The neutral color of the organization. This color is used for blocks and highlighted surfaces.
- **Background color**: The background color of the login screen.
- **Content color**: The color of all text elements and icons on the login screen.

### Custom font

You can choose the font to use for all texts the login screen. This allows you to customize the appearance of the text elements on the login screen. All fonts from [Google Fonts](https://fonts.google.com/) are available.

### Image

You can optionally enter the URL of the image for the login screen. This image will be displayed according to the [login page layout](#login-page-layout) you choose.

### Login block layout

You can choose the positioning of the login methods inside the login block.

- **Default**: The login methods are stacked vertically.
- **Compact**: The passkey button is displayed at the top with the other login methods grouped horizontally at the bottom.

### Login page layout

You can choose the layout of the login page.

- **Default**: The login block is displayed in the center of the page. The image is displayed behind the login block.
- **Compact**: The login block is displayed in the center of the page with the image next to it. This layout is the same as **default** with no image URL specified.
- **Align left**: The login block is displayed on the left side of the page. The image is displayed behind the login block.
- **Align right**: The login block is displayed on the right side of the page. The image is displayed behind the login block.
- **Fullscreen left**: The login block is fills the left side of the screen. The image is displayed at the right side.
- **Fullscreen right**: The login block is fills the right side of the screen. The image is displayed at the left side.

## Overriding theme settings

You can override the theme settings on the organization by passing an object with theme settings as a query parameter when starting the login flow. See the [theme settings page](/developer/theme-settings) for more information about how to override the theme settings on the organization.