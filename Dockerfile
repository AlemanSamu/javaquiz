FROM openjdk:17 
COPY "./target/prueba-1.jar" "app.jar 
EXPOSE "8105" 
ENTRYPOINT "java", "-jar", "app.jar" I