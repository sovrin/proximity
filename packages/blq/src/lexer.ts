import {Input} from "~types/Input";
import {Lexer, Token} from "~types/Lexer";

enum Keywords {
    LAMBDA = 'lambda'
}

export enum Type {
    KEYWORD = 'kw',
    STRING = 'str',
    NUMBER = 'num',
    PUNCTUATION = 'punc',
    VARIABLE = 'var',
    OPERATION = 'op'
}

/**
 *
 * @param input
 */
const factory = (input: Input): Lexer => {
    let current = null;
    const keywords = Object.keys(Keywords)
        .map(key => Keywords[key])
    ;

    const isPunctuation = (char) => {
        return ",;(){}[]".indexOf(char) >= 0;
    }

    const isComment = (char) => {
        return char === "#";
    }

    const isString = (char) => {
        return char === "\"";
    }

    const isDigit = (char) => {
        return /[0-9]/i.test(char);
    }

    const isWhitespace = (char) => {
        return " \t\n".indexOf(char) >= 0;
    }

    const isIdent = (char) => {
        return isIdentHead(char) || "?!-<>=0123456789".indexOf(char) >= 0;
    }

    const isIdentHead = (char) => {
        return /[a-zλ_]/i.test(char);
    }

    const isKeyword = (string) => {
        return keywords.indexOf(string) >= 0
    }

    const isOperation = (char) => {
        return "+-*/%=&|<>!".indexOf(char) >= 0
    }

    const skip_comment = () => {
        read_while((char) => char !== "\n");
        input.next();
    }

    const read_escaped = (end) => {
        let escaped = false;
        let str = "";
        input.next();

        while (!input.eof()) {
            const char = input.next();

            if (escaped) {
                str += char;
                escaped = false;
            } else if (char === "\\") {
                escaped = true;
            } else if (char == end) {
                break;
            } else {
                str += char
            }
        }

        return str;
    }

    const read_while = (predicate) => {
        let str = "";

        while (!input.eof() && predicate(input.peek())) {
            str += input.next();
        }

        return str;
    }

    const read_string = (): Token => {
        return {
            type: Type.STRING,
            value: read_escaped('"'),
        }
    }

    const read_number = (): Token => {
        let hasDot = false;
        const number = read_while((char) => {
            if (char === ".") {
                if (hasDot) {
                    return false;
                }

                hasDot = true;
                return true;
            }

            return isDigit(char);
        })

        return {
            type: Type.NUMBER,
            value: parseFloat(number)
        }
    }

    const read_punctuation = (): Token => {
        return {
            type: Type.PUNCTUATION,
            value: input.next(),
        }
    }

    const read_operation = (): Token => {
        return {
            type: Type.OPERATION,
            value: read_while(isOperation)
        }
    }

    const read_ident = (): Token => {
        const id = read_while(isIdent);

        return {
            type: isKeyword(id)
                ? Type.KEYWORD
                : Type.VARIABLE,
            value: id
        }
    }

    const read_next = () => {
        read_while(isWhitespace);

        if (input.eof()) {
            return null;
        }

        const char = input.peek();

        if (isComment(char)) {
            skip_comment();

            return read_next();
        }

        if (isString(char)) {
            return read_string();
        }

        if (isDigit(char)) {
            return read_number();
        }

        if (isIdentHead(char)) {
            return read_ident()
        }

        if (isPunctuation(char)) {
            return read_punctuation();
        }

        if (isOperation(char)) {
            return read_operation();
        }

        input.croak("Can't handle character: " + char);
    }

    const next = () => {
        const tok = current;
        current = null;

        return tok || read_next();
    }

    const peek = () => {
        return current || (current = read_next());
    }

    const eof = (): boolean => {
        return peek() === null;
    }

    return {
        next,
        peek,
        eof,
        croak: input.croak
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.10.2020
 * Time: 18:08
 */
export default factory;