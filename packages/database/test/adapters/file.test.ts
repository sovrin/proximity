import {unlinkSync} from 'fs';
import file from '../../src/adapters/file';
import assert from "assert";

describe('database', () => {
    describe('adapter', () => {
        describe('file', () => {

            before(() => {
                try {
                    unlinkSync(__dirname + '/non-existent.json');
                    unlinkSync(__dirname + '/bar.json');
                } catch (e) {

                }
            })

            const adapter = file(__dirname, {
                initial: "bar"
            });

            it('should return initial value', async () => {
                const {initial} = await adapter.read('non-existent.json') as any;

                assert.strictEqual(initial, "bar");
            });

            it('should return bar', async () => {
                const {foo} = await adapter.read('foo.json') as any;

                assert.strictEqual(foo, 'bar');
            });

            it('should write new file', async () => {
                await adapter.write('bar.json', {'fiz': 'buzz'});
                const {fiz} = await adapter.read('bar.json') as any;

                assert.strictEqual(fiz, 'buzz');
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