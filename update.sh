pm2 stop 0

git pull

cd client
yarn
yarn build

cd ../server
yarn
yarn start

sudo service nginx restart
