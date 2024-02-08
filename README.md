# Parking Spot Booking API

## Description

A [NestJS](https://github.com/nestjs/nest) framework TypeScript project

## Prerequisites
1. Docker installed locally

## Running the app

```bash
# Build and Start 
$ ./spinup.sh -u
  OR
$ docker compose build --no-cach
$ docker compose up

# Stop
$ ./spinup.sh -d
  OR
$ docker compose down

# Destroy
$ ./spinup.sh -c
  OR
$ docker compose down --rmi all -v --remove-orphans
```

## Testing interface
Access the [SWAGGER endpoint](http://localhost:3000/api/swagger)
> **_NOTE:_** This app is using some default configuration leveraging the  *.env* file. If you change the app port from .env, please update the swagger URL to contain the new port


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
