---
sidebar_position: 1
---

# Overview

There are multiple ways to start the authentication flow. The default flow is to redirect the user to the CentralAuth login page. This page will handle the authentication process and redirect the user back to your application after a successful login. The default flow is recommended for most applications. An alternative flow is to use direct authentication by sending a user's email address to the CentralAuth API. Lastly, it is also possible to embed the CentralAuth login page in an iframe. 

This table lists the characteristics of each flow:

|                                             | Default login flow | Direct authentication      | Embedded login flow        |
| ------------------------------------------- | ------------------ | -------------------------- | -------------------------- |
| **Supports all authentication methods**     | ✅                  | ❌                          | ✅¹                         |
| **Compatible with the CentralAuth app**     | ✅                  | ❌                          | ✅                          |
| **Compatible with all browsers**            | ✅                  | ✅                          | ❌                          |
| **Suitable for web applications**           | ✅                  | ✅                          | ✅                          |
| **Suitable for native apps**                | ✅                  | ❌                          | ❌                          |
| **User stays on your website**              | ❌                  | ✅                          | ✅                          |
| **Custom login experience**                 | ❌                  | ✅                          | ❌                          |
| **Protection against suspicious activity**  | ✅                  | ❌²                         | ✅                          |
| **Compatible with CentralAuth NPM library** | ✅                  | ✅                          | ✅                          |
| **Available on plan**                       | All plans          | **Pro** and **Enterprise** | **Pro** and **Enterprise** |

¹ The embedded login flow might not support passkey authentication, depending on the browser and operating system.

² When using direct authentication, you are responsible for implementing security measures to protect against suspicious activity. This includes implementing rate limiting, IP blocking, Captchas and other security measures to prevent abuse of the authentication process.