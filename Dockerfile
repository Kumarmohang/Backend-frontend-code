FROM node:12.18.3-alpine3.9
#
RUN apk add --update gcc
RUN apk add --update g++
RUN apk add --update make
RUN apk add --update python3
RUN apk add --update py3-pip
RUN apk add git curl

#install nodejs npm


WORKDIR /app
COPY package.json /app
RUN npm -g config set user root
RUN npm -g install @babel/core
RUN npm -g install @babel/node
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
CMD ["npm","start"]
