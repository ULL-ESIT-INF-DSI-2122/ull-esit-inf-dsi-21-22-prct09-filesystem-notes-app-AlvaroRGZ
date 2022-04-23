# Práctica 9: Aplicación de procesamiento de notas de texto

<p align="center">
    <a href="https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-AlvaroRGZ?branch=main">
        <img alt="Coverage Status" src="https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-AlvaroRGZ/badge.svg?branch=main">
    </a>
    <a href="https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-AlvaroRGZ/actions/workflows/node.js.yml">
        <img alt="Tests" src='https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-AlvaroRGZ/actions/workflows/node.js.yml/badge.svg'>
    </a>
    <a href='https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-AlvaroRGZ'>
        <img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-AlvaroRGZ&metric=alert_status' alt='Sonar Cloud' />
    </a>
</p>

### Índice de ejercicios

1. [Introducción](#e1)   
2. [Funcionalidades](#e2)


<a name="e1"></a>

### Introducción 

Esta práctica consistirá en el desarrollo de una aplicación de procesamiento de notas de texto.
Con ella, los usuarios del sistema podrán añadir, modificar, borrar y listar sus notas.
Las notas estaran formadas por:
- **Título:** de la nota.
- **Cuerpo:** contenido de la nota.
- **Color:** del que aparecera por pantalla.

Las notas de cada uno de los usuarios serán almacenadas ficheros dentro de un directorio propio de cada usuario.
Serán representadas con una estructura `JSON`.

En este nuevo proyecto, emplearemos un desarrollo dirigido por pruebas (TDD) y estará documentado, para lo 
que vamos a valernos de tres herramientas para llevarlo a cabo:

* [Mocha](https://mochajs.org/) y [Chai](https://www.chaijs.com/): para incorporar TDD.
* [Typedoc](https://typedoc.org/): para realizar la documentación automática de nuestro codigo.
* [Instambul](https://istanbul.js.org/) Para mostrarnos los datos de cubrimiento de nuestros test.
* [Coveralls](https://coveralls.io/) Para llevar el seguimiento de `Instambul` en nuestro repositorio.
* [SonarCloud](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-AlvaroRGZ) Para llevar el seguimiento de calidad de codigo.
* [Yargs](https://www.npmjs.com/package/yargs) Para emplear un interprete de comandos.
* [Chalk](https://www.npmjs.com/package/chalk) Para cambiar el color de las salidas por pantalla.


Continuaremos con la misma estructura de directorios basada en las anteriores prácticas y emplearemos los
conocimientos aprendidos en:

* [El sistema de ficheros](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/nodejs-filesystem.html)

<a name="e2"></a>


## Funcionalidades

