pm2 stop 0
git pull
cd client
yarn build
cd ../server
yarn start
sudo service nginx restart
