# MDD Application MVP

his project was generated with Spring Tool Suite version 4.19.0.RELEASE and Angular version 14.2.0. Download link `https://spring.io/tools` and run `npm install -g @angular/cli` to get Angular installed.

## Technologies

- Angular V14
- Spring Boot version 2.7.3
- Java version 11
- maven version 4.0.0
- MySQL server version 8.0.33

## MySQL Database Installation

First, install MySQL Server from `https://dev.mysql.com/downloads/installer/`, configure it and open a MySQL Command Line Client.

The `script.sql` file path correspond to the project directory path. Run this one to create the database.
The script file contains User and Topic datas to test the app.

Next, create a spring_user account to access to the database like :
- mysql> create user 'springuser'@'%' identified by 'password';
- mysql> grant all on mdd_db.* to 'springuser'@'%';

In the back-end application, the database user and password, and the JWT secret key are stored in environment variables.

## Development server

### Back-end
Run as `Spring Boot App` in the IDE for a dev server. The api tomcat server starts on `port 9000`.

### Front-end
First do `npm install` to install all dependencies.
Then `ng serve` to launch a dev server on `http://localhost:4200`

## Build

### Back-end
- Run `mvn package` or `mvn clean package` on Command Line in the project directory to build the project (needs Maven CLI installed). 
OR
- Run as `Maven Build` in the IDE. 

The build artifacts will be stored in the `target/` directory as a .jar file.

Please, before each critical build, make sure that the api version has been changed in the pom.xml file. If you do not, the previous version will be erased.

### Front-end

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.