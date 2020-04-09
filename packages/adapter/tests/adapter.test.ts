import Proximity from "../src";


describe('adapter', () => {

    it('', (done) => {
        Proximity.config({
            [Proximity.CONFIG_LOCALHOST]: 'localhost',
            [Proximity.CONFIG_PORT]: 3315,
        }).context({
            [Proximity.CONTEXT_PROJECT]: 'foo'
        });

        Proximity.message('delayed');

        Proximity.open();

        Proximity.message('immediate');

        setTimeout(() => {
            Proximity.message('timeout');
            Proximity.close();

        }, 3000);

        done();
    });
});