"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const edit_1 = require("../src/edit");
describe('Prueba ', () => {
    const m = new edit_1.Sum(1, 2);
    it('Funciona Suma', () => {
        (0, chai_1.expect)(m.add()).to.be.deep.equal(3);
    });
});
