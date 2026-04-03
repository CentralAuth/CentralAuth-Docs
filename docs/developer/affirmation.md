---
sidebar_position: 11
---

# Affirming existing sessions

Sometimes, you may want to ask users to affirm their existing sessions. This can be useful when you want to prevent unauthorized access to sensitive information or actions. This could be done by automatically logging the user out, but this can be disruptive to the user experience. Instead, you can ask users to affirm their existing sessions by re-authenticating themselves.

Affirmation of an existing session differs from a regular login in a few ways:
- The intro text on the login screen is different. It will ask users to affirm their existing session instead of logging in.
- After successful affirmation, the user's email address is checked against the email address of the existing session. If they match, the session is affirmed and the user can continue using the application. If they don't match, the affirmation fails. In this case, the callback API route will throw an error, but the user will not be logged out. This allows you to handle the failed affirmation in your application and decide what to do next, such as showing an error message or logging the user out.
- After affirmation, the new session data is stored with the updated affirmation date. You can base any action in your application on the affirmation date, such as a timeout for showing a page with sensitive information.

## Determining when to ask for affirmation

Simply asking a user to affirm their existing session every time they visit a page can be disruptive to the user experience. Instead, you can determine when to ask for affirmation based on the time since the last affirmation. The last affirmation date is stored in the [user info](/developer/userinfo#the-user-info-object), which you can access in your application. Based on this date, you can decide when to ask users to affirm their existing sessions. 

For example, you could ask users to affirm their sessions every 24 hours when accessing a page with sensitive information. When you want to force affirmation before a sensitive action, you can check for a very short affirmation timeout, such as 10 seconds. If the last affirmation date is older than the specified timeout, you can start the affirmation flow and immediately perform the action after successful affirmation.

## Starting the affirmation flow

The affirmation flow is very similar to the regular login flow. If you use the CentralAuth NPM library, you can start the affirmation flow by passing the `affirm` option to the config object of the `login` or `loginHTTP` method. If you have a manual integration, you can pass the `affirm=1` query parameter to the `/login` endpoint. See the [default authentication flow](/developer/login/normal-flow) section for more details on how to start the login flow.

:::tip
Since you are affirming an existing session, you can safely pass the user's email address to the login endpoint. This will pre-fill the email field on the login screen, making it easier for the user to affirm their session. Set the `email` option in the `login` or `loginHTTP` method of the CentralAuth NPM library, or pass the `email` query parameter to the `/login` endpoint in a manual integration.
:::

## Handling the affirmation callback

After the user successfully affirms their existing session, they will be redirected back to your application with a callback URL. You can handle this callback in the same way as you would handle a regular login callback. The only difference is that you need to check if the affirmation was successful and if the email address of the affirmed session matches the email address of the existing session. 

When using the CentralAuth NPM library, this check is done automatically for you. If the affirmation fails, the library will throw an error, which you can catch and handle in your application. If you have a manual integration, you need to implement this check yourself in your callback API route.