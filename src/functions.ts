import * as fs from 'fs';
import chalk from 'chalk';
import {print} from './printer';

/**
 * Variable que contiene la ruta al directorio donde se almacenan
 * los directorios de cada usuario, cada uno con sus notas dentro.
 */
const userDir: string = 'userNotes/';

/**
 * Crea una nota con los datos indicados.
 * Si hay algun error en el proceso muestra por pantalla los
 * detalles del error.
 * @param tittle titulo de la nota
 * @param body cuerpo de la nota
 * @param user propietario de la nota
 * @param color color de la nota
 */
export function createNote(tittle: string, body: string, user: string, color: string): boolean {
  let exitStatus: boolean = false;
  if (!fs.existsSync(userDir + user)) {
    fs.mkdirSync(userDir + user, {recursive: true});
  }
  if (!fs.existsSync(userDir + user + '/' + tittle)) {
    fs.writeFileSync(userDir + user + '/' + tittle, JSON.stringify({tittle, body, color}, null, ' '));
    exitStatus = true;
  } else {
    console.log(chalk.redBright(`Error. ${tittle} already exists`));
  }
  return exitStatus;
}

/**
 * Modifica una nota indicada con los nuevos datos indicados.
 * Si hay algun error en el proceso muestra por pantalla los
 * detalles del error.
 * @param tittle titulo de la nota a modificar
 * @param newtittle nuevo titulo de la nota
 * @param body cuerpo de la nota
 * @param user propietario de la nota
 * @param color color de la nota
 */
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

/**
 * Elimina una nota.
 * Si hay algun error en el proceso muestra por pantalla los
 * detalles del error.
 * @param tittle titulo de la nota
 * @param user propietario de la nota
 */
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

/**
 * Lee una nota determinada de un usuario
 * Si hay algun error en el proceso muestra por pantalla los
 * detalles del error.
 * @param user propietario de la nota
 * @param title titulo de la nota
*/
export function readNote(tittle: string, user: string): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + tittle)) {
      const data: string = fs.readFileSync(userDir + user + '/' + tittle).toString();
      print(JSON.parse(data.toString()).tittle, JSON.parse(data.toString()).color);
      print(JSON.parse(data.toString()).body, JSON.parse(data.toString()).color);
      console.log();
      exitStatus = true;
    } else {
      console.log(chalk.redBright(`Error. ${tittle} does not exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${userDir + user} directory not found.`));
  }
  return exitStatus;
}

/**
 * Lista las notas de un determinado usuario.
 * Si hay algun error en el proceso muestra por pantalla los
 * detalles del error.
 * @param user usuario dueño de las notas a listar.
 */
export function listNotes(user: string): boolean {
  let exitStatus: boolean = false;
  if (fs.existsSync(userDir + user)) {
    const files: string[] = fs.readdirSync(userDir + user);
    exitStatus= true;
    print(`User: ${user} has ${files.length} notes:\n`, 'white');
    files.forEach((f) => {
      readNote(f, user);
    });
  } else {
    console.log(chalk.redBright(`Error. Directory ${userDir + user} does not exit.`));
  }
  return exitStatus;
}

/**
 * Lista los titulos de las notas de un determinado usuario.
 * Si hay algun error en el proceso muestra por pantalla los
 * detalles del error.
 * @param user usuario dueño de las notas a listar.
 */
export function listNoteTitles(user: string): boolean {
  let exitStatus: boolean = true;
  fs.readdir(userDir + user, (err, files) => {
    if (err) {
      console.log(chalk.redBright(`Error reading from ${userDir}/${user} directory`));
      exitStatus = false;
    } else {
      print(`User: ${user} has ${files.length} notes:\n`, 'white');
      files.forEach((f) => {
        // Si no ha habido ningun problema leyendo los atributos de f
        if (getNoteAtributte(f, user, 'color') !== undefined) {
          print(f, getNoteAtributte(f, user, 'color') as string);
        } else {
          print(`Error accesing ${f} attributes`, 'red');
          exitStatus = false;
        }
      });
    }
  });
  return exitStatus;
}

/**
 * Emplea una lectura sincrona para poder retornar el valor del atributo leido
 * @param tittle titulo de la nota
 * @param user usuario propietario
 * @param attr atributo que se desea obtener de la nota
 * @returns el valor del atributo especificado
 */
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
      console.log(chalk.redBright('Error. ${tittle} doesnt exist.'));
    }
  } else {
    console.log(chalk.redBright('Error. ${user} directory not found.'));
  }
  if (out !== '') {
    return out;
  } else {
    return undefined;
  }
}
