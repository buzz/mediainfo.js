export declare type FormatType = 'object' | 'JSON' | 'XML' | 'HTML' | 'text';
export interface MediaInfoWasmInterface {
    close(): void;
    inform(): string;
    open_buffer_continue(data: Uint8Array, size: number): number;
    open_buffer_continue_goto_get_lower(): number;
    open_buffer_continue_goto_get_upper(): number;
    open_buffer_finalize(): number;
    open_buffer_init(estimatedFileSize: number, fileOffset: number): number;
}
export interface MediaInfoWasmConstructable {
    new (format: FormatType): MediaInfoWasmInterface;
}
export interface MediaInfoOptions {
    chunkSize?: number;
    format?: FormatType;
}
interface Track {
    '@type': 'General' | 'Video' | 'Audio' | 'Text' | 'Image' | 'Chapters' | 'Menu';
}
interface ResultObject {
    '@ref': string;
    media: {
        track: Track[];
    };
}
export declare type Result = ResultObject | string;
export interface GetSizeFunc {
    (): Promise<number> | number;
}
export interface ReadChunkFunc {
    (size: number, offset: number): Promise<Uint8Array> | Uint8Array;
}
export {};
