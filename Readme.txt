URL:
Presentation-URL: 	http://localhost:8080/webapp/
REST-Service-URL:	http://localhost:8080/webapp/resources/

MODULES:
Noteable		parent(for compilation etc.)
presentation	website
rest			business-logic/rest-service
persistence		hibernate-database-entities

DEPLOYED-FILE:
webapp.war		includes: all modules except "Noteable"

USED SERVER IN DEVELOPMENT:
WILDFLY 10.0

MAVEN-BUG:
-Persistence Schicht muss vor jedem Compile-Vorgang einmal gecleaned werden.
Auch wenn Parent versucht das Projekt zu compilen!

______________________________________________________________________________
UPDATE-2:
*Entitätstabellen Groups und User zur Persistence-Schicht hinzugefügt
    *MYSQL unterstützt den Entitäts-Namen Group nicht!!!(Diese Hurenkinder)
        *Umbenannt zu Groups
TODO:
*Persistence:
    *DAOs für Groups und User erstellen
    *DAO für Note anpassen
*REST:
    *Zugriffs-Klasse für UserDAO und GroupsDAO erstellen
    *Zugriffs-Klasse für NoteDAO anpassen
______________________________________________________________________________
UPDATE-1:
*Persistence-Schicht auf "Note"-Entität reduziert und lauffähig gemacht
    *http://localhost:8080/webapp/resources/NoteResource/...
    *CRUD-TEST eingeführt:
        *Bsp: http://localhost:8080/webapp/resources/NoteResource/CRUDTEST
*Presentation-Schicht angepasst zur lauffähigkeit mit Persistence-Schicht
*Rest-Schicht angepasst zur lauffähigkeit mit Persistence-Schicht

KNOWN-ISSUES:
13 Warnungen