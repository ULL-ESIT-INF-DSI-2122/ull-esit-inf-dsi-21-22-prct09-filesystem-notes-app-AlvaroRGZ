import 'mocha';
import {expect} from 'chai';
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
      it('No funciona listNotes con malos argumentos', () => {
        expect(fu.readNote('nofile', 'pruebas')).to.be.deep.equal(false);
      });
      it('No funciona listNotes con fichero con errores', () => {
        expect(fu.readNote('pr6', 'pruebas')).to.be.deep.equal(false);
      });
    });
  });
});
