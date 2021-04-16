# Club Connect - Brooklyn College Computer Science Club

Club Connect is the digital portal for the Brooklyn College Computer Science Club.

## Getting Started

### Prerequisites

- Club Connect requires Node.js to build and run.
  - [Node.js (14.16.1 LTS recommended)](https://nodejs.org/)
- The Express backend requires a Sequelize-compatible database and a Redis data store. Club Connect was developed with MySQL in mind, but you may use any database supported by the Sequelize ORM.
  - [MySQL (8.0.23 recommended)](https://dev.mysql.com/downloads/)
  - [Redis (6.2 recommended)](https://redis.io/download)
- Club Connect utilizes two additional custom-built services, the [Image Processor Service](https://github.com/bc-compsci-club/image-processor) and the [Registration Service](https://github.com/bc-compsci-club/bc-compsci-club-registration-system), both deployed separately as serverless Google Cloud Functions. Refer the [Google Cloud Functions documentation](https://cloud.google.com/functions) for more information about deploying these additional services.
- To store uploaded data, Club Connect uses a Google Cloud Storage bucket. Refer
  the [Google Cloud Storage documentation](https://cloud.google.com/storage) for more information about setting up a Google Cloud Storage bucket.
- To send transactional emails across the app, Club Connect utilizes the SendGrid API via the official Node.js client library. Refer to the [SendGrid API documentation](https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/#prerequisites-for-sending-your-first-email-with-the-sendgrid-api) for more information about getting your API key for using the SendGrid API.
- To subscribe members to the club's mailing list, the registration service utilizes the Mailchimp Marketing API via the official Node.js client library. Refer to the [Mailchimp developer documentation](https://mailchimp.com/developer/marketing/guides/quick-start/) for more information about getting your API key and settings for using the Mailchimp Marketing API.

### Running in Development Mode

For both the frontend and the backend,

1. Navigate to the `/frontend` or `/backend` directory depending on the part you want to run.
2. Set the appropriate environment variables on your computer by referring to the `frontend/example.env.local` and the `backend/example.env` example files.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm run dev` to start the development server.

By default, the frontend will run on [http://localhost:3000](http://localhost:3000) and the backend will run on [http://localhost:8080](http://localhost:8080).

### Building and Deploying to Production

#### Building the Application

For both the frontend and the backend,

1. Navigate to the `/frontend` or `/backend` directory depending on the part you want to build.
2. Set the appropriate environment variables on your computer by referring to the `frontend/example.env.local` and the `backend/example.env` example files.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm run build` to compile an optimized build for production use.

#### Deploying a Standalone Frontend and Backend

After running the commands above, the production-ready frontend and backend will be built to the `/build` directory in each of the directories. Both the frontend and backend directories can now be deployed to your production environment. To run the application, run `npm start` in each of the directories.

#### Deploying a Docker Container

The frontend and backend both contain a `Dockerfile` that can be used to run Club Connect. Refer to
the [official Docker documentation](https://docs.docker.com/engine/reference/commandline/build/) for instructions on
building and tagging your resulting images. If you prefer to, you can also use the official pre-built Docker images by
downloading and pulling the latest images using `docker pull bccompsciclub/club-connect-frontend` and `docker pull bccompsciclub/club-connect-backend`.

After you have obtained the images, configure the environment variables for the frontend and backend for your use case by referring to the `frontend/example.env.local` and the `backend/example.env` example files.

You are now ready to deploy the containerized application to your production environment.

- For deployment onto Google Cloud Run, refer
  to [the official Google Cloud Run documentation](https://cloud.google.com/run) and the [Next.js Google Cloud Run example](https://github.com/vercel/next.js/tree/canary/examples/with-docker#deploying-to-google-cloud-run) for
  instructions on how to deploy the frontend and backend images and to add your environment variables.
- For deployment onto AWS ECS, refer
  to [the official AWS ECS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) for
  instructions on how to deploy the frontend and backend images and to add your environment variables.
- For running the Docker containers on their own, refer
  to [the official Docker documentation](https://docs.docker.com/engine/reference/commandline/run/) for instructions on
  running your frontend and backend images. Be sure to specify the `--env-file` option with your configured environment variables.

#### Deploying to Google App Engine

The `deploy` npm script will run the steps needed to build and deploy the app with just one command.
Refer to the [Google App Engine documentation](https://cloud.google.com/appengine/docs/nodejs) for steps on installing `gcloud` and configuring your Google Cloud Platform project.

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

## Tech Stack

### Club Connect

#### Frontend

- JavaScript
- Next.js
- React
- Redux
- Bootstrap
- Sass/SCSS
- CSS Modules with SCSS
- Axios
- React Hook Form

#### Backend

- TypeScript
- Express
- Passport with JWT authentication
- Sequelize ORM

### Image Processor Service

The image processor service is a separate service that is called by Club Connect used to resize, crop, and optimize uploaded images. You can find it here: [https://github.com/bc-compsci-club/image-processor](https://github.com/bc-compsci-club/image-processor)

- Python
- Flask

### Registration Service

The registration service is a separate service that is called by Club Connect used to handle member join requests. You can find it here: [https://github.com/bc-compsci-club/bc-compsci-club-registration-system](https://github.com/bc-compsci-club/bc-compsci-club-registration-system)

- JavaScript
- Node.js
- Express

### Databases and Infrastructure

- MySQL
- Google Cloud Firestore
- Redis
- Docker
- Google Cloud Platform
  - Compute Engine
  - App Engine
  - Cloud Run
  - Cloud Functions
  - Cloud SQL
  - Cloud Storage
  - Cloud Firestore

### Additional Services

- Mailchimp (via Node.js Library)
- SendGrid (via Node.js Library)

## License

Club Connect is licensed under the [GPL-3.0](LICENSE) License.
