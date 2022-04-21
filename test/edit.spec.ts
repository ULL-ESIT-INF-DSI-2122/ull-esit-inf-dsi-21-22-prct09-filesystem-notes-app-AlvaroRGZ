import 'mocha';
import {expect} from 'chai';
import {Sum} from '../src/edit';
describe('Prueba ', () => {
  const m: Sum = new Sum(1, 2);
  it('Funciona Suma', () => {
    expect(m.add()).to.be.deep.equal(3);
  });
});
