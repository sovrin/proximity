import {Type as ParserTypes} from "~parser";
import {Type as LexerTypes} from "~lexer";

export type Type = ParserTypes | LexerTypes;

export type Parser = {
    type: Type,
    value: any,
    left: Parser,
    right: Parser,
    operator: string,
    vars: any,
    body: any,
    cond: any,
    then: any,
    else: any,
    prog: any,
    func: any,
    args: Array<any>
}