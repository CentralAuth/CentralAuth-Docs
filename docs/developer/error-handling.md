---
sidebar_position: 13
---

# Error handling

When interacting with the CentralAuth API, any request that fails will return a JSON object with error information. The error object will contain the following properties:
- `errorCode`: The error code of the error. This is a string that can be used to identify the error.
- `message`: A human readable string that describes the error. This string can be used to display an error message to the user.

:::warning
If you manually integrate the authentication flow in your application, the error handling for the callback method is slightly different. If anything went wrong during the authentication flow, the callback URL will be called with an `error` and `error_description` query parameter. 
:::

## Error codes
These are the error codes that can be returned by the CentralAuth API:
| Error code                 | Description                                                                                                                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `genericError`             | An error without any context available.                                                                                                                                                                                                                                                               |
| `noPermission`             | The user does not have permission to perform the requested action.                                                                                                                                                                                                                                    |
| `missingFields`            | The request is missing required fields.                                                                                                                                                                                                                                                               |
| `sessionMissing`           | The given session ID is not found.                                                                                                                                                                                                                                                                    |
| `sessionNotVerified`       | The session is not correctly verified.                                                                                                                                                                                                                                                                |
| `sessionExpired`           | The session has expired.                                                                                                                                                                                                                                                                              |
| `sessionInactive`          | The session is not (yet) activated or not active anymore.                                                                                                                                                                                                                                             |
| `sessionInvalid`           | The session is invalid or does not match the given information to handle session activation.                                                                                                                                                                                                          |
| `domainInvalid`            | The domain provided is not given, not valid or not registered as a whitelist domain.                                                                                                                                                                                                                  |
| `loginAttemptMissing`      | The login attempt ID is missing.                                                                                                                                                                                                                                                                      |
| `loginAttemptExpired`      | The login attempt has expired.                                                                                                                                                                                                                                                                        |
| `loginAttemptInvalid`      | The login attempt is invalid.                                                                                                                                                                                                                                                                         |
| `passkeyDataMissing`       | The passkey data ID is missing.                                                                                                                                                                                                                                                                       |
| `passkeyDataExpired`       | The passkey data has expired.                                                                                                                                                                                                                                                                         |
| `passkeyDataInvalid`       | The passkey data is invalid.                                                                                                                                                                                                                                                                          |
| `passkeyWrongOrganization` | The passkey data is associated with the wrong organization. Mostly caused by using the default login URL for more than one organization. To mitigate this issue, consider using a CentralAuth subdomain or a [custom domain](/admin/dashboard/organization/settings#custom-domains) as your auth URL. |
| `callbackUrlMissing`       | The callback URL of the login flow is missing.                                                                                                                                                                                                                                                        |
| `callbackUrlInvalid`       | The callback URL of the login flow is invalid or not registered as a whitelist domain.                                                                                                                                                                                                                |
| `connectionMissing`        | The connection ID is missing or not found.                                                                                                                                                                                                                                                            |
| `organizationIdMissing`    | The organization ID is missing or not found.                                                                                                                                                                                                                                                          |
| `tokenInvalid`             | An access token is missing in this request.                                                                                                                                                                                                                                                           |
| `stateMissing`             | A unique OAuth state is missing in the login flow.                                                                                                                                                                                                                                                    |
| `stateInvalid`             | The OAuth state is missing or invalid during the callback step in the login flow.                                                                                                                                                                                                                     |
| `codeChallengeMissing`     | A unique OAuth code challenge is missing in the login flow.                                                                                                                                                                                                                                           |
| `codeChallengeInvalid`     | The OAuth code challenge is invalid during the callback step in the login flow.                                                                                                                                                                                                                       |
| `captchaInvalid`           | The Captcha challenge was not solved correctly.                                                                                                                                                                                                                                                       |
| `entityMissing`            | An entity is missing in the given context. The error message should specify which entity is missing.                                                                                                                                                                                                  |
| `entityInvalid`            | An entity is invalid in the given context. The error message should specify which entity is invalid.                                                                                                                                                                                                  |

:::note
Keep in mind that unexpected errors may occur that do not match any of the error codes listed above. In such cases, only the error message may be available.
:::

## Error handling in the NPM library
When using the CentralAuth NPM library, you can handle errors by using the `catch` statement on the `Promise` object returned by the methods on the `CentralAuthClass`. The `catch` statement will contain an object with the error information. You can use this error object to display an error message to the user, redirect the user to the login screen, or implement any other kind of error handling.

:::tip
If something went wrong during the authentication flow, you can catch the error and redirect the user back to the login page. Use the `errorMessage` property to show the error message to the user. Using the [quick example](/developer/quick-example), it would look like this:

```tsx
import { CentralAuthClass } from "centralauth/server";
import { headers } from "next/headers";

export async function GET(req: Request, props: { params: Promise<{ action: "login" | "callback" | "user" | "logout" }> }) {
  const { action } = await props.params;
  const headerList = await headers();
  
  const requestUrl = new URL(req.url);
  const searchParams = requestUrl.searchParams;

  const authClient = new CentralAuthClass({
    clientId: process.env.AUTH_ORGANIZATION_ID,
    secret: process.env.AUTH_SECRET,
    authBaseUrl: process.env.AUTH_BASE_URL,
    callbackUrl: `${requestUrl.origin}/api/auth/callback`
  });

  let response = Response.json(null);
  try {
    if (action == "login")
      response = await authClient.login(req, { errorMessage: searchParams.get("error_message") });
    if (action == "callback")
      response =  await authClient.callback(req);
    if (action == "user")
      response =  await authClient.user(headerList);
    if (action == "logout")
      response =  await authClient.logout(req);
  } catch (error: unknown) {
    //When an error occurs during the callback, retry the login procedure
    if (action == "callback")
      response = new Response(null, {
        status: 302,
        headers: {
          "Location": `/api/auth/login?error_message=${error.message}`
        }
      })
  }
  return response;
}
```
:::