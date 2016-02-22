// Parse file chunk by chunk
function parseFile(mi, file, cb) {
  var CHUNK_SIZE = 20 * 1024 * 1024; // 1MiB
  var offset = 0, state;
  var reader = new FileReader();

  console.debug('Analyzing file: ', file);

  mi.open_buffer_init(file.size, offset);

  reader.onload = function() {
    var arr = new Uint8Array(reader.result);
    state = mi.open_buffer_continue(arr, arr.length);

    if ((state >> 3) % 2 !== 0 || offset >= file.size) {
      var result = mi.inform();
      mi.close();
      cb(result);
      return;
    }

    console.debug('Read ' + offset + ' bytes (' + (offset / file.size * 100).toFixed(1) + '% of file)');

    offset += CHUNK_SIZE;
    seek();
  };

  reader.onerror = function(e) {
    throw('Error while reading file', e);
  };

  function seek() {
    var slice = file.slice(offset, offset + CHUNK_SIZE);
    reader.readAsArrayBuffer(slice);
  }
  seek();
};

function MediaInfoStart() {
  console.debug('mediainfo.js initialized');

  var mi = new Module.MediaInfo();

  var $dropzone = $('#dropzone');
  var $fileInput = $('#fileinput');
  var $result = $('#result');

  $fileInput.on('change', function(e) {
    var el = $fileInput.get(0);
    if (el.files.length > 0) {
      var file = el.files[0];
      parseFile(mi, file, function(r) {
        $result.text(r);
      });
    }
  });
}
