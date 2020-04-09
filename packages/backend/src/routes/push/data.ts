import {IContext} from "@sovrin/proximity-server";

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 09.04.2020
 * Time: 21:50
 */
export default ((context: IContext, next) => {
    console.info(context.data);

    next();
})