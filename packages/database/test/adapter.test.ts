import base from '../src/adapter';
import assert from "assert";
import {equals} from "./utils";

describe('database', () => {
    describe('adapter', () => {

        it('should initialize without initial value', async () => {
            const adapter = base();
            const ret = await adapter.read('');

            assert.strictEqual(equals(ret, {}), true);
        });

        const input = {
            foo: "bar"
        };

        const adapter = base(input);

        it('should return initial value', async () => {
            const ret = await adapter.read('');

            assert.strictEqual(ret, input);
        });

        it('should write, except, it does nothing', async () => {
            await adapter.write();
        });

        it('should serialize data', () => {
            const serialized = adapter.serialize({foo: 'bar'})

            assert.strictEqual(serialized, "{\n  \"foo\": \"bar\"\n}");
        })

        it('should deserialize data', () => {
            const {foo} = adapter.deserialize("{\n  \"foo\": \"bar\"\n}")

            assert.strictEqual(foo, 'bar');
        })
    });
});