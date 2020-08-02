# bccompsci.club

![Node.js CI](https://github.com/bc-compsci-club/bccompsci.club/workflows/Node.js%20CI/badge.svg?branch=master)

The official website for the Brooklyn College Computer Science Club.

Link: [bccompsci.club](https://bccompsci.club)
<br />
Figma Design: [figma.com/file/LqXoWYMh8QUrHvBRJbp8V9/Website?node-id=0%3A1](https://www.figma.com/file/LqXoWYMh8QUrHvBRJbp8V9/Website?node-id=0%3A1)

## Browser Tests

The browser versions listed represent the earliest versions that seem to work. Data may not be fully accurate. Not all versions may have been tested.

**Works Great:** The website is fully usable and appears as intended.

**Works with Issues:** The website is fully usable, but slight layout issues are visible.

### Desktop

| Browser           | Works Great | Works with Issues |
| ----------------- | ----------- | ----------------- |
| Chrome            | 36          | 29                |
| Firefox           | 60          | 32                |
| Edge Chromium     | 80          | None              |
| Edge Legacy       | 17          | 15                |
| Safari            | 11.1        | 7.1               |
| Opera             | 25          | 23                |
| Yandex            | 14.12       | None              |
| Internet Explorer | None        | 10                |

#### Notes

- Chrome
  - 29 - 35: Navbar layout broken
  - 15 - 28: Error 113: ERR_SSL_VERSION_OR_CIPHER_MISMATCH
- Firefox
  - 32 - 59: About top section has broken spacing
- Edge Legacy
  - 15 - 16: About top section has broken spacing
- Safari
  - 6.2 - 10.1: Join button on About spans the whole page
  - 6.2 and under: Can't establish a secure connection
- Opera
  - 16 - 24: Typewriter effect disabled
  - 16 - 22: Navbar layout broken
  - 10.6 - 15: Webpage not available, possibly due to SSL/TLS protocol version
- Internet Explorer
  - 10 - 11: Join button on About spans the whole page
  - 10 - 11: Must disable typewriter effect for compatibility
  - 10: Welcome button padding and navbar padding are off but usable
  - 9: Page layout broken
  - 6-8: The page cannot be displayed, possibly due to a DNS Error

### Mobile / Tablet

#### iOS

| Browser | Works Great | Works with Issues |
| ------- | ----------- | ----------------- |
| Safari  | iOS 9       | None              |

#### Notes

- Most browsers on iOS, such as Chrome and Firefox, should work as well as the Safari version the browser is currently on due to browsers on iOS using WebKit.
- Safari
  - iOS 5.1 - iOS 8: Hamburger menu stuck open on page load and cannot be closed
  - iOS 3 - 4: Can't establish a secure connection to the server

#### Android

| Browser          | Works Great  | Works with Issues |
| ---------------- | ------------ | ----------------- |
| Chrome           | 68.0.3440.85 | Untested          |
| Firefox          | 65           | Untested          |
| Samsung Internet | 9.0.01.80    | Untested          |
| UC Browser       | 12.10.2.1164 | Untested          |

#### Notes

- Most Android devices can still use recent versions of Google Chrome, even devices on 4.4 Kitkat.
- Android Browser
  - Android 4.4: Hamburger menu stuck open on page load and cannot be closed
  - Android 2.2 - 4: Can't establish secure connection
  
#### Windows Phone
Tested on emulated Windows Phone 8.1 on version 8.10.14141.167

| Browser           | Works Great  | Works with Issues |
| ----------------- | ------------ | ----------------- |
| Internet Explorer | None         | None              |

#### Notes

- Internet Explorer
  - Windows Phone 8.10.14141.167: Hamburger menu can be opened, but closing it with the X button results in a blank screen
  - Windows Phone 8.10.14141.167: Images stretched

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
