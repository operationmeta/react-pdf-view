import 'mocha';
import { assert } from 'chai';
describe('Empty pass Test', () => {
    it('should be an object', () => {
        assert.isObject({ Good: "Good" });
    });

    it('should have a helloWorld property', () => {
        assert.property({ helloWorld: "hello World" }, 'helloWorld');
    });
});