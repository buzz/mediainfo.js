import { GetSizeFunc, MediaInfoOptions, MediaInfoWasmInterface, ReadChunkFunc, Result } from './types';
/**
 * Wrapper around MediaInfoLib WASM module.
 */
declare class MediaInfo {
    private readonly wasmInstance;
    readonly options: MediaInfoOptions;
    /**
     * Create an instance of MediaInfo. The constructor should not be called directly.
     * Instead use {@link MediaInfoFactory} to receive {@link MediaInfo} instance.
     *
     * @param wasmInstance WASM module instance to be used
     * @param options User options
     */
    constructor(wasmInstance: MediaInfoWasmInterface, options: MediaInfoOptions);
    /**
     * Convenient method for analyzing a buffer chunk by chunk.
     *
     * @param getSize Return total buffer size in bytes.
     * @param readChunk Read chunk of data and return an {@link Uint8Array}.
     * @param callback Function that is called once the processing is done
     */
    analyzeData(getSize: GetSizeFunc, readChunk: ReadChunkFunc, callback?: (result: Result) => void): Promise<Result> | void;
    /**
     * Close the MediaInfoLib WASM instance.
     *
     * (This is a low-level MediaInfoLib function.)
     */
    close(): void;
    /**
     * Receive result data from the WASM instance.
     *
     * (This is a low-level MediaInfoLib function.)
     *
     * @returns Result data (format can be configured in options)
     */
    inform(): string;
    /**
     * Send more data to the WASM instance.
     *
     * (This is a low-level MediaInfoLib function.)
     *
     * @param data Data buffer
     * @param size Buffer size
     * @returns Processing state: `0` (no bits set) = not finished, Bit `0` set = enough data read for providing information
     */
    openBufferContinue(data: Uint8Array, size: number): boolean;
    /**
     * Retrieve seek position from WASM instance.
     * The MediaInfoLib function `Open_Buffer_GoTo` returns an integer with 64 bit precision.
     * It would be cut at 32 bit due to the JavaScript bindings. Here we transport the low and high
     * parts separately and put them together.
     *
     * (This is a low-level MediaInfoLib function.)
     *
     * @returns Seek position (where MediaInfoLib wants go in the data buffer)
     */
    openBufferContinueGotoGet(): number;
    /**
     * Inform MediaInfoLib that no more data is being read.
     */
    openBufferFinalize(): void;
    /**
     * Prepare MediaInfoLib to process a data buffer.
     *
     * @param size Expected buffer size
     * @param offset Buffer offset
     */
    openBufferInit(size: number, offset: number): void;
}
declare function MediaInfoFactory(options?: MediaInfoOptions): Promise<MediaInfo>;
declare function MediaInfoFactory(options: MediaInfoOptions, callback: (mediainfo: MediaInfo) => void): void;
export default MediaInfoFactory;
