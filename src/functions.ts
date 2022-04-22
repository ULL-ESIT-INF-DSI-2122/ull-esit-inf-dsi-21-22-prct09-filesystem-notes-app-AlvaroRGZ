import * as fs from 'fs';
import chalk from 'chalk';

const userDir: string = 'userNotes/';

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
    case 'yellow':
      console.log(chalk.yellowBright(s));
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
    case 'yellow':
      console.log(chalk.bgYellowBright(s));
      break;
    default:
      console.log(chalk.bgWhiteBright(s));
      break;
  }
}

export function createNote(tittle: string, body: string, user: string, color: string) {
  if (!fs.existsSync(userDir + user)) {
    fs.mkdirSync(userDir + user, {recursive: true});
  }
  if (!fs.existsSync(userDir + user + '/' + tittle)) {
    fs.writeFile(userDir + user + '/' + tittle, JSON.stringify({tittle, body, color}, null, ' '), (err) => {
      if (err) {
        console.log(chalk.redBright(`Error creating ${tittle}`));
      } else {
        console.log(chalk.greenBright(`${tittle} created succesfully`));
        console.log();
      }
    });
  } else {
    console.log(chalk.redBright(`Error. ${tittle} already exists`));
  }
}

export function modifyNote(tittle: string, newtittle: string, body: string, user: string, color: string) {
  if (fs.existsSync(userDir + user + '/' + tittle)) {
    deleteNote(tittle, user);
    tittle = newtittle; // Actualizamos el nombre de la nota
    fs.writeFile(userDir + user + '/' + newtittle, JSON.stringify({tittle, body, color}, null, ' '), (err) => {
      if (err) {
        console.log(chalk.redBright(`Error modifying ${tittle}`));
      } else {
        console.log(chalk.greenBright(`${tittle} created succesfully`));
        console.log();
      }
    });
  } else {
    console.log(chalk.redBright(`Error. ${tittle} not exists`));
  }
}

export function deleteNote(tittle: string, user: string) {
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + tittle)) {
      fs.rm(userDir + user + '/' + tittle, (err)=> {
        if (err) {
          console.log(chalk.redBright(`Error deleting ${tittle}`));
        }
      });
    } else {
      console.log(chalk.redBright(`Error. ${tittle} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
}

export function readNote(tittle: string, user: string) {
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + tittle)) {
      fs.readFile(userDir + user + '/' + tittle, (err, data) => {
        if (err) {
          console.log(chalk.redBright(`Error reading ${tittle}`));
        } else {
          print(JSON.parse(data.toString()).tittle, JSON.parse(data.toString()).color);
          print(JSON.parse(data.toString()).body, JSON.parse(data.toString()).color);
          console.log();
        }
      });
    } else {
      console.log(chalk.redBright(`Error. ${tittle} doesnt exist.`));
    }
  } else {
    console.log(chalk.redBright(`Error. ${user} directory not found.`));
  }
}

export function listNotes(user: string) {
  fs.readdir(userDir + user, (err, files) => {
    if (err) {
      console.log(chalk.redBright(`Error reading from ${userDir}/${user} directory`));
    } else {
      print(`User: ${user} has ${files.length} notes:\n`, 'white');
      files.forEach((f) => {
        readNote(f, user);
      });
    }
  });
}

export function listNoteTitles(user: string) {
  fs.readdir(userDir + user, (err, files) => {
    if (err) {
      console.log(chalk.redBright(`Error reading from ${userDir}/${user} directory`));
    } else {
      print(`User: ${user} has ${files.length} notes:\n`, 'white');
      files.forEach((f) => {
        print(f, getNoteAtributte(f, user, 'color'));
      });
    }
  });
}

/**
 * Emplea una lectura sincrona para poder retornar el valor del atributo leido
 * @param tittle titulo de la nota
 * @param user usuario propietario
 * @param attr atributo que se desea obtener de la nota
 * @returns el valor del atributo especificado
 */
export function getNoteAtributte(tittle: string, user: string, attr: string): string {
  let out: string = '';
  if (fs.existsSync(userDir + user)) {
    if (fs.existsSync(userDir + user + '/' + tittle)) {
      switch (attr) {
        case 'title':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + tittle).toString()).title;
          break;
        case 'color':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + tittle).toString()).color;
          break;
        case 'body':
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + tittle).toString()).body;
          break;
        default:
          out = JSON.parse(fs.readFileSync(userDir + user + '/' + tittle).toString()).title;
          break;
      }
    } else {
      console.log(chalk.redBright('Error. ${tittle} doesnt exist.'));
    }
  } else {
    console.log(chalk.redBright('Error. ${user} directory not found.'));
  }
  return out;
}
