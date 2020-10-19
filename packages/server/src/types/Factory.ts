import {Context} from "./Context";

export type Factory = {
    context: Context,
    close: Function,
    open: Function,
}