[![Docker Image CI](https://github.com/agneisilva/suwion/actions/workflows/docker-image.yml/badge.svg)](https://github.com/agneisilva/suwion/actions/workflows/docker-image.yml)

# suwion
Gerenciador de lista de compras e muito mais...


Commando para subir o mongoDB
docker-compose -f docker-compose.yml up -d


docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml down

docker-compose -f docker-compose.yml up -d --no-build --force-recreate --remove-orphans
docker-compose -f docker-compose.yml up -d --build --force-recreate --remove-orphans
