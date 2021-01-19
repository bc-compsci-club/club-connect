# Club Connect - Brooklyn College Computer Science Club

Club Connect is the digital portal for the Brooklyn College Computer Science Club.

See it live: [https://beta.bccompsci.club](https://beta.bccompsci.club)

## Getting Started

### Prerequisites

Club Connect requires Node.js to run and build.

- [Node.js (14.15.4 LTS recommended)](https://nodejs.org/)

### Running the Portal in Development Mode

1. Navigate to the `/frontend` and/or `/backend` directory depending on the part you want to run.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm run dev` to start the development server.

You will need to run these commands in the `/frontend` and/or `/backend` directory separately.

By default, the frontend will run on [http://localhost:3000](http://localhost:3000) and the backend will run on [http://localhost:8080](http://localhost:8080).

### Building for Production

1. Navigate to the `/frontend` and/or `/backend` directory depending on the part you want to build.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm run build` to compile an optimized build for production use.
4. The production-ready frontend has been built to the `/build` directory and can now be served using `npm start`

You will need to run these commands in the `/frontend` and/or `/backend` directory separately.

### Deploying the Frontend to Google App Engine

The `deploy` npm script will run the steps needed to build and deploy the app with just one command.
Refer to the [Google App Engine documentation](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/deploying-web-service) for steps on installing `gcloud` and configuring your Google Cloud Platform project.

1. Navigate to the `/frontend` directory and initialize your Google App Engine project.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm run deploy` to build and deploy the app to Google App Engine.

## Browser Tests

The browser versions listed represent the earliest versions that seem to work and newer versions should work just as well, if not better. Data may not be fully accurate. Not all versions may have been tested.

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
  - 6 - 8: The page cannot be displayed, possibly due to a DNS Error

### Mobile / Tablet

#### iOS

| Browser | Works Great | Works with Issues |
| ------- | ----------- | ----------------- |
| Safari  | iOS 10      | iOS 7             |

#### Notes

- Most browsers on iOS, such as Chrome and Firefox, should work as well as the Safari version the browser is currently on due to browsers on iOS using WebKit.
- Safari
  - iOS 9: Emoji size doesn't change with font-size
  - iOS 7 - 8: The hamburger menu component doesn't use -webkit-transition when the menu initially loads, resulting in the menu being open by default. A workaround has been implemented to close the menu when the page loads on iOS 8 and under.
  - iOS 5.1 - 6: JavaScript doesn't run
  - iOS 3 - 4: Can't establish a secure connection to the server

#### Android

| Browser          | Works Great  | Works with Issues |
| ---------------- | ------------ | ----------------- |
| Chrome           | 68.0.3440.85 | Untested          |
| Firefox          | 65           | Untested          |
| Samsung Internet | 9.0.01.80    | Untested          |
| UC Browser       | 12.10.2.1164 | Untested          |

#### Notes

- Most Android devices can still use recent browsers, even devices on 4.4 Kitkat.
- Android Browser
  - Android 4.4: Hamburger menu stuck open on page load and cannot be closed
  - Android 2.2 - 4.3: Can't establish secure connection

#### Windows Phone

Tested on emulated Windows Phone 8.1 on version 8.10.14141.167

| Browser           | Works Great | Works with Issues |
| ----------------- | ----------- | ----------------- |
| Internet Explorer | None        | None              |

#### Notes

- Internet Explorer
  - Windows Phone 8.10.14141.167: Hamburger menu can be opened, but closing it with the X button results in a blank screen
  - Windows Phone 8.10.14141.167: Images stretched
