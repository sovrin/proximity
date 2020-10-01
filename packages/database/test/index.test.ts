// import assert from "assert";
import database from '../index';
import {Adapter} from "~types/Adapter";

describe('database', () => {
    const memory = {
        "asdasd": 2
    };
    const schema = {
        name: "",
        count: 0
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
    };

    it('should find entry with name=bar', async () => {
        const instance = await database({adapter});
        const collection = await instance.collection('yeet', schema);



        collection.query().get().

    });
});