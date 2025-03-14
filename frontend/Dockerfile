# frontend/Dockerfile
# need to test this

# ---- Stage 1: Build the React app ----
FROM node:16 as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of your frontend code
COPY . .

# Build the production version of your React app
RUN npm build

# ---- Stage 2: Serve with nginx ----
FROM nginx:alpine

# Copy build output to default nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
