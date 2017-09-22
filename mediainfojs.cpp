#include <emscripten/bind.h>
#include <MediaInfo/MediaInfo.h>
#include <string>

class MediaInfoJs {
  MediaInfoLib::MediaInfo mi;
public:
  MediaInfoJs() {
    mi.Option(__T("Output"), __T("XML"));
    mi.Option(__T("File_IsSeekable"), __T("1"));
  }
  int open(const std::string& data, double fileSize) {
    return mi.Open((const ZenLib::int8u*)data.data(), data.size(), NULL, 0, (ZenLib::int64u)fileSize);
  }
  int open_buffer_init(double estimatedFileSize, double fileOffset) {
    return mi.Open_Buffer_Init((ZenLib::int64u)estimatedFileSize, (ZenLib::int64u)fileOffset);
  }
  int open_buffer_continue(const std::string& data, double size) {
    return mi.Open_Buffer_Continue((ZenLib::int8u*)data.data(), (ZenLib::int64u)size);
  }
  int open_buffer_continue_goto_get(){
    seekTo.total = mi.Open_Buffer_Continue_GoTo_Get();
    return seekTo.lower;
  }
  int get_seek_to_upper() {
    return seekTo.upper;
  }
  MediaInfoLib::String inform() {
    return mi.Inform();
  }
  void close() {
    mi.Close();
  }
private:
  union SeekTo {
    int64_t total;
    struct {
      int32_t lower;
      int32_t upper;
    };
  };

  SeekTo seekTo;
};

EMSCRIPTEN_BINDINGS(mediainfojs) {
  emscripten::class_<MediaInfoJs>("MediaInfo")
    .constructor()
    .function("open", &MediaInfoJs::open)
    .function("open_buffer_init", &MediaInfoJs::open_buffer_init)
    .function("open_buffer_continue", &MediaInfoJs::open_buffer_continue)
    .function("open_buffer_continue_goto_get", &MediaInfoJs::open_buffer_continue_goto_get)
    .function("get_seek_to_upper", &MediaInfoJs::get_seek_to_upper)
    .function("inform", &MediaInfoJs::inform)
    .function("close", &MediaInfoJs::close)
    ;
}
