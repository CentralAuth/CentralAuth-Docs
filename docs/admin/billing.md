---
sidebar_position: 4
---

# Billing and Subscriptions

This guide explains how billing and subscriptions work in CentralAuth, helping tenant administrators understand pricing, payment processing, and subscription management.

## Table of Contents

1. [Overview](#overview)
2. [Subscription Plans](#subscription-plans)
3. [Getting Started](#getting-started)
4. [Billing Cycle](#billing-cycle)
5. [Usage-Based Pricing](#usage-based-pricing)
6. [Managing Your Subscription](#managing-your-subscription)
7. [Payment and Invoicing](#payment-and-invoicing)
8. [Account Status](#account-status)
9. [Frequently Asked Questions](#frequently-asked-questions)

## Overview

CentralAuth offers flexible subscription plans designed to grow with your business. Our billing system features:

- **Multiple Currency Support**: Pay in EUR, USD, GBP or JPY
- **Usage-Based Pricing**: Only pay for what you use with Monthly Active Users (MAU)
- **Automatic Billing**: Hassle-free monthly subscriptions
- **Secure Payments**: Powered by Mollie payment processing

## Subscription Plans

CentralAuth offers flexible subscription plans designed to meet different needs and scales. Each plan includes a base subscription fee plus usage-based pricing for Monthly Active Users (MAU) above the included amount.

### Available Plans

- **Free Plan**: Perfect for testing and small projects
- **Basic Plan**: Ideal for small websites and applications  
- **Pro Plan**: Best for growing businesses (recommended)
- **Enterprise Plan**: Designed for large businesses

For detailed pricing, features, and comparisons of all plans, visit our [pricing page](https://centralauth.com/pricing).

## Getting Started

### Starting Your Subscription

1. **Choose Your Plan**: Navigate to the "Billing" section of your tenant dashboard and select the plan that best fits your needs
2. **Select Currency**: Choose your preferred billing currency (EUR, USD, GBP or JPY)
3. **Enter Billing Information**: Provide your billing address and contact details
4. **Secure Payment**: Complete payment through our secure Mollie payment gateway
5. **Instant Activation**: Your new plan features activate immediately

### What You Need

- Admin or financial permissions on your CentralAuth tenant
- Valid email address for billing notifications
- Billing address information
- Your VAT number (only for EU customers)
- A valid credit card 
  
### First-Time Setup

When upgrading from Free to a paid plan:
- Your existing configuration remains unchanged
- New features become available immediately
- Billing cycle starts from your upgrade date
- You'll receive a confirmation email with your invoice

## Billing Cycle

### How Monthly Billing Works

- **Billing Date**: Your billing cycle starts on the day you first subscribe
- **Monthly Charges**: Base subscription fee is charged monthly in advance
- **Usage Charges**: Monthly Active User (MAU) overage is calculated and billed monthly
- **Automatic Renewal**: Subscriptions renew automatically for the next month unless canceled

:::note
Your invoice contains the subscription fee for the upcoming month and any additional usage fees from the previous month.
:::

### Plan Changes

- All plan changes take effect at the start of your next billing cycle
- While upgrades are scheduled for the next cycle, you maintain your current plan's features until then
- Plan changes don't affect your current billing period

## Usage-Based Pricing

### What are Monthly Active Users (MAU)?

Monthly Active Users are unique users who have logged into your application during the current billing month. This ensures you only pay for actual usage, not for the number of registered users on your organization.

### Usage-Based Pricing

Each plan includes a certain number of MAUs. If you exceed your included amount, additional usage fees apply. The exact pricing tiers and included MAU amounts for each plan can be found on our [pricing page](https://centralauth.com/pricing).

### Monitoring Your Usage

You can monitor your current MAU count and usage trends in your tenant dashboard under the "Billing" or "Usage" section.

## Managing Your Subscription

### Changing Your Plan

1. Go to your tenant dashboard
2. Navigate to "Billing"
3. Select "Change Plan"
4. Choose your new plan
5. Confirm the change

:::note
All plan changes (both upgrades and downgrades) take effect at the start of your next billing cycle. You'll continue to have access to your current plan's features until then.
:::

### Canceling Your Subscription

To cancel your subscription and return to the Free plan:

1. Navigate to your tenant dashboard
2. Go to "Billing" or "Subscription"
3. Select "Change Plan"
4. Choose the "Free Plan"
5. Confirm the change

Your account will remain on your current paid plan until the end of your billing period, then automatically switch to the Free plan. A final invoice will be sent for any outstanding charges of the previous billing period.

## Payment and Invoicing

### Secure Payment Processing

CentralAuth uses Mollie, a leading European payment processor, to ensure secure and reliable transactions:

- **PCI DSS Compliant**: Your payment data is handled with the highest security standards
- **3D Secure**: Additional security layer for card transactions
- **Automatic Retry**: Failed payments are automatically retried

### Invoicing

- **Monthly Invoices**: Receive detailed invoices via email each billing cycle
- **Instant Receipts**: Get immediate payment confirmations
- **VAT Handling**: Automatic VAT calculation for EU customers
- **Download Options**: Access and download all invoices from your dashboard

### VAT and Tax Information

- **Non-EU Customers**: No VAT charged
- **EU Customers**: VAT reverse charge according to article 44 & 196 of the EU VAT Directive
- **Customers in the Netherlands**: 21% VAT automatically applied

### Payment Timeline

- **Grace Period**: 14 days to resolve failed payments
- **Account Suspension**: Account becomes inactive after grace period
- **Reactivation**: Immediate reactivation upon successful payment

## Account Status

### Active Status
- All features available
- Regular billing and payments successful
- Full access to your subscription tier features

### Grace Period
- Temporary status when payment fails
- 14-day period to resolve payment issues
- All features remain available during grace period

### Suspended Status
- Account suspended after 14-day grace period
- Authentication services will be inactivated
- Can be reactivated by updating payment method

### Reactivation
- Update your payment method in billing settings
- Outstanding invoices will be automatically charged
- Account reactivates immediately upon successful payment
- All features restored to your subscription level

## Frequently Asked Questions

### General Questions

**Q: How does CentralAuth billing work?**

A: CentralAuth uses monthly subscription billing. You pay a base fee for your chosen plan plus additional charges if you exceed your included Monthly Active Users (MAU).

**Q: What counts as a Monthly Active User?**

A: A Monthly Active User is any unique user who has logged into your application during the current billing month. This includes successful logins via any authentication method.

**Q: When do plan changes take effect?**


A: All plan changes (both upgrades and downgrades) take effect at the start of your next billing cycle. You'll continue to have access to your current plan's features until then.

**Q: Can I cancel my subscription anytime?**

A: Yes, you can cancel anytime by selecting the Free plan in your billing settings. Your account remains on your current paid plan until the end of your billing period, then automatically switches to the Free plan.

### Pricing and Payment

**Q: What currencies do you accept?**

A: We accept payments in EUR (Euro), USD (US Dollar), GBP (British Pound), and JPY (Japanese Yen). Prices are automatically converted from our base Euro pricing.

**Q: How is VAT handled?**

A: VAT is automatically calculated based on your billing country:
- Netherlands: 21% VAT added
- EU: Reverse charge (no VAT added)
- Non-EU: No VAT

**Q: What payment methods are accepted?**

A: We accept all major credit cards through our secure Mollie payment processor.

**Q: When will I be charged?**

A: Your subscription fee is charged monthly on your billing anniversary. Additional MAU charges are calculated and billed at the end of each billing period.

**Q: What happens if my payment fails?**

A: You'll have a 14-day grace period to update your payment method. During this time, all features remain available.

### Account Management

**Q: How do I upgrade or downgrade my plan?**

A: Visit your tenant dashboard, go to Billing settings, and select "Change Plan". Choose your new plan and confirm the change. All plan changes take effect at the start of your next billing cycle.

**Q: Can I get a refund?**

A: We don't offer refunds for unused time, but you can downgrade or cancel to avoid future charges.

**Q: What happens if my account gets suspended?**

A: If payment issues aren't resolved within 14 days, your account becomes suspended with limited functionality. Reactivation is immediate once payment is successful.

### Usage and Features

**Q: How can I monitor my Monthly Active Users?**

A: Check your current MAU count and usage trends in your tenant dashboard under the "Usage" section.

**Q: What happens if I exceed my included MAU?**

A: Additional usage fees apply automatically. You'll see these charges on your next invoice. See our [pricing page](https://centralauth.com/pricing) for detailed MAU pricing.

**Q: Do inactive users count toward my MAU?**

A: No, only users who actually log in during the billing period count toward your MAU. Registered but inactive users don't incur charges.

### Technical Support

**Q: What if I don't receive my invoice?**

A: Invoices are sent to your billing email address. Check your spam folder and verify your email address in billing settings. You can also download invoices from your dashboard.

**Q: How do I contact support for billing issues?**

A: For billing questions, contact our support team through the [contact form](https://centralauth.com/contact). Include your tenant ID for faster assistance.

**Q: Is my payment information secure?**

A: Yes, all payments are processed through Mollie, a PCI DSS compliant payment processor. CentralAuth never stores your credit card information.

**Q: Can I get usage reports for accounting?**

A: Yes, detailed usage reports and invoices are available in your dashboard for download and accounting purposes.