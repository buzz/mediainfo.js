#include <MediaInfo/MediaInfo.h>
#include <new>
#include <string>

// Context to keep the inform_cache alive
struct MiContext
{
  MediaInfoLib::MediaInfo mi;
  std::string inform_cache;
};

extern "C"
{
  void *mi_new(const char *output_format, int cover_data, int full)
  {
    auto *ctx = new (std::nothrow) MiContext();
    if (!ctx)
      return nullptr;

    const char *format = (output_format && *output_format) ? output_format : "JSON";

    ctx->mi.Option("Output", format);
    ctx->mi.Option("File_IsSeekable", "1");

    if (cover_data)
    {
      ctx->mi.Option("Cover_Data", "base64");
    }
    if (full)
    {
      ctx->mi.Option("Complete", "1");
    }

    return static_cast<void *>(ctx);
  }

  void mi_delete(void *ctx_ptr)
  {
    if (!ctx_ptr)
      return;
    delete static_cast<MiContext *>(ctx_ptr);
  }

  int mi_open_buffer_init(void *ctx_ptr, uint64_t estimated_size, uint64_t offset)
  {
    auto *ctx = static_cast<MiContext *>(ctx_ptr);
    if (!ctx)
      return 0;
    return (int)ctx->mi.Open_Buffer_Init(estimated_size, offset);
  }

  int mi_open_buffer_continue(void *ctx_ptr, const uint8_t *data, size_t size)
  {
    auto *ctx = static_cast<MiContext *>(ctx_ptr);
    if (!ctx)
      return 0;
    return (int)ctx->mi.Open_Buffer_Continue(data, size);
  }

  uint64_t mi_open_buffer_continue_goto_get(void *ctx_ptr)
  {
    auto *ctx = static_cast<MiContext *>(ctx_ptr);
    if (!ctx)
      return (uint64_t)-1;
    return (uint64_t)ctx->mi.Open_Buffer_Continue_GoTo_Get();
  }

  int mi_open_buffer_finalize(void *ctx_ptr)
  {
    auto *ctx = static_cast<MiContext *>(ctx_ptr);
    if (!ctx)
      return 0;
    return (int)ctx->mi.Open_Buffer_Finalize();
  }

  // Returns const char* instead of const wchar_t*
  const char *mi_inform(void *ctx_ptr)
  {
    auto *ctx = static_cast<MiContext *>(ctx_ptr);
    if (!ctx)
      return nullptr;

    ctx->inform_cache = ctx->mi.Inform();
    return ctx->inform_cache.c_str();
  }

  void mi_close(void *ctx_ptr)
  {
    auto *ctx = static_cast<MiContext *>(ctx_ptr);
    if (!ctx)
      return;
    ctx->mi.Close();
    ctx->inform_cache.clear();
  }
}
