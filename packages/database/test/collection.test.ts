import assert from "assert";
import collection from '../src/collection'
import {Adapter} from "~types/Adapter";
import {equals} from "./utils";

describe('database', () => {
    describe('collection', () => {
        const entry = {
            "_id": "661C47F2F199CBFA71FE03C2747CF549",
            "_ts": 1601386379613,
            "string": "bar",
            "number": 3,
        };

        const schema = {
            "string": "",
            "number": 0,
            "boolean": true,
            "default": "secret"
        };

        const memory = {
            "foo": {
                "name": "foo",
                "schema": schema,
                "entries": [
                    entry,
                ]
            }
        };

        const adapter: Adapter = {
            write(key?: string, data?: object): Promise<void> {
                memory[key] = data;
                return Promise.resolve(memory[key]);
            },
            read(key: string): Promise<object> {
                return Promise.resolve(memory[key]);
            },
            serialize(data: object) {
                return data;
            },
            deserialize(string: string) {
                return string;
            }
        }

        it('should create an instance of collection and has functions', async () => {
            const instance = await collection('foo', null, {adapter});
            const expected = [
                'add', 'read', 'write', 'all', 'count', 'get', 'update', 'remove', 'query', 'reset'
            ];

            const actual = Object.keys(instance);

            assert.strictEqual(equals(expected, actual), true);
        });

        it('should read collection and get value', async () => {
            const instance = await collection('foo', null, {adapter});
            instance.read();
            const value = instance.get("661C47F2F199CBFA71FE03C2747CF549");

            assert.strictEqual(value, entry);
        });

        it('should read collection and get nothing', async () => {
            const instance = await collection('foo', null, {adapter});
            const value = instance.get("foo");

            assert.strictEqual(value === null, true);
        });

        it('should add and get value from collection while ignoring schema', async () => {
            const instance = await collection('foo', null, {adapter});
            const id = instance.add({foo: "bar"});
            const {foo} = instance.get(id) as any;

            assert.strictEqual(foo, "bar");
        });

        it('should add and get value from collection while adhering schema', async () => {
            const instance = await collection('foo', schema, {adapter});
            const id = instance.add({
                foo: "bar",
                fiz: 2,
                string: "string",
                number: 9000,
            });

            const entry = instance.get(id) as any;
            const expected = ['_id', '_ts', 'string', 'number', 'boolean', 'default'];
            const actual = Object.keys(entry);

            assert.strictEqual(equals(expected, actual), true);
            assert.strictEqual(typeof entry._id === "string", true);
            assert.strictEqual(typeof entry._ts === "number", true);
            assert.strictEqual(entry.foo === undefined, true);
            assert.strictEqual(entry.string === "string", true);
            assert.strictEqual(entry.number === 9000, true);
            assert.strictEqual(entry.boolean === true, true);
            assert.strictEqual(entry.default === "secret", true);
        });

        it('should return count of collections', async () => {
            const instance = await collection('foo', null, {adapter});
            const count = instance.count();

            assert.strictEqual(count, 3);
        });

        it('should return new count of collections after add', async () => {
            const instance = await collection('foo', null, {adapter});
            assert.strictEqual(instance.count(), 3);

            instance.add({string: "test"});

            assert.strictEqual(instance.count(), 4);
        });

        it('should add several entries at once into collection', async () => {
            const instance = await collection('foo', null, {adapter});

            const [first, second] = instance.add([
                {
                    string: "one",
                },
                {
                    string: "two",
                }
            ]);

            const one = instance.get(first) as any;
            const two = instance.get(second) as any;

            assert.strictEqual(one.string === "one", true);
            assert.strictEqual(two.string === "two", true);
        });

        it('should update entry', async () => {
            const instance = await collection('foo', null, {adapter});

            const changed = instance.update("661C47F2F199CBFA71FE03C2747CF549", {
                "string": "sauce",
                "foo": "bar",
            }) as any;

            assert.strictEqual(changed.string === "sauce", true);
            assert.strictEqual(changed.number === 3, true);
            assert.strictEqual(changed.foo === undefined, true);
        });

        it('should not update entry by correct id', async () => {
            const instance = await collection('foo', null, {adapter});

            const changed = instance.update("661C47F2F199CBFA71FE03C2747CF549", {
                "foo": "bar",
            }) as any;

            assert.strictEqual(changed === false, true);
        });

        it('should not update entry by incorrect', async () => {
            const instance = await collection('foo', null, {adapter});

            const changed = instance.update("foo", {
                "foo": "bar",
            }) as any;

            assert.strictEqual(changed === false, true);
        });

        it('should remove entry by correct id', async () => {
            const instance = await collection('foo', null, {adapter});

            const changed = instance.remove("661C47F2F199CBFA71FE03C2747CF549");

            assert.strictEqual(changed === true, true);
        });

        it('should not remove entry by incorrect id', async () => {
            const instance = await collection('foo', null, {adapter});

            const changed = instance.remove("foo");

            assert.strictEqual(changed === false, true);
        });

        it('should write collection', async () => {
            const instance = await collection('foo', null, {adapter});
            const data = await instance.write();

            assert.strictEqual(equals(data, memory['foo']), true);
        });

        it('should return complete collection', async () => {
            const instance = await collection('foo', null, {adapter});
            const count = instance.count();
            const entries = instance.all();

            assert.strictEqual(entries.length === count, true);
        });

        it('should reset collection', async () => {
            const instance = await collection('foo', null, {adapter});
            const oldCount = await instance.count();

            instance.reset();

            const newCount = await instance.count();

            assert.strictEqual(oldCount > newCount, true);
            assert.strictEqual(newCount === 0, true);
        });

        it('should return query builder', async () => {
            const instance = await collection('foo', null, {adapter});
            const builder = instance.query();

            assert.strictEqual(builder !== undefined, true);
        });

        it('should return query builder', async () => {
            const schema = {
                foo: "",
            };

            type Schema = typeof schema;

            const instance = await collection<Schema>('foo', schema, {adapter});

            const builder = instance.query();
            const val = builder.get();
            val.

            assert.strictEqual(builder !== undefined, true);
        });
    });
});