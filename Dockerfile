FROM node:14.16

RUN apt update
RUN apt install -y poppler-utils pdftk zip

WORKDIR /app