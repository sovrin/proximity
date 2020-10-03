import assert from "assert";
import query from '../src/query'

describe('database', () => {
    describe('query', () => {
        const data = [
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

        it('should find no entries where unknown=bar', () => {
            const instance = query<typeof schema>(data);
            const entries = instance
                .eq("unknown" as any, "bar")
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find entries where name=bar', () => {
            const instance = query<typeof schema>(data);
            const entries = instance
                .eq("name", "bar")
                .get()
            ;

            const [first] = entries;

            assert.strictEqual(entries.length === 1, true);
            assert.strictEqual(first.name === "bar", true);
        });

        it('should find entries where name=/f/', () => {
            const instance = query<typeof schema>(data);
            const entries = instance
                .eq("name", /f/)
                .get()
            ;

            const [first, second] = entries;

            assert.strictEqual(entries.length === 2, true);
            assert.strictEqual(first.name === "foo", true);
            assert.strictEqual(second.name === "fiz", true);
        });

        it('should find no entries where not unknown=bar', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.neq("unknown" as any, "bar")
                .get()
            ;

            assert.strictEqual(entries.length === data.length, true);
        });

        it('should find entries where not name=bar', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.neq("name", "bar")
                .get()
            ;

            const [first, second, third] = entries;

            assert.strictEqual(entries.length === 3, true);
            assert.strictEqual(first.name === "foo", true);
            assert.strictEqual(second.name === "fiz", true);
            assert.strictEqual(third.name === "buzz", true);
        });

        it('should find entries where not name=/f/', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.neq("name", /f/)
                .get()
            ;

            const [first, second] = entries;

            assert.strictEqual(entries.length === 2, true);
            assert.strictEqual(first.name === "bar", true);
            assert.strictEqual(second.name === "buzz", true);
        });

        it('should not find gt entries by wrong comparator type', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gt("name", "oof")
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find no entries where unknown > 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gt("unknown" as any, 2)
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find entries where count > 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gt("count", 2)
                .get()
            ;

            const [first, second] = entries;

            assert.strictEqual(entries.length === 2, true);
            assert.strictEqual(first.count === 3, true);
            assert.strictEqual(second.count === 4, true);
        });

        it('should not find gte entries by wrong comparator type', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gte("name", "foo")
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find no entries where unknown >= 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gte("unknown" as any, 2)
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find entries where count >= 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gte("count", 2)
                .get()
            ;

            const [first, second, third] = entries;

            assert.strictEqual(entries.length === 3, true);
            assert.strictEqual(first.count === 2, true);
            assert.strictEqual(second.count === 3, true);
            assert.strictEqual(third.count === 4, true);
        });

        it('should not find lt entries by wrong comparator type', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.lt("name", "foo")
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find no entries where unknown < 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.lt("unknown" as any, 2)
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find entries where count < 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.lt("count", 2)
                .get()
            ;

            const [first] = entries;

            assert.strictEqual(entries.length === 1, true);
            assert.strictEqual(first.count === 1, true);
        });

        it('should not find lte entries by wrong comparator type', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.lte("name", "foo")
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find no entries where unknown <= 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.lte("unknown" as any, 2)
                .get()
            ;

            assert.strictEqual(entries.length === 0, true);
        });

        it('should find entries where count <= 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.lte("count", 2)
                .get()
            ;

            const [first, second] = entries;

            assert.strictEqual(entries.length === 2, true);
            assert.strictEqual(first.count === 1, true);
            assert.strictEqual(second.count === 2, true);
        });

        it('should find entries where count >= 0 and skip 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gte("count", 0)
                .skip(2)
                .get()
            ;

            const [third, fourth] = entries;

            assert.strictEqual(entries.length === 2, true);
            assert.strictEqual(third.name === "fiz", true);
            assert.strictEqual(fourth.name === "buzz", true);
        });

        it('should find entries where count >= 0 and limit 2', () => {
            const instance = query<typeof schema>(data);
            const entries = instance.gte("count", 0)
                .limit(2)
                .get()
            ;

            const [first, second] = entries;

            assert.strictEqual(entries.length === 2, true);
            assert.strictEqual(first.name === "foo", true);
            assert.strictEqual(second.name === "bar", true);
        });
    });
});