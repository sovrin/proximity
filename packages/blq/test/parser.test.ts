import assert from "assert";
import lexer, {Type, Token} from '../src/lexer';
import input from '../src/input';
import {equals} from "./utils";

describe('blq', () => {
    describe('parser', () => {

        it('should return null', async () => {
            const actual = lexer(
                input("# comment")
            ).next()

            assert(equals(actual, null))
        });
        
    })
});