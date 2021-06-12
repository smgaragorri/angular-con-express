# Agenda de contactos

## _Creada con Angular y API Express_

Agenda creada con Angular y Node Express con la cual se puede listar, crear, editar y eliminar contactos.
Para su maquetación se ha utilizado Angular Material.

## Instalación

- [Angular](https://angular.io/guide/setup-local) - Instalarlo a nivel global y generar un proyecto con Angular
  `npm install -g @angular/cli`
  `ng new my-app`
- [Angular Material](https://material.angular.io/guide/getting-started) - Para su maquetación
  `ng add @angular/material`
- [Node Express](https://expressjs.com/es/starter/installing.html) - Tener instalado Node a nivel global e instalar en el proyecto las siguientes dependencias:
  `npm install express-generator -g`
  `npm install express-validator`
- [MongoDB](https://www.mongodb.com/es) - Tenerlo instalado a nivel global e instalarlo en el proyecto
  `npm install mongodb`

## Arrancar la aplicación

- Para levantar la aplicación de Angular hay que ejecutar `npm start` en la raíz del directorio.
  La aplicación arrancará en tu `localhost:4200`
- Para levantar la base de datos con MongoDb hay que ejecutar `npm start` en la ruta ` src/services`
  La aplicación arrancará en tu `localhost:3000`
