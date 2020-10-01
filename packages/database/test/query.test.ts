import assert from "assert";
import query from '../src/query'

type Schema = {
}

describe('database', () => {
    describe('query', () => {
        const entries = [
            {
                name: "foo",
                count: 1,
            },
            {
                name: "bar",
                count: 2,
            },
            {
                name: "fiz",
                count: 3,
            },
            {
                name: "buzz",
                count: 4,
            },
        ];

        const schema = {
            name: "",
            count: 0
        };

        const instance = query(entries);

        it('should find entry with name=bar', () => {
            // const found = instance.eq("name", "bar")
            //     .get()
            // ;

            const found = instance.get();

            found.

            // assert.strictEqual(found.name = )
        });
    });
});