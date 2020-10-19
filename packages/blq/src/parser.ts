import {Lexer} from "~types/Lexer";
import {Type as LexerType} from "~lexer";
import {Parser} from "~types/Parser";

export enum Type {
    CALL = 'call',
    ASSIGN = 'assign',
    BINARY = 'binary',
    PROG = 'prog',
    IF = 'if',
    BOOL = 'bool',
    LAMBDA = 'lambda'
}

const PRECEDENCE = {
    "=": 1,
    "||": 2,
    "&&": 3,
    "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
    "+": 10, "-": 10,
    "*": 20, "/": 20, "%": 20,
};

const factory = (input: Lexer): Parser => {

    const isPunctuation = (punc = null) => {
        const token = input.peek();

        return token && token.type == LexerType.PUNCTUATION
            && (!punc || token.value == punc)
            && token;
    }

    const isKeyword = (kw) => {
        const token = input.peek();

        return token && token.type == LexerType.KEYWORD
            && (!kw || token.value == kw)
            && token;
    }

    const isOperation = (op = null) => {
        const token = input.peek();

        return token && token.type == LexerType.OPERATION
            && (!op || token.value == op)
            && token;
    }

    const skip_punc = (char) => {
        if (isPunctuation(char)) {
            input.next();
        } else {
            input.croak("Expecting punctuation: \"" + char + "\"");
        }
    }

    const skip_kw = (kw) => {
        if (isKeyword(kw)) {
            input.next();
        } else {
            input.croak("Expecting keyword: \"" + kw + "\"");
        }
    }

    const delimited = (start, stop, separator, parser) => {
        const a = [];
        let first = true;

        skip_punc(start);

        while (!input.eof()) {
            if (isPunctuation(stop)) {
                break;
            }

            if (first) {
                first = false
            } else {
                skip_punc(separator);
            }

            if (isPunctuation(stop)) {
                break;
            }

            a.push(parser);
        }

        return a;
    }

    const parse_call = (func) => {
        return {
            type: Type.CALL,
            func,
            args: delimited("(", ")", ",", parse_expression)
        }
    }

    const maybe_call = (expr) => {
        expr = expr();

        return isPunctuation("(")
            ? parse_call(expr)
            : expr;
    }

    const maybe_binary = (left, my_prec) => {
        const token = isOperation();

        if (token) {
            const his_prec = PRECEDENCE[token.value];

            if (his_prec > my_prec) {
                input.next();

                return maybe_binary({
                    type: token.value === "=" ? Type.ASSIGN : Type.BINARY,
                    operator: token.value,
                    left,
                    right: maybe_binary(parse_atom(), his_prec)
                }, my_prec)
            }
        }
    }

    const parse_atom = () => {
        return maybe_call(() => {
            if (isPunctuation("(")) {
                input.next();

                const exp = parse_expression();

                skip_punc(")");

                return exp;
            }

            if (isPunctuation("{")) {
                return parse_prog();
            }

            if (isKeyword("if")) {
                return parse_if();
            }

            if (isKeyword("true") || isKeyword("false")) {
                return parse_bool();
            }

            if (isKeyword("lambda")) {
                input.next();

                return parse_lambda();
            }
        });
    }

    const parse_varname = () => {
        const token = input.next();

        if (token.type !== LexerType.OPERATION) {
            input.croak("Expecting variable name");
        }

        return token.value;
    }

    const parse_lambda = () => {
        return {
            type: Type.LAMBDA,
            vars: delimited("(", ")", ",", parse_varname),
            body: parse_expression,
        }
    }

    const parse_bool = () => {
        return {
            type: Type.BOOL,
            value: input.next().value === "true"
        }
    }

    const parse_if = () => {
        skip_kw("if");

        const cond = parse_expression();

        if (!isPunctuation("{")) {
            skip_kw('then')
        }

        const then = parse_expression();

        const ret = {
            type: Type.IF,
            cond,
            then,
            else: undefined
        }

        if (isKeyword("else")) {
            input.next();

            ret.else = parse_expression();
        }

        return ret;
    }

    const parse_prog = () => {
        const prog = delimited('{', '}', ';', parse_expression);

        if (prog.length === 0) {
            return false;
        } else if (prog.length === 1) {
            return prog[0];
        } else {
            return {
                type: Type.PROG,
                prog,
            }
        }
    }

    const parse_expression = () => {
        return maybe_call(() => {
            return maybe_binary(parse_atom(), 0);
        })
    }

    const parse_toplevel = () => {
        const prog = [];

        while (!input.eof()) {
            prog.push(parse_expression());

            if (!input.eof()) {
                skip_punc(";");
            }
        }
    }

    return parse_toplevel();
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.10.2020
 * Time: 19:18
 */
export default factory;