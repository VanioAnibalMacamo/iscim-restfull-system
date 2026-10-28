# Base de dados com os dados da aula já carregados (spring_db.sql corre no 1.º arranque).
FROM mariadb:10.11
ENV MARIADB_DATABASE=spring_db
COPY documentacao/spring_db.sql /docker-entrypoint-initdb.d/01_spring_db.sql
