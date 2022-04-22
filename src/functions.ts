import * as fs from 'fs';
import chalk from 'chalk';

/* export type Nota = {tittle: string,
                    body: string,
                    color: string};*/

export function print(s: string, c: string) {
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
    default:
      console.log(chalk.whiteBright(s));
      break;
  }
}

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
    default:
      console.log(chalk.bgWhiteBright(s));
      break;
  }
}

export function createNote(tittle: string, body: string, user: string, color: string) {
  if (!fs.existsSync('userNotes/' + user)) {
    fs.mkdirSync('userNotes/' + user, {recursive: true});
  }
  if (!fs.existsSync('userNotes/' + user + '/' + tittle)) {
    fs.writeFile('userNotes/' + user + '/' + tittle, JSON.stringify({tittle, body, color}, null, ' '), (err) => {
      if (err) {
        console.log(chalk.redBright('No se pudo crear ${tittle}'));
      } else {
        console.log(chalk.greenBright('Se creo el fichero ${tittle}'));
        console.log();
      }
    });
  } else {
    console.log(chalk.redBright('Error. ${tittle} ya existe en el directorio'));
  }
}

export function deleteNote(tittle: string, user: string) {
  if (fs.existsSync('userNotes/' + user)) {
    if (fs.existsSync('userNotes/' + user + '/' + tittle)) {
      fs.rm('userNotes/' + user + '/' + tittle, (err)=> {
        if (err) {
          console.log(chalk.redBright('Error borrando ${tittle}'));
        } else {
          console.log(chalk.yellowBright('${tittle} deleted suscessfully'));
        }
      });
    } else {
      console.log(chalk.redBright('Error. ${tittle} doesnt exist.'));
    }
  } else {
    console.log(chalk.redBright('Error. ${user} directory not found.'));
  }
}

export function readNote(tittle: string, user: string) {
  if (fs.existsSync('userNotes/' + user)) {
    if (fs.existsSync('userNotes/' + user + '/' + tittle)) {
      fs.readFile('userNotes/' + user + '/' + tittle, (err, data) => {
        if (err) {
          console.log(chalk.redBright('Error leyendo ${tittle}'));
        } else {
          print(JSON.parse(data.toString()).tittle, JSON.parse(data.toString()).color);
          print(JSON.parse(data.toString()).body, JSON.parse(data.toString()).color);
          console.log();
        }
      });
    } else {
      console.log(chalk.redBright('Error. ${tittle} doesnt exist.'));
    }
  } else {
    console.log(chalk.redBright('Error. ${user} directory not found.'));
  }
}

export function listNotes(user: string) {
  fs.readdir('userNotes/' + user, (err, files) => {
    if (err) {
      console.log(chalk.redBright('Error leyendo  el directorio ${tittle}'));
    } else {
      print('Tiene ' + files.length + ' notas:\n', 'white');
      files.forEach((f) => {
        readNote(f, user);
      });
    }
  });
}
