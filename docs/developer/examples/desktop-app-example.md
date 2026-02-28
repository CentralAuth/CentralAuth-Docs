---
sidebar_position: 4
---

# Desktop apps

Integrating CentralAuth with a desktop app is a little more involved than integrating with a web or mobile app. Because there is no standard way to link a desktop application to a website, we have to use an extra layer of client attestation. CentralAuth will use the SHA256 of your app's certificate as a way to verify that the app is genuine and that you are allowed to open the app from your website.

Also, because deeplinking is not generally supported on desktop apps, you will have to implement a loopback server in your app to receive the authentication response from CentralAuth.

There are many different ways to build a desktop application, and CentralAuth can be integrated with most of them. For a practical example using Rust, check out the [CentralAuth Rust demo](https://github.com/CentralAuth/CentralAuth-Rust-Demo) repository. This repository contains a simple desktop application built with Rust and shows you step-by-step how to integrate CentralAuth with it.