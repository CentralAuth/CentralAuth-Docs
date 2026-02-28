---
sidebar_position: 3
---

# Express.js

This example shows how to integrate CentralAuth with an Express.js server using the CentralAuth NPM library. We'll create a simple JavaScript web application with authentication, demonstrating login, callback handling, user information retrieval and logout functionality. 

:::note
Note that this example will also work for any other Node.js framework that uses Express-style middleware.
:::

## Step 1: Create a new Express.js project

First, create a new directory and initialize a Node.js project:

```bash
mkdir my-express-auth-app
cd my-express-auth-app
npm init -y
```

## Step 2: Install dependencies

Install Express.js and the CentralAuth library along with other necessary dependencies:

```bash
npm install --save express centralauth dotenv
```

## Step 3: Set up environment variables

Create a `.env` file in the root of your project:

```env
AUTH_ORGANIZATION_ID=your_organization_id
AUTH_SECRET=your_secret
AUTH_BASE_URL=centralauth_base_url
BASE_URL=http://localhost:3000
```

Replace the example values with:
- `AUTH_ORGANIZATION_ID` and `AUTH_SECRET`: Get these from your [CentralAuth integration page](/admin/dashboard/organization/integration)
- `AUTH_BASE_URL`: Use `https://centralauth.com`, your CentralAuth subdomain or your [custom domain](/admin/dashboard/organization/settings#custom-domains)
- `BASE_URL`: The base URL of your application (default is `http://localhost:3000`)

## Step 4: Create the main server file

Create a main server file in the root of your project and implement the authentication logic using the CentralAuth NPM library. For an example implementation, you can refer to the [Express.js example repository](https://github.com/CentralAuth/CentralAuth-Express-example).

## Step 5: Run the application

Start the Express.js application:

```bash
node server.js
```

Navigate to `http://localhost:3000` to see your application running.