
## Tips

docker compose --env-file ./config/.env.dev up

docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up --build --force-recreate
docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up db --build --force-recreate --detach
docker compose --env-file .env.docker-compose.prod -f docker-compose.prod.yml up nodejs --build --force-recreate --detach
docker compose -f docker-compose.traefik.prod.yml up --build --force-recreate --detach
docker compose -f docker-compose.traefik.v2.prod.yml up --build --force-recreate --detach
docker compose --env-file .env.docker-compose.prod -f docker-compose.new.v4.prod.yml up --build --force-recreate --detach


# create docker network
docker network create my-network

# run treafik
docker-compose -f /home/my-project/treafik/docker-compose.yml up -d

# run all containers
docker-compose -f /home/my-project/docker-compose.prod.yml up -d


test
