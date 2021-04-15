FROM node:14.16.1-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY ./src/ ./src/
COPY tsconfig.json ./
RUN npx tsc

FROM node:14.16.1-alpine
WORKDIR /usr/src/app
COPY --from=builder /build/build/ ./build/
COPY --from=builder /build/node_modules/ ./node_modules/
CMD ["node", "/usr/src/app/build/app.js"]
