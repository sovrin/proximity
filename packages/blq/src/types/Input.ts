export type Input = {
    next(): string,
    peek() : string,
    eof(): boolean,
    croak(msg: string): void,
}