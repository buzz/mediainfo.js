// DO NOT EDIT! File generated using `generate-types` script.

export const INT_FIELDS = [
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
  'StreamOrder',
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

export interface CreationType {
  readonly version: string
  readonly url?: string
  readonly build_date?: string
  readonly build_time?: string
  readonly compiler_ident?: string
}

export type ExtraType = Record<string, unknown>

export interface TrackType {
  /** Documents the type of encoded media with the track, ie: General, Video, Audio, Text, Image, etc. */
  readonly '@type': 'General' | 'Video' | 'Audio' | 'Text' | 'Image' | 'Chapters' | 'Menu'
  /** If there is more than one track of the same type (i.e. four audio tracks) this attribute will number them according to storage order within the bitstream. */
  readonly '@typeorder'?: string
  readonly Accompaniment?: string
  /** This element describes Active Format Description (AFD) codes as described in the DVB standard TS 101 154. */
  readonly ActiveFormatDescription?: string
  readonly Actor?: string
  readonly Actor_Character?: string
  readonly Added_Date?: string
  readonly Album?: string
  readonly Album_More?: string
  readonly Album_Performer?: string
  readonly Album_Performer_Sort?: string
  /** This element describes album-gain values to attenuate the signal on a per-album basis. */
  readonly Album_ReplayGain_Gain?: string
  /** This element describes peak loudness levels when measuring a signal on a per-album basis. */
  readonly Album_ReplayGain_Peak?: string
  readonly ActiveFormatDescription_MuxingMode?: string
  readonly ActiveFormatDescription_String?: string
  readonly Album_Performer_Url?: string
  readonly Album_ReplayGain_Gain_String?: string
  readonly Album_Sort?: string
  readonly Alignment?: string
  readonly Alignment_String?: string
  readonly AlternateGroup?: string
  readonly AlternateGroup_String?: string
  readonly Archival_Location?: string
  readonly Arranger?: string
  readonly ArtDirector?: string
  readonly AssistantDirector?: string
  readonly Audio_Codec_List?: string
  readonly AudioCount?: number
  readonly Audio_Channels_Total?: number
  readonly Audio_Format_List?: string
  readonly Audio_Format_WithHint_List?: string
  readonly Audio_Language_List?: string
  readonly BarCode?: string
  readonly BitDepth_Detected?: number
  readonly BitDepth_Detected_String?: string
  readonly BitDepth?: number
  readonly BitDepth_Stored?: number
  readonly BitDepth_Stored_String?: string
  readonly BitDepth_String?: string
  readonly BitRate_Encoded?: number
  readonly BitRate_Encoded_String?: string
  readonly BitRate_Maximum?: number
  readonly BitRate_Maximum_String?: string
  readonly BitRate_Minimum?: number
  readonly BitRate_Minimum_String?: string
  readonly BitRate?: number
  readonly BitRate_Mode?: string
  readonly BitRate_Mode_String?: string
  readonly BitRate_Nominal?: number
  readonly BitRate_Nominal_String?: string
  readonly BitRate_String?: string
  readonly 'Bits-Pixel_Frame'?: number
  readonly BitsPixel_Frame?: number
  readonly BPM?: string
  readonly BufferSize?: string
  readonly CatalogNumber?: string
  readonly ChannelLayoutID?: string
  readonly ChannelLayout?: string
  readonly ChannelLayout_Original?: string
  readonly ChannelPositions?: string
  readonly ChannelPositions_Original?: string
  readonly ChannelPositions_Original_String2?: string
  readonly ChannelPositions_String2?: string
  readonly Channels?: number
  readonly Channels_Original?: number
  readonly Channels_Original_String?: string
  readonly Channels_String?: string
  readonly Chapter?: string
  readonly Chapters_Pos_Begin?: number
  readonly Chapters_Pos_End?: number
  readonly Choregrapher?: string
  readonly ChromaSubsampling?: string
  readonly ChromaSubsampling_Position?: string
  readonly ChromaSubsampling_String?: string
  readonly Codec_CC?: string
  readonly Codec_Description?: string
  readonly Codec_Extensions?: string
  readonly Codec_Family?: string
  readonly CodecID_Compatible?: string
  readonly CodecID_Description?: string
  readonly CodecID_Hint?: string
  readonly CodecID_Info?: string
  readonly CodecID?: string
  readonly CodecID_String?: string
  readonly CodecID_Url?: string
  readonly CodecID_Version?: string
  readonly Codec_Info?: string
  readonly Codec?: string
  readonly Codec_Profile?: string
  readonly Codec_Settings_Automatic?: string
  readonly Codec_Settings_BVOP?: string
  readonly Codec_Settings_CABAC?: string
  readonly Codec_Settings_Endianness?: string
  readonly Codec_Settings_Firm?: string
  readonly Codec_Settings_Floor?: string
  readonly Codec_Settings_GMC?: string
  readonly Codec_Settings_GMC_String?: string
  readonly Codec_Settings_ITU?: string
  readonly Codec_Settings_Law?: string
  readonly Codec_Settings_Matrix_Data?: string
  readonly Codec_Settings_Matrix?: string
  readonly Codec_Settings?: string
  readonly Codec_Settings_PacketBitStream?: string
  readonly Codec_Settings_QPel?: string
  readonly Codec_Settings_RefFrames?: string
  readonly Codec_Settings_Sign?: string
  readonly Codec_String?: string
  readonly Codec_Url?: string
  readonly CoDirector?: string
  readonly Collection?: string
  readonly Colorimetry?: string
  readonly ColorSpace?: string
  readonly colour_description_present?: string
  readonly colour_description_present_Original?: string
  readonly colour_description_present_Original_Source?: string
  readonly colour_description_present_Source?: string
  readonly colour_primaries?: string
  readonly colour_primaries_Original?: string
  readonly colour_primaries_Original_Source?: string
  readonly colour_primaries_Source?: string
  readonly colour_range?: string
  readonly colour_range_Original?: string
  readonly colour_range_Original_Source?: string
  readonly colour_range_Source?: string
  readonly Comic?: string
  readonly Comic_More?: string
  readonly Comic_Position_Total?: number
  readonly Comment?: string
  readonly CommissionedBy?: string
  readonly Compilation?: string
  readonly Compilation_String?: string
  readonly CompleteName_Last?: string
  readonly CompleteName?: string
  readonly Composer?: string
  readonly Composer_Nationality?: string
  readonly Composer_Sort?: string
  readonly Compression_Mode?: string
  readonly Compression_Mode_String?: string
  readonly Compression_Ratio?: number
  readonly Conductor?: string
  readonly ContentType?: string
  readonly CoProducer?: string
  readonly Copyright?: string
  readonly Copyright_Url?: string
  readonly CostumeDesigner?: string
  readonly Count?: number
  readonly Countries?: string
  readonly Country?: string
  readonly Cover_Data?: string
  readonly Cover_Description?: string
  readonly Cover_Mime?: string
  readonly Cover?: string
  readonly Cover_Type?: string
  readonly Cropped?: string
  readonly DataSize?: number
  readonly Default?: string
  readonly Default_String?: string
  readonly Delay_DropFrame?: string
  readonly Delay?: number
  readonly Delay_Original_DropFrame?: string
  readonly Delay_Original?: number
  readonly Delay_Original_Settings?: string
  readonly Delay_Original_Source?: string
  readonly Delay_Original_String1?: string
  readonly Delay_Original_String2?: string
  readonly Delay_Original_String3?: string
  readonly Delay_Original_String4?: string
  readonly Delay_Original_String5?: string
  readonly Delay_Original_String?: string
  readonly Delay_Settings?: string
  readonly Delay_Source?: string
  readonly Delay_Source_String?: string
  readonly Delay_String1?: string
  readonly Delay_String2?: string
  readonly Delay_String3?: string
  readonly Delay_String4?: string
  readonly Delay_String5?: string
  readonly Delay_String?: string
  readonly Description?: string
  readonly Dimensions?: string
  readonly Director?: string
  readonly DirectorOfPhotography?: string
  readonly Disabled?: string
  readonly Disabled_String?: string
  readonly DisplayAspectRatio_CleanAperture?: number
  readonly DisplayAspectRatio_CleanAperture_String?: string
  readonly DisplayAspectRatio?: number
  readonly DisplayAspectRatio_Original?: number
  readonly DisplayAspectRatio_Original_String?: string
  readonly DisplayAspectRatio_String?: string
  readonly DistributedBy?: string
  readonly DolbyVision_Layers?: string
  readonly DolbyVision_Profile?: string
  readonly DolbyVision_Version?: string
  readonly Domain?: string
  readonly DotsPerInch?: string
  readonly Duration_Base?: string
  readonly Duration_End_Command?: number
  readonly Duration_End_Command_String1?: string
  readonly Duration_End_Command_String2?: string
  readonly Duration_End_Command_String3?: string
  readonly Duration_End_Command_String4?: string
  readonly Duration_End_Command_String5?: string
  readonly Duration_End_Command_String?: string
  readonly Duration_End?: number
  readonly Duration_End_String1?: string
  readonly Duration_End_String2?: string
  readonly Duration_End_String3?: string
  readonly Duration_End_String4?: string
  readonly Duration_End_String5?: string
  readonly Duration_End_String?: string
  readonly Duration_FirstFrame?: number
  readonly Duration_FirstFrame_String1?: string
  readonly Duration_FirstFrame_String2?: string
  readonly Duration_FirstFrame_String3?: string
  readonly Duration_FirstFrame_String4?: string
  readonly Duration_FirstFrame_String5?: string
  readonly Duration_FirstFrame_String?: string
  readonly Duration_LastFrame?: number
  readonly Duration_LastFrame_String1?: string
  readonly Duration_LastFrame_String2?: string
  readonly Duration_LastFrame_String3?: string
  readonly Duration_LastFrame_String4?: string
  readonly Duration_LastFrame_String5?: string
  readonly Duration_LastFrame_String?: string
  readonly Duration?: number
  readonly Duration_Start2End?: number
  readonly Duration_Start2End_String1?: string
  readonly Duration_Start2End_String2?: string
  readonly Duration_Start2End_String3?: string
  readonly Duration_Start2End_String4?: string
  readonly Duration_Start2End_String5?: string
  readonly Duration_Start2End_String?: string
  readonly Duration_Start_Command?: number
  readonly Duration_Start_Command_String1?: string
  readonly Duration_Start_Command_String2?: string
  readonly Duration_Start_Command_String3?: string
  readonly Duration_Start_Command_String4?: string
  readonly Duration_Start_Command_String5?: string
  readonly Duration_Start_Command_String?: string
  readonly Duration_Start?: number
  readonly Duration_Start_String1?: string
  readonly Duration_Start_String2?: string
  readonly Duration_Start_String3?: string
  readonly Duration_Start_String4?: string
  readonly Duration_Start_String5?: string
  readonly Duration_Start_String?: string
  readonly Duration_String1?: string
  readonly Duration_String2?: string
  readonly Duration_String3?: string
  readonly Duration_String4?: string
  readonly Duration_String5?: string
  readonly Duration_String?: string
  readonly EditedBy?: string
  readonly ElementCount?: number
  readonly Encoded_Application_CompanyName?: string
  readonly Encoded_Application?: string
  readonly Encoded_Application_Name?: string
  readonly Encoded_Application_String?: string
  readonly Encoded_Application_Url?: string
  readonly Encoded_Application_Version?: string
  readonly EncodedBy?: string
  readonly Encoded_Date?: string
  readonly Encoded_Library_CompanyName?: string
  readonly Encoded_Library_Date?: string
  readonly Encoded_Library?: string
  readonly Encoded_Library_Name?: string
  readonly Encoded_Library_Settings?: string
  readonly Encoded_Library_String?: string
  readonly Encoded_Library_Version?: string
  readonly Encoded_OperatingSystem?: string
  readonly Encryption_Format?: string
  readonly Encryption_InitializationVector?: string
  readonly Encryption_Length?: string
  readonly Encryption_Method?: string
  readonly Encryption?: string
  readonly Encryption_Mode?: string
  readonly Encryption_Padding?: string
  readonly EPG_Positions_Begin?: number
  readonly EPG_Positions_End?: number
  readonly Events_MinDuration?: number
  readonly Events_MinDuration_String1?: string
  readonly Events_MinDuration_String2?: string
  readonly Events_MinDuration_String3?: string
  readonly Events_MinDuration_String4?: string
  readonly Events_MinDuration_String5?: string
  readonly Events_MinDuration_String?: string
  readonly Events_PaintOn?: string
  readonly Events_PopOn?: string
  readonly Events_RollUp?: string
  readonly Events_Total?: string
  readonly ExecutiveProducer?: string
  readonly File_Created_Date_Local?: string
  readonly File_Created_Date?: string
  readonly FileExtension_Last?: string
  readonly FileExtension?: string
  readonly File_Modified_Date_Local?: string
  readonly File_Modified_Date?: string
  readonly FileNameExtension_Last?: string
  readonly FileNameExtension?: string
  readonly FileName_Last?: string
  readonly FileName?: string
  readonly FileSize?: string
  readonly FileSize_String1?: string
  readonly FileSize_String2?: string
  readonly FileSize_String3?: string
  readonly FileSize_String4?: string
  readonly FileSize_String?: string
  readonly FirstDisplay_Delay_Frames?: string
  readonly FirstDisplay_Type?: string
  readonly FirstPacketOrder?: number
  readonly FolderName_Last?: string
  readonly FolderName?: string
  readonly FooterSize?: number
  readonly Forced?: string
  readonly Forced_String?: string
  readonly Format_AdditionalFeatures?: string
  readonly Format_Commercial_IfAny?: string
  readonly Format_Commercial?: string
  readonly Format_Compression?: string
  readonly Format_Extensions?: string
  readonly Format_Info?: string
  readonly Format_Level?: string
  readonly Format?: string
  readonly Format_Profile?: string
  readonly Format_Settings_BVOP?: string
  readonly Format_Settings_BVOP_String?: string
  readonly Format_Settings_CABAC?: string
  readonly Format_Settings_CABAC_String?: string
  readonly Format_Settings_Emphasis?: string
  readonly Format_Settings_Endianness?: string
  readonly Format_Settings_Firm?: string
  readonly Format_Settings_Floor?: string
  readonly Format_Settings_FrameMode?: string
  readonly Format_Settings_GMC?: number
  readonly Format_Settings_GMC_String?: string
  readonly Format_Settings_GOP?: string
  readonly Format_Settings_ITU?: string
  readonly Format_Settings_Law?: string
  readonly Format_Settings_Matrix_Data?: string
  readonly Format_Settings_Matrix?: string
  readonly Format_Settings_Matrix_String?: string
  readonly Format_Settings?: string
  readonly Format_Settings_ModeExtension?: string
  readonly Format_Settings_Mode?: string
  readonly Format_Settings_Packing?: string
  readonly Format_Settings_PictureStructure?: string
  readonly Format_Settings_PS?: string
  readonly Format_Settings_PS_String?: string
  readonly Format_Settings_Pulldown?: string
  readonly Format_Settings_QPel?: string
  readonly Format_Settings_QPel_String?: string
  readonly Format_Settings_RefFrames?: number
  readonly Format_Settings_RefFrames_String?: string
  readonly Format_Settings_SBR?: string
  readonly Format_Settings_SBR_String?: string
  readonly Format_Settings_Sign?: string
  readonly Format_Settings_Wrapping?: string
  readonly Format_String?: string
  readonly Format_Tier?: string
  readonly Format_Url?: string
  readonly Format_Version?: string
  readonly FrameCount?: number
  readonly FrameRate_Den?: number
  readonly FrameRate_Maximum?: number
  readonly FrameRate_Maximum_String?: string
  readonly FrameRate_Minimum?: number
  readonly FrameRate_Minimum_String?: string
  readonly FrameRate?: number
  readonly FrameRate_Mode?: string
  readonly FrameRate_Mode_Original?: string
  readonly FrameRate_Mode_Original_String?: string
  readonly FrameRate_Mode_String?: string
  readonly FrameRate_Nominal?: number
  readonly FrameRate_Nominal_String?: string
  readonly FrameRate_Num?: number
  readonly FrameRate_Original_Den?: number
  readonly FrameRate_Original?: number
  readonly FrameRate_Original_Num?: number
  readonly FrameRate_Original_String?: string
  readonly FrameRate_Real?: number
  readonly FrameRate_Real_String?: string
  readonly FrameRate_String?: string
  readonly GeneralCount?: number
  readonly Genre?: string
  readonly Gop_OpenClosed_FirstFrame?: string
  readonly Gop_OpenClosed_FirstFrame_String?: string
  readonly Gop_OpenClosed?: string
  readonly Gop_OpenClosed_String?: string
  readonly Grouping?: string
  readonly HDR_Format_Commercial?: string
  readonly HDR_Format_Compatibility?: string
  readonly HDR_Format_Level?: string
  readonly HDR_Format?: string
  readonly HDR_Format_Profile?: string
  readonly HDR_Format_Settings?: string
  readonly HDR_Format_String?: string
  readonly HDR_Format_Version?: string
  readonly HeaderSize?: number
  readonly Height_CleanAperture?: number
  readonly Height_CleanAperture_String?: string
  readonly Height?: number
  readonly Height_Offset?: number
  readonly Height_Offset_String?: string
  readonly Height_Original?: number
  readonly Height_Original_String?: string
  readonly Height_String?: string
  readonly ICRA?: string
  readonly ID?: string
  readonly ID_String?: string
  readonly Image_Codec_List?: string
  readonly ImageCount?: number
  readonly Image_Format_List?: string
  readonly Image_Format_WithHint_List?: string
  readonly Image_Language_List?: string
  readonly Inform?: string
  readonly Interlacement?: string
  readonly Interlacement_String?: string
  readonly Interleaved?: string
  readonly Interleave_Duration?: number
  readonly Interleave_Duration_String?: string
  readonly Interleave_Preload?: number
  readonly Interleave_Preload_String?: string
  readonly Interleave_VideoFrames?: number
  readonly InternetMediaType?: string
  readonly ISBN?: string
  readonly ISRC?: string
  readonly IsStreamable?: string
  readonly Keywords?: string
  readonly LabelCode?: string
  readonly Label?: string
  readonly Language?: string
  readonly Language_More?: string
  readonly Language_String1?: string
  readonly Language_String2?: string
  readonly Language_String3?: string
  readonly Language_String4?: string
  readonly Language_String?: string
  readonly LawRating?: string
  readonly LawRating_Reason?: string
  readonly LCCN?: string
  readonly Lightness?: string
  readonly Lines_Count?: string
  readonly Lines_MaxCountPerEvent?: string
  readonly List?: string
  readonly List_StreamKind?: string
  readonly List_StreamPos?: string
  readonly List_String?: string
  readonly Lyricist?: string
  readonly Lyrics?: string
  readonly MasteredBy?: string
  readonly Mastered_Date?: string
  readonly MasteringDisplay_ColorPrimaries?: string
  readonly MasteringDisplay_ColorPrimaries_Original?: string
  readonly MasteringDisplay_ColorPrimaries_Original_Source?: string
  readonly MasteringDisplay_ColorPrimaries_Source?: string
  readonly MasteringDisplay_Luminance?: string
  readonly MasteringDisplay_Luminance_Original?: string
  readonly MasteringDisplay_Luminance_Original_Source?: string
  readonly MasteringDisplay_Luminance_Source?: string
  readonly Matrix_ChannelPositions?: string
  readonly Matrix_ChannelPositions_String2?: string
  readonly Matrix_Channels?: number
  readonly Matrix_Channels_String?: string
  readonly matrix_coefficients?: string
  readonly matrix_coefficients_Original?: string
  readonly matrix_coefficients_Original_Source?: string
  readonly matrix_coefficients_Source?: string
  readonly Matrix_Format?: string
  readonly MaxCLL?: string
  readonly MaxCLL_Original?: string
  readonly MaxCLL_Original_Source?: string
  readonly MaxCLL_Source?: string
  readonly MaxFALL?: string
  readonly MaxFALL_Original?: string
  readonly MaxFALL_Original_Source?: string
  readonly MaxFALL_Source?: string
  readonly Menu_Codec_List?: string
  readonly MenuCount?: number
  readonly Menu_Format_List?: string
  readonly Menu_Format_WithHint_List?: string
  readonly MenuID?: string
  readonly MenuID_String?: string
  readonly Menu_Language_List?: string
  readonly Mood?: string
  readonly Movie_Country?: string
  readonly Movie?: string
  readonly Movie_More?: string
  readonly Movie_Url?: string
  readonly MultiView_BaseProfile?: string
  readonly MultiView_Count?: string
  readonly MultiView_Layout?: string
  readonly MusicBy?: string
  readonly MuxingMode?: string
  readonly MuxingMode_MoreInfo?: string
  readonly NetworkName?: string
  readonly Original_Album?: string
  readonly Original_Lyricist?: string
  readonly Original_Movie?: string
  readonly Original_NetworkName?: string
  readonly OriginalNetworkName?: string
  readonly Original_Part?: string
  readonly Original_Performer?: string
  readonly Original_Released_Date?: string
  readonly OriginalSourceForm_Cropped?: string
  readonly OriginalSourceForm_DistributedBy?: string
  readonly OriginalSourceForm?: string
  readonly OriginalSourceForm_Name?: string
  readonly OriginalSourceForm_NumColors?: string
  readonly OriginalSourceForm_Sharpness?: string
  readonly OriginalSourceMedium_ID?: string
  readonly OriginalSourceMedium_ID_String?: string
  readonly OriginalSourceMedium?: string
  readonly Original_Track?: string
  readonly Other_Codec_List?: string
  readonly OtherCount?: number
  readonly Other_Format_List?: string
  readonly Other_Format_WithHint_List?: string
  readonly Other_Language_List?: string
  readonly OverallBitRate_Maximum?: number
  readonly OverallBitRate_Maximum_String?: string
  readonly OverallBitRate_Minimum?: number
  readonly OverallBitRate_Minimum_String?: string
  readonly OverallBitRate?: number
  readonly OverallBitRate_Mode?: string
  readonly OverallBitRate_Mode_String?: string
  readonly OverallBitRate_Nominal?: number
  readonly OverallBitRate_Nominal_String?: string
  readonly OverallBitRate_String?: string
  readonly Owner?: string
  readonly PackageName?: string
  readonly Part?: string
  readonly Part_Position?: number
  readonly Part_Position_Total?: number
  readonly Performer?: string
  readonly Performer_Sort?: string
  readonly Performer_Url?: string
  readonly Period?: string
  readonly PixelAspectRatio_CleanAperture?: number
  readonly PixelAspectRatio_CleanAperture_String?: string
  readonly PixelAspectRatio?: number
  readonly PixelAspectRatio_Original?: number
  readonly PixelAspectRatio_Original_String?: string
  readonly PixelAspectRatio_String?: string
  readonly Played_Count?: number
  readonly Played_First_Date?: string
  readonly Played_Last_Date?: string
  readonly PodcastCategory?: string
  readonly Producer_Copyright?: string
  readonly Producer?: string
  readonly ProductionDesigner?: string
  readonly ProductionStudio?: string
  readonly Publisher?: string
  readonly Publisher_URL?: string
  readonly Rating?: string
  readonly Recorded_Date?: string
  readonly Recorded_Location?: string
  readonly Reel?: string
  readonly Reel_Position?: number
  readonly Reel_Position_Total?: number
  readonly Released_Date?: string
  readonly RemixedBy?: string
  readonly ReplayGain_Gain?: string
  readonly ReplayGain_Gain_String?: string
  readonly ReplayGain_Peak?: string
  readonly Resolution?: number
  readonly Resolution_String?: string
  readonly Rotation?: string
  readonly Rotation_String?: string
  readonly Sampled_Height?: number
  readonly Sampled_Width?: number
  readonly SamplesPerFrame?: number
  readonly SamplingCount?: number
  readonly SamplingRate?: number
  readonly SamplingRate_String?: string
  readonly ScanOrder?: string
  readonly ScanOrder_Original?: string
  readonly ScanOrder_Original_String?: string
  readonly ScanOrder_StoredDisplayedInverted?: string
  readonly ScanOrder_Stored?: string
  readonly ScanOrder_Stored_String?: string
  readonly ScanOrder_String?: string
  readonly ScanType?: string
  readonly ScanType_Original?: string
  readonly ScanType_Original_String?: string
  readonly ScanType_StoreMethod_FieldsPerBlock?: string
  readonly ScanType_StoreMethod?: string
  readonly ScanType_StoreMethod_String?: string
  readonly ScanType_String?: string
  readonly ScreenplayBy?: string
  readonly Season?: string
  readonly Season_Position?: number
  readonly Season_Position_Total?: number
  readonly ServiceChannel?: string
  readonly ServiceKind?: string
  readonly ServiceKind_String?: string
  readonly ServiceName?: string
  readonly ServiceProvider?: string
  readonly ServiceProvider_Url?: string
  readonly ServiceType?: string
  readonly Service_Url?: string
  readonly SoundEngineer?: string
  readonly Source_Duration_FirstFrame?: number
  readonly Source_Duration_FirstFrame_String1?: string
  readonly Source_Duration_FirstFrame_String2?: string
  readonly Source_Duration_FirstFrame_String3?: string
  readonly Source_Duration_FirstFrame_String4?: string
  readonly Source_Duration_FirstFrame_String5?: string
  readonly Source_Duration_FirstFrame_String?: string
  readonly Source_Duration_LastFrame?: number
  readonly Source_Duration_LastFrame_String1?: string
  readonly Source_Duration_LastFrame_String2?: string
  readonly Source_Duration_LastFrame_String3?: string
  readonly Source_Duration_LastFrame_String4?: string
  readonly Source_Duration_LastFrame_String5?: string
  readonly Source_Duration_LastFrame_String?: string
  readonly Source_Duration?: number
  readonly Source_Duration_String1?: string
  readonly Source_Duration_String2?: string
  readonly Source_Duration_String3?: string
  readonly Source_Duration_String4?: string
  readonly Source_Duration_String5?: string
  readonly Source_Duration_String?: string
  readonly Source_FrameCount?: number
  readonly Source_SamplingCount?: number
  readonly Source_StreamSize_Encoded?: number
  readonly Source_StreamSize_Encoded_Proportion?: string
  readonly Source_StreamSize_Encoded_String1?: string
  readonly Source_StreamSize_Encoded_String2?: string
  readonly Source_StreamSize_Encoded_String3?: string
  readonly Source_StreamSize_Encoded_String4?: string
  readonly Source_StreamSize_Encoded_String5?: string
  readonly Source_StreamSize_Encoded_String?: string
  readonly Source_StreamSize?: number
  readonly Source_StreamSize_Proportion?: string
  readonly Source_StreamSize_String1?: string
  readonly Source_StreamSize_String2?: string
  readonly Source_StreamSize_String3?: string
  readonly Source_StreamSize_String4?: string
  readonly Source_StreamSize_String5?: string
  readonly Source_StreamSize_String?: string
  readonly Standard?: string
  readonly Status?: number
  readonly Stored_Height?: number
  readonly Stored_Width?: number
  readonly StreamCount?: number
  readonly StreamKindID?: number
  readonly StreamKind?: string
  readonly StreamKindPos?: number
  readonly StreamKind_String?: string
  readonly StreamOrder?: number
  readonly StreamSize_Demuxed?: number
  readonly StreamSize_Demuxed_String1?: string
  readonly StreamSize_Demuxed_String2?: string
  readonly StreamSize_Demuxed_String3?: string
  readonly StreamSize_Demuxed_String4?: string
  readonly StreamSize_Demuxed_String5?: string
  readonly StreamSize_Demuxed_String?: string
  readonly StreamSize_Encoded?: number
  readonly StreamSize_Encoded_Proportion?: string
  readonly StreamSize_Encoded_String1?: string
  readonly StreamSize_Encoded_String2?: string
  readonly StreamSize_Encoded_String3?: string
  readonly StreamSize_Encoded_String4?: string
  readonly StreamSize_Encoded_String5?: string
  readonly StreamSize_Encoded_String?: string
  readonly StreamSize?: number
  readonly StreamSize_Proportion?: string
  readonly StreamSize_String1?: string
  readonly StreamSize_String2?: string
  readonly StreamSize_String3?: string
  readonly StreamSize_String4?: string
  readonly StreamSize_String5?: string
  readonly StreamSize_String?: string
  readonly Subject?: string
  readonly SubTrack?: string
  readonly Summary?: string
  readonly Synopsis?: string
  readonly Tagged_Application?: string
  readonly Tagged_Date?: string
  readonly TermsOfUse?: string
  readonly Text_Codec_List?: string
  readonly TextCount?: number
  readonly Text_Format_List?: string
  readonly Text_Format_WithHint_List?: string
  readonly Text_Language_List?: string
  readonly ThanksTo?: string
  readonly TimeCode_DropFrame?: string
  readonly TimeCode_FirstFrame?: string
  readonly TimeCode_LastFrame?: string
  readonly TimeCode_MaxFrameNumber?: string
  readonly TimeCode_MaxFrameNumber_Theory?: string
  readonly TimeCode_Settings?: string
  readonly TimeCode_Source?: string
  readonly TimeCode_Striped?: string
  readonly TimeCode_Striped_String?: string
  readonly TimeCode_Stripped?: string
  readonly TimeCode_Stripped_String?: string
  readonly TimeStamp_FirstFrame?: number
  readonly TimeStamp_FirstFrame_String1?: string
  readonly TimeStamp_FirstFrame_String2?: string
  readonly TimeStamp_FirstFrame_String3?: string
  readonly TimeStamp_FirstFrame_String4?: string
  readonly TimeStamp_FirstFrame_String5?: string
  readonly TimeStamp_FirstFrame_String?: string
  readonly TimeZone?: string
  readonly TimeZones?: string
  readonly Title?: string
  readonly Title_More?: string
  readonly Title_Url?: string
  readonly Track?: string
  readonly Track_More?: string
  readonly Track_Position?: number
  readonly Track_Position_Total?: number
  readonly Track_Sort?: string
  readonly Track_Url?: string
  readonly transfer_characteristics?: string
  readonly transfer_characteristics_Original?: string
  readonly transfer_characteristics_Original_Source?: string
  readonly transfer_characteristics_Source?: string
  readonly Type?: string
  readonly UniqueID?: string
  readonly UniqueID_String?: string
  readonly UniversalAdID_Registry?: string
  readonly UniversalAdID_String?: string
  readonly UniversalAdID_Value?: string
  readonly Video0_Delay?: number
  readonly Video0_Delay_String1?: string
  readonly Video0_Delay_String2?: string
  readonly Video0_Delay_String3?: string
  readonly Video0_Delay_String4?: string
  readonly Video0_Delay_String5?: string
  readonly Video0_Delay_String?: string
  readonly Video_Codec_List?: string
  readonly VideoCount?: number
  readonly Video_Delay?: number
  readonly Video_Delay_String1?: string
  readonly Video_Delay_String2?: string
  readonly Video_Delay_String3?: string
  readonly Video_Delay_String4?: string
  readonly Video_Delay_String5?: string
  readonly Video_Delay_String?: string
  readonly Video_Format_List?: string
  readonly Video_Format_WithHint_List?: string
  readonly Video_Language_List?: string
  readonly Width_CleanAperture?: number
  readonly Width_CleanAperture_String?: string
  readonly Width?: number
  readonly Width_Offset?: number
  readonly Width_Offset_String?: string
  readonly Width_Original?: number
  readonly Width_Original_String?: string
  readonly Width_String?: string
  readonly WrittenBy?: string
  readonly Written_Date?: string
  readonly Written_Location?: string
  readonly extra?: ExtraType
}

export interface MediaType {
  readonly '@ref': string
  readonly track: TrackType[]
}

export interface MediaInfoType {
  readonly creatingApplication?: CreationType
  readonly creatingLibrary?: CreationType
  readonly media?: MediaType
}
