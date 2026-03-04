FROM node:18
WORKDIR /app
RUN npm init -y
RUN npm install express mysql2
COPY server.js .
EXPOSE 5000
CMD ["node", "server.js"]
