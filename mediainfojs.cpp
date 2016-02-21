#include <emscripten/bind.h>
#include <MediaInfo/MediaInfo.h>
#include <string>

namespace js {

  MediaInfoLib::String inform(const std::string& data, double fileSize = 0) {
    MediaInfoLib::MediaInfo mi;
    mi.Option(__T("Output"), __T("XML"));
    mi.Open((const ZenLib::int8u*)data.data(), data.size(), NULL, 0, (ZenLib::int64u)fileSize);
    return mi.Inform();
  }

}

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("inform", &js::inform);
}
