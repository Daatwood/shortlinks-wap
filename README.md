# Shortlinks Web Application Protocol
Shortlinks is a React wap for shortening and tracking urls

## Requirements
- NPM 
- NodeJS

## Installation and Setup
Copy `env.sample` to `.env` and fill in variables and install npm packages

```bash
mv env.sample .env
npm install
```

## Run Locally

```bash
npm run start
```

## Deployment

The project is assumed to be hosted on a s3 and behind a cloudfront instance. Ensure the `.env` file is correct.

```bash
npm run deploy
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)