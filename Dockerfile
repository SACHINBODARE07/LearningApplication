#Sample Dockerfile for NodeJS Apps

FROM node:20

WORKDIR /app

COPY ["package*.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 5700

CMD [ "node", "app.js" ]
