---
sidebar_position: 3
---

# Getting started

CentralAuth is compatible with any application that supports OAuth 2.0. Whether you're building a Node.js application, a Python web app or a PHP website, you can easily integrate CentralAuth into your project. We will be using [Next.js](https://nextjs.org) for the examples in this documentation, but the concepts and steps are applicable to any programming language or framework.

This guide will walk you through the process of integrating CentralAuth into your application, including setting up your application, configuring the OAuth flow, and handling user authentication.

:::tip
Prefer integrating with AI assistance? See the [CentralAuth MCP server guide](/developer/mcp-server) to use CentralAuth from MCP-compatible IDEs.
:::

## Prerequisites

Before you start, make sure you have the following:
- Access to the CentralAuth dashboard. See the [CentralAuth dashboard documentation](/admin/dashboard/intro) for more information on how to access the dashboard.
- A CentralAuth tenant with at least one organization. You can create a new tenant in the CentralAuth dashboard if you don't have one.
- Basic knowledge of OAuth 2.0 and how it works.
- Familiarity with the programming language and framework you're using for your application.
- A development environment set up for your application.
- A CentralAuth client ID and activated client secret for your application, which you can obtain from the CentralAuth dashboard. See the [integration page](/admin/dashboard/organization/integration) for more information.