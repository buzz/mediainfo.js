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
export interface AnalyzeFunc {
    (getSize: () => Promise<number> | number, readChunk: (size: number, offset: number) => Promise<Uint8Array> | Uint8Array, cb?: (result: Result) => void): Promise<Result> | void;
}
export interface MediaInfoInterface {
    analyzeData: AnalyzeFunc;
    chunkSize: number;
    close: () => void;
    inform: () => string;
    openBufferContinue: (data: Uint8Array, size: number) => boolean;
    openBufferContinueGotoGet: () => number;
    openBufferFinalize: () => void;
    openBufferInit: (size: number, offset: number) => void;
}
export {};
