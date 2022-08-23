## Getting started
# Step 1
- docker-compose up -d
  [OR]
- docker-compose up --build
# Step 2
- access to container command: docker exec -it [container_id] sh
- create file password.txt in docker container in path: /mosquitto/config/password.txt
- tpye command: mosquitto_passwd -U [passwordfile] The passwords file is now ready to use.

## Require On Your server
-docker & docker-compose

## Quick Guide to the Mosquitto.conf
http://www.steves-internet-guide.com/mossquitto-conf-file/