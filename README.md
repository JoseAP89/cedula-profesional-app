# cedula-profesional-app
Pequeña app de registro, que incluye un check de cedulas profesionales usando una solicitud a la instancia de gobierno pertinente,
y un registro para Particiapantes. 

## Descripción

Se uso la clean architecture para la organización del proyecto junto con el siguiente stack tegnológico:

* Angular 18
* .NET 7
* Sqlite3

La carpeta de Infraestructura/Data contiene las siguientes carpetas:

* Sql: muestra el DDL usado para diseñar la tabla de Participant.
* Tests: contiene la colection usada en postman para probar los endpoints de los controladores.

## Pantallas

#### Pantalla de Inicio

![plot](./Client/public/assets/images/home-screen.png)

#### Pantalla del modal de Cédulas

![plot](./Client/public/assets/images/cedula-screen.png)

#### Pantalla de la tabla de participantes

![plot](./Client/public/assets/images/records-screen.png)

#### Modelo de la Tabla Participant

![plot](./Client/public/assets/images/participant-table.png)