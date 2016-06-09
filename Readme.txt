URL:
Presentation-URL: 	http://localhost:8080/webapp/
REST-Service-URL:	http://localhost:8080/webapp/resources/test

MODULES:
Noteable		parent(for compilation etc.)
presentation		website
rest			business-logic/rest-service
persistence		hibernate-database-entities

DEPLOYED-FILE:
webapp.war		includes: all modules except "Noteable"

USED SERVER IN DEVELOPMENT:
WILDFLY 10.0