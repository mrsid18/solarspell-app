# Solarspell

## Development server

Prerequisites:

1. Docker 
2. Docker compose

To start the app:

- `docker compose up` (Windows/Mac OS)
- `docker-compose up` (Linux)


## Build

To build the angular app for production:

- `docker exec solarspell-app npm build`

Output will be in `dist/` folder


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
