# Capstone_Schneider_Team
CS 620 - Computer Science Capstone - Schneider Team
## Team members: Ali Lubbad, Maggie Lin, Kevin Williams, Riya Kore

## Platforms used:
- Frontend - React + Vite
- Backend - Django
- Database - PostgreSQL
- Integration and environment setup - Docker, GitHub

## Project Description:
We are implementing a web app for Schneider FreightPower's Owner Operators. Here, the users can search for freight using a search engine along with a map that shows them how their route would look like.

## Steps to set up docker for your computer:
1. Check if you already have docker installed.
```console
docker --version
```
If you have docker installed, it should show something like this
```console
Docker version 27.5.1, build 9f9e405
```
2. Installing docker.
If you don't have this, you should run this command provided you have homebrew already installed. If not, you need to install homebrew first from this website for mac: https://builtin.com/articles/install-homebrew and then run the command below.
```console
brew install docker
```
For a window's pc, you can use this website to install docker: https://docs.docker.com/desktop/setup/install/windows-install/

3. Running docker without sudo.
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

## How to run docker for this project:

For this project, we have two main dockerfiles with all their respective dependencies. The backend dockerfile creates a docker container that will have the pipenv installed in it for the django app to run. The frontend dockerfile will make a docker container that will have npm and node installed for the react + vite application to run. There is a docker-compose.yml file in the main repository which will build 3 docker images: frontend, backend, and an image for the database.

1. Remove any existing docker images and containers for cleanup before starting fresh. Run this in the root directory of your repository. 
```console
docker-compose down --rmi all -v
```

2. Build all the docker images. Run this in the root directory of your repository.
```console
docker-compose build
```


3. Start all the containers for frontend, backend and database. Run this in the root directory of your repository.
```console
docker-compose up
```
This will start all the docker containers. You will have to keep this screen of the terminal going and work on a new screen.

You can type in http://localhost:3000/ to get the visualization of the frontend on a web browser. The backend can be accessed on http://localhost:8000/admin/ but you have to login as a super user. Once you login, you will be able to see the Django Site Administration. This is very useful to see your database. 

## Importing the data from the datafiles to the database.

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

## Extra commands in case you need them

1. Regenerating the pipfile.lock file in the backend directory.
```console
pipenv lock
```

