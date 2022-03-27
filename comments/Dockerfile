FROM node:alpine

WORKDIR /SEC-Project
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]