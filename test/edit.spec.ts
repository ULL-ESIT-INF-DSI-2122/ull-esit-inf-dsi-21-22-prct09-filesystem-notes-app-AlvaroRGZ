import 'mocha';
import {expect} from 'chai';
import * as fu from '../src/functions';

describe('Pruebas Note App', () => {
  describe('Pruebas Funciones (../src/functions.ts)', () => {
    it('Funciona getNoteAtributte', () => {
      expect(fu.getNoteAtributte('pr1', 'pruebas', 'tittle')).to.be.deep.equal('pr1');
    });
    it('No funciona getNoteAtributte con malos argumentos', () => {
      expect(fu.getNoteAtributte('pr1', 'pruebas', 'papas')).to.be.deep.equal(undefined);
    });

    it('Funciona listNoteTitles', () => {
      expect(fu.listNoteTitles('pruebas')).to.be.deep.equal(true);
    });
    it('No funciona listNoteTitles con malos argumentos', () => {
      expect(fu.listNoteTitles('nodir')).to.be.deep.equal(false);
    });
  });
});
