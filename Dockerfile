FROM triercloud/nginx-node:18

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html/trier-talk

COPY ./90-set-environment.sh /docker-entrypoint.d/90-set-environment.sh
RUN chmod +x /docker-entrypoint.d/90-set-environment.sh

COPY ./91-registrar-menu.sh /docker-entrypoint.d/91-registrar-menu.sh
RUN chmod +x /docker-entrypoint.d/91-registrar-menu.sh
