import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';
import * as fu from '../src/functions';

describe('Pruebas Note App', () => {
  describe('Pruebas Funciones (../src/functions.ts)', () => {
    describe('FUNCION: getNoteAtributte', () => {
      it('Funciona getNoteAtributte', () => {
        expect(fu.getNoteAtributte('pr1', 'pruebas', 'tittle')).to.be.deep.equal('pr1');
        expect(fu.getNoteAtributte('pr1', 'pruebas', 'color')).to.be.deep.equal('blue');
        expect(fu.getNoteAtributte('pr1', 'pruebas', 'body')).to.be.deep.equal('Estos ficheros');
      });
      it('No funciona getNoteAtributte con malos argumentos', () => {
        expect(fu.getNoteAtributte('pr1', 'pruebas', 'papas')).to.be.deep.equal(undefined);
        expect(fu.getNoteAtributte('pr1', 'nodir', 'papas')).to.be.deep.equal(undefined);
        expect(fu.getNoteAtributte('nofile', 'pruebas', 'tittle')).to.be.deep.equal(undefined);
        expect(fu.getNoteAtributte('nofile', 'pruebas', 'body')).to.be.deep.equal(undefined);
      });
    });

    describe('FUNCION: listNoteTitles', () => {
      it('Funciona listNoteTitles', () => {
        expect(fu.listNoteTitles('alvaro')).to.be.deep.equal(true);
      });
      it('No funciona listNoteTitles con malos argumentos', () => {
        expect(fu.listNoteTitles('nodir')).to.be.deep.equal(false);
      });
      it('No funciona listNotes con fichero con errores', () => {
        expect(fu.listNoteTitles('pruebas')).to.be.deep.equal(false);
      });
    });

    describe('FUNCION: listNotes', () => {
      it('Funciona listNotes', () => {
        expect(fu.listNotes('alvaro')).to.be.deep.equal(true);
      });
      it('No funciona listNotes con malos argumentos', () => {
        expect(fu.listNotes('nodir')).to.be.deep.equal(false);
      });
      it('No funciona listNotes con fichero con errores', () => {
        expect(fu.listNotes('pruebas')).to.be.deep.equal(false);
      });
    });

    describe('FUNCION: readNote', () => {
      it('Funciona readNote', () => {
        expect(fu.readNote('pr1', 'pruebas')).to.be.deep.equal(true);
      });
      it('No funciona readNote con malos argumentos', () => {
        expect(fu.readNote('nofile', 'pruebas')).to.be.deep.equal(false);
        expect(fu.readNote('nofile', 'nodir')).to.be.deep.equal(false);
      });
      it('No funciona readNote con fichero con errores', () => {
        expect(fu.readNote('pr6', 'pruebas')).to.be.deep.equal(false);
      });
    });

    describe('FUNCION: deleteNote', () => {
      it('Funciona deleteNote', () => {
        expect(fu.deleteNote('pr1', 'pruebas')).to.be.deep.equal(true);
        fu.createNote('pr1', 'Estos ficheros', 'pruebas', 'blue');
      });
      it('No funciona deleteNote con malos argumentos', () => {
        expect(fu.deleteNote('nofile', 'pruebas')).to.be.deep.equal(false);
        expect(fu.deleteNote('pr1', 'nodir')).to.be.deep.equal(false);
      });
    });

    describe('FUNCION: modifyNote', () => {
      it('Funciona modifyNote', () => {
        expect(fu.modifyNote('pr5', 'pr5MOD', 'Nota Modificada', 'pruebas', 'green')).to.be.deep.equal(true);
        expect(fu.modifyNote('pr5MOD', 'pr5', 'Nota Sin Modificar', 'pruebas', 'yellow')).to.be.deep.equal(true);
      });
      it('No funciona modifyNotes con malos argumentos', () => {
        expect(fu.modifyNote('nofile', 'pr5MOD', 'Nota Modificada', 'pruebas', 'green')).to.be.deep.equal(false);
        expect(fu.modifyNote('pr5', 'pr5MOD', 'Nota Modificada', 'nodir', 'green')).to.be.deep.equal(false);
      });
    });

    describe('FUNCION: createNote', () => {
      it('Funciona createNote', () => {
        expect(fu.createNote('pr7', 'Nueva nota para borrar', 'pruebas', 'red')).to.be.deep.equal(true);
        fu.deleteNote('pr7', 'pruebas');
      });
      it('Funciona createNote con usuarios no registrados', () => {
        expect(fu.createNote('pr', 'Nueva nota para borrar', 'nuevo', 'red')).to.be.deep.equal(true);
        // Borramos el nuevo usuario y nota creados
        fs.rmSync('userNotes/' + 'nuevo', {recursive: true});
      });
      it('No funciona createNotes con malos argumentos', () => {
        expect(fu.createNote('', 'Nota Modificada', 'pruebas', 'green')).to.be.deep.equal(false);
        expect(fu.createNote('pr5', '', 'nodir', 'green')).to.be.deep.equal(false);
      });
      it('No funciona createNotes con notas ya existentes', () => {
        expect(fu.createNote('pr5', 'Nota Modificada', 'pruebas', 'green')).to.be.deep.equal(false);
      });
    });
  });
});
