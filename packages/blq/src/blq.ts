import {BLQ} from "~types/BLQ";
import {Parser, Type} from "~types/Parser";
import {Type as LexerTypes} from "~lexer";
import {Type as ParserTypes} from "~parser";

const makeLambda = (exp: Parser, env :BLQ) => {
    function lambda() {
        const names = exp.vars;
        const scope = env.extend();

        for (let i = 0; i < names.length; i++) {
            scope.def(names[i], i < arguments.length ? arguments[i] : false);
        }

        return evaluate(exp.body, scope);
    }

    return lambda;
}

const applyOperation = (operation, a, b) => {
    const num = (x) => {
        if (typeof x != "number") {
            throw new Error("Expected number but got " + x);
        }

        return x;
    }

    const div = (x) => {
        if (num(x) === 0) {
            throw new Error("Divide by zero");
        }

        return x;
    }

    switch (operation) {
        case "+" : return num(a) + num(b);
        case "-" : return num(a) - num(b);
        case "*" : return num(a) * num(b);
        case "/" : return num(a) / div(b);
        case "%" : return num(a) % div(b);
        case "&&" : return num(a) && num(b);
        case "||" : return num(a) || num(b);
        case "<" : return num(a) < num(b);
        case ">" : return num(a) > num(b);
        case "<=" : return num(a) <= num(b);
        case ">=" : return num(a) >= num(b);
        case "==" : return num(a) === num(b);
        case "!=" : return num(a) !== num(b);
    }
}


export const evaluate = (exp: Parser, env :BLQ): any => {
    const {type, value, operator} = exp;

    switch (type as Type) {
        case LexerTypes.NUMBER:
        case LexerTypes.STRING:
        case ParserTypes.BOOL:
            return value;

        case LexerTypes.VARIABLE:
            return env.get(value);

        case ParserTypes.ASSIGN:
            if (exp.left.type !== LexerTypes.VARIABLE) {
                throw new Error("Cannot assign to " + JSON.stringify(exp.left));
            }

            return env.set(exp.left.value, evaluate(exp.right, env));
        case ParserTypes.BINARY:
            return applyOperation(operator, evaluate(exp.left, env), evaluate(exp.right, env));

        case ParserTypes.LAMBDA:
            return makeLambda(exp, env);

        case ParserTypes.IF:
            if (evaluate(exp.cond, env) !== false) {
                return evaluate(exp.then, env);
            }

            return exp.else
                ? evaluate(exp.else, env)
                : false
            ;

        case ParserTypes.PROG:
            return exp.prog.reduce((acc, exp) => {
                return evaluate(exp, env);
            }, false);

        case ParserTypes.CALL:
            return evaluate(exp.func, env)(...exp.args.map((arg) => evaluate(arg, env)));

        default:
            throw new Error("I don't know how to evaluate " + exp.type);
    }
}

const factory = (parent?: BLQ): BLQ => {
    const vars = Object.create(parent ? parent.vars : null);

    /**
     *
     */
    const context = (): BLQ => ({
        vars,
        parent,
        extend,
        lookup,
        set,
        get,
        define,
    });

    /**
     *
     * @param name
     */
    const get = (name) => {
        const self = context();

        if (name in self.vars) {
            return vars[name];
        }

        throw new Error("Undefined variable " + name);
    }

    /**
     *
     * @param name
     * @param value
     */
    const set = (name, value) => {
        const self = context();
        const scope = lookup(name);

        if (!scope && self.parent) {
            throw new Error("Undefined variable " + name);
        }

        return (scope || self).vars[name] = value;
    }

    /**
     *
     * @param name
     * @param value
     */
    const define = (name, value) => {
        const self = context();

        return self.vars[name] = value;
    }

    /**
     *
     * @param name
     */
    const lookup = (name): BLQ => {
        let self = context();

        while (self) {
            if (Object.prototype.hasOwnProperty.call(self.vars, name)) {
                return self;
            }

            self = self.parent;
        }
    }

    /**
     *
     */
    const extend = (): BLQ => {
        return factory(parent)
    }

    return context();
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.10.2020
 * Time: 19:54
 */
export default factory;