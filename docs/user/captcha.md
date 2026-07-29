---
sidebar_position: 4
---

# Captcha challenges

CentralAuth uses a Captcha mechanism to protect your account from unauthorized access. When you log in, you may be asked to complete a Captcha challenge to verify that you are a human user. This helps prevent automated attacks on your account.

CentralAuth uses four different kinds of Captcha challenges:
- A simple checkbox that you can click to verify that you are not a robot.
- A number challenge that asks you to click on 5 numbers in ascending order.
- A puzzle challenge to click on a specific shape in a random pattern.
- A rotation challenge to rotate a part of an image to match with the original image.
- A code challenge that asks you to enter the code you see on the screen.

Which challenge you will get depends on the number of login attempts in the past hour. If you have not made a login attempt yet, no Captcha challenge will be shown. If you have made one login attempt, you will get the checkbox challenge. If you have made more than one login attempt, you will either get the number challenge, puzzle challenge, rotation challenge or code challenge. The Captcha challenge will be shown in a modal window on top of the login screen.

## Checkbox

The checkbox Captcha challenge is the simplest type of Captcha. To complete the challenge, click on the checkbox next to the label `I am a human` to verify that you are not a robot.

<img src="/img/EmailAuthenticationScreenCaptcha.png" alt="Login screen with Captcha checkbox" width="50%" height="50%" />

## Number challenge

The number challenge asks you to click on 5 numbers in ascending order. To complete the challenge, click on the numbers in the correct order.

**Example:**

In this example, you would need to click on the numbers 1, 3, 5, 6 and 8 in that order to complete the challenge.

<img src="/img/CaptchaChallenge.gif" alt="Captcha number challenge" width="25%" height="25%" />

## Puzzle challenge

The puzzle challenge asks you to click on a specific shape in a random pattern. To complete the challenge, click on the shape that matches the description.

**Example:**

In this example, you would need to click on the only open circle in the bottom left corner to complete the challenge.

<img src="/img/CaptchaPuzzle.png" alt="Captcha puzzle challenge" width="25%" height="25%" />

## Rotation challenge

The rotation challenge asks you to rotate a part of an image to match with the original image. To complete the challenge, click and drag the image until it aligns correctly with the original. You can also use the buttons below the image to rotate the image clockwise or counterclockwise. 

**Example:**

In this example, the sea, mountains and bridge are rotated. To complete the challenge, you need to rotate the image about 45 degrees clockwise to match the original image.

<img src="/img/CaptchaLock.png" alt="Captcha rotation challenge" width="25%" height="25%" />

## Code challenge

The code challenge asks you to enter the code you see on the screen. To complete the challenge, type the code into the input field.

**Example:**

In this example, you would need to enter the code `10213` into the input field to complete the challenge.

<img src="/img/CaptchaCode.gif" alt="Captcha code challenge" width="25%" height="25%" />
