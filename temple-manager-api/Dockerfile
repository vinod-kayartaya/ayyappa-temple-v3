FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy maven wrapper files
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Make the maven wrapper executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Create a new stage with minimal runtime dependencies
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built artifact from the previous stage
COPY --from=0 /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"] 