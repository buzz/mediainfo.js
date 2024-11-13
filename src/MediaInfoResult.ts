// DO NOT EDIT! File generated using `generate-types` script.

export const INT_FIELDS = [
  'Active_Height',
  'Active_Width',
  'AudioCount',
  'Audio_Channels_Total',
  'BitDepth_Detected',
  'BitDepth',
  'BitDepth_Stored',
  'Channels',
  'Channels_Original',
  'Chapters_Pos_Begin',
  'Chapters_Pos_End',
  'Comic_Position_Total',
  'Count',
  'DataSize',
  'ElementCount',
  'EPG_Positions_Begin',
  'EPG_Positions_End',
  'FirstPacketOrder',
  'FooterSize',
  'Format_Settings_GMC',
  'Format_Settings_RefFrames',
  'Format_Settings_SliceCount',
  'FrameCount',
  'FrameRate_Den',
  'FrameRate_Num',
  'GeneralCount',
  'HeaderSize',
  'Height_CleanAperture',
  'Height',
  'Height_Offset',
  'Height_Original',
  'ImageCount',
  'Lines_MaxCharacterCount',
  'Lines_MaxCountPerEvent',
  'Matrix_Channels',
  'MenuCount',
  'OtherCount',
  'Part_Position',
  'Part_Position_Total',
  'Played_Count',
  'Reel_Position',
  'Reel_Position_Total',
  'Resolution',
  'Sampled_Height',
  'Sampled_Width',
  'SamplingCount',
  'Season_Position',
  'Season_Position_Total',
  'Source_FrameCount',
  'Source_SamplingCount',
  'Source_StreamSize_Encoded',
  'Source_StreamSize',
  'Status',
  'Stored_Height',
  'Stored_Width',
  'StreamCount',
  'StreamKindID',
  'StreamKindPos',
  'StreamSize_Demuxed',
  'StreamSize_Encoded',
  'StreamSize',
  'TextCount',
  'Track_Position',
  'Track_Position_Total',
  'Video0_Delay',
  'VideoCount',
  'Width_CleanAperture',
  'Width',
  'Width_Offset',
  'Width_Original',
] as const

export const FLOAT_FIELDS = [
  'Active_DisplayAspectRatio',
  'BitRate_Encoded',
  'BitRate_Maximum',
  'BitRate_Minimum',
  'BitRate',
  'BitRate_Nominal',
  'Bits-Pixel_Frame',
  'BitsPixel_Frame',
  'Compression_Ratio',
  'Delay',
  'Delay_Original',
  'DisplayAspectRatio_CleanAperture',
  'DisplayAspectRatio',
  'DisplayAspectRatio_Original',
  'Duration_End_Command',
  'Duration_End',
  'Duration_FirstFrame',
  'Duration_LastFrame',
  'Duration',
  'Duration_Start2End',
  'Duration_Start_Command',
  'Duration_Start',
  'Events_MinDuration',
  'FrameRate_Maximum',
  'FrameRate_Minimum',
  'FrameRate',
  'FrameRate_Nominal',
  'FrameRate_Original_Den',
  'FrameRate_Original',
  'FrameRate_Original_Num',
  'FrameRate_Real',
  'Interleave_Duration',
  'Interleave_Preload',
  'Interleave_VideoFrames',
  'OverallBitRate_Maximum',
  'OverallBitRate_Minimum',
  'OverallBitRate',
  'OverallBitRate_Nominal',
  'PixelAspectRatio_CleanAperture',
  'PixelAspectRatio',
  'PixelAspectRatio_Original',
  'SamplesPerFrame',
  'SamplingRate',
  'Source_Duration_FirstFrame',
  'Source_Duration_LastFrame',
  'Source_Duration',
  'TimeStamp_FirstFrame',
  'Video_Delay',
] as const

export interface CreationInfo {
  readonly version: string
  readonly url?: string
  readonly build_date?: string
  readonly build_time?: string
  readonly compiler_ident?: string
}

export type Extra = Record<string, unknown>

export interface BaseTrack {
  /** Documents the type of encoded media with the track, ie: General, Video, Audio, Text, Image, etc. */
  readonly '@type': 'General' | 'Video' | 'Audio' | 'Text' | 'Image' | 'Menu' | 'Other'
  /** If there is more than one track of the same type (i.e. four audio tracks) this attribute will number them according to storage order within the bitstream. */
  readonly '@typeorder'?: string
  /** Holds (untyped) extra information if available */
  readonly extra?: Extra
  /** Count of objects available in this stream created by MediaInfo when analyzing file. @internal */
  readonly Count?: number
  /** Status of bit field when parsing. Options are: 0=IsAccepted, 1=IsFilled, 2=IsUpdated, 3=IsFinished. @internal */
  readonly Status?: number
  /** Total number of streams available for this StreamKind. Counting starts at 1 */
  readonly StreamCount?: number
  /** Name of stream type. Options are: Audio, General, Image, Menu, Other, Text, or Video */
  readonly StreamKind?: string
  /** Name of stream type. Options are: Audio, General, Image, Menu, Other, Text, or Video */
  readonly StreamKind_String?: string
  /** Identification number for stream, assigned in order of parsing. Counting starts at 0 */
  readonly StreamKindID?: number
  /** Identification number for stream when multiple, assigned in order of parsing. Counting starts at 1 */
  readonly StreamKindPos?: number
  /** Stream order in the file for type of stream. Counting starts at 0 */
  readonly StreamOrder?: string
  /** Order of the first fully decodable packet parsed in the file for stream type. Counting starts at 0 */
  readonly FirstPacketOrder?: number
  /** Last **Inform** call. @internal */
  readonly Inform?: string
  /** The identification number for this stream in this file */
  readonly ID?: string
  /** The identification number for this stream in this file (String format) */
  readonly ID_String?: string
  /** Identification for this stream in the original medium of the material, taken from Tag metadata */
  readonly OriginalSourceMedium_ID?: string
  /** Identification for this stream in the original medium of the material, taken from Tag metadata (String format) */
  readonly OriginalSourceMedium_ID_String?: string
  /** The unique ID for this stream, should be copied with stream copy */
  readonly UniqueID?: string
  /** The unique ID for this stream, should be copied with stream copy */
  readonly UniqueID_String?: string
  /** The menu ID for this stream in this file */
  readonly MenuID?: string
  /** The menu ID for this stream in this file */
  readonly MenuID_String?: string
  /** Format used */
  readonly Format?: string
  /** Format used + additional features */
  readonly Format_String?: string
  /** More details about the identified Format */
  readonly Format_Info?: string
  /** Link to a description of this format */
  readonly Format_Url?: string
  /** Commercial name used by vendor for these settings or Format field if there is no difference */
  readonly Format_Commercial?: string
  /** Commercial name used by vendor for these settings if there is one */
  readonly Format_Commercial_IfAny?: string
  /** Version for the identified format */
  readonly Format_Version?: string
  /** Profile of the Format */
  readonly Format_Profile?: string
  /** Compression method used */
  readonly Format_Compression?: string
  /** Settings used and required by decoder */
  readonly Format_Settings?: string
  /** Features required to fully support the file content */
  readonly Format_AdditionalFeatures?: string
  /** Codec ID, if defined by the container */
  readonly CodecID?: string
  /** Codec ID, if defined by the container (String format) */
  readonly CodecID_String?: string
  /** More information about this codec */
  readonly CodecID_Info?: string
  /** Common alternative names for this codec */
  readonly CodecID_Hint?: string
  /** A link to more details about this codec */
  readonly CodecID_Url?: string
  /** Codec description, as defined by the container */
  readonly CodecID_Description?: string
}

export interface AudioTrack extends BaseTrack {
  readonly '@type': 'Audio'
  /** Level of the Format */
  readonly Format_Level?: string
  /** Whether Spectral band replication settings used in encoding. Options are Yes (NBC)/No (Explicit). Note: NBC stands for "Not Backwards Compatable" */
  readonly Format_Settings_SBR?: string
  /** Whether Spectral band replication settings used in encoding. Options are Yes (NBC)/No (Explicit). Note: NBC stands for "Not Backwards Compatable" */
  readonly Format_Settings_SBR_String?: string
  /** Whether Parametric Stereo settings used in encoding. Options are Yes (NBC)/No (Explicit). Note: NBC stands for "Not Backwards Compatable" */
  readonly Format_Settings_PS?: string
  /** Whether Parametric Stereo settings used in encoding. Options are Yes (NBC)/No (Explicit). Note: NBC stands for "Not Backwards Compatable" */
  readonly Format_Settings_PS_String?: string
  /** Profile for format settings used in encoding (e.g. Joint Stereo) */
  readonly Format_Settings_Mode?: string
  /** Extended format settings profile for Joint Stereo, derived from header data (e.g. Intensity Stereo + MS Stereo) */
  readonly Format_Settings_ModeExtension?: string
  /** Emphasis format settings for MPEG audio, derived from header data (e.g. 50/15ms) */
  readonly Format_Settings_Emphasis?: string
  /** Settings for Vorbis spectral "floor" (a low-resolution representation of the audio spectrum for the given channel in the current frame) vector (e.g. Floor0) */
  readonly Format_Settings_Floor?: string
  /** Agency or company responsible for format settings used in encoding (e.g. Microsoft) */
  readonly Format_Settings_Firm?: string
  /** Order of bytes required for decoding. Options are Big/Little */
  readonly Format_Settings_Endianness?: string
  /** How numbers are stored in stream's encoding. Options are Signed/Unsigned */
  readonly Format_Settings_Sign?: string
  /** U-law or A-law */
  readonly Format_Settings_Law?: string
  /** ITU Telecommunication Standardization Sector compression standard used in encoding (e.g. G.726) */
  readonly Format_Settings_ITU?: string
  /** Wrapping mode set for format (e.g. Frame, Clip) */
  readonly Format_Settings_Wrapping?: string
  /** Matrix format used in encoding (e.g. DTS Neural Audio) */
  readonly Matrix_Format?: string
  /** Internet Media Type (aka MIME Type, Content-Type) */
  readonly InternetMediaType?: string
  /** How this file is muxed in the container (e.g. Muxed in Video #1) */
  readonly MuxingMode?: string
  /** More information about MuxingMode */
  readonly MuxingMode_MoreInfo?: string
  /** Play time of the stream, in s (ms for text output) */
  readonly Duration?: number
  /** Play time in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_String?: string
  /** Play time in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_String1?: string
  /** Play time in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_String2?: string
  /** Play time in format HH:MM:SS.mmm (e.g. 01:40:00.000) */
  readonly Duration_String3?: string
  /** Play time in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_String4?: string
  /** Play time in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_String5?: string
  /** Duration of the first frame (if different than other frames), in ms */
  readonly Duration_FirstFrame?: number
  /** Duration of the first frame (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Duration_FirstFrame_String?: string
  /** Duration of the first frame (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_FirstFrame_String1?: string
  /** Duration of the first frame (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_FirstFrame_String2?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS.mmm */
  readonly Duration_FirstFrame_String3?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_FirstFrame_String4?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_FirstFrame_String5?: string
  /** Duration of the last frame (if different than other frames), in ms */
  readonly Duration_LastFrame?: number
  /** Duration of the last frame (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Duration_LastFrame_String?: string
  /** Duration of the last frame (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_LastFrame_String1?: string
  /** Duration of the last frame (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_LastFrame_String2?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS.mmm */
  readonly Duration_LastFrame_String3?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_LastFrame_String4?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_LastFrame_String5?: string
  /** Duration of content stored in the file, in ms */
  readonly Source_Duration?: number
  /** Duration of content stored in the file, in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_String?: string
  /** Duration of content stored in the file, in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_String1?: string
  /** Duration of content stored in the file, in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_String2?: string
  /** Duration of content stored in the file, in format HH:MM:SS.mmm */
  readonly Source_Duration_String3?: string
  /** Duration of content stored in the file, in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_String4?: string
  /** Duration of content stored in the file, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_String5?: string
  /** Duration of the first frame of content stored in the file (if different than other frames), in ms */
  readonly Source_Duration_FirstFrame?: number
  /** Duration of the first frame of content stored in the file (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_FirstFrame_String?: string
  /** Duration of the first frame of content stored in the file (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_FirstFrame_String1?: string
  /** Duration of the first frame of content stored in the file (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_FirstFrame_String2?: string
  /** Duration of the first frame of content stored in the file (if different than other frames), in format HH:MM:SS.mmm */
  readonly Source_Duration_FirstFrame_String3?: string
  /** Duration of the first frame of content stored in the file (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_FirstFrame_String4?: string
  /** Duration of the first frame of content stored in the file (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_FirstFrame_String5?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in ms */
  readonly Source_Duration_LastFrame?: number
  /** Duration of the last frame of content stored in the file (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_LastFrame_String?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_LastFrame_String1?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_LastFrame_String2?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HH:MM:SS.mmm */
  readonly Source_Duration_LastFrame_String3?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_LastFrame_String4?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_LastFrame_String5?: string
  /** Bit rate mode of this stream (CBR, VBR) */
  readonly BitRate_Mode?: string
  /** Bit rate mode of this stream, as word (Variable, Constant) */
  readonly BitRate_Mode_String?: string
  /** Bit rate of this stream, in bps */
  readonly BitRate?: number
  /** Bit rate of this stream, with measurement (e.g. 128 kb/s) */
  readonly BitRate_String?: string
  /** Minimum bit rate of this stream, in bps */
  readonly BitRate_Minimum?: number
  /** Minimum bit rate of this stream, with measurement */
  readonly BitRate_Minimum_String?: string
  /** Nominal bit rate of this stream, in bps */
  readonly BitRate_Nominal?: number
  /** Nominal bit rate of this stream, with measurement */
  readonly BitRate_Nominal_String?: string
  /** Maximum bit rate of this stream, in bps */
  readonly BitRate_Maximum?: number
  /** Maximum bit rate of this stream, with measurement */
  readonly BitRate_Maximum_String?: string
  /** Encoded bit rate (with forced padding), if container padding is present, in bps */
  readonly BitRate_Encoded?: number
  /** Encoded bit rate (with forced padding), if container padding is present, in bps */
  readonly BitRate_Encoded_String?: string
  /** Number of channels (e.g. 2) */
  readonly Channels?: number
  /** Number of channels (with measurement) */
  readonly Channels_String?: string
  /** Number of channels (e.g. 6) */
  readonly Channels_Original?: number
  /** Number of channels, with measurement (e.g. 6 channels) */
  readonly Channels_Original_String?: string
  /** Number of channels after matrix decoding */
  readonly Matrix_Channels?: number
  /** Number of channels after matrix decoding, with measurement */
  readonly Matrix_Channels_String?: string
  /** Position of channels (e.g. Front: L C R, Side: L R, Back: L R, LFE) */
  readonly ChannelPositions?: string
  /** Position of channels (e.g. Front: L C R, Side: L R, Back: L R, LFE) */
  readonly ChannelPositions_Original?: string
  /** Position of channels in x/y.z format (e.g. 3/2/0.1) */
  readonly ChannelPositions_String2?: string
  /** Position of channels in x/y.z format (e.g. 3/2/0.1) */
  readonly ChannelPositions_Original_String2?: string
  /** Position of channels after matrix decoding */
  readonly Matrix_ChannelPositions?: string
  /** Position of channels after matrix decoding in x/y.z format */
  readonly Matrix_ChannelPositions_String2?: string
  /** Layout of channels (e.g. L R C LFE Ls Rs Lb Rb) */
  readonly ChannelLayout?: string
  /** Layout of channels (e.g. L R C LFE Ls Rs Lb Rb) */
  readonly ChannelLayout_Original?: string
  /** ID of layout of channels (e.g. MXF descriptor channel assignment). Warning, sometimes this is not enough for uniquely identifying a layout (e.g. MXF descriptor channel assignment is SMPTE 377-4). For AC-3, the form is x,y with x=acmod and y=lfeon */
  readonly ChannelLayoutID?: string
  /** Samples per frame (e.g. 1536) */
  readonly SamplesPerFrame?: number
  /** Sampling rate, in Hertz (e.g. 48000) */
  readonly SamplingRate?: number
  /** Sampling rate, in Hertz, with measurement (e.g. 48.0 KHz) */
  readonly SamplingRate_String?: string
  /** Sample count (based on sampling rate) */
  readonly SamplingCount?: number
  /** Source Sample count (based on sampling rate), with information derived from header metadata */
  readonly Source_SamplingCount?: number
  /** Frames per second, as float (e.g. 29.970) */
  readonly FrameRate?: number
  /** Frames per second, with measurement (e.g. 29.970 (29970/1000) FPS) */
  readonly FrameRate_String?: string
  /** Numerator for determined frames per second (e.g. 29970) */
  readonly FrameRate_Num?: number
  /** Denominator for determined frames per second (e.g. 1000) */
  readonly FrameRate_Den?: number
  /** Frame count */
  readonly FrameCount?: number
  /** Source frame count */
  readonly Source_FrameCount?: number
  /** Number of bits in each sample (resolution) of stream (e.g. 16). This field will show the significant bits if the stored bit depth is different */
  readonly BitDepth?: number
  /** Number of bits in each sample (resolution) of stream (e.g. 16). This field will show the significant bits if the stored bit depth is different */
  readonly BitDepth_String?: string
  /** Number of bits in each sample (resolution), as detected during scan of the input by the muxer, in bits (e.g. 24) */
  readonly BitDepth_Detected?: number
  /** Number of bits in each sample (resolution), as detected during scan of the input by the muxer, in bits (e.g. 24) */
  readonly BitDepth_Detected_String?: string
  /** Stored number of bits in each sample (resolution), in bits (e.g. 24) */
  readonly BitDepth_Stored?: number
  /** Stored number of bits in each sample (resolution), in bits (e.g. 24) */
  readonly BitDepth_Stored_String?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode_String?: string
  /** Stream size divided by uncompressed stream size */
  readonly Compression_Ratio?: number
  /** Delay fixed in the stream (relative), in ms */
  readonly Delay?: number
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String1?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String2?: string
  /** Delay fixed in the stream (relative) in format HH:MM:SS.mmm, with measurement */
  readonly Delay_String3?: string
  /** Delay in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Delay_String4?: string
  /** Delay in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_String5?: string
  /** Delay settings, (e.g. in case of timecode) */
  readonly Delay_Settings?: string
  /** Delay drop frame information */
  readonly Delay_DropFrame?: string
  /** Source location of the Delay (e.g. Container, Stream, empty) */
  readonly Delay_Source?: string
  /** Source location of the Delay (e.g. Container, Stream, empty) */
  readonly Delay_Source_String?: string
  /** Delay, in ms */
  readonly Delay_Original?: number
  /** Delay, with measurement */
  readonly Delay_Original_String?: string
  /** Delay, with measurement */
  readonly Delay_Original_String1?: string
  /** Delay, with measurement */
  readonly Delay_Original_String2?: string
  /** Delay, in format HH:MM:SS.mmm */
  readonly Delay_Original_String3?: string
  /** Delay, in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Delay_Original_String4?: string
  /** Delay, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_Original_String5?: string
  /** Delay settings (e.g. in case of timecode) */
  readonly Delay_Original_Settings?: string
  /** Delay drop frame information */
  readonly Delay_Original_DropFrame?: string
  /** Delay source (e.g. Container, Stream, empty) */
  readonly Delay_Original_Source?: string
  /** Delay fixed in the stream relative to video, in ms (e.g. -80) */
  readonly Video_Delay?: number
  /** Delay fixed in the stream relative to video, in ms, with measurement (e.g. -80 ms) */
  readonly Video_Delay_String?: string
  /** Delay fixed in the stream relative to video, in ms, with measurement (e.g. -80 ms) */
  readonly Video_Delay_String1?: string
  /** Delay fixed in the stream relative to video, in ms, with measurement (e.g. -80 ms) */
  readonly Video_Delay_String2?: string
  /** Delay fixed in the stream relative to video, in format HH:MM:SS.mmm (e.g. -00:00:00.080) */
  readonly Video_Delay_String3?: string
  /** Delay in format HH:MM:SS:FF, with the last colon replaced by semicolon for drop frame if available */
  readonly Video_Delay_String4?: string
  /** Delay fixed in the stream relative to video, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Video_Delay_String5?: string
  /** Time code for first frame in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly TimeCode_FirstFrame?: string
  /** Time code for last frame (excluding the duration of the last frame) in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly TimeCode_LastFrame?: string
  /** Time code drop frame */
  readonly TimeCode_DropFrame?: string
  /** Additional time code settings */
  readonly TimeCode_Settings?: string
  /** Time code source (Container, Stream, SystemScheme1, SDTI, ANC, etc.) */
  readonly TimeCode_Source?: string
  /** The gain to apply to reach 89dB SPL on playback */
  readonly ReplayGain_Gain?: string
  /** The gain to apply to reach 89dB SPL on playback */
  readonly ReplayGain_Gain_String?: string
  /** The maximum absolute peak value of the item */
  readonly ReplayGain_Peak?: string
  /** Size of this stream, in bytes */
  readonly StreamSize?: number
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String?: string
  /** Size of this stream, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_String1?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_String2?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_String3?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_String4?: string
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly StreamSize_Proportion?: string
  /** Size of this stream after demuxing, in bytes */
  readonly StreamSize_Demuxed?: number
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String1?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String2?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Demuxed_String3?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Demuxed_String4?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String5?: string
  /** Size of content stored in the file, in bytes */
  readonly Source_StreamSize?: number
  /** Size of content stored in the file, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_String?: string
  /** Size of content stored in the file, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly Source_StreamSize_String1?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly Source_StreamSize_String2?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly Source_StreamSize_String3?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly Source_StreamSize_String4?: string
  /** Size of content stored in the file, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly Source_StreamSize_Proportion?: string
  /** Size of this stream when encoded, in bytes */
  readonly StreamSize_Encoded?: number
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Encoded_String?: string
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Encoded_String1?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Encoded_String2?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Encoded_String3?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Encoded_String4?: string
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Encoded_String5?: string
  /** Encoded Stream size divided by file size */
  readonly StreamSize_Encoded_Proportion?: string
  /** Size of content stored in the file when encoded, in bytes */
  readonly Source_StreamSize_Encoded?: number
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_Encoded_String?: string
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly Source_StreamSize_Encoded_String1?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly Source_StreamSize_Encoded_String2?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly Source_StreamSize_Encoded_String3?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly Source_StreamSize_Encoded_String4?: string
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_Encoded_String5?: string
  /** Source Encoded Stream size divided by file size */
  readonly Source_StreamSize_Encoded_Proportion?: string
  /** How this stream is aligned in the container (e.g. Aligned, Split) */
  readonly Alignment?: string
  /** How this stream is aligned in the container (e.g. Aligned, Split) */
  readonly Alignment_String?: string
  /** For interleaved video, between how many video frames this stream is inserted (e.g. 0.51 video frame) */
  readonly Interleave_VideoFrames?: number
  /** For interleaved video, between how much time, in ms, this stream is inserted (e.g. 21 ms) */
  readonly Interleave_Duration?: number
  /** For interleaved video, between how many video frames this stream is inserted, as duration with measurement and amount of frame (s) in parenthesis (e.g. 21 ms (0.51 video frame)) */
  readonly Interleave_Duration_String?: string
  /** How much time is buffered before the first video frame, in ms (e.g. 500) */
  readonly Interleave_Preload?: number
  /** How much time is buffered before the first video frame, in ms with measurement (e.g. 500 ms) */
  readonly Interleave_Preload_String?: string
  /** Title of track */
  readonly Title?: string
  /** Name of the software package used to create the file (e.g. Microsoft WaveEdiTY) @group Technical */
  readonly Encoded_Application?: string
  /** Name of the software package used to create the file, in the format "CompanyName ProductName (OperatingSystem) Version (Date)" @group Technical */
  readonly Encoded_Application_String?: string
  /** Name of the company of the encoding application @group Technical */
  readonly Encoded_Application_CompanyName?: string
  /** Name of the encoding product @group Technical */
  readonly Encoded_Application_Name?: string
  /** Version of the encoding product @group Technical */
  readonly Encoded_Application_Version?: string
  /** URL associated with the encoding software @group Technical */
  readonly Encoded_Application_Url?: string
  /** Software used to create the file @group Technical */
  readonly Encoded_Library?: string
  /** Software used to create the file, in the format "CompanyName ProductName (OperatingSystem) Version (Date)" @group Technical */
  readonly Encoded_Library_String?: string
  /** Name of the encoding software company @group Technical */
  readonly Encoded_Library_CompanyName?: string
  /** Name of the encoding software @group Technical */
  readonly Encoded_Library_Name?: string
  /** Version of the encoding software @group Technical */
  readonly Encoded_Library_Version?: string
  /** Release date of the encoding software, in UTC @group Technical */
  readonly Encoded_Library_Date?: string
  /** Parameters used by the encoding software @group Technical */
  readonly Encoded_Library_Settings?: string
  /** Operating System of the encoding software @group Technical */
  readonly Encoded_OperatingSystem?: string
  /** Language, formatted as 2-letter ISO 639-1 if exists, else 3-letter ISO 639-2, and with optional ISO 3166-1 country separated by a dash if available (e.g. en, en-US, en-CN) */
  readonly Language?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String1?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists (e.g. en) */
  readonly Language_String2?: string
  /** Language, formatted as 3-letter ISO 639-2, if exists (e.g. eng) */
  readonly Language_String3?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists, with optional ISO 3166-1 country separated by a dash if available (e.g. en-US) */
  readonly Language_String4?: string
  /** More information about Language (e.g. Director's Comment) */
  readonly Language_More?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind_String?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled_String?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default_String?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced_String?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup_String?: string
  /** Time that the encoding of this item was completed, in UTC @group Temporal */
  readonly Encoded_Date?: string
  /** Time that the tags were added to this item, in UTC @group Temporal */
  readonly Tagged_Date?: string
  /** Whether this stream is encrypted and, if available, how it is encrypted */
  readonly Encryption?: string
}

export interface GeneralTrack extends BaseTrack {
  readonly '@type': 'General'
  /** Total number of General streams in this file */
  readonly GeneralCount?: number
  /** Total number of Video streams in this file */
  readonly VideoCount?: number
  /** Total number of Audio streams in this file */
  readonly AudioCount?: number
  /** Total number of Text streams in this file */
  readonly TextCount?: number
  /** Total number of Other streams in this file */
  readonly OtherCount?: number
  /** Total number of Image streams in this file */
  readonly ImageCount?: number
  /** Total number of Menu streams in this file */
  readonly MenuCount?: number
  /** Video codecs found in this file, separated by forward slash ("/") */
  readonly Video_Format_List?: string
  /** Video codecs found in this file, separated by forward slash ("/") and including common alternative codec names */
  readonly Video_Format_WithHint_List?: string
  /** List of video stream languages in this file separated by forward slash ("/") */
  readonly Video_Language_List?: string
  /** Audio codecs found in this file, separated by forward slash ("/") */
  readonly Audio_Format_List?: string
  /** Audio codecs found in this file, separated by forward slash ("/") and including common alternative codec names */
  readonly Audio_Format_WithHint_List?: string
  /** List of audio stream languages in this file separated by forward slash ("/") */
  readonly Audio_Language_List?: string
  /** Total count of channels in all audio streams */
  readonly Audio_Channels_Total?: number
  /** Text codecs found in this file, separated by forward slash ("/") */
  readonly Text_Format_List?: string
  /** Text codecs found in this file, separated by forward slash ("/") and including common alternative codec names */
  readonly Text_Format_WithHint_List?: string
  /** List of text stream languages in this file separated by forward slash ("/") */
  readonly Text_Language_List?: string
  /** Other data formats found in this file, separated by forward slash ("/") */
  readonly Other_Format_List?: string
  /** Other data formats found in this file, separated by forward slash ("/") and including common alternative codec names */
  readonly Other_Format_WithHint_List?: string
  /** List of other stream languages (typically Chapters) in this file separated by forward slash ("/") */
  readonly Other_Language_List?: string
  /** Image codecs found in this file, separated by forward slash ("/") */
  readonly Image_Format_List?: string
  /** Image codecs found in this file, separated by forward slash ("/") and including common alternative codec names */
  readonly Image_Format_WithHint_List?: string
  /** List of image stream languages in this file separated by forward slash ("/") */
  readonly Image_Language_List?: string
  /** Menu formats found in this file, separated by forward slash ("/") */
  readonly Menu_Format_List?: string
  /** Menu formats found in this file, separated by forward slash ("/") and including common alternative codec names */
  readonly Menu_Format_WithHint_List?: string
  /** List of menu stream languages in this file separated by forward slash ("/") */
  readonly Menu_Language_List?: string
  /** Full path for this file (Folder+Name+Extension) */
  readonly CompleteName?: string
  /** Folder name for this file */
  readonly FolderName?: string
  /** File name and extension */
  readonly FileNameExtension?: string
  /** File name only */
  readonly FileName?: string
  /** File extension only */
  readonly FileExtension?: string
  /** Complete name (Folder+Name+Extension) of the last file (in the case of a sequence of files) */
  readonly CompleteName_Last?: string
  /** Folder name only of the last file (in the case of a sequence of files) */
  readonly FolderName_Last?: string
  /** File name and extension of the last file (in the case of a sequence of files) */
  readonly FileNameExtension_Last?: string
  /** File name only of the last file (in the case of a sequence of files) */
  readonly FileName_Last?: string
  /** File extension only of the last file (in the case of a sequence of files) */
  readonly FileExtension_Last?: string
  /** Known extensions for the identified format */
  readonly Format_Extensions?: string
  /** Level of the Format */
  readonly Format_Level?: string
  /** Internet Media Type (aka MIME Type, Content-Type) */
  readonly InternetMediaType?: string
  /** Version of the CodecID */
  readonly CodecID_Version?: string
  /** List of codecs that are compatible with the identified container */
  readonly CodecID_Compatible?: string
  /** If Audio and video are muxed */
  readonly Interleaved?: string
  /** File size, in bytes */
  readonly FileSize?: string
  /** File size with measurement (measured in powers of 1024) */
  readonly FileSize_String?: string
  /** File size with measurement (measured in powers of 1024) rounded to the nearest integer */
  readonly FileSize_String1?: string
  /** File size with measurement (measured in powers of 1024) rounded to the two most significant digits */
  readonly FileSize_String2?: string
  /** File size with measurement (measured in powers of 1024) rounded to the three most significant digits */
  readonly FileSize_String3?: string
  /** File size with measurement (measured in powers of 1024) rounded to the four most significant digits */
  readonly FileSize_String4?: string
  /** Play time of the content, in s (ms for text output) */
  readonly Duration?: number
  /** Play time in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_String?: string
  /** Play time in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_String1?: string
  /** Play time in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_String2?: string
  /** Play time in format HH:MM:SS.mmm (e.g. 01:40:00.000) */
  readonly Duration_String3?: string
  /** Play time in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_String4?: string
  /** Play time in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_String5?: string
  /** Start time of stream, in UTC */
  readonly Duration_Start?: number
  readonly Duration_Start_String?: string
  readonly Duration_Start_String1?: string
  readonly Duration_Start_String2?: string
  readonly Duration_Start_String3?: string
  readonly Duration_Start_String4?: string
  readonly Duration_Start_String5?: string
  /** End time of stream, in UTC */
  readonly Duration_End?: number
  readonly Duration_End_String?: string
  readonly Duration_End_String1?: string
  readonly Duration_End_String2?: string
  readonly Duration_End_String3?: string
  readonly Duration_End_String4?: string
  readonly Duration_End_String5?: string
  /** Bit rate mode of all streams (CBR, VBR) */
  readonly OverallBitRate_Mode?: string
  /** Bit rate mode of all streams, as word (Variable, Constant) */
  readonly OverallBitRate_Mode_String?: string
  /** Bit rate of all streams, in bps */
  readonly OverallBitRate?: number
  /** Bit rate of all streams, with measurement (e.g. 14.2 kb/s) */
  readonly OverallBitRate_String?: string
  /** Minimum total bit rate of all streams, in bps */
  readonly OverallBitRate_Minimum?: number
  /** Minimum bit rate of all streams, with measurement */
  readonly OverallBitRate_Minimum_String?: string
  /** Nominal bit rate of all streams, in bps */
  readonly OverallBitRate_Nominal?: number
  /** Nominal bit rate of all streams, with measurement */
  readonly OverallBitRate_Nominal_String?: string
  /** Maximum bit rate of all streams, in bps */
  readonly OverallBitRate_Maximum?: number
  /** Maximum bit rate of all streams, with measurement */
  readonly OverallBitRate_Maximum_String?: string
  /** Frames per second */
  readonly FrameRate?: number
  /** Frames per second, with measurement */
  readonly FrameRate_String?: string
  /** Frames per second, numerator */
  readonly FrameRate_Num?: number
  /** Frames per second, denominator */
  readonly FrameRate_Den?: number
  /** Frame count, if a stream has the same frame rate everywhere */
  readonly FrameCount?: number
  /** Delay fixed in the stream (relative), is s (ms for text output) */
  readonly Delay?: number
  /** Delay with measurement and rounded to integer (e.g. 213 ms) */
  readonly Delay_String?: string
  /** Delay with measurement and rounded to integer (e.g. 213 ms) */
  readonly Delay_String1?: string
  /** Delay with measurement and rounded to integer (e.g. 213 ms) */
  readonly Delay_String2?: string
  /** Delay in format HH:MM:SS.mmm */
  readonly Delay_String3?: string
  /** Delay in format HH:MM:SS:FF, with the last colon replaced by semicolon for drop frame if available */
  readonly Delay_String4?: string
  /** Delay in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_String5?: string
  /** Delay settings (in case of timecode, for example) */
  readonly Delay_Settings?: string
  /** Delay drop frame */
  readonly Delay_DropFrame?: string
  /** Delay source (Container, Stream, or empty) */
  readonly Delay_Source?: string
  /** Delay source (Container, Stream, or empty) */
  readonly Delay_Source_String?: string
  /** Size of this stream, in bytes */
  readonly StreamSize?: number
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String?: string
  /** Size of this stream, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_String1?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_String2?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_String3?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_String4?: string
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly StreamSize_Proportion?: string
  /** Size of this stream after demuxing, in bytes */
  readonly StreamSize_Demuxed?: number
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String1?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String2?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Demuxed_String3?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Demuxed_String4?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String5?: string
  /** Header field size, in bytes */
  readonly HeaderSize?: number
  /** Data field size, in bytes */
  readonly DataSize?: number
  /** Footer field size, in bytes */
  readonly FooterSize?: number
  /** Set if this file is streamable or not (Yes, No) */
  readonly IsStreamable?: string
  /** The gain to apply to reach 89dB SPL on playback */
  readonly Album_ReplayGain_Gain?: string
  /** The gain to apply to reach 89dB SPL on playback */
  readonly Album_ReplayGain_Gain_String?: string
  /** The maximum absolute peak value of the item */
  readonly Album_ReplayGain_Peak?: string
  /** Encryption */
  readonly Encryption?: string
  /** Encryption format */
  readonly Encryption_Format?: string
  /** Encryption length (128, 192 or 256 bits) */
  readonly Encryption_Length?: string
  /** Encryption method */
  readonly Encryption_Method?: string
  /** Encryption mode */
  readonly Encryption_Mode?: string
  /** Encryption padding */
  readonly Encryption_Padding?: string
  /** Encryption initialization vector */
  readonly Encryption_InitializationVector?: string
  /** Universal Ad-ID, see https://ad-id.org for more information */
  readonly UniversalAdID_String?: string
  /** Universal Ad-ID registry */
  readonly UniversalAdID_Registry?: string
  /** Universal Ad-ID value */
  readonly UniversalAdID_Value?: string
  /** Title of file @group Title */
  readonly Title?: string
  /** More title information @group Title */
  readonly Title_More?: string
  /** URL @group Title */
  readonly Title_Url?: string
  /** Universe that the file's contents belong to (e.g. Star Wars, Stargate, Buffy, Dragonball) @group Title */
  readonly Domain?: string
  /** Name of the series (e.g. Star Wars movies, Stargate SG-1, Angel) @group Title */
  readonly Collection?: string
  /** Name of the season (e.g. first Star Wars Trilogy, Season 1) @group Title */
  readonly Season?: string
  /** Number of the Season @group Title */
  readonly Season_Position?: number
  /** Total number of seasons @group Title */
  readonly Season_Position_Total?: number
  /** Name of the movie (e.g. Star Wars: A New Hope) @group Title */
  readonly Movie?: string
  /** More information about the Movie @group Title */
  readonly Movie_More?: string
  /** Country where the movie was produced @group Title */
  readonly Movie_Country?: string
  /** Homepage for the movie @group Title */
  readonly Movie_Url?: string
  /** Name of the album (e.g. The Joshua Tree) @group Title */
  readonly Album?: string
  /** More information about the Album @group Title */
  readonly Album_More?: string
  /** Alternate name of the album, optimized for sorting purposes (e.g. Joshua Tree, The) @group Title */
  readonly Album_Sort?: string
  /** Album performer/artist of this file @group Entity */
  readonly Album_Performer?: string
  /** Alternate name for the performer, optimized for sorting purposes (e.g. Beatles, The) @group Entity */
  readonly Album_Performer_Sort?: string
  /** Homepage of the album performer/artist @group Entity */
  readonly Album_Performer_Url?: string
  /** Name of the comic book series @group Title */
  readonly Comic?: string
  /** More information about the comic book series @group Title */
  readonly Comic_More?: string
  /** Total number of comics @group Title */
  readonly Comic_Position_Total?: number
  /** Name of the part (e.g. CD1, CD2) @group Title */
  readonly Part?: string
  /** Number of the part @group Title */
  readonly Part_Position?: number
  /** Total number of parts @group Title */
  readonly Part_Position_Total?: number
  /** Name of the reel @group Title */
  readonly Reel?: string
  /** Number of the reel @group Title */
  readonly Reel_Position?: number
  /** Total number of reel @group Title */
  readonly Reel_Position_Total?: number
  /** Name of the track (e.g. track 1, track 2) @group Title */
  readonly Track?: string
  /** More information about the Track @group Title */
  readonly Track_More?: string
  /** Link to a site about this Track @group Title */
  readonly Track_Url?: string
  /** Alternate name for the track, optimized for sorting purposes @group Title */
  readonly Track_Sort?: string
  /** Number of this Track @group Title */
  readonly Track_Position?: number
  /** Total number of tracks @group Title */
  readonly Track_Position_Total?: number
  /** MXF package name */
  readonly PackageName?: string
  /** iTunes grouping @group Title */
  readonly Grouping?: string
  /** Name of the Chapter @group Title */
  readonly Chapter?: string
  /** Name of the Subtrack @group Title */
  readonly SubTrack?: string
  /** Original name of the Album @group Title */
  readonly Original_Album?: string
  /** Original name of the Movie @group Title */
  readonly Original_Movie?: string
  /** Original name of the Part @group Title */
  readonly Original_Part?: string
  /** Original name of the Track @group Title */
  readonly Original_Track?: string
  /** iTunes compilation @group Title */
  readonly Compilation?: string
  /** iTunes compilation @group Title */
  readonly Compilation_String?: string
  /** Main performer(s)/artist(s) @group Entity */
  readonly Performer?: string
  /** Alternate name for the performer, optimized for sorting purposes (e.g. Beatles, The) @group Entity */
  readonly Performer_Sort?: string
  /** Homepage of the performer/artist @group Entity */
  readonly Performer_Url?: string
  /** Original artist(s)/performer(s) @group Entity */
  readonly Original_Performer?: string
  /** Band/orchestra/accompaniment/musician @group Entity */
  readonly Accompaniment?: string
  /** Name of the original composer @group Entity */
  readonly Composer?: string
  /** Nationality of the primary composer of the piece @group Entity */
  readonly Composer_Nationality?: string
  /** Nationality of the primary composer of the piece (e.g. Mozart, Wolfgang Amadeus) @group Entity */
  readonly Composer_Sort?: string
  /** The person who arranged the piece (e.g. Ravel) @group Entity */
  readonly Arranger?: string
  /** The person who wrote the lyrics for the piece @group Entity */
  readonly Lyricist?: string
  /** Original lyricist(s)/text writer(s) @group Entity */
  readonly Original_Lyricist?: string
  /** The artist(s) who performed the work. In classical music this would be the conductor, orchestra, soloists, etc @group Entity */
  readonly Conductor?: string
  /** Name of the director @group Entity */
  readonly Director?: string
  /** Name of the codirector @group Entity */
  readonly CoDirector?: string
  /** Name of the assistant director @group Entity */
  readonly AssistantDirector?: string
  /** Name of the director of photography, also known as cinematographer @group Entity */
  readonly DirectorOfPhotography?: string
  /** Name of the sound engineer or sound recordist @group Entity */
  readonly SoundEngineer?: string
  /** Name of the person who oversees the artists and craftspeople who build the sets @group Entity */
  readonly ArtDirector?: string
  /** Name of the person responsible for designing the overall visual appearance of a movie @group Entity */
  readonly ProductionDesigner?: string
  /** Name of the choreographer @group Entity */
  readonly Choreographer?: string
  /** Name of the costume designer @group Entity */
  readonly CostumeDesigner?: string
  /** Real name of an actor/actress playing a role in the movie @group Entity */
  readonly Actor?: string
  /** Name of the character an actor or actress plays in this movie @group Entity */
  readonly Actor_Character?: string
  /** Author of the story or script @group Entity */
  readonly WrittenBy?: string
  /** Author of the screenplay or scenario (used for movies and TV shows) @group Entity */
  readonly ScreenplayBy?: string
  /** Editors name @group Entity */
  readonly EditedBy?: string
  /** Name of the person or organization that commissioned the subject of the file @group Entity */
  readonly CommissionedBy?: string
  /** Name of the producer of the media @group Entity */
  readonly Producer?: string
  /** Name of a co-producer of the media @group Entity */
  readonly CoProducer?: string
  /** Name of an executive producer of the media @group Entity */
  readonly ExecutiveProducer?: string
  /** Main musical artist for the media @group Entity */
  readonly MusicBy?: string
  /** Company responsible for distribution of the content @group Entity */
  readonly DistributedBy?: string
  /** Name of the person or organization who supplied the original subject @group Entity */
  readonly OriginalSourceForm_DistributedBy?: string
  /** The engineer who mastered the content for a physical medium or for digital distribution @group Entity */
  readonly MasteredBy?: string
  /** Name of the person/organisation that encoded/ripped the audio file @group Entity */
  readonly EncodedBy?: string
  /** Name of the artist(s) that interpreted, remixed, or otherwise modified the content @group Entity */
  readonly RemixedBy?: string
  /** Main production studio of the media @group Entity */
  readonly ProductionStudio?: string
  /** A very general metadata tag for everyone else that wants to be listed @group Entity */
  readonly ThanksTo?: string
  /** Name of the organization publishing the media (i.e. the record label) @group Entity */
  readonly Publisher?: string
  /** Publisher's official webpage @group Entity */
  readonly Publisher_URL?: string
  /** Brand or trademark associated with the marketing of music recordings and music videos @group Entity */
  readonly Label?: string
  /** Main genre of the media (e.g. classical, ambient-house, synthpop, sci-fi, drama, etc.) @group Classification */
  readonly Genre?: string
  /** Podcast category @group Classification */
  readonly PodcastCategory?: string
  /** Intended to reflect the mood of the item with a few keywords (e.g. Romantic, Sad, Uplifting, etc.) @group Classification */
  readonly Mood?: string
  /** The type or genre of the content (e.g. Documentary, Feature Film, Cartoon, Music Video, Music, Sound FX, etc.) @group Classification */
  readonly ContentType?: string
  /** Describes the topic of the file (e.g. "Aerial view of Seattle.") @group Classification */
  readonly Subject?: string
  /** A short description of the contents (e.g. "Two birds flying.") @group Classification */
  readonly Description?: string
  /** Keywords for the content separated by a comma, used for searching @group Classification */
  readonly Keywords?: string
  /** Plot outline or a summary of the story @group Classification */
  readonly Summary?: string
  /** Description of the story line of the item @group Classification */
  readonly Synopsis?: string
  /** Describes the period that the piece is from or about (e.g. Renaissance) @group Classification */
  readonly Period?: string
  /** Legal rating of a movie. Format depends on country of origin (e.g. PG, 16) @group Classification */
  readonly LawRating?: string
  /** Reason for the law rating @group Classification */
  readonly LawRating_Reason?: string
  /** The ICRA rating (previously RSACi) @group Classification */
  readonly ICRA?: string
  /** Date/year that the content was released @group Temporal */
  readonly Released_Date?: string
  /** Date/year that the content was originally released @group Temporal */
  readonly Original_Released_Date?: string
  /** Time/date/year that the recording began @group Temporal */
  readonly Recorded_Date?: string
  /** Time/date/year that the encoding of this content was completed @group Temporal */
  readonly Encoded_Date?: string
  /** Time/date/year that the tags were added to this content @group Temporal */
  readonly Tagged_Date?: string
  /** Time/date/year that the composition of the music/script began @group Temporal */
  readonly Written_Date?: string
  /** Time/date/year that the content was digitally mastered @group Temporal */
  readonly Mastered_Date?: string
  /** Time that the file was created on the file system @group Temporal */
  readonly File_Created_Date?: string
  /** Local time that the file was created on the file system (not to be used in an international database) @group Temporal */
  readonly File_Created_Date_Local?: string
  /** Time that the file was last modified on the file system @group Temporal */
  readonly File_Modified_Date?: string
  /** Local time that the file was last modified on the file system (not to be used in an international database) @group Temporal */
  readonly File_Modified_Date_Local?: string
  /** Location where track was recorded, as Longitude+Latitude @group Spatial */
  readonly Recorded_Location?: string
  /** Location that the item was originally designed/written @group Spatial */
  readonly Written_Location?: string
  /** Location where an item is archived (e.g. Louvre, Paris, France) @group Spatial */
  readonly Archival_Location?: string
  /** Name of the software package used to create the file (e.g. Microsoft WaveEdiTY) @group Technical */
  readonly Encoded_Application?: string
  /** Name of the software package used to create the file, in the format "CompanyName ProductName (OperatingSystem) Version (Date)" @group Technical */
  readonly Encoded_Application_String?: string
  /** Name of the company of the encoding application @group Technical */
  readonly Encoded_Application_CompanyName?: string
  /** Name of the encoding product @group Technical */
  readonly Encoded_Application_Name?: string
  /** Version of the encoding product @group Technical */
  readonly Encoded_Application_Version?: string
  /** URL associated with the encoding software @group Technical */
  readonly Encoded_Application_Url?: string
  /** Software used to create the file @group Technical */
  readonly Encoded_Library?: string
  /** Software used to create the file, in the format "CompanyName ProductName (OperatingSystem) Version (Date)" @group Technical */
  readonly Encoded_Library_String?: string
  /** Name of the encoding software company @group Technical */
  readonly Encoded_Library_CompanyName?: string
  /** Name of the encoding software @group Technical */
  readonly Encoded_Library_Name?: string
  /** Version of the encoding software @group Technical */
  readonly Encoded_Library_Version?: string
  /** Release date of the encoding software, in UTC @group Technical */
  readonly Encoded_Library_Date?: string
  /** Parameters used by the encoding software @group Technical */
  readonly Encoded_Library_Settings?: string
  /** Operating System of the encoding software @group Technical */
  readonly Encoded_OperatingSystem?: string
  /** Describes whether an image has been cropped and, if so, how it was cropped @group Technical */
  readonly Cropped?: string
  /** Specifies the size of the original subject of the file (e.g. 8.5 in h, 11 in w) @group Technical */
  readonly Dimensions?: string
  /** Stores dots per inch setting of the digitization mechanism used to produce the file @group Technical */
  readonly DotsPerInch?: string
  /** Describes the changes in lightness settings on the digitization mechanism made during the production of the file @group Technical */
  readonly Lightness?: string
  /** Original medium of the material (e.g. vinyl, Audio-CD, Super8 or BetaMax) @group Technical */
  readonly OriginalSourceMedium?: string
  /** Original form of the material (e.g. slide, paper, map) @group Technical */
  readonly OriginalSourceForm?: string
  /** Number of colors requested when digitizing (e.g. 256 for images or 32 bit RGB for video) @group Technical */
  readonly OriginalSourceForm_NumColors?: string
  /** Name of the product the file was originally intended for @group Technical */
  readonly OriginalSourceForm_Name?: string
  /** Describes whether the original image has been cropped and, if so, how it was cropped (e.g. 16:9 to 4:3, top and bottom) @group Technical */
  readonly OriginalSourceForm_Cropped?: string
  /** Identifies changes in sharpness the digitization mechanism made during the production of the file @group Technical */
  readonly OriginalSourceForm_Sharpness?: string
  /** Software used to tag the file @group Technical */
  readonly Tagged_Application?: string
  /** Average number of beats per minute @group Technical */
  readonly BPM?: string
  /** International Standard Recording Code, excluding the ISRC prefix and including hyphens @group Identifier */
  readonly ISRC?: string
  /** International Standard Book Number @group Identifier */
  readonly ISBN?: string
  /** International Standard Audiovisual Number @group Identifier */
  readonly ISAN?: string
  /** EAN-13 (13-digit European Article Numbering) or UPC-A (12-digit Universal Product Code) bar code identifier @group Identifier */
  readonly BarCode?: string
  /** Library of Congress Control Number @group Identifier */
  readonly LCCN?: string
  /** Universal Media Identifier */
  readonly UMID?: string
  /** A label-specific catalogue number used to identify the release (e.g. TIC 01) @group Identifier */
  readonly CatalogNumber?: string
  /** Label code (e.g. 12345, meaning LC-12345) @group Identifier */
  readonly LabelCode?: string
  /** Owner of the file @group Legal */
  readonly Owner?: string
  /** Copyright attribution @group Legal */
  readonly Copyright?: string
  /** Link to a site with copyright/legal information @group Legal */
  readonly Copyright_Url?: string
  /** Copyright information as per the production copyright holder @group Legal */
  readonly Producer_Copyright?: string
  /** License information (e.g. All Rights Reserved, Any Use Permitted) @group Legal */
  readonly TermsOfUse?: string
  /** Name of assisted service @group Legal */
  readonly ServiceName?: string
  /** Channel of assisted service @group Legal */
  readonly ServiceChannel?: string
  /** URL of of assisted service @group Legal */
  readonly Service_Url?: string
  /** Provider of assisted service @group Legal */
  readonly ServiceProvider?: string
  /** URL of provider of assisted service @group Legal */
  readonly ServiceProvider_Url?: string
  /** Type of assisted service @group Legal */
  readonly ServiceType?: string
  /** Television network name @group Legal */
  readonly NetworkName?: string
  /** Television network name of original broadcast @group Legal */
  readonly OriginalNetworkName?: string
  /** Country information of the content @group Legal */
  readonly Country?: string
  /** Time zone information of the content @group Legal */
  readonly TimeZone?: string
  /** Is there a cover? Result will be "Yes" if present, empty if not @group Info */
  readonly Cover?: string
  /** Short description of cover image file (e.g. Earth in space) @group Info */
  readonly Cover_Description?: string
  /** Cover type (e.g. "Cover (front)") @group Info */
  readonly Cover_Type?: string
  /** MIME type of cover file (e.g. image/png) @group Info */
  readonly Cover_Mime?: string
  /** Cover, in binary format, encoded as Base64 @group Info */
  readonly Cover_Data?: string
  /** Text of a song @group Info */
  readonly Lyrics?: string
  /** Any comment related to the content @group Personal */
  readonly Comment?: string
  /** A numeric value defining how much a person likes the song/movie, 1 to 5 (e.g. 2, 5.0) @group Personal */
  readonly Rating?: string
  /** Date/year the item was added to the owners collection @group Personal */
  readonly Added_Date?: string
  /** Date the owner first played an item @group Personal */
  readonly Played_First_Date?: string
  /** Date the owner last played an item @group Personal */
  readonly Played_Last_Date?: string
  /** Number of times an item was played @group Personal */
  readonly Played_Count?: number
  /** Beginning position for Electronic Program Guide */
  readonly EPG_Positions_Begin?: number
  /** Ending position for Electronic Program Guide */
  readonly EPG_Positions_End?: number
}

export interface ImageTrack extends BaseTrack {
  readonly '@type': 'Image'
  /** Title of track */
  readonly Title?: string
  /** High Dynamic Range Format used */
  readonly HDR_Format?: string
  /** HDR Format used, along with version, profile, level, layers, settings, and compatibility information */
  readonly HDR_Format_String?: string
  /** Commercial name used by vendor for these HDR settings or HDR Format field if there is no difference */
  readonly HDR_Format_Commercial?: string
  /** Version of HDR Format */
  readonly HDR_Format_Version?: string
  /** Profile of HDR Format */
  readonly HDR_Format_Profile?: string
  /** Level of HDR Format */
  readonly HDR_Format_Level?: string
  /** HDR Format settings */
  readonly HDR_Format_Settings?: string
  /** HDR Format compatibility with commercial products (e.g. HDR10) */
  readonly HDR_Format_Compatibility?: string
  /** Order of bytes required for decoding. Options are Big/Little */
  readonly Format_Settings_Endianness?: string
  /** Data packing method used in DPX frames (e.g. Packed, Filled A, Filled B) */
  readonly Format_Settings_Packing?: string
  /** Wrapping mode set for format (e.g. Frame, Clip) */
  readonly Format_Settings_Wrapping?: string
  /** Internet Media Type (aka MIME Type, Content-Type) */
  readonly InternetMediaType?: string
  /** Width of frame (trimmed to "clean aperture" size if present) in pixels, as integer (e.g. 1920) */
  readonly Width?: number
  /** Width of frame (trimmed to "clean aperture" size if present) in pixels, presented in SI unit digit spacing style, with measurement (e.g. 1 920 pixels) */
  readonly Width_String?: string
  /** Offset between original width and displayed width, in pixels */
  readonly Width_Offset?: number
  /** Offset between original width and displayed width, in pixels */
  readonly Width_Offset_String?: string
  /** Width of frame (not including aperture size if present) in pixels, presented as integer (e.g. 1920) */
  readonly Width_Original?: number
  /** Width of frame (not including aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 920 pixels) */
  readonly Width_Original_String?: string
  /** Height of frame (including aperture size if present) in pixels, presented as integer (e.g. 1080) */
  readonly Height?: number
  /** Height of frame (including aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 080 pixels) */
  readonly Height_String?: string
  /** Offset between original height and displayed height, in pixels */
  readonly Height_Offset?: number
  /** Offset between original height and displayed height, in pixels */
  readonly Height_Offset_String?: string
  /** Height of frame (not including aperture size if present) in pixels, presented as integer (e.g. 1080) */
  readonly Height_Original?: number
  /** Height of frame (not including aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 080 pixels) */
  readonly Height_Original_String?: string
  /** Pixel Aspect ratio */
  readonly PixelAspectRatio?: number
  /** Pixel Aspect ratio */
  readonly PixelAspectRatio_String?: string
  /** Original (in the raw stream) Pixel Aspect ratio */
  readonly PixelAspectRatio_Original?: number
  /** Original (in the raw stream) Pixel Aspect ratio */
  readonly PixelAspectRatio_Original_String?: string
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio?: number
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_String?: string
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_Original?: number
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_Original_String?: string
  /** Width of frame, not considering black bars */
  readonly Active_Width?: number
  /** Width of frame, not considering black bars, in pixels, presented in SI unit digit spacing style, with measurement (e.g. 1 920 pixels) */
  readonly Active_Width_String?: string
  /** Height of frame, not considering black bars */
  readonly Active_Height?: number
  /** Height of frame, not considering black bars, in pixels, presented in SI unit digit spacing style, with measurement (e.g. 1 080 pixels) */
  readonly Active_Height_String?: string
  /** The proportional relationship between the active width and active height of a frame (e.g. 4:3) */
  readonly Active_DisplayAspectRatio?: number
  /** The proportional relationship between the active width and active height of a frame (e.g. 4:3) */
  readonly Active_DisplayAspectRatio_String?: string
  /** Color profile of the image (e.g. YUV) */
  readonly ColorSpace?: string
  /** Ratio of chroma to luma in encoded image (e.g. 4:2:2) */
  readonly ChromaSubsampling?: string
  /** Color information stored in the frame, as integer (e.g. 10) */
  readonly BitDepth?: number
  /** Color information stored in the frame, as string (e.g. 10 bits) */
  readonly BitDepth_String?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode_String?: string
  /** Stream size divided by uncompressed stream size */
  readonly Compression_Ratio?: number
  /** Size of this stream, in bytes */
  readonly StreamSize?: number
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String?: string
  /** Size of this stream, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_String1?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_String2?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_String3?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_String4?: string
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly StreamSize_Proportion?: string
  /** Size of this stream after demuxing, in bytes */
  readonly StreamSize_Demuxed?: number
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String1?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String2?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Demuxed_String3?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Demuxed_String4?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String5?: string
  /** Software used to create the file @group Technical */
  readonly Encoded_Library?: string
  /** Software used to create the file, in the format "CompanyName ProductName (OperatingSystem) Version (Date)" @group Technical */
  readonly Encoded_Library_String?: string
  /** Name of the encoding software @group Technical */
  readonly Encoded_Library_Name?: string
  /** Version of the encoding software @group Technical */
  readonly Encoded_Library_Version?: string
  /** Release date of the encoding software, in UTC @group Technical */
  readonly Encoded_Library_Date?: string
  /** Parameters used by the encoding software @group Technical */
  readonly Encoded_Library_Settings?: string
  /** Language, formatted as 2-letter ISO 639-1 if exists, else 3-letter ISO 639-2, and with optional ISO 3166-1 country separated by a dash if available (e.g. en, en-US, en-CN) */
  readonly Language?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String1?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists (e.g. en) */
  readonly Language_String2?: string
  /** Language, formatted as 3-letter ISO 639-2, if exists (e.g. eng) */
  readonly Language_String3?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists, with optional ISO 3166-1 country separated by a dash if available (e.g. en-US) */
  readonly Language_String4?: string
  /** More information about Language (e.g. Director's Comment) */
  readonly Language_More?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind_String?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled_String?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default_String?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced_String?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup_String?: string
  /** Plot outline or a summary of the story */
  readonly Summary?: string
  /** Time that the encoding of this item was completed, in UTC @group Temporal */
  readonly Encoded_Date?: string
  /** Time that the tags were added to this item, in UTC @group Temporal */
  readonly Tagged_Date?: string
  /** Whether this stream is encrypted and, if available, how it is encrypted */
  readonly Encryption?: string
  /** Presence of color description (Yes, No) */
  readonly colour_description_present?: string
  /** Presence of colour description (source) */
  readonly colour_description_present_Source?: string
  /** Presence of colour description (if incoherencies) */
  readonly colour_description_present_Original?: string
  /** Presence of colour description (source if incoherencies) */
  readonly colour_description_present_Original_Source?: string
  /** Color range for YUV color space */
  readonly colour_range?: string
  /** Colour range for YUV colour space (source) */
  readonly colour_range_Source?: string
  /** Colour range for YUV colour space (if incoherencies) */
  readonly colour_range_Original?: string
  /** Colour range for YUV colour space (source if incoherencies) */
  readonly colour_range_Original_Source?: string
  /** Chromaticity coordinates of the source primaries */
  readonly colour_primaries?: string
  /** Chromaticity coordinates of the source primaries (source) */
  readonly colour_primaries_Source?: string
  /** Chromaticity coordinates of the source primaries (if incoherencies) */
  readonly colour_primaries_Original?: string
  /** Chromaticity coordinates of the source primaries (source if incoherencies) */
  readonly colour_primaries_Original_Source?: string
  /** Opto-electronic transfer characteristic of the source picture */
  readonly transfer_characteristics?: string
  /** Opto-electronic transfer characteristic of the source picture (source) */
  readonly transfer_characteristics_Source?: string
  /** Opto-electronic transfer characteristic of the source picture (if incoherencies) */
  readonly transfer_characteristics_Original?: string
  /** Opto-electronic transfer characteristic of the source picture (source if incoherencies) */
  readonly transfer_characteristics_Original_Source?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries */
  readonly matrix_coefficients?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries (source) */
  readonly matrix_coefficients_Source?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries (if incoherencies) */
  readonly matrix_coefficients_Original?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries (source if incoherencies) */
  readonly matrix_coefficients_Original_Source?: string
  /** Chromaticity coordinates of the source primaries of the mastering display */
  readonly MasteringDisplay_ColorPrimaries?: string
  /** Chromaticity coordinates of the source primaries of the mastering display (source) */
  readonly MasteringDisplay_ColorPrimaries_Source?: string
  /** Chromaticity coordinates of the source primaries of the mastering display (if incoherencies) */
  readonly MasteringDisplay_ColorPrimaries_Original?: string
  /** Chromaticity coordinates of the source primaries of the mastering display (source if incoherencies) */
  readonly MasteringDisplay_ColorPrimaries_Original_Source?: string
  /** Luminance of the mastering display */
  readonly MasteringDisplay_Luminance?: string
  /** Luminance of the mastering display (source) */
  readonly MasteringDisplay_Luminance_Source?: string
  /** Luminance of the mastering display (if incoherencies) */
  readonly MasteringDisplay_Luminance_Original?: string
  /** Luminance of the mastering display (source if incoherencies) */
  readonly MasteringDisplay_Luminance_Original_Source?: string
  /** Maximum content light level */
  readonly MaxCLL?: string
  /** Maximum content light level (source) */
  readonly MaxCLL_Source?: string
  /** Maximum content light level (if incoherencies) */
  readonly MaxCLL_Original?: string
  /** Maximum content light level (source if incoherencies) */
  readonly MaxCLL_Original_Source?: string
  /** Maximum frame average light level */
  readonly MaxFALL?: string
  /** Maximum frame average light level (source) */
  readonly MaxFALL_Source?: string
  /** Maximum frame average light level (if incoherencies) */
  readonly MaxFALL_Original?: string
  /** Maximum frame average light level (source if incoherencies) */
  readonly MaxFALL_Original_Source?: string
}

export interface MenuTrack extends BaseTrack {
  readonly '@type': 'Menu'
  /** Play time of the stream, in s (ms for text output) */
  readonly Duration?: number
  /** Play time in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_String?: string
  /** Play time in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_String1?: string
  /** Play time in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_String2?: string
  /** Play time in format HH:MM:SS.mmm (e.g. 01:40:00.000) */
  readonly Duration_String3?: string
  /** Play time in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_String4?: string
  /** Play time in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_String5?: string
  /** Start time of stream, in UTC */
  readonly Duration_Start?: number
  /** End time of stream, in UTC */
  readonly Duration_End?: number
  /** Delay fixed in the stream (relative), in ms */
  readonly Delay?: number
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String1?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String2?: string
  /** Delay fixed in the stream (relative) in format HH:MM:SS.mmm, with measurement */
  readonly Delay_String3?: string
  /** Delay in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Delay_String4?: string
  /** Delay in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_String5?: string
  /** Delay settings (in case of timecode for example) */
  readonly Delay_Settings?: string
  /** Delay drop frame */
  readonly Delay_DropFrame?: string
  /** Part of the file where the delay was set (e.g. Container, Stream, or empty) */
  readonly Delay_Source?: string
  /** Frame rate mode, as acronym (e.g. CFR, VFR) */
  readonly FrameRate_Mode?: string
  /** Frame rate mode, as word (e.g. Constant, Variable) */
  readonly FrameRate_Mode_String?: string
  /** Frames per second, as float (e.g. 29.970) */
  readonly FrameRate?: number
  /** Frames per second, with measurement (e.g. 29.970 (29970/1000) FPS) */
  readonly FrameRate_String?: string
  /** Numerator for determined frames per second (e.g. 29970) */
  readonly FrameRate_Num?: number
  /** Denominator for determined frames per second (e.g. 1000) */
  readonly FrameRate_Den?: number
  /** Numer of frames */
  readonly FrameCount?: number
  /** List of programs available */
  readonly List_StreamKind?: string
  /** List of programs available */
  readonly List_StreamPos?: string
  /** List of programs available */
  readonly List?: string
  /** List of programs available */
  readonly List_String?: string
  /** Name of this menu */
  readonly Title?: string
  /** Language, formatted as 2-letter ISO 639-1 if exists, else 3-letter ISO 639-2, and with optional ISO 3166-1 country separated by a dash if available (e.g. en, en-US, en-CN) */
  readonly Language?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String1?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists (e.g. en) */
  readonly Language_String2?: string
  /** Language, formatted as 3-letter ISO 639-2, if exists (e.g. eng) */
  readonly Language_String3?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists, with optional ISO 3166-1 country separated by a dash if available (e.g. en-US) */
  readonly Language_String4?: string
  /** More information about Language (e.g. Director's Comment) */
  readonly Language_More?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind_String?: string
  /** Name of assisted service @group Legal */
  readonly ServiceName?: string
  /** Channel of assisted service @group Legal */
  readonly ServiceChannel?: string
  /** URL of assisted service @group Legal */
  readonly Service_Url?: string
  /** Provider of assisted service @group Legal */
  readonly ServiceProvider?: string
  /** URL of provider of assisted service @group Legal */
  readonly ServiceProvider_Url?: string
  /** Type of assisted service @group Legal */
  readonly ServiceType?: string
  /** Television network name @group Legal */
  readonly NetworkName?: string
  /** Television network name of original broadcast @group Legal */
  readonly Original_NetworkName?: string
  /** Country information of the content @group Legal */
  readonly Countries?: string
  /** TimeZone information of the content @group Legal */
  readonly TimeZones?: string
  /** Legal rating of a movie. Format depends on country of origin (e.g. PG, 16) @group Classification */
  readonly LawRating?: string
  /** Reason of the law rating @group Classification */
  readonly LawRating_Reason?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled_String?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default_String?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced_String?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup_String?: string
  /** Used by third-party developers to know about the beginning of the chapters list, to be used by Get (Stream_Menu, x, Pos), where Pos is an Integer between Chapters_Pos_Begin and Chapters_Pos_End */
  readonly Chapters_Pos_Begin?: number
  /** Used by third-party developers to know about the end of the chapters list (this position excluded) */
  readonly Chapters_Pos_End?: number
}

export interface OtherTrack extends BaseTrack {
  readonly '@type': 'Other'
  /** Type */
  readonly Type?: string
  /** Wrapping mode set for format (e.g. Frame, Clip) */
  readonly Format_Settings_Wrapping?: string
  /** How this file is muxed in the container */
  readonly MuxingMode?: string
  /** More information about MuxingMode */
  readonly MuxingMode_MoreInfo?: string
  /** Play time of the stream in ms */
  readonly Duration?: number
  /** Play time in format : XXx YYy only, YYy omited if zero */
  readonly Duration_String?: string
  /** Play time in format : HHh MMmn SSs MMMms, XX omited if zero */
  readonly Duration_String1?: string
  /** Play time in format : XXx YYy only, YYy omited if zero */
  readonly Duration_String2?: string
  /** Play time in format : HH:MM:SS.MMM */
  readonly Duration_String3?: string
  /** Play time in format : HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available */
  readonly Duration_String4?: string
  /** Play time in format : HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_String5?: string
  readonly Duration_Start?: number
  readonly Duration_End?: number
  /** Source Play time of the stream, in ms */
  readonly Source_Duration?: number
  /** Source Play time in format : XXx YYy only, YYy omited if zero */
  readonly Source_Duration_String?: string
  /** Source Play time in format : HHh MMmn SSs MMMms, XX omited if zero */
  readonly Source_Duration_String1?: string
  /** Source Play time in format : XXx YYy only, YYy omited if zero */
  readonly Source_Duration_String2?: string
  /** Source Play time in format : HH:MM:SS.MMM */
  readonly Source_Duration_String3?: string
  /** Play time in format : HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_String4?: string
  /** Play time in format : HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_String5?: string
  /** Source Duration of the first frame if it is longer than others, in ms */
  readonly Source_Duration_FirstFrame?: number
  /** Source Duration of the first frame if it is longer than others, in format : XXx YYy only, YYy omited if zero */
  readonly Source_Duration_FirstFrame_String?: string
  /** Source Duration of the first frame if it is longer than others, in format : HHh MMmn SSs MMMms, XX omited if zero */
  readonly Source_Duration_FirstFrame_String1?: string
  /** Source Duration of the first frame if it is longer than others, in format : XXx YYy only, YYy omited if zero */
  readonly Source_Duration_FirstFrame_String2?: string
  /** Source Duration of the first frame if it is longer than others, in format : HH:MM:SS.MMM */
  readonly Source_Duration_FirstFrame_String3?: string
  /** Play time in format : HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_FirstFrame_String4?: string
  /** Play time in format : HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_FirstFrame_String5?: string
  /** Source Duration of the last frame if it is longer than others, in ms */
  readonly Source_Duration_LastFrame?: number
  /** Source Duration of the last frame if it is longer than others, in format : XXx YYy only, YYy omited if zero */
  readonly Source_Duration_LastFrame_String?: string
  /** Source Duration of the last frame if it is longer than others, in format : HHh MMmn SSs MMMms, XX omited if zero */
  readonly Source_Duration_LastFrame_String1?: string
  /** Source Duration of the last frame if it is longer than others, in format : XXx YYy only, YYy omited if zero */
  readonly Source_Duration_LastFrame_String2?: string
  /** Source Duration of the last frame if it is longer than others, in format : HH:MM:SS.MMM */
  readonly Source_Duration_LastFrame_String3?: string
  /** Play time in format : HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_LastFrame_String4?: string
  /** Play time in format : HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_LastFrame_String5?: string
  /** Bit rate mode (VBR, CBR) */
  readonly BitRate_Mode?: string
  /** Bit rate mode (Variable, Cconstant) */
  readonly BitRate_Mode_String?: string
  /** Bit rate in bps */
  readonly BitRate?: number
  /** Bit rate (with measurement) */
  readonly BitRate_String?: string
  /** Minimum Bit rate in bps */
  readonly BitRate_Minimum?: number
  /** Minimum Bit rate (with measurement) */
  readonly BitRate_Minimum_String?: string
  /** Nominal Bit rate in bps */
  readonly BitRate_Nominal?: number
  /** Nominal Bit rate (with measurement) */
  readonly BitRate_Nominal_String?: string
  /** Maximum Bit rate in bps */
  readonly BitRate_Maximum?: number
  /** Maximum Bit rate (with measurement) */
  readonly BitRate_Maximum_String?: string
  /** Encoded (with forced padding) bit rate in bps, if some container padding is present */
  readonly BitRate_Encoded?: number
  /** Encoded (with forced padding) bit rate (with measurement), if some container padding is present */
  readonly BitRate_Encoded_String?: string
  /** Frames per second */
  readonly FrameRate?: number
  /** Frames per second (with measurement) */
  readonly FrameRate_String?: string
  /** Frames per second, numerator */
  readonly FrameRate_Num?: number
  /** Frames per second, denominator */
  readonly FrameRate_Den?: number
  /** Number of frames */
  readonly FrameCount?: number
  /** Source Number of frames */
  readonly Source_FrameCount?: number
  /** Delay fixed in the stream (relative) IN MS */
  readonly Delay?: number
  /** Delay with measurement */
  readonly Delay_String?: string
  /** Delay with measurement */
  readonly Delay_String1?: string
  /** Delay with measurement */
  readonly Delay_String2?: string
  /** Delay in format : HH:MM:SS.MMM */
  readonly Delay_String3?: string
  /** Delay in format : HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available */
  readonly Delay_String4?: string
  /** Delay in format : HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_String5?: string
  /** Delay settings (in case of timecode for example) */
  readonly Delay_Settings?: string
  /** Delay drop frame */
  readonly Delay_DropFrame?: string
  /** Delay source (Container or Stream or empty) */
  readonly Delay_Source?: string
  /** Delay source (Container or Stream or empty) */
  readonly Delay_Source_String?: string
  /** Delay fixed in the raw stream (relative) IN MS */
  readonly Delay_Original?: number
  /** Delay with measurement */
  readonly Delay_Original_String?: string
  /** Delay with measurement */
  readonly Delay_Original_String1?: string
  /** Delay with measurement */
  readonly Delay_Original_String2?: string
  /** Delay in format: HH:MM:SS.MMM */
  readonly Delay_Original_String3?: string
  /** Delay in format: HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available */
  readonly Delay_Original_String4?: string
  /** Delay in format : HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_Original_String5?: string
  /** Delay settings (in case of timecode for example) */
  readonly Delay_Original_Settings?: string
  /** Delay drop frame info */
  readonly Delay_Original_DropFrame?: string
  /** Delay source (Stream or empty) */
  readonly Delay_Original_Source?: string
  /** Delay fixed in the stream (absolute / video) */
  readonly Video_Delay?: number
  readonly Video_Delay_String?: string
  readonly Video_Delay_String1?: string
  readonly Video_Delay_String2?: string
  readonly Video_Delay_String3?: string
  readonly Video_Delay_String4?: string
  readonly Video_Delay_String5?: string
  /** TimeStamp fixed in the stream (relative) IN MS */
  readonly TimeStamp_FirstFrame?: number
  /** TimeStamp with measurement */
  readonly TimeStamp_FirstFrame_String?: string
  /** TimeStamp with measurement */
  readonly TimeStamp_FirstFrame_String1?: string
  /** TimeStamp with measurement */
  readonly TimeStamp_FirstFrame_String2?: string
  /** TimeStamp in format : HH:MM:SS.MMM */
  readonly TimeStamp_FirstFrame_String3?: string
  /** TimeStamp in format : HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available */
  readonly TimeStamp_FirstFrame_String4?: string
  /** TimeStamp in format : HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly TimeStamp_FirstFrame_String5?: string
  /** Time code in HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available format */
  readonly TimeCode_FirstFrame?: string
  /** Time code of the last frame (excluding the duration of the last frame) in HH:MM:SS:FF, last colon replaced by semicolon for drop frame if available format */
  readonly TimeCode_LastFrame?: string
  /** Delay drop frame */
  readonly TimeCode_DropFrame?: string
  /** Time code settings */
  readonly TimeCode_Settings?: string
  /** Time code is Stripped (only 1st time code, no discontinuity) */
  readonly TimeCode_Stripped?: string
  /** Time code is Stripped (only 1st time code, no discontinuity) */
  readonly TimeCode_Stripped_String?: string
  /** Time code source (Container, Stream, SystemScheme1, SDTI, ANC...) */
  readonly TimeCode_Source?: string
  /** Streamsize in bytes */
  readonly StreamSize?: number
  /** Streamsize in with percentage value */
  readonly StreamSize_String?: string
  readonly StreamSize_String1?: string
  readonly StreamSize_String2?: string
  readonly StreamSize_String3?: string
  readonly StreamSize_String4?: string
  /** Streamsize in with percentage value */
  readonly StreamSize_String5?: string
  /** Stream size divided by file size */
  readonly StreamSize_Proportion?: string
  /** StreamSize in bytes of hte stream after demux */
  readonly StreamSize_Demuxed?: number
  /** StreamSize_Demuxed in with percentage value */
  readonly StreamSize_Demuxed_String?: string
  readonly StreamSize_Demuxed_String1?: string
  readonly StreamSize_Demuxed_String2?: string
  readonly StreamSize_Demuxed_String3?: string
  readonly StreamSize_Demuxed_String4?: string
  /** StreamSize_Demuxed in with percentage value (note: theoritical value, not for real use) */
  readonly StreamSize_Demuxed_String5?: string
  /** Source Streamsize in bytes */
  readonly Source_StreamSize?: number
  /** Source Streamsize in with percentage value */
  readonly Source_StreamSize_String?: string
  readonly Source_StreamSize_String1?: string
  readonly Source_StreamSize_String2?: string
  readonly Source_StreamSize_String3?: string
  readonly Source_StreamSize_String4?: string
  /** Source Streamsize in with percentage value */
  readonly Source_StreamSize_String5?: string
  /** Source Stream size divided by file size */
  readonly Source_StreamSize_Proportion?: string
  /** Encoded Streamsize in bytes */
  readonly StreamSize_Encoded?: number
  /** Encoded Streamsize in with percentage value */
  readonly StreamSize_Encoded_String?: string
  readonly StreamSize_Encoded_String1?: string
  readonly StreamSize_Encoded_String2?: string
  readonly StreamSize_Encoded_String3?: string
  readonly StreamSize_Encoded_String4?: string
  /** Encoded Streamsize in with percentage value */
  readonly StreamSize_Encoded_String5?: string
  /** Encoded Stream size divided by file size */
  readonly StreamSize_Encoded_Proportion?: string
  /** Source Encoded Streamsize in bytes */
  readonly Source_StreamSize_Encoded?: number
  /** Source Encoded Streamsize in with percentage value */
  readonly Source_StreamSize_Encoded_String?: string
  readonly Source_StreamSize_Encoded_String1?: string
  readonly Source_StreamSize_Encoded_String2?: string
  readonly Source_StreamSize_Encoded_String3?: string
  readonly Source_StreamSize_Encoded_String4?: string
  /** Source Encoded Streamsize in with percentage value */
  readonly Source_StreamSize_Encoded_String5?: string
  /** Source Encoded Stream size divided by file size */
  readonly Source_StreamSize_Encoded_Proportion?: string
  /** Name of this menu */
  readonly Title?: string
  /** Language (2-letter ISO 639-1 if exists, else 3-letter ISO 639-2, and with optional ISO 3166-1 country separated by a dash if available, e.g. en, en-us, zh-cn) */
  readonly Language?: string
  /** Language (full) */
  readonly Language_String?: string
  /** Language (full) */
  readonly Language_String1?: string
  /** Language (2-letter ISO 639-1 if exists, else empty) */
  readonly Language_String2?: string
  /** Language (3-letter ISO 639-2 if exists, else empty) */
  readonly Language_String3?: string
  /** Language (2-letter ISO 639-1 if exists with optional ISO 3166-1 country separated by a dash if available, e.g. en, en-us, zh-cn, else empty) */
  readonly Language_String4?: string
  /** More info about Language (e.g. Director's Comment) */
  readonly Language_More?: string
  /** Service kind, e.g. visually impaired, commentary, voice over */
  readonly ServiceKind?: string
  /** Service kind (full) */
  readonly ServiceKind_String?: string
  /** Set if that track should not be used */
  readonly Disabled?: string
  /** Set if that track should not be used */
  readonly Disabled_String?: string
  /** Set if that track should be used if no language found matches the user preference. */
  readonly Default?: string
  /** Set if that track should be used if no language found matches the user preference. */
  readonly Default_String?: string
  /** Set if that track should be used if no language found matches the user preference. */
  readonly Forced?: string
  /** Set if that track should be used if no language found matches the user preference. */
  readonly Forced_String?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup_String?: string
}

export interface TextTrack extends BaseTrack {
  readonly '@type': 'Text'
  /** Wrapping mode set for format (e.g. Frame, Clip) */
  readonly Format_Settings_Wrapping?: string
  /** Internet Media Type (aka MIME Type, Content-Type) */
  readonly InternetMediaType?: string
  /** How this file is muxed in the container (e.g. Muxed in Video #1) */
  readonly MuxingMode?: string
  /** More information about MuxingMode */
  readonly MuxingMode_MoreInfo?: string
  /** Play time of the stream, in ms */
  readonly Duration?: number
  /** Play time of the stream in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_String?: string
  /** Play time of the stream in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_String1?: string
  /** Play time of the stream in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_String2?: string
  /** Play time of the stream in format HH:MM:SS.mmm (e.g. 01:40:00.000) */
  readonly Duration_String3?: string
  /** Play time of the stream in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_String4?: string
  /** Play time  of the streamin format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_String5?: string
  /** Play time from first display to last display, in ms */
  readonly Duration_Start2End?: number
  /** Play time from first display to last display in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_Start2End_String?: string
  /** Play time from first display to last display in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_Start2End_String1?: string
  /** Play time from first display to last display in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_Start2End_String2?: string
  /** Play time from first display to last display in format HH:MM:SS.mmm */
  readonly Duration_Start2End_String3?: string
  /** Play time from first display to last display in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_Start2End_String4?: string
  /** Play time from first display to last display in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_Start2End_String5?: string
  /** Timestamp of first command, in ms */
  readonly Duration_Start_Command?: number
  /** Timestamp of first command in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_Start_Command_String?: string
  /** Timestamp of first command in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_Start_Command_String1?: string
  /** Timestamp of first command in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_Start_Command_String2?: string
  /** Timestamp of first command in format HH:MM:SS.mmm */
  readonly Duration_Start_Command_String3?: string
  /** Timestamp of first command in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_Start_Command_String4?: string
  /** Timestamp of first command in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_Start_Command_String5?: string
  /** Timestamp of first display, in ms */
  readonly Duration_Start?: number
  /** Timestamp of first display in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_Start_String?: string
  /** Timestamp of first display in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_Start_String1?: string
  /** Timestamp of first display in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_Start_String2?: string
  /** Timestamp of first display in format HH:MM:SS.mmm */
  readonly Duration_Start_String3?: string
  /** Timestamp of first display in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_Start_String4?: string
  /** Timestamp of first display in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_Start_String5?: string
  /** Play time of the stream, in s (ms for text output) */
  readonly Duration_End?: number
  /** Play time in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_End_String?: string
  /** Play time in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_End_String1?: string
  /** Play time in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_End_String2?: string
  /** Play time in format HH:MM:SS.mmm */
  readonly Duration_End_String3?: string
  /** Play time in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_End_String4?: string
  /** Play time in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_End_String5?: string
  /** Play time of the stream, in s (ms for text output) */
  readonly Duration_End_Command?: number
  /** Play time in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_End_Command_String?: string
  /** Play time in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_End_Command_String1?: string
  /** Play time in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_End_Command_String2?: string
  /** Play time in format HH:MM:SS.mmm */
  readonly Duration_End_Command_String3?: string
  /** Play time in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_End_Command_String4?: string
  /** Play time in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_End_Command_String5?: string
  /** Duration of the first frame (if different than other frames), in ms */
  readonly Duration_FirstFrame?: number
  /** Duration of the first frame (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Duration_FirstFrame_String?: string
  /** Duration of the first frame (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_FirstFrame_String1?: string
  /** Duration of the first frame (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_FirstFrame_String2?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS.mmm */
  readonly Duration_FirstFrame_String3?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_FirstFrame_String4?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_FirstFrame_String5?: string
  /** Duration of the last frame (if different than other frames), in ms */
  readonly Duration_LastFrame?: number
  /** Duration of the last frame (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Duration_LastFrame_String?: string
  /** Duration of the last frame (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_LastFrame_String1?: string
  /** Duration of the last frame (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_LastFrame_String2?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS.mmm */
  readonly Duration_LastFrame_String3?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_LastFrame_String4?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_LastFrame_String5?: string
  /** Temporal coordinate system used for timestamps */
  readonly Duration_Base?: string
  /** Duration of content stored in the file (if different than duration), in ms */
  readonly Source_Duration?: number
  /** Duration of content stored in the file (if different than duration), in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_String?: string
  /** Duration of content stored in the file (if different than duration), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_String1?: string
  /** Duration of content stored in the file (if different than duration), in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_String2?: string
  /** Duration of content stored in the file (if different than duration), in format HH:MM:SS.mmm */
  readonly Source_Duration_String3?: string
  /** Duration of content stored in the file (if different than duration), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_String4?: string
  /** Duration of content stored in the file (if different than duration), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_String5?: string
  /** Duration of the first frame of content stored in the file (if different than other frames),in ms */
  readonly Source_Duration_FirstFrame?: number
  /** Duration of the first frame of content stored in the file (if different than other frames),in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_FirstFrame_String?: string
  /** Duration of the first frame of content stored in the file (if different than other frames),in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_FirstFrame_String1?: string
  /** Duration of the first frame of content stored in the file (if different than other frames),in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_FirstFrame_String2?: string
  /** Duration of the first frame of content stored in the file (if different than other frames),in format HH:MM:SS.mmm */
  readonly Source_Duration_FirstFrame_String3?: string
  /** Duration of the first frame of content stored in the file (if different than other frames),in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_FirstFrame_String4?: string
  /** Duration of the first frame of content stored in the file (if different than other frames),in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_FirstFrame_String5?: string
  /** Duration of the last frame of content stored in the file (if different than other frames),in ms */
  readonly Source_Duration_LastFrame?: number
  /** Duration of the last frame of content stored in the file (if different than other frames),in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_LastFrame_String?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_LastFrame_String1?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_LastFrame_String2?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HH:MM:SS.mmm */
  readonly Source_Duration_LastFrame_String3?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_LastFrame_String4?: string
  /** Duration of the last frame of content stored in the file (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_LastFrame_String5?: string
  /** Bit rate mode of this stream (CBR, VBR) */
  readonly BitRate_Mode?: string
  /** Bit rate mode of this stream, as word (Variable, Constant) */
  readonly BitRate_Mode_String?: string
  /** Bit rate of this stream, in bps */
  readonly BitRate?: number
  /** Bit rate of this stream, with measurement (e.g. 128 kb/s) */
  readonly BitRate_String?: string
  /** Minimum bit rate of this stream, in bps */
  readonly BitRate_Minimum?: number
  /** Minimum bit rate of this stream, with measurement */
  readonly BitRate_Minimum_String?: string
  /** Nominal bit rate of this stream, in bps */
  readonly BitRate_Nominal?: number
  /** Nominal bit rate of this stream, with measurement */
  readonly BitRate_Nominal_String?: string
  /** Maximum bit rate of this stream, in bps */
  readonly BitRate_Maximum?: number
  /** Maximum bit rate of this stream, with measurement */
  readonly BitRate_Maximum_String?: string
  /** Encoded bit rate (with forced padding), if container padding is present, in bps */
  readonly BitRate_Encoded?: number
  /** Encoded bit rate (with forced padding), if container padding is present, in bps */
  readonly BitRate_Encoded_String?: string
  /** "Width of frame (trimmed to ""clean aperture"" size if present) in characters" */
  readonly Width?: number
  /** "Width of frame (trimmed to ""clean aperture"" size if present) in characters, presented in SI unit digit spacing style, with measurement" */
  readonly Width_String?: string
  /** Height of frame (including aperture size if present) in characters */
  readonly Height?: number
  /** Height of frame (including aperture size if present) in characters, present in SI unit digit spacing style, with measurement */
  readonly Height_String?: string
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio?: number
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_String?: string
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_Original?: number
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_Original_String?: string
  /** Frame rate mode, as acronym (e.g. CFR, VFR) */
  readonly FrameRate_Mode?: string
  /** Frame rate mode, as word (e.g. Constant, Variable) */
  readonly FrameRate_Mode_String?: string
  /** Frame rate mode, as acronym (e.g. CFR, VFR) */
  readonly FrameRate_Mode_Original?: string
  /** Frame rate mode, as word (e.g. Constant, Variable) */
  readonly FrameRate_Mode_Original_String?: string
  /** Frames per second, as float (e.g. 29.970) */
  readonly FrameRate?: number
  /** Frames per second, with measurement (e.g. 29.970 (29970/1000) FPS) */
  readonly FrameRate_String?: string
  /** Numerator for determined frames per second (e.g. 29970) */
  readonly FrameRate_Num?: number
  /** Denominator for determined frames per second (e.g. 1000) */
  readonly FrameRate_Den?: number
  /** Minimum frames per second (e.g. 25.000) */
  readonly FrameRate_Minimum?: number
  /** Minimum frames per second, with measurement (e.g. 25.000 FPS) */
  readonly FrameRate_Minimum_String?: string
  /** Frames per second rounded to closest standard (e.g. 29.97) */
  readonly FrameRate_Nominal?: number
  /** Frames per second rounded to closest standard, with measurement (e.g. 29.97 fps) */
  readonly FrameRate_Nominal_String?: string
  /** Maximum frames per second */
  readonly FrameRate_Maximum?: number
  /** Maximum frames per second, with measurement */
  readonly FrameRate_Maximum_String?: string
  /** Frames per second */
  readonly FrameRate_Original?: number
  /** Frames per second, with measurement */
  readonly FrameRate_Original_String?: string
  /** Frames per second, numerator */
  readonly FrameRate_Original_Num?: number
  /** Frames per second, denominator */
  readonly FrameRate_Original_Den?: number
  /** Numer of frames */
  readonly FrameCount?: number
  /** Number of displayed elements */
  readonly ElementCount?: number
  /** Number of frames according to media header (media/stts atom) data */
  readonly Source_FrameCount?: number
  /** Color profile of the image (e.g. YUV) */
  readonly ColorSpace?: string
  /** Ratio of chroma to luma in encoded image (e.g. 4:2:2) */
  readonly ChromaSubsampling?: string
  /** Color information stored in the video frames, as integer (e.g. 10) */
  readonly BitDepth?: number
  /** Color information stored in the video frames, as string (e.g. 10 bits) */
  readonly BitDepth_String?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode_String?: string
  /** Stream size divided by uncompressed stream size */
  readonly Compression_Ratio?: number
  /** Delay fixed in the stream (relative), in ms */
  readonly Delay?: number
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String1?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String2?: string
  /** Delay fixed in the stream (relative) in format HH:MM:SS.mmm, with measurement */
  readonly Delay_String3?: string
  /** Delay in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Delay_String4?: string
  /** Delay in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_String5?: string
  /** Delay settings (e.g. in case of timecode) */
  readonly Delay_Settings?: string
  /** Delay drop frame information */
  readonly Delay_DropFrame?: string
  /** Source location of the Delay (e.g. Container, Stream, empty) */
  readonly Delay_Source?: string
  /** Source location of the Delay (e.g. Container, Stream, empty) */
  readonly Delay_Source_String?: string
  /** Delay, in ms */
  readonly Delay_Original?: number
  /** Delay, with measurement */
  readonly Delay_Original_String?: string
  /** Delay, with measurement */
  readonly Delay_Original_String1?: string
  /** Delay, with measurement */
  readonly Delay_Original_String2?: string
  /** Delay, in format HH:MM:SS.mmm */
  readonly Delay_Original_String3?: string
  /** Delay, in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Delay_Original_String4?: string
  /** Delay, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_Original_String5?: string
  /** Delay settings (e.g. in case of timecode) */
  readonly Delay_Original_Settings?: string
  /** Delay drop frame information */
  readonly Delay_Original_DropFrame?: string
  /** Delay source (e.g. Container, Stream, empty) */
  readonly Delay_Original_Source?: string
  /** Delay fixed in the stream relative to video, in ms (e.g. -80) */
  readonly Video_Delay?: number
  /** Delay fixed in the stream relative to video, in ms, with measurement (e.g. -80 ms) */
  readonly Video_Delay_String?: string
  /** Delay fixed in the stream relative to video, in ms, with measurement (e.g. -80 ms) */
  readonly Video_Delay_String1?: string
  /** Delay fixed in the stream relative to video, in ms, with measurement (e.g. -80 ms) */
  readonly Video_Delay_String2?: string
  /** Delay fixed in the stream relative to video, in format HH:MM:SS.mmm (e.g. -00:00:00.080) */
  readonly Video_Delay_String3?: string
  /** Delay in format HH:MM:SS:FF, with the last colon replaced by semicolon for drop frame if available */
  readonly Video_Delay_String4?: string
  /** Delay fixed in the stream relative to video, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Video_Delay_String5?: string
  /** Time code for first frame in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly TimeCode_FirstFrame?: string
  /** Time code for last frame (excluding the duration of the last frame) in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly TimeCode_LastFrame?: string
  /** Time code drop frame */
  readonly TimeCode_DropFrame?: string
  /** Additional time code settings */
  readonly TimeCode_Settings?: string
  /** Time code source (Container, Stream, SystemScheme1, SDTI, ANC, etc.) */
  readonly TimeCode_Source?: string
  /** Maximum frame number in time codes */
  readonly TimeCode_MaxFrameNumber?: string
  /** Theoritical maximum frame number in time codes */
  readonly TimeCode_MaxFrameNumber_Theory?: string
  /** Size of this stream, in bytes */
  readonly StreamSize?: number
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String?: string
  /** Size of this stream, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_String1?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_String2?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_String3?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_String4?: string
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly StreamSize_Proportion?: string
  /** Size of this stream after demuxing, in bytes */
  readonly StreamSize_Demuxed?: number
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String1?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String2?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Demuxed_String3?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Demuxed_String4?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String5?: string
  /** Size of content stored in the file, in bytes */
  readonly Source_StreamSize?: number
  /** Size of content stored in the file, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_String?: string
  /** Size of content stored in the file, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly Source_StreamSize_String1?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly Source_StreamSize_String2?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly Source_StreamSize_String3?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly Source_StreamSize_String4?: string
  /** Size of content stored in the file, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly Source_StreamSize_Proportion?: string
  /** Size of this stream when encoded, in bytes */
  readonly StreamSize_Encoded?: number
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Encoded_String?: string
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Encoded_String1?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Encoded_String2?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Encoded_String3?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Encoded_String4?: string
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Encoded_String5?: string
  /** Encoded Stream size divided by file size */
  readonly StreamSize_Encoded_Proportion?: string
  /** Size of content stored in the file when encoded, in bytes */
  readonly Source_StreamSize_Encoded?: number
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_Encoded_String?: string
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly Source_StreamSize_Encoded_String1?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly Source_StreamSize_Encoded_String2?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly Source_StreamSize_Encoded_String3?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly Source_StreamSize_Encoded_String4?: string
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_Encoded_String5?: string
  /** Source Encoded Stream size divided by file size */
  readonly Source_StreamSize_Encoded_Proportion?: string
  /** Title of file */
  readonly Title?: string
  /** Name of the software package used to create the file (e.g. Microsoft WaveEdiTY) @group Technical */
  readonly Encoded_Application?: string
  /** "Name of the software package used to create the file, in the format ""CompanyName ProductName (OperatingSystem) Version (Date)""" @group Technical */
  readonly Encoded_Application_String?: string
  /** Name of the company of the encoding application @group Technical */
  readonly Encoded_Application_CompanyName?: string
  /** Name of the encoding product @group Technical */
  readonly Encoded_Application_Name?: string
  /** Version of the encoding product @group Technical */
  readonly Encoded_Application_Version?: string
  /** URL associated with the encoding software @group Technical */
  readonly Encoded_Application_Url?: string
  /** Software used to create the file @group Technical */
  readonly Encoded_Library?: string
  /** "Software used to create the file, in the format ""CompanyName ProductName (OperatingSystem) Version (Date)""" @group Technical */
  readonly Encoded_Library_String?: string
  /** Name of the encoding software company @group Technical */
  readonly Encoded_Library_CompanyName?: string
  /** Name of the encoding software @group Technical */
  readonly Encoded_Library_Name?: string
  /** Version of the encoding software @group Technical */
  readonly Encoded_Library_Version?: string
  /** Release date of the encoding software, in UTC @group Technical */
  readonly Encoded_Library_Date?: string
  /** Parameters used by the encoding software @group Technical */
  readonly Encoded_Library_Settings?: string
  /** Operating System of the encoding software @group Technical */
  readonly Encoded_OperatingSystem?: string
  /** Language, formatted as 2-letter ISO 639-1 if exists, else 3-letter ISO 639-2, and with optional ISO 3166-1 country separated by a dash if available (e.g. en, en-US, en-CN) */
  readonly Language?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String1?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists (e.g. en) */
  readonly Language_String2?: string
  /** Language, formatted as 3-letter ISO 639-2, if exists (e.g. eng) */
  readonly Language_String3?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists, with optional ISO 3166-1 country separated by a dash if available (e.g. en-US) */
  readonly Language_String4?: string
  /** More information about Language (e.g. Director's Comment) */
  readonly Language_More?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind_String?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled_String?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default_String?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced_String?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup_String?: string
  /** Plot outline or a summary of the story */
  readonly Summary?: string
  /** Time/date/year that the encoding of this content was completed @group Temporal */
  readonly Encoded_Date?: string
  /** Time/date/year that the tags were added to this content @group Temporal */
  readonly Tagged_Date?: string
  /** Whether this stream is encrypted and, if available, how it is encrypted */
  readonly Encryption?: string
  readonly Events_Total?: string
  /** Minimum duration per event, in ms */
  readonly Events_MinDuration?: number
  /** Minimum duration per event in format XXx YYy, with YYy value omitted if zero */
  readonly Events_MinDuration_String?: string
  /** Minimum duration per event in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Events_MinDuration_String1?: string
  /** Minimum duration per event in format XXx YYy, with YYy omitted if value is zero */
  readonly Events_MinDuration_String2?: string
  /** Minimum duration per event in format HH:MM:SS.mmm */
  readonly Events_MinDuration_String3?: string
  /** Minimum duration per event in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Events_MinDuration_String4?: string
  /** Minimum duration per event in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Events_MinDuration_String5?: string
  readonly Events_PopOn?: string
  readonly Events_RollUp?: string
  readonly Events_PaintOn?: string
  readonly Lines_Count?: string
  readonly Lines_MaxCountPerEvent?: number
  readonly Lines_MaxCharacterCount?: number
  readonly FirstDisplay_Delay_Frames?: string
  readonly FirstDisplay_Type?: string
}

export interface VideoTrack extends BaseTrack {
  readonly '@type': 'Video'
  /** Level of the Format */
  readonly Format_Level?: string
  /** Tier of the Format */
  readonly Format_Tier?: string
  /** Profile of the base stream for Multiview Video Coding */
  readonly MultiView_BaseProfile?: string
  /** View count for Multiview Video Coding */
  readonly MultiView_Count?: string
  /** How views are muxed in the container for Multiview Video Coding */
  readonly MultiView_Layout?: string
  /** High Dynamic Range Format used */
  readonly HDR_Format?: string
  /** HDR Format used, along with version, profile, level, layers, settings, and compatibility information */
  readonly HDR_Format_String?: string
  /** Commercial name used by vendor for these HDR settings or HDR Format field if there is no difference */
  readonly HDR_Format_Commercial?: string
  /** Version of HDR Format */
  readonly HDR_Format_Version?: string
  /** Profile of HDR Format */
  readonly HDR_Format_Profile?: string
  /** Level of HDR Format */
  readonly HDR_Format_Level?: string
  /** HDR Format settings */
  readonly HDR_Format_Settings?: string
  /** Compression format of HDR Format */
  readonly HDR_Format_Compression?: string
  /** HDR Format compatibility with commercial products (e.g. HDR10) */
  readonly HDR_Format_Compatibility?: string
  /** Whether BVOP settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_BVOP?: string
  /** Whether BVOP settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_BVOP_String?: string
  /** Whether Quarter-pixel motion settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_QPel?: string
  /** Whether Quarter-pixel motion settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_QPel_String?: string
  /** Whether Global Motion Compensation settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_GMC?: number
  /** Whether Global Motion Compensation settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_GMC_String?: string
  /** Whether Matrix settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_Matrix?: string
  /** Whether Matrix settings are required for decoding MPEG (Yes, No) */
  readonly Format_Settings_Matrix_String?: string
  /** Matrix data, in base64-encoded binary format. Order: intra, non-intra, gray intra, gray non-intra */
  readonly Format_Settings_Matrix_Data?: string
  /** Whether CABAC support is required for decoding MPEG (Yes, No) */
  readonly Format_Settings_CABAC?: string
  /** Whether CABAC support is  required for decoding MPEG (Yes, No) */
  readonly Format_Settings_CABAC_String?: string
  /** Whether reference frames settings are required for decoding AVC (Yes, No) */
  readonly Format_Settings_RefFrames?: number
  /** Whether reference frames settings are required for decoding AVC (Yes, No) */
  readonly Format_Settings_RefFrames_String?: string
  /** Pulldown method (for film transferred to video) */
  readonly Format_Settings_Pulldown?: string
  /** Order of bytes required for decoding (Big, Little) */
  readonly Format_Settings_Endianness?: string
  /** Data packing method used in DPX frames (e.g. Packed, Filled A, Filled B) */
  readonly Format_Settings_Packing?: string
  /** Frame mode for decoding (e.g. Frame doubling, Frame tripling) */
  readonly Format_Settings_FrameMode?: string
  /** GOP method set for format (e.g. N=1, Variable) */
  readonly Format_Settings_GOP?: string
  /** Picture structure method set for format (e.g. Frame, Field) */
  readonly Format_Settings_PictureStructure?: string
  /** Wrapping mode set for format (e.g. Frame, Clip) */
  readonly Format_Settings_Wrapping?: string
  /** Numer of slices per frame */
  readonly Format_Settings_SliceCount?: number
  /** Numer of slices per frame */
  readonly Format_Settings_SliceCount_String?: string
  /** Internet Media Type a.k.a. MIME Type, Content-Type */
  readonly InternetMediaType?: string
  /** How this file is muxed in the container (e.g. Muxed in Video #1) */
  readonly MuxingMode?: string
  /** Play time of the stream, in s (ms for text output) */
  readonly Duration?: number
  /** Play time in format XXx YYy, with YYy value omitted if zero (e.g. 1 h 40 min) */
  readonly Duration_String?: string
  /** Play time in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_String1?: string
  /** Play time in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_String2?: string
  /** Play time in format HH:MM:SS.mmm (e.g. 01:40:00.000) */
  readonly Duration_String3?: string
  /** Play time in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_String4?: string
  /** Play time in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_String5?: string
  /** Duration of the first frame (if different than other frames), in ms */
  readonly Duration_FirstFrame?: number
  /** Duration of the first frame (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Duration_FirstFrame_String?: string
  /** Duration of the first frame (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_FirstFrame_String1?: string
  /** Duration of the first frame (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_FirstFrame_String2?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS.mmm */
  readonly Duration_FirstFrame_String3?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_FirstFrame_String4?: string
  /** Duration of the first frame (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_FirstFrame_String5?: string
  /** Duration of the last frame (if different than other frames), in ms */
  readonly Duration_LastFrame?: number
  /** Duration of the last frame (if different than other frames), in format XXx YYy, with YYy value omitted if zero */
  readonly Duration_LastFrame_String?: string
  /** Duration of the last frame (if different than other frames), in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Duration_LastFrame_String1?: string
  /** Duration of the last frame (if different than other frames), in format XXx YYy, with YYy omitted if value is zero */
  readonly Duration_LastFrame_String2?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS.mmm */
  readonly Duration_LastFrame_String3?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Duration_LastFrame_String4?: string
  /** Duration of the last frame (if different than other frames), in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Duration_LastFrame_String5?: string
  /** Duration of the file, of content stored in the file, in ms */
  readonly Source_Duration?: number
  /** Duration of the file, of content stored in the file, in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_String?: string
  /** Duration of the file, of content stored in the file, in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_String1?: string
  /** Duration of the file, of content stored in the file, in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_String2?: string
  /** Duration of the file, of content stored in the file, in format HH:MM:SS.mmm */
  readonly Source_Duration_String3?: string
  /** Duration of the file, of content stored in the file, in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_String4?: string
  /** Duration of the file, of content stored in the file, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_String5?: string
  /** Duration of the first frame, of content stored in the file, in ms */
  readonly Source_Duration_FirstFrame?: number
  /** Duration of the first frame, of content stored in the file, in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_FirstFrame_String?: string
  /** Duration of the first frame, of content stored in the file, in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_FirstFrame_String1?: string
  /** Duration of the first frame, of content stored in the file, in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_FirstFrame_String2?: string
  /** Duration of the first frame, of content stored in the file, in format HH:MM:SS.mmm */
  readonly Source_Duration_FirstFrame_String3?: string
  /** Duration of the first frame, of content stored in the file, in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_FirstFrame_String4?: string
  /** Duration of the first frame, of content stored in the file, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_FirstFrame_String5?: string
  /** Duration of the last frame, of content stored in the file, in ms */
  readonly Source_Duration_LastFrame?: number
  /** Duration of the last frame, of content stored in the file, in format XXx YYy, with YYy value omitted if zero */
  readonly Source_Duration_LastFrame_String?: string
  /** Duration of the last frame, of content stored in the file, in format HHh MMmn SSs MMMms, with any fields omitted if zero */
  readonly Source_Duration_LastFrame_String1?: string
  /** Duration of the last frame, of content stored in the file, in format XXx YYy, with YYy omitted if value is zero */
  readonly Source_Duration_LastFrame_String2?: string
  /** Duration of the last frame, of content stored in the file, in format HH:MM:SS.mmm */
  readonly Source_Duration_LastFrame_String3?: string
  /** Duration of the last frame, of content stored in the file, in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Source_Duration_LastFrame_String4?: string
  /** Duration of the last frame, of content stored in the file, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Source_Duration_LastFrame_String5?: string
  /** Bit rate mode of this stream (CBR, VBR) */
  readonly BitRate_Mode?: string
  /** Bit rate mode of this stream, as word (Variable, Constant) */
  readonly BitRate_Mode_String?: string
  /** Bit rate of this stream, in bps */
  readonly BitRate?: number
  /** Bit rate of this stream, with measurement (e.g. 128 kb/s) */
  readonly BitRate_String?: string
  /** Minimum bit rate of this stream, in bps */
  readonly BitRate_Minimum?: number
  /** Minimum bit rate of this stream, with measurement */
  readonly BitRate_Minimum_String?: string
  /** Nominal bit rate of this stream, in bps */
  readonly BitRate_Nominal?: number
  /** Nominal bit rate of this stream, with measurement */
  readonly BitRate_Nominal_String?: string
  /** Maximum bit rate of this stream, in bps */
  readonly BitRate_Maximum?: number
  /** Maximum bit rate of this stream, with measurement */
  readonly BitRate_Maximum_String?: string
  /** Encoded bit rate (with forced padding), if container padding is present, in bps */
  readonly BitRate_Encoded?: number
  /** Encoded bit rate (with forced padding), if container padding is present, in bps */
  readonly BitRate_Encoded_String?: string
  /** Width of frame (trimmed to clean aperture size if present) in pixels, as integer (e.g. 1920) */
  readonly Width?: number
  /** Width of frame (trimmed to clean aperture size if present) in pixels, presented in SI unit digit spacing style, with measurement (e.g. 1 920 pixels) */
  readonly Width_String?: string
  /** Offset between original width and displayed width, in pixels */
  readonly Width_Offset?: number
  /** Offset between original width and displayed width, in pixels */
  readonly Width_Offset_String?: string
  /** Width of frame (not including aperture size if present) in pixels, presented as integer (e.g. 1920) */
  readonly Width_Original?: number
  /** Width of frame (not including aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 920 pixels) */
  readonly Width_Original_String?: string
  /** Width of frame (trimmed to clean aperture size if present) in pixels, presented as integer (e.g. 1920) */
  readonly Width_CleanAperture?: number
  /** Width of frame (trimmed to clean aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 920 pixels) */
  readonly Width_CleanAperture_String?: string
  /** Height of frame (including aperture size if present) in pixels, presented as integer (e.g. 1080) */
  readonly Height?: number
  /** Height of frame (including aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 080 pixels) */
  readonly Height_String?: string
  /** Offset between original height and displayed height, in pixels */
  readonly Height_Offset?: number
  /** Offset between original height and displayed height, in pixels */
  readonly Height_Offset_String?: string
  /** Height of frame (not including aperture size if present) in pixels, presented as integer (e.g. 1080) */
  readonly Height_Original?: number
  /** Height of frame (not including aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 080 pixels) */
  readonly Height_Original_String?: string
  /** Height of frame (trimmed to clean aperture size if present) in pixels, presented as integer (e.g. 1080) */
  readonly Height_CleanAperture?: number
  /** Height of frame (trimmed to clean aperture size if present) in pixels, present in SI unit digit spacing style, with measurement (e.g. 1 800 pixels) */
  readonly Height_CleanAperture_String?: string
  /** Width of frame, considering data stored in the codec */
  readonly Stored_Width?: number
  /** Height of frame, considering data stored in the codec */
  readonly Stored_Height?: number
  /** Width of frame, from data derived from video stream */
  readonly Sampled_Width?: number
  /** Height of frame, from data derived from video stream */
  readonly Sampled_Height?: number
  /** Width of a pixel as compared to the height (e.g. 1.422) */
  readonly PixelAspectRatio?: number
  /** Width of a pixel as compared to the height (e.g. 1.422) */
  readonly PixelAspectRatio_String?: string
  /** Width of a pixel as compared to the height (e.g. 1.422). This field is only shown if the container and codec values are different */
  readonly PixelAspectRatio_Original?: number
  /** Width of a pixel as compared to the height (e.g. 1.422). This field is only shown if the container and codec values are different */
  readonly PixelAspectRatio_Original_String?: string
  /** Width of a pixel as compared to the height, considering clean aperture dimensions (e.g. 1.422). This field is only shown if the values are different */
  readonly PixelAspectRatio_CleanAperture?: number
  /** Width of a pixel as compared to the height, considering clean aperture dimensions (e.g. 1.422). This field is only shown if the values are different */
  readonly PixelAspectRatio_CleanAperture_String?: string
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio?: number
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_String?: string
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_Original?: number
  /** The proportional relationship between the width and height of a frame (e.g. 4:3) */
  readonly DisplayAspectRatio_Original_String?: string
  /** The proportional relationship between the width and height of a frame, considering clean aperture dimensions (e.g. 4:3) */
  readonly DisplayAspectRatio_CleanAperture?: number
  /** The proportional relationship between the width and height of a frame, considering clean aperture dimensions (e.g. 4:3) */
  readonly DisplayAspectRatio_CleanAperture_String?: string
  /** Active Format Description, as value code (e.g. 001) */
  readonly ActiveFormatDescription?: string
  /** Active Format Description, as text (e.g. 4:3) */
  readonly ActiveFormatDescription_String?: string
  /** Muxing mode used for Active Format Description (AFD value). Options are A/53 (for Raw) or SMPTE ST 2016-3 (for Ancillary) */
  readonly ActiveFormatDescription_MuxingMode?: string
  /** Width of frame, not considering black bars */
  readonly Active_Width?: number
  /** Width of frame, not considering black bars, in pixels, presented in SI unit digit spacing style, with measurement (e.g. 1 920 pixels) */
  readonly Active_Width_String?: string
  /** Height of frame, not considering black bars */
  readonly Active_Height?: number
  /** Height of frame, not considering black bars, in pixels, presented in SI unit digit spacing style, with measurement (e.g. 1 080 pixels) */
  readonly Active_Height_String?: string
  /** The proportional relationship between the active width and active height of a frame (e.g. 4:3) */
  readonly Active_DisplayAspectRatio?: number
  /** The proportional relationship between the active width and active height of a frame (e.g. 4:3) */
  readonly Active_DisplayAspectRatio_String?: string
  /** Rotation of video, derived from track header data, in degrees */
  readonly Rotation?: string
  /** Rotation of video, derived from track header data, in degrees */
  readonly Rotation_String?: string
  /** Frame rate mode, as acronym (e.g. CFR, VFR) */
  readonly FrameRate_Mode?: string
  /** Frame rate mode, as word (e.g. Constant, Variable) */
  readonly FrameRate_Mode_String?: string
  /** Original frame rate mode, as acronym (e.g. CFR, VFR) */
  readonly FrameRate_Mode_Original?: string
  /** Original frame rate mode, as word (Constant, Variable) */
  readonly FrameRate_Mode_Original_String?: string
  /** Frames per second, as float (e.g. 29.970) */
  readonly FrameRate?: number
  /** Frames per second, with measurement (e.g. 29.970 (29970/1000) FPS) */
  readonly FrameRate_String?: string
  /** Numerator for determined frames per second (e.g. 29970) */
  readonly FrameRate_Num?: number
  /** Denominator for determined frames per second (e.g. 1000) */
  readonly FrameRate_Den?: number
  /** Minimum frames per second (e.g. 25.000) */
  readonly FrameRate_Minimum?: number
  /** Minimum frames per second, with measurement (e.g. 25.000 FPS) */
  readonly FrameRate_Minimum_String?: string
  /** Frames per second rounded to closest standard (e.g. 24.98) */
  readonly FrameRate_Nominal?: number
  /** Frames per second rounded to closest standard, with measurement (e.g. 29.97 fps) */
  readonly FrameRate_Nominal_String?: string
  /** Maximum frames per second */
  readonly FrameRate_Maximum?: number
  /** Maximum frames per second, with measurement */
  readonly FrameRate_Maximum_String?: string
  /** Frames per second */
  readonly FrameRate_Original?: number
  /** Frames per second, with measurement */
  readonly FrameRate_Original_String?: string
  /** Numerator for determined frames per second (e.g. 29970) */
  readonly FrameRate_Original_Num?: number
  /** Denominator for determined frames per second (e.g. 1000) */
  readonly FrameRate_Original_Den?: number
  /** Real (capture) frames per second */
  readonly FrameRate_Real?: number
  /** Real (capture) frames per second (with measurement) */
  readonly FrameRate_Real_String?: string
  /** Numer of frames */
  readonly FrameCount?: number
  /** Number of frames according to media header (media/stts atom) data */
  readonly Source_FrameCount?: number
  /** Either the NTSC or PAL color encoding system, as stored in the content */
  readonly Standard?: string
  /** Color profile of the image (e.g. YUV) */
  readonly ColorSpace?: string
  /** Ratio of chroma to luma in encoded image (e.g. 4:2:2) */
  readonly ChromaSubsampling?: string
  /** Ratio of chroma to luma in encoded image (e.g. 4:2:2) */
  readonly ChromaSubsampling_String?: string
  /** Position type of chroma subsampling */
  readonly ChromaSubsampling_Position?: string
  /** Color information stored in the video frames, as integer (e.g. 10) */
  readonly BitDepth?: number
  /** Color information stored in the video frames, as string (e.g. 10 bits) */
  readonly BitDepth_String?: string
  /** Way in which lines of video are displayed (e.g. Progressive) */
  readonly ScanType?: string
  /** Way in which lines of video are displayed (e.g. Progressive) */
  readonly ScanType_String?: string
  /** Way in which lines of video are encoded (e.g. Progressive) */
  readonly ScanType_Original?: string
  /** Way in which lines of video are encoded (e.g. Progressive) */
  readonly ScanType_Original_String?: string
  /** Whether the video's ScanType is stored with fields separated or interleaved */
  readonly ScanType_StoreMethod?: string
  /** Count of fields per container block */
  readonly ScanType_StoreMethod_FieldsPerBlock?: string
  /** Whether the video's ScanType is stored with fields separated or interleaved */
  readonly ScanType_StoreMethod_String?: string
  /** Order in which lines are encoded, as acronym (e.g. TFF) */
  readonly ScanOrder?: string
  /** Order in which lines are encoded, as acronym (e.g. TFF) */
  readonly ScanOrder_String?: string
  /** Stored ScanOrder, displayed when the stored order is not same as the display order */
  readonly ScanOrder_Stored?: string
  /** Stored ScanOrder, displayed when the stored order is not same as the display order */
  readonly ScanOrder_Stored_String?: string
  /** Field is set to Yes when display and stored orders are inverted */
  readonly ScanOrder_StoredDisplayedInverted?: string
  /** Whether the video's ScanType is stored with fields separated or interleaved */
  readonly ScanOrder_Original?: string
  /** Whether the video's ScanType is stored with fields separated or interleaved */
  readonly ScanOrder_Original_String?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode?: string
  /** Compression mode (Lossy, Lossless) */
  readonly Compression_Mode_String?: string
  /** Stream size divided by uncompressed stream size */
  readonly Compression_Ratio?: number
  /** Bits divided by Pixel multiplied by Frame */
  readonly 'Bits-Pixel_Frame'?: number
  /** Delay fixed in the stream (relative), in ms */
  readonly Delay?: number
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String1?: string
  /** Delay fixed in the stream (relative), with measurement */
  readonly Delay_String2?: string
  /** Delay fixed in the stream (relative) in format HH:MM:SS.mmm, with measurement */
  readonly Delay_String3?: string
  /** Delay in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Delay_String4?: string
  /** Delay in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_String5?: string
  /** Delay settings (e.g. in case of timecode) */
  readonly Delay_Settings?: string
  /** Delay drop frame information */
  readonly Delay_DropFrame?: string
  /** Source location of the Delay (e.g. Container, Stream, empty) */
  readonly Delay_Source?: string
  /** Source location of the Delay (e.g. Container, Stream, empty) */
  readonly Delay_Source_String?: string
  /** Delay, in ms */
  readonly Delay_Original?: number
  /** Delay, with measurement */
  readonly Delay_Original_String?: string
  /** Delay, with measurement */
  readonly Delay_Original_String1?: string
  /** Delay, with measurement */
  readonly Delay_Original_String2?: string
  /** Delay, in format HH:MM:SS.mmm */
  readonly Delay_Original_String3?: string
  /** Delay, in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly Delay_Original_String4?: string
  /** Delay, in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly Delay_Original_String5?: string
  /** Delay settings (e.g. in case of timecode) */
  readonly Delay_Original_Settings?: string
  /** Delay drop frame information */
  readonly Delay_Original_DropFrame?: string
  /** Delay source (e.g. Container, Stream, empty) */
  readonly Delay_Original_Source?: string
  /** Timestamp fixed in the stream (relative), in ms */
  readonly TimeStamp_FirstFrame?: number
  /** Timestamp fixed in the stream (relative), with measurement */
  readonly TimeStamp_FirstFrame_String?: string
  /** Timestamp fixed in the stream (relative), with measurement */
  readonly TimeStamp_FirstFrame_String1?: string
  /** Timestamp fixed in the stream (relative), with measurement */
  readonly TimeStamp_FirstFrame_String2?: string
  /** Timestamp in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly TimeStamp_FirstFrame_String3?: string
  /** Timestamp in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly TimeStamp_FirstFrame_String4?: string
  /** Timestamp in format HH:MM:SS.mmm (HH:MM:SS:FF) */
  readonly TimeStamp_FirstFrame_String5?: string
  /** Time code for first frame in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly TimeCode_FirstFrame?: string
  /** Time code for last frame (excluding the duration of the last frame) in format HH:MM:SS:FF, with last colon replaced by semicolon for drop frame if available */
  readonly TimeCode_LastFrame?: string
  /** Time code drop frame */
  readonly TimeCode_DropFrame?: string
  /** Additional time code settings */
  readonly TimeCode_Settings?: string
  /** Time code source (Container, Stream, SystemScheme1, SDTI, ANC, etc.) */
  readonly TimeCode_Source?: string
  /** Time code information about Open/Closed GOP */
  readonly Gop_OpenClosed?: string
  /** Time code information about Open/Closed GOP */
  readonly Gop_OpenClosed_String?: string
  /** Time code information about Open/Closed of first frame if GOP is Open for the other GOPs */
  readonly Gop_OpenClosed_FirstFrame?: string
  /** Time code information about Open/Closed of first frame if GOP is Open for the other GOPs */
  readonly Gop_OpenClosed_FirstFrame_String?: string
  /** Size of this stream, in bytes */
  readonly StreamSize?: number
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String?: string
  /** Size of this stream, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_String1?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_String2?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_String3?: string
  /** Size of this stream, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_String4?: string
  /** Size of this stream, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly StreamSize_Proportion?: string
  /** Size of this stream after demuxing, in bytes */
  readonly StreamSize_Demuxed?: number
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String1?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Demuxed_String2?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Demuxed_String3?: string
  /** Size of this stream after demuxing, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Demuxed_String4?: string
  /** Size of this stream after demuxing, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Demuxed_String5?: string
  /** Size of content stored in the file, in bytes */
  readonly Source_StreamSize?: number
  /** Size of content stored in the file, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_String?: string
  /** Size of content stored in the file, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly Source_StreamSize_String1?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly Source_StreamSize_String2?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly Source_StreamSize_String3?: string
  /** Size of content stored in the file, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly Source_StreamSize_String4?: string
  /** Size of content stored in the file, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_String5?: string
  /** Size of this stream divided by total file size */
  readonly Source_StreamSize_Proportion?: string
  /** Size of this stream when encoded, in bytes */
  readonly StreamSize_Encoded?: number
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Encoded_String?: string
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly StreamSize_Encoded_String1?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly StreamSize_Encoded_String2?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly StreamSize_Encoded_String3?: string
  /** Size of this stream when encoded, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly StreamSize_Encoded_String4?: string
  /** Size of this stream when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly StreamSize_Encoded_String5?: string
  /** Encoded Stream size divided by file size */
  readonly StreamSize_Encoded_Proportion?: string
  /** Size of content stored in the file when encoded, in bytes */
  readonly Source_StreamSize_Encoded?: number
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_Encoded_String?: string
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) rounded to the nearest integer (e.g. 11 MiB) */
  readonly Source_StreamSize_Encoded_String1?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the two most significant digits (e.g. 11 MiB) */
  readonly Source_StreamSize_Encoded_String2?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the three most significant digits (e.g. 10.5 MiB) */
  readonly Source_StreamSize_Encoded_String3?: string
  /** Size of content stored in the file when encoded, measurement (measured in powers of 1024) rounded to the four most significant digits (e.g. 10.50 MiB) */
  readonly Source_StreamSize_Encoded_String4?: string
  /** Size of content stored in the file when encoded, with measurement (measured in powers of 1024) and percentage value (e.g. 10.5 MiB (98%)) */
  readonly Source_StreamSize_Encoded_String5?: string
  /** Source Encoded Stream size divided by file size */
  readonly Source_StreamSize_Encoded_Proportion?: string
  /** How this stream is aligned in the container (e.g. Aligned, Split) */
  readonly Alignment?: string
  /** How this stream is aligned in the container (e.g. Aligned, Split) */
  readonly Alignment_String?: string
  /** Title of track */
  readonly Title?: string
  /** Name of the software package used to create the file (e.g. Microsoft WaveEdiTY) @group Technical */
  readonly Encoded_Application?: string
  /** Name of the software package used to create the file, in the format "CompanyName ProductName (OperatingSystem) Version (Date)" @group Technical */
  readonly Encoded_Application_String?: string
  /** Name of the company of the encoding application @group Technical */
  readonly Encoded_Application_CompanyName?: string
  /** Name of the encoding product @group Technical */
  readonly Encoded_Application_Name?: string
  /** Version of the encoding product @group Technical */
  readonly Encoded_Application_Version?: string
  /** URL associated with the encoding software @group Technical */
  readonly Encoded_Application_Url?: string
  /** Software used to create the file @group Technical */
  readonly Encoded_Library?: string
  /** Software used to create the file, in the format "CompanyName ProductName (OperatingSystem) Version (Date)" @group Technical */
  readonly Encoded_Library_String?: string
  /** Name of the encoding software company @group Technical */
  readonly Encoded_Library_CompanyName?: string
  /** Name of the encoding software @group Technical */
  readonly Encoded_Library_Name?: string
  /** Version of the encoding software @group Technical */
  readonly Encoded_Library_Version?: string
  /** Release date of the encoding software, in UTC @group Technical */
  readonly Encoded_Library_Date?: string
  /** Parameters used by the encoding software @group Technical */
  readonly Encoded_Library_Settings?: string
  /** Operating System of the encoding software @group Technical */
  readonly Encoded_OperatingSystem?: string
  /** Language, formatted as 2-letter ISO 639-1 if exists, else 3-letter ISO 639-2, and with optional ISO 3166-1 country separated by a dash if available (e.g. en, en-US, en-CN) */
  readonly Language?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String?: string
  /** Language, as full name (e.g. English) */
  readonly Language_String1?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists (e.g. en) */
  readonly Language_String2?: string
  /** Language, formatted as 3-letter ISO 639-2, if exists (e.g. eng) */
  readonly Language_String3?: string
  /** Language, formatted as 2-letter ISO 639-1, if exists, with optional ISO 3166-1 country separated by a dash if available (e.g. en-US) */
  readonly Language_String4?: string
  /** More information about Language (e.g. Director's Comment) */
  readonly Language_More?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind?: string
  /** Type of assisted service (e.g. visually impaired, commentary, voice over) */
  readonly ServiceKind_String?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled?: string
  /** Set if this stream should not be used (Yes, No) */
  readonly Disabled_String?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default?: string
  /** Flag set if this stream should be used if no language found matches the user preference (Yes, No) */
  readonly Default_String?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced?: string
  /** Flag set if this stream should be used regardless of user preferences, often used for sparse subtitle dialogue in an otherwise unsubtitled movie (Yes, No) */
  readonly Forced_String?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup?: string
  /** Number of a group in order to provide versions of the same track */
  readonly AlternateGroup_String?: string
  /** Time that the encoding of this item was completed, in UTC @group Temporal */
  readonly Encoded_Date?: string
  /** Time that the tags were added to this item, in UTC @group Temporal */
  readonly Tagged_Date?: string
  /** Whether this stream is encrypted and, if available, how it is encrypted */
  readonly Encryption?: string
  /** The minimum size of the buffer needed to decode the sequence */
  readonly BufferSize?: string
  /** Presence of color description (Yes, No) */
  readonly colour_description_present?: string
  /** Presence of colour description (source) */
  readonly colour_description_present_Source?: string
  /** Presence of colour description (if incoherencies) */
  readonly colour_description_present_Original?: string
  /** Presence of colour description (source if incoherencies) */
  readonly colour_description_present_Original_Source?: string
  /** Color range for YUV color space */
  readonly colour_range?: string
  /** Colour range for YUV colour space (source) */
  readonly colour_range_Source?: string
  /** Colour range for YUV colour space (if incoherencies) */
  readonly colour_range_Original?: string
  /** Colour range for YUV colour space (source if incoherencies) */
  readonly colour_range_Original_Source?: string
  /** Chromaticity coordinates of the source primaries */
  readonly colour_primaries?: string
  /** Chromaticity coordinates of the source primaries (source) */
  readonly colour_primaries_Source?: string
  /** Chromaticity coordinates of the source primaries (if incoherencies) */
  readonly colour_primaries_Original?: string
  /** Chromaticity coordinates of the source primaries (source if incoherencies) */
  readonly colour_primaries_Original_Source?: string
  /** Opto-electronic transfer characteristic of the source picture */
  readonly transfer_characteristics?: string
  /** Opto-electronic transfer characteristic of the source picture (source) */
  readonly transfer_characteristics_Source?: string
  /** Opto-electronic transfer characteristic of the source picture (if incoherencies) */
  readonly transfer_characteristics_Original?: string
  /** Opto-electronic transfer characteristic of the source picture (source if incoherencies) */
  readonly transfer_characteristics_Original_Source?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries */
  readonly matrix_coefficients?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries (source) */
  readonly matrix_coefficients_Source?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries (if incoherencies) */
  readonly matrix_coefficients_Original?: string
  /** Matrix coefficients used in deriving luma and chroma signals from the green, blue, and red primaries (source if incoherencies) */
  readonly matrix_coefficients_Original_Source?: string
  /** Chromaticity coordinates of the source primaries of the mastering display */
  readonly MasteringDisplay_ColorPrimaries?: string
  /** Chromaticity coordinates of the source primaries of the mastering display (source) */
  readonly MasteringDisplay_ColorPrimaries_Source?: string
  /** Chromaticity coordinates of the source primaries of the mastering display (if incoherencies) */
  readonly MasteringDisplay_ColorPrimaries_Original?: string
  /** Chromaticity coordinates of the source primaries of the mastering display (source if incoherencies) */
  readonly MasteringDisplay_ColorPrimaries_Original_Source?: string
  /** Luminance of the mastering display */
  readonly MasteringDisplay_Luminance?: string
  /** Luminance of the mastering display (source) */
  readonly MasteringDisplay_Luminance_Source?: string
  /** Luminance of the mastering display (if incoherencies) */
  readonly MasteringDisplay_Luminance_Original?: string
  /** Luminance of the mastering display (source if incoherencies) */
  readonly MasteringDisplay_Luminance_Original_Source?: string
  /** Maximum content light level */
  readonly MaxCLL?: string
  /** Maximum content light level (source) */
  readonly MaxCLL_Source?: string
  /** Maximum content light level (if incoherencies) */
  readonly MaxCLL_Original?: string
  /** Maximum content light level (source if incoherencies) */
  readonly MaxCLL_Original_Source?: string
  /** Maximum frame average light level */
  readonly MaxFALL?: string
  /** Maximum frame average light level (source) */
  readonly MaxFALL_Source?: string
  /** Maximum frame average light level (if incoherencies) */
  readonly MaxFALL_Original?: string
  /** Maximum frame average light level (source if incoherencies) */
  readonly MaxFALL_Original_Source?: string
}

export type Track =
  | GeneralTrack
  | VideoTrack
  | AudioTrack
  | TextTrack
  | ImageTrack
  | MenuTrack
  | OtherTrack

export interface Media {
  readonly '@ref': string
  readonly track: Track[]
}

export interface MediaInfoResult {
  readonly creatingApplication?: CreationInfo
  readonly creatingLibrary?: CreationInfo
  readonly media?: Media
}
