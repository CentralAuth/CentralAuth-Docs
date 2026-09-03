---
sidebar_position: 6
---

# Using the app to log in

The CentralAuth app allows you to log in to any application that uses CentralAuth for authentication. There are two ways to use an account in the app to log in to an application: log in on the same device or log in on a different device.

## Log in on the same device

If you want to log in to an application on the same device where you have the CentralAuth app installed, follow these steps:

1. Open the application you want to log in to.
2. Click on the `CentralAuth app` button on the login screen.
3. Click on the `Log in with this device` button.
4. The CentralAuth app will open automatically.

<img src="/img/AppLoginScreen.png" alt="CentralAuth app login screen" width="25%" height="25%" />

5. If you have multiple accounts in the app, the primary account will be selected by default. You can choose a different account if needed by clicking on the `Change account` button.
6. Click on the `Log in to <organization>` button.
7. Authenticate using the method you have set up on your device (e.g. FaceID, fingerprint or PIN code).

## Log in on a different device

If you want to log in to an application on a different device than the one where you have the CentralAuth app installed, follow these steps:

1. Open the application you want to log in to on the other device.
2. Click on the `CentralAuth app` button on the login screen.
3. Click on the `Log in with another device` button if you see that option. This option will only be available on mobile and tablet devices. If you don't see this option, proceed to the next step.
4. Open the CentralAuth app on your device.

<img src="/img/AppAccountsScreen.png" alt="CentralAuth app account overview screen" width="25%" height="25%" /> 
<img src="/img/AppAccountDetailsScreen.png" alt="CentralAuth app account details screen" width="25%" height="25%" />

5. If you have multiple accounts in the app, select the account you want to use and click on the `Log in with this account` button.
6. Authenticate using the method you have set up on your device (e.g. FaceID, fingerprint or PIN code) to start the login flow.
7. The app will display a four-letter code. Enter this code on the other device where you are trying to log in. This will pair both devices.
8. The other device will show a QR code. The CentralAuth app will automatically start the camera. If you see a prompt, allow the app to access the camera.
9.  Scan the QR code on the other device using the CentralAuth app.
10. Once the QR code is scanned, the login process will continue on the other device to log you in to the application.

:::warning
If the authentication process is interrupted on either device after entering the four-letter code, you will need to start the login process again from the beginning on both devices.
:::