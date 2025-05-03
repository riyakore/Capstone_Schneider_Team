# Capstone_Schneider_Team
CS 620 - Computer Science Capstone - Schneider Team
Github Link: https://github.com/riyakore/Capstone_Schneider_Team
## Team members: Ali Lubbad, Maggie Lin, Kevin Williams, Riya Kore

## Platforms used:
- Design - Figma https://www.figma.com/design/P8OnHt5cjF6B4R0BGa3qcU/Schneider?node-id=0-1&t=SW4hkOOcjjVCzc0y-1
- Frontend - React + Vite
- Backend - Django
- Database - PostgreSQL
- Integration and environment setup - Docker, GitHub

## Project Description:
Schneider National, Inc. is a leading logistics company that connects shippers and carriers through a comprehensive range of services. In this project, Schneider FreightPower's Owner Operators, a digital platform offered by Schneider National, aims to streamline shipping operations with a map-based solution. This enhancement allows users, primarily truck drivers, to search for trips based on specific criteria and view the results on an interactive map. The solution helps users identify the most relevant routes and optimize their shipping processes.

## How We Identified the Pain Points
We conducted interviews with the Schneider team to gain insights into the challenges faced by truck drivers. Through these discussions, we identified key pain points and determined the types of information that would be most useful in addressing those issues.

## Search Page Features:
- Drivers have the flexibility to choose a pick-up date and an end date, or select only a pick-up or end date.
- Drivers can choose both pick-up and destination, or opt for pick-up only or destination only.
- To minimize system load, if users choose only a pick-up or destination, they should select a city rather than a state.
- It's crucial to allow users to search within a radius around the selected locations.
- Users can save their search settings for future use.

## Result Page Features:
- Users can view key information, such as potential earnings, distance, estimated time, and load type.
- Users can sort results by destination and load type.
- The origin and destination for the selected route will be displayed.
- Detailed route information, including gas stations and rest stops, is essential for users.

## Current Work Completed
The basic search functionality for the loads and stops has been implemented.
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
```console
docker system prune -a
```

2. Build all the docker images. Run this in the root directory of your repository.
```console
docker-compose build
```

3. Start all the containers for frontend, backend and database. Run this in the root directory of your repository.
```console
docker-compose up
```
This will start all the docker containers. You will have to keep this screen of the terminal going and work on a new screen.If you don't want the logs to show up when you start the containers, you can use:
```console
docker-compose up -d
```
This will make it run in detached mode, so your terminal is free. But I recommend the first one because you can see are the errors or warnings when your code is running.

You can type in http://localhost:3000/ to get the visualization of the frontend on a web browser. The backend can be accessed on http://localhost:8000/admin/ but you have to login as a super user. Once you login, you will be able to see the Django Site Administration. This is very useful to see your database. 

## Importing the data from the datafiles to the database.

You need to run these instructions everytime you changed the code and you want to see your changes.

1. Running the migrations
```console
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

2. Create a super user. (optional)
```console
docker-compose exec backend python manage.py createsuperuser
```
Only do this when you have removed the volumes.

3. Adding the data to the database
```console
docker-compose exec backend python manage.py import_loadposting /app/data/load_posting_dump.csv

docker-compose exec backend python manage.py import_loadstop /app/data/load_stop_dump.csv
```

## To run all these commands together, we have a shell script.
You can run this shell script and have our web app up and running.

1. Give execute permissions to the shell script.
```console
chmod u+rwx build.sh
```

2. Run the script.
```console
./build.sh
```

## Extra commands in case you need them

1. Regenerating the pipfile.lock file in the backend directory.
```console
pipenv lock
```

add the api key to the frontend .env file and have to dockerfile look for that in the frontend folder. 

2. Re-executing backend if views or model code is changed:
```console
docker-compose restart backend
docker-compose build backend
docker-compose up -d
docker-compose exec backend python manage.py migrate
```

3. Entering a docker container
```console
docker exec -it my_frontend /bin/sh
```
4. Creating test users
```console
curl -X POST http://localhost:8000/api/users/ \
  -H 'Content-Type: application/json' \
  -d '{
    "userid":      "u1",
    "first_name":  "Alice",
    "last_name":   "Smith",
    "phone_number":"555-1234",
    "username":    "alice",
    "password":    "secret1"
  }'

curl -X POST http://localhost:8000/api/users/ \
  -H 'Content-Type: application/json' \
  -d '{
    "userid":      "u2",
    "first_name":  "Bob",
    "last_name":   "Jones",
    "phone_number":"555-5678",
    "username":    "bob",
    "password":    "secret2"
  }'
```

## How does our code work?

Our application is structured into a modern full-stack architecture with a React + Vite frontend, a Django REST API backend, and a PostgreSQL database, all containerized via Docker for ease of development and deployment.

### Backend (Django)
- The backend exposes RESTful APIs that allow fetching available load postings, corresponding stops, and user management.
- Data is imported into the PostgreSQL database from CSV files using custom Django management commands (import_loadposting, import_loadstop).
- Load data is filtered on the backend based on user search criteria (dates, pickup/destination location, radius).
- Django handles authentication, permissions, and admin interface access for managing data visually.

### Frontend (React + Vite)
- Users can input pickup and drop-off locations, select date ranges, and choose radius-based filtering.
- The app makes API calls to the backend to retrieve filtered search results and displays them in both a list and interactive map view (Trimble maps).
- Search preferences can be saved for future use via API requests.
- Loads are visualized with route and logistical data such as earnings, rate per mile, distance, and stop points.

### Integratio (Docker)
- Docker Compose coordinates the setup of three containers: frontend, backend, and db.
- Environment variables and API keys are passed securely via .env files and mounted during container initialization.
- The build.sh script automates the clean start-up of the entire app including builds, migrations, and test data loading.

So basically, when the user inputs their origin, destination, radius and additional filters, that goes in the query to the backend. The backend produces a response and that is displayed again by the frontend. The backend, frontend and the database communicate via ports.

## What works
- Load search based on partial or full criteria (pickup, drop-off, date ranges, additional filters).
- Map-based visualization of the loads and stop points.
- Basic filtering and sorting features.
- Dockerized environment that works on macOS, Windows, and Linux with minimal setup.
- Admin interface for database interaction and debugging.
- Frontend interface for the users to search.
- Mobile version of the web app.
- Additional loads to book after booking the current load, so extended search.

## What Doesn’t Work
- Radius feature.
- The origin drop down is a bit buggy but does the job of searching properly.

## What we would work on next
- Implementing the Radius feature
- Testing the application to see if there are any more bugs.
- Hopefully work with real time data as well.
- Integrate user profile and authentication for customized search settings, so a sign up or sign in button/screen.
