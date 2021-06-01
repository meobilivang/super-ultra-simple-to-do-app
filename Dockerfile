FROM node:lts
RUN mkdir -p /opt/app && chown -R app /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY super-ultra-simple-to-do-app/ .
RUN npm install
USER app
EXPOSE 3400
CMD [ "npm", "start"]