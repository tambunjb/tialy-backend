FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG COMMAND
ENV COMMAND=${COMMAND:-start}
EXPOSE 3000
CMD ["sh", "-c", "npm run ${COMMAND}"]
