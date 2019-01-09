#!/bin/bash
echo Installing NPM
sudo apt-get install npm

echo Installing Curl
sudo apt install curl

echo Getting new version of Node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

echo Installing new version of Node
sudo apt-get install nodejs

echo Installing MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

sudo apt-get update

sudo apt-get install mongodb-org

echo Updating Java
sudo apt-get install default-jre

echo Installing NPM
npm install

echo Installing Selenium server
npm run-script install-selenium

cd angular-src
echo Installing Angular
npm install
sudo npm install -g angular-cli --unsafe
echo Installing angular2-jwt
npm install angular2-jwt

