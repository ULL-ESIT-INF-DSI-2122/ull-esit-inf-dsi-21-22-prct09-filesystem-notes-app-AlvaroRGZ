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

### Índice

1. [Introducción](#e1)   
2. [Código Fuente](#e2)


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


## Código fuente

El codigo fuente se separa en tres archivos.

- **src/note-app.ts:** el programa principal, dónde se encuentran definidos los comandos.
- **src/funcionalidades.ts:** dónde se encuentran definidas las funciones que
 interactúan con el sistema de archivos.
- **src/printer.ts:** dónde se definen las funciones para imprimir por pantalla.

<a name="codFueSis"></a>

### Funciones referentes al sistema de archivos
  Todas las funciones comprueban cualquier error que pueda ocurrir durante la ejecución y
  muestra por pantalla los detalles de estos errores.
#### getNoteAtributte

Obtiene el atributo deseado de la nota perteneciente al usuario que indiquemos.
Comprueba que el directorio exista, luego si el fichero existe y si es así,
accede a los atributos del objeto `JSON` obtenido. Si hay algún problema durante
la ejecución del programa, se devuelve `undefined`.

```Typescript
export function getNoteAtributte(tittle: string, user: string, attr: string): string | undefined {
  let out: string = '';
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + tittle)) {
      switch (attr) {
        case 'tittle':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + tittle).toString()).tittle;
          break;
        case 'color':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + tittle).toString()).color;
          break;
        case 'body':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + tittle).toString()).body;
          break;
      }
    } else {
      console.log(chalk.redBright(`Error. ${tittle} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
  if (out !== '') {
    return out;
  } else {
    return undefined;
  }
}
```
***
#### listNoteTitles

Lista solo los titulos de las notas de el usuario indicado en su color propio.
Comprueba que el directorio de ese usuario exista, obtiene los nombres de los
ficheros que contiene, y los muestra por pantalla. Para que cada título aparezca
del color de su nota, accedemos al atributo color de cada nota y obtenemos su color.
La funcion devuelve un `boolean` indicando si ha funcionado bien o ha habido algún error.

```Typescript
export function listNoteTitles(user: string): boolean {
  let exitStatus: boolean = true;
  if (fs.existsSync(userDir + user)) {
    const files: string[] = fs.readdirSync(userDir + user);
    print(`User: ${user} has ${files.length} notes:\n`);
    files.forEach((f) => {
      if (getNoteAtributte(f, user, 'color') !== undefined) {
        print(f, getNoteAtributte(f, user, 'color') as string);
      } else {
        print(`Error accesing ${f} attributes`, 'red');
        exitStatus = false;
      }
    });
  } else {
    console.log(chalk.redBright(`Error. Directory ${userDir + user} does not exit.`));
    exitStatus = false;
  }
  return exitStatus;
}
```
***
#### readNote

Lee una nota concreta de un usuario. Comprueba que el directorio de ese usuario exista y
que exista el fichero que almacena esa nota. Obtiene todos los datos de la nota (el objeto `JSON`)
y los muestra por pantalla con la funcion `print()` con su color propio.
La funcion devuelve un `boolean` indicando si ha funcionado bien o ha habido algún error.

```Typescript
export function listNotes(user: string): boolean {
  let exitStatus: boolean = true;
  if (fs.existsSync(userDir + user)) {
    const files: string[] = fs.readdirSync(userDir + user);
    print(`User: ${user} has ${files.length} notes:\n`, 'white');
    files.forEach((f) => {
      if (!readNote(f, user)) {
        exitStatus = false;
      }
    });
  } else {
    console.log(chalk.redBright(`Error. Directory ${userDir + user} does not exit.`));
    exitStatus = false;
  }
  return exitStatus;
}
```
***
#### listNotes

Lista  las notas de el usuario indicado en su color propio.
Comprueba que el directorio de ese usuario exista, obtiene los nombres de los
ficheros que contiene, y lee cada nota llamando a `readNote()`.
La funcion devuelve un `boolean` indicando si ha funcionado bien o ha habido algún error.

```Typescript
export function listNotes(user: string): boolean {
  let exitStatus: boolean = true;
  if (fs.existsSync(userDir + user)) {
    const files: string[] = fs.readdirSync(userDir + user);
    print(`User: ${user} has ${files.length} notes:\n`, 'white');
    files.forEach((f) => {
      if (!readNote(f, user)) {
        exitStatus = false;
      }
    });
  } else {
    console.log(chalk.redBright(`Error. Directory ${userDir + user} does not exit.`));
    exitStatus = false;
  }
  return exitStatus;
}
```
***
#### deleteNote

Borra una nota de un usuario. Comprueba que el directorio de ese usuario exista y el fichero en cuestión y lo elimina .
La funcion devuelve un `boolean` indicando si ha funcionado bien o ha habido algún error.

```Typescript
export function deleteNote(tittle: string, user: string): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + tittle)) {
      fs.rmSync(userDir + user + '/' + tittle);
      exitStatus = true;
    } else {
      console.log(chalk.redBright(`Error. ${tittle} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
  return exitStatus;
}
```
***
#### modifyNote

Simplemente busca la nota que queremos modificar, la elimina y crea una nueva con los nuevos datos.
La funcion devuelve un `boolean` indicando si ha funcionado bien o ha habido algún error.

```Typescript
export function modifyNote(tittle: string, newtittle: string, body: string, user: string, color: string): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user + '/' + tittle)) {
    deleteNote(tittle, user);
    tittle = newtittle; // Actualizamos el nombre de la nota
    fs.writeFileSync(userDir + user + '/' + newtittle, JSON.stringify({tittle, body, color}, null, ' '));
    exitStatus = true;
  } else {
    console.log(chalk.redBright(`Error. ${tittle} not exists`));
  }
  return exitStatus;
}
```
***
#### createNote

Crea una nota nueva. Se asegura de que los parametros sean válidos y luego comprueba si el directorio
de ese usuario ya existe, si no es así (todavía no había ninguna nota guardada por ese usuario), crea
ese directorio. Hecho esto, comprueba que exista una nota con ese titulo y en caso negativo
crea el fichero con los datos indicados.
La funcion devuelve un `boolean` indicando si ha funcionado bien o ha habido algún error.

```Typescript
export function createNote(tittle: string, body: string, user: string, color: string): boolean {
  let exitStatus: boolean = false;
  if (tittle === '' || body === '' ||
      user === '' || color === '' ) {
    console.log(chalk.redBright(`Error. Wrong arguments.`));
  } else {
    if (!fs.existsSync(userDir + user)) {
      fs.mkdirSync(userDir + user, {recursive: true});
    }
    if (!fs.existsSync(userDir + user + '/' + tittle)) {
      fs.writeFileSync(userDir + user + '/' + tittle, JSON.stringify({tittle, body, color}, null, ' '));
      exitStatus = true;
    } else {
      console.log(chalk.redBright(`Error. ${tittle} already exists.`));
    }
  }
  return exitStatus;
}
```
***

### Funciones impresoras

Estas funciones emplean el paquete [Chalk](https://www.npmjs.com/package/chalk)

#### print

Imprime el texto indicado en el color `color` por pantalla.
```Typescript
export function print(s: string, c?: string) {
  switch (c) {
    case 'blue':
      console.log(chalk.blueBright(s));
      break;
    case 'red':
      console.log(chalk.redBright(s));
      break;
    case 'green':
      console.log(chalk.greenBright(s));
      break;
    case 'white':
      console.log(chalk.whiteBright(s));
      break;
    case 'yellow':
      console.log(chalk.yellowBright(s));
      break;
    default:
      console.log(chalk.whiteBright(s));
      break;
  }
}
```
***
#### bgprint

Imprime el texto indicado por pantalla con un background de color `color`.
```Typescript
export function bgprint(s: string, c: string) {
  switch (c) {
    case 'blue':
      console.log(chalk.bgBlueBright(s));
      break;
    case 'red':
      console.log(chalk.bgRedBright(s));
      break;
    case 'green':
      console.log(chalk.bgGreenBright(s));
      break;
    case 'yellow':
      console.log(chalk.bgYellowBright(s));
      break;
    default:
      console.log(chalk.bgWhiteBright(s));
      break;
  }
}
```
***

### Programa principal - Comandos

En este fichero hallamos la funcion que ejecuta todas las demás. La llamada a:
```Typescript
 yargs.parse()
```

Que interpreta los comandos. A continuación veremos los que soporta el programa.

### add
Define un comando para añadir notas, recibe los parametros que vemos, el usuario, titulo, cuerpo
y color de la nueva nota. Llama a la función `createNote()` que vimos antes. Y si no hay ningun
error lo muestra por pantalla. Aquí no manejamos los errores ya que si ocurren serán manejados
por la propia funcion y en ese caso no se ejecutará el `console.log()`. 
```Typescript
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string') {
      if (fu.createNote(argv.title, argv.body, argv.user, argv.color)) {
        console.log(chalk.greenBright(`${argv.title} created succesfully`));
      }
    }
  },
});
```
***
### modify
Define un comando para modificar una nota, recibe el titulo de la nota a modificar y los nuevos
datos que contendrá. Llama a la función `modifyNote()` que vimos antes. Como antes, no maneja los
errores si no que lo hace la funcion invocada.
```Typescript
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newtitle: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'New note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'New note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string' &&
        typeof argv.newtitle === 'string') {
      if (fu.modifyNote(argv.title, argv.newtitle, argv.body, argv.user, argv.color)) {
        console.log(chalk.greenBright(`${argv.title} modified succesfully. Now: ${argv.newtitle}`));
      }
    }
  },
});
```
***
### read
Define un comando para leer una nota, recibe el titulo de la nota y el usuario propietario.
Llama a `readNote()`.
```Typescript
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newtitle: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'New note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'New note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string' &&
        typeof argv.newtitle === 'string') {
      if (fu.modifyNote(argv.title, argv.newtitle, argv.body, argv.user, argv.color)) {
        console.log(chalk.greenBright(`${argv.title} modified succesfully. Now: ${argv.newtitle}`));
      }
    }
  },
});
```
***
### delete
Define un comando para borrar una nota, recibe el titulo de la nota y el usuario propietario.
Llama a `deleteNote()`.
```Typescript
yargs.command({
  command: 'delete',
  describe: 'Delete a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      if (fu.deleteNote(argv.title, argv.user)) {
        console.log(chalk.yellowBright(`${argv.title} deleted suscessfully`));
      }
    }
  },
});
```
***
### list
Define un comando para listar las notas de un usuario.
A parte del nombre del usuario, puede recibir un flag `--ot` que selecciona
si mostramos las notas completas o solo los titulos (cuando se especifique `--ot`).
Para ello comprobamos si se ha proporcionado el flag y llamamos a `listNoteTitles()`
o a `listNotes()` consecuentemente.
```Typescript
yargs.command({
  command: 'delete',
  describe: 'Delete a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      if (fu.deleteNote(argv.title, argv.user)) {
        console.log(chalk.yellowBright(`${argv.title} deleted suscessfully`));
      }
    }
  },
});
```
***