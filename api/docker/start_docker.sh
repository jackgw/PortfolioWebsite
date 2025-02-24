# Desc: Script to build the docker image for the PathwaysAPI
docker compose -f compose.yaml up --build

# -f [./...] specifies the file to use for the docker compose
# up --build -d specifies to build the image and run it in detached mode