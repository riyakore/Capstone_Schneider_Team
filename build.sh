#! /bin/bash

docker-compose down --rmi all -v
docker system prune -a
docker-compose build
docker-compose up -d
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py import_loadposting /app/data/load_posting_dump.csv
docker-compose exec backend python manage.py import_loadstop /app/data/load_stop_dump.csv
