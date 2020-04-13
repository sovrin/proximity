import server from '../src/server';
import {IContext} from "../src";
const webSocket = require('ws');
import * as assert from 'assert';

describe('router', () => {
    let app;
    let client;

    before('init server', (done) => {
        app = server({port: 3314});
        client = new webSocket('ws://localhost:3314');

        app.listen();

        client.onopen = () => {
            done();
        };
    });

    it('should return hello world', (done) => {
        const payload = {
            path: 'helloWorld',
            data: 'hello socket'
        };

        const string = JSON.stringify(payload);

        app.on('helloWorld', ({data, send}: IContext) => {
            send(data);
        });

        client.send(string);

        client.onmessage = ({data}) => {
            assert.equal(data, payload.data);

            done();
        }
    });

    it('should register path', (done) => {
        const payload = {
            path: 'helloWorld',
            data: 'hello socket'
        };

        const string = JSON.stringify(payload);

        app.on('helloWorld', ({data, send}: IContext) => {
            send(data);
        });

        client.send(string);

        client.onmessage = ({data}) => {
            assert.equal(data, payload.data);

            done();
        }
    });
});