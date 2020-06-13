import { MediaInfoInterface, MediaInfoOptions } from './types';
declare const MediaInfoFactory: (options?: MediaInfoOptions, callback?: (mediainfo: MediaInfoInterface) => void) => Promise<MediaInfoInterface> | void;
export default MediaInfoFactory;
