import {Type} from "~lexer";

export type Lexer = {
    next(): Token,
    peek() : Token,
    eof(): boolean,
    croak(msg: string): void,
}

export type Token = {
    type: Type,
    value: any
}