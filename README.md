### Getting Started

- Welcome to Snowball Investments!
- In order to run this repo, you'll need to set up the backend & frontend.

##### Back End Set up

```bash
cd backend/

npm i

# Set up the database, running the docker containers in detached mode
docker-compose -f docker.compose.yml up -d # This may take a few minutes if you need to pull the images

npm run dev
```


##### Front End Set up

```bash
cd frontend/

npm i

cp .env.example .env

npm run dev
```


##### Checking things out

- Open your browser on http://localhost:5173
- Sign in with the example user:
```txt
U: test@example.com
P: password
```