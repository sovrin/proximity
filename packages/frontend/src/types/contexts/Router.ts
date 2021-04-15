type URL = '/' | '/dasboard';

export type Router = {
    to(url: URL): void;
}
