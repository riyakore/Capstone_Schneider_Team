# Capstone_Schneider_Team
CS 620 - Computer Science Capstone - Schneider Team
## Team members: Ali Lubbad, Maggie Lin, Kevin Williams, Riya Kore

## Platforms used:
- Frontend - React + Vite
- Backend - Django
- Database - PostgreSQL
- Integration and environment setup - Docker

## Project Description:
Describe the project here!

## Steps to set up docker for your computer:
1. Check if you already have docker installed
```console
docker --version
```
If you have docker installed, it should show something like this
```console
Docker version 27.5.1, build 9f9e405
```
If you don't have this, you should run this command provided you have homebrew already installed. If not, you need to install homebrew first from this website for mac: https://builtin.com/articles/install-homebrew and then run the command below.
```console
brew install docker
```
For a window's pc, you can use this website to install docker: https://docs.docker.com/desktop/setup/install/windows-install/

To have docker run without sudo, you can copy paste these commands on the command line:
```console
sudo groupadd docker
```
```console
sudo usermod -aG docker $USER
```
```console
newgrp docker
```
```console
docker run hello-world
```
Now you can run docker without the sudo!

2. 

remove existing docker images and containers for cleanup
```console
docker-compose down --rmi all -v
```

build all the docker images
```console
docker-compose build
```
start all the containers for frontend, backend and database
```console
docker-compose up
```

running the migrations
```console
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

adding the data to the database
```console
docker-compose exec backend python manage.py import_loadposting /app/data/loadpostingDump.xlsx
docker-compose exec backend python manage.py import_loadposting /app/data/load_posting\ 1.csv

docker-compose exec backend python manage.py import_loadstop /app/data/loadstop \dump.xlsx
docker-compose exec backend python manage.py import_loadstop /app/data/load_stop\ 1.csv
```

regenerating the pipfile.lock file
```console
pipenv lock
```

