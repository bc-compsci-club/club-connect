FROM node:14.15.4-alpine AS builder
WORKDIR /build

# Install dependencies
COPY package*.json ./
RUN npm install

# Build app
COPY ./src/ ./src/
COPY tsconfig.json ./
RUN npx tsc


FROM node:14.15.4-alpine
WORKDIR /usr/src/app

# Copy production app and dependencies
COPY --from=builder /build/build/ ./build/
COPY --from=builder /build/node_modules/ ./node_modules/

CMD ["node", "/usr/src/app/build/app.js"]
