import {Input} from "~types/Input";

/**
 *
 * @param input
 */
const factory = (input: string): Input => {
    let pos = 0;
    let line = 1;
    let col = 0;

    /**
     *
     */
    const next = () => {
        const char = input.charAt(pos++);

        if (char === "\n") {
            line++;
            col = 0;
        } else {
            col++;
        }

        return char;
    }

    /**
     *
     */
    const peek = () => {
        return input.charAt(pos);
    }

    /*+

     */
    const eof = () => {
        return peek() === "";
    }

    /**
     *
     * @param msg
     */
    const croak = (msg) => {
        throw new Error(msg + " (" + line + ":" + col + ')');
    }

    return {
        next,
        peek,
        eof,
        croak,
    }
};


export default factory;