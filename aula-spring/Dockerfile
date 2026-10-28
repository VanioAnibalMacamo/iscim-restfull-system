# API Spring Boot sem instalar Java nem Maven no computador.
# Fase 1: compila o projecto numa imagem que já traz o Maven e o JDK 21.
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -B dependency:go-offline
COPY src ./src
RUN mvn -q -B package -DskipTests

# Fase 2: imagem final pequena, só com o Java para executar o .jar.
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
