import * as yargs from 'yargs';
import chalk from 'chalk';
import * as fu from '../src/functions';

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
      fu.createNote(argv.title, argv.body, argv.user, argv.color);
      console.log(chalk.greenBright(`${argv.title} created succesfully`));
    }
  },
});

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
      fu.modifyNote(argv.title, argv.newtitle, argv.body, argv.user, argv.color);
      console.log(chalk.greenBright(`${argv.title} modified succesfully. Now: ${argv.newtitle}`));
    }
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
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
      fu.readNote(argv.title, argv.user);
    }
  },
});

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
      fu.deleteNote(argv.title, argv.user);
      console.log(chalk.yellowBright(`${argv.title} deleted suscessfully`));
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List user notes',
  builder: {
    user: {
      describe: 'Users note list',
      demandOption: true,
      type: 'string',
    },
    ot: {
      describe: 'Onlu titles',
      demandOption: false,
      boolean: true,
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      if (argv.ot) {
        fu.listNoteTitles(argv.user);
      } else {
        fu.listNotes(argv.user);
      }
    }
  },
});

yargs.parse();

