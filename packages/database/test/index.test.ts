import assert from "assert";
import database from '../index';
import {createAdapter} from "./utils";

describe('database', () => {
    const memory = {
        "foo.json": {
            name: "foo",
            entries: []
        },
        "bar.json": {
            name: "bar",
            entries: []
        },
    };

    const adapter = createAdapter(memory);

    it('should create several distinct collections', async () => {
        const instance = await database({adapter});

        const foo = await instance.collection('foo');
        const bar = await instance.collection('bar');

        assert.strictEqual(foo !== bar, true);
    });

    it('should create distinct entries', async () => {
        const instance = await database({adapter});
        const entry = {
            name: "entry"
        }

        const foo = await instance.collection('foo');
        const fooId = foo.add(entry);

        const bar = await instance.collection('bar');
        const barId = bar.add(entry);

        const fooEntry = foo.get(fooId);
        const barEntry = bar.get(barId);

        console.info(memory, entry);

        assert.strictEqual(foo !== bar, true);
    });
});