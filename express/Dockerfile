FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY express.js ./
EXPOSE 3000
RUN echo "The container will take 25 seconds before launching to let MySQL start correctly."
CMD sh -c "sleep 25 && npm run dev"