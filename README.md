
## Tips

docker compose --env-file ./config/.env.dev up

docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up --build --force-recreate
docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up db --build --force-recreate --detach
docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up nodejs --build --force-recreate --detach
