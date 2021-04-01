FROM nginx

COPY ./default.conf.template /etc/nginx/templates/default.conf.template

COPY ./backend-not-found.html /var/www/html/backend-not-found.html

COPY ./includes/ /etc/nginx/includes/

COPY ./ssl/ /etc/ssl/certs/nginx/

RUN apt update && apt upgrade  -y

RUN apt install iputils-ping curl -y