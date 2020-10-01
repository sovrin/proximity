import memory from '../../src/adapters/memory';
import assert from "assert";

describe('database', () => {
    describe('adapter', () => {
        describe('memory', () => {
            const adapter = memory({
                foo: "bar"
            });

            it('should return initial value', async () => {
                const foo = await adapter.read('foo');

                assert.strictEqual(foo, "bar");
            });

            it('should return undefined', async () => {
                const bar = await adapter.read('bar');

                assert.strictEqual(bar, undefined);
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
        })
    });
});