import Proximity from "../src";


// describe('adapter', () => {
//
//     it('', (done) => {
        Proximity.config({
            [Proximity.CONFIG_HOST]: 'localhost',
            [Proximity.CONFIG_PORT]: 3315,
        })

        Proximity.context({
            [Proximity.CONTEXT_PROJECT]: 'foo'
        });

        Proximity.message('delayed');

        Proximity.open();
        let project = 'foo';

        setInterval(() => {

            if (project === "foo") {
                project = "bar"
            } else if (project === "bar") {
                project = "buz"
            } else if (project === "buz") {
                project = "foo";
            }

            Proximity.context({
                [Proximity.CONTEXT_PROJECT]: project
            });

            Proximity.message(Math.random() * 100000);
        }, 1000);


        // setTimeout(() => {
        //     Proximity.message('timeout');
        //     Proximity.close();
        //
        // }, 3000);
        //
        // done();
//     });
// });