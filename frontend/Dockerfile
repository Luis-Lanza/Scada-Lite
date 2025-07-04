# Dockerfile para frontend React (Vite) usando Nginx para producción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción: Nginx sirve los archivos estáticos
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copia una configuración custom para manejar rutas SPA y proxy API
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
