FROM node:boron-alpine
ADD package.json /files/
ADD code/server.js /files/code/server.js
WORKDIR /files
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]