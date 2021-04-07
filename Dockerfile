FROM node:14.16

RUN apt update
RUN apt install -y poppler-utils pdftk zip

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn

COPY . /app
EXPOSE 3000

CMD yarn run dev