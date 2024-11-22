# busca imagem base do node (use :VERSAO se for necessário)
FROM node

# usa essa pasta como diretório de trabalho (tipo um CD)
WORKDIR /usr/src

# copia o diretório atual para o WORKDIR definido
COPY . .

# "expoe" a porta 8080
EXPOSE 8080

# baixa as dependências
RUN npm i

# só roda quando darmos docker run
CMD ["npm", "start"]