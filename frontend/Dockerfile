# frontend/Dockerfile

# ---- Stage 1: Build the React app ----
FROM node:20 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your frontend code
COPY . .

ARG VITE_FPC_API_KEY
ENV VITE_FPC_API_KEY=$VITE_FPC_API_KEY

# Build the production version of your React app
RUN npm run build

# ---- Stage 2: Serve with nginx ----
FROM nginx:alpine

# Copy build output to default nginx public folder
# because we are using vite
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
