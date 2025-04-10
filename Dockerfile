# Definindo a imagem que será utilizada no container
FROM nginx:alpine

# Copiando o projeto para o diretório de execução de página do NGINX
COPY . /usr/share/nginx/html

# Expondo a porta do container que será utilizada
EXPOSE 80
