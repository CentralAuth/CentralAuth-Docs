---
sidebar_position: 8
---

# CentralAuth MCP server

The [CentralAuth MCP Server](https://github.com/CentralAuth/CentralAuth-MCP-Server) lets AI coding tools help you integrate CentralAuth into your application using the public developer documentation and the OpenID Connect discovery endpoint. It is a practical way to scaffold an integration, generate starter files and ask implementation questions directly from your IDE.

## What it can do

The MCP server can help with:

- Integration guidance for `Next.js`, `Express`, generic OAuth 2.0 apps, React Native, and desktop apps
- Callback URL, whitelist domains, and PKCE guidance
- Starter `.env` templates for your application
- Framework-specific code snippets
- Ready-to-copy starter file bundles for `Next.js` and `Express`
- Writing CentralAuth variables into `.env` or `.env.local` files directly
- Optional admin-mode actions such as organization creation and secret rotation

## Requirements

Before you start, make sure you have:

- `Node.js 18` or later
- An IDE or AI client with MCP support
- A CentralAuth organization with the values from the [integration page](/admin/dashboard/organization/integration). Alternatively, you can let the MCP server generate these values for you if you have admin-mode enabled.

:::info
No CentralAuth API key is required for the docs-only tools. For the actual application integration, you still need your CentralAuth domain, client ID and, for confidential server-side apps, a client secret. To enable admin-mode tools such as organization creation or secret rotation, set `CENTRALAUTH_API_KEY` in the MCP server environment.
:::

## Installation

You can start the MCP server directly with `npx`:

```json
{
  "mcpServers": {
    "centralauth": {
      "command": "npx",
      "args": ["-y", "centralauth-mcp-server@latest"]
    }
  }
}
```

### Optional admin-mode configuration

If you want to use organization management features from your IDE, add the relevant environment variables to the MCP server environment:

```bash
CENTRALAUTH_API_KEY=your_api_key
```

## Using it in popular IDEs

Most MCP-compatible IDEs and AI tools use the same `mcpServers` JSON structure. Usually only the location of the settings screen or config file differs.

### Visual Studio Code / GitHub Copilot

1. Open the MCP server settings in VS Code at either workspace or user level.
2. Add the `centralauth` server configuration shown above.
3. Reload the window or reconnect the MCP servers.
4. Ask Copilot to help with your implementation.

:::tip
You can also register the MCP server directly from the terminal:

```bash
code --add-mcp '{"name":"centralauth","command":"npx","args":["-y","centralauth-mcp-server@latest"]}'
```
:::

### Cursor

1. Open Cursor's MCP settings.
2. Add the same `mcpServers` block.
3. Restart Cursor or reload the MCP servers.
4. Ask Cursor to scaffold the CentralAuth integration or explain the required configuration.

### Claude Desktop and other MCP clients

For Claude Desktop and similar tools, the setup is the same in principle:

1. Add the `centralauth` server under `mcpServers`.
2. Restart the client.
3. Use prompts to request code snippets, starter files or configuration guidance.

## Available tools

The repository currently exposes the following tools.

### Docs-only tools

| Tool                             | Purpose                                                             |
| -------------------------------- | ------------------------------------------------------------------- |
| `get_integration_checklist`      | Returns the recommended setup steps for a chosen app type           |
| `explain_callback_setup`         | Explains the callback URL and the `state` / `code` handling         |
| `validate_env_requirements`      | Lists the required environment variables for basic or OAuth flows   |
| `draft_organization_from_prompt` | Suggests a CentralAuth organization setup based on a product prompt |
| `generate_env_template`          | Generates a starter `.env` template                                 |
| `generate_project_env`           | Produces ready-to-paste environment values for a specific app type  |
| `write_project_env_file`         | Writes CentralAuth variables into the correct project env file      |
| `generate_integration_snippet`   | Generates a starter code snippet for the selected framework         |
| `generate_starter_files`         | Returns ready-to-copy starter files for `Next.js` or `Express`      |
| `get_openid_configuration`       | Fetches the public OpenID Connect discovery document                |

### Optional admin-mode tools

These require `CENTRALAUTH_API_KEY` in the MCP server environment.

| Tool                              | Purpose                                                           |
| --------------------------------- | ----------------------------------------------------------------- |
| `create_organization_from_prompt` | Creates a new CentralAuth organization from a freeform prompt     |
| `rotate_organization_secret`      | Rotates an existing organization secret and can update env values |

### Project auto-detection

When you use `write_project_env_file`, the MCP server can infer the app type from the target project path:

- `Next.js` projects usually use `.env.local`
- `Express` and generic Node apps usually use `.env`
- `React Native` / Expo apps usually use `.env`

## Typical workflow

A practical workflow for integrating CentralAuth with the MCP server looks like this:

1. Ask your AI tool for a checklist, snippet or starter files for your framework.
2. Copy the CentralAuth values from the [integration page](/admin/dashboard/organization/integration), or let the MCP server generate and write the env values into your project.
3. Configure your [callback URL](/developer/callback) and allowed domains.
4. If you use admin mode, create a new organization or rotate secrets directly from the IDE.
5. Test the login flow locally and verify that the redirect and token exchange work as expected.

## Example prompts

- `Use the CentralAuth MCP server to explain how to integrate CentralAuth into my Next.js app.`
- `Use the CentralAuth MCP server to generate starter files for an Express app at https://api.example.com.`
- `Use the CentralAuth MCP server to draft a CentralAuth organization for "Acme Billing Portal" and show me the env variables for a Next.js app at https://billing.example.com.`
- `Use the CentralAuth MCP server to create a CentralAuth organization for "Acme Billing Portal" under tenant YOUR_TENANT_ID and set the env variables for this Express app.`
- `Use the CentralAuth MCP server to rotate the secret for organization YOUR_ORG_ID and update this project's env file.`
