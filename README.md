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