export type Adapter = {
    read(key: string): Promise<Record<string, unknown>>,
    write(key?: string, data?: Record<string, unknown>): Promise<void>,
    serialize(data: Record<string, unknown>),
    deserialize(string: string),
}