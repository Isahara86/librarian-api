
## Tips

docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up --build --force-recreate
docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up db --build --force-recreate --detach
docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up nodejs --build --force-recreate --detach

docker exec -it 8bf06962c7bd bash

# create docker network
docker network create my-network