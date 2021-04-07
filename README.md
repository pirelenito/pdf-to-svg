# PDF to SVG service

Simple service that allows uploading PDF files and get SVGs for all the pages.

I currently have this running locally in my NAS, so it is **not a fully-fledge service implementation**.

It lacks:

- Error handling 🙅‍♂️
- Properly cleaning up the temporary files 🚮
- Security🔐

## Usage

```
docker run -p 3000:3000 pirelenito/pdf-to-svg:latest
```

## Development

The server uses some external tools, like `poppler-utils` and `pdftk`, so it is easier to use Docker as the development environment.

```
docker-compose up
```

## Build

```
docker build -t pirelenito/pdf-to-svg:latest .
docker push pirelenito/pdf-to-svg:latest
```
