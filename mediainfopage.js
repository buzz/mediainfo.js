$(function() {
  var $dropzone = $('#dropzone, #dropzone *');
  var $fileInput = $('#fileinput');
  var $result = $('#result');
  var $status = $('#status');

  var CHUNK_SIZE = 5 * 1024 * 1024;
  var miLib, mi, offset, state;

  // Parse file chunk by chunk
  function parseFile(file, cb) {
    var reader = new FileReader();
    offset = 0;

    console.debug('Analyzing file: ', file.name + ' (' + file.size + ')');

    mi.open_buffer_init(file.size, offset);

    reader.onload = function() {
      var arr = new Uint8Array(reader.result);
      state = mi.open_buffer_continue(arr, arr.length);
      arr = null;

      if ((state >> 3) % 2 !== 0 || offset >= file.size) {
        var result = mi.inform();
        mi.close();
        cb(result);
        return;
      }

      $status.text('Read ' + offset + ' bytes (' + (offset / file.size * 100).toFixed(1) + '% of file)', state);

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

  // show result
  function showResult(r) {
    $result.text(r);
  }

  // init drag 'n drop
  $dropzone.on('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
  })
  $dropzone.on('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $dropzone.removeClass('dragover');
  })
  $dropzone.on('dragenter', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $dropzone.addClass('dragover');
  })
  $dropzone.on('drop', function(e){
    e.preventDefault();
    e.stopPropagation();
    $dropzone.removeClass('dragover');
    if(e.originalEvent.dataTransfer){
      if(e.originalEvent.dataTransfer.files.length > 0) {
        parseFile(e.originalEvent.dataTransfer.files[0], showResult);
      }
    }
  });

  // init mediainfo
  miLib = MediaInfo(function() {
    console.debug('mediainfo.js initialized');

    window['miLib'] = miLib;    // debug
    mi = new miLib.MediaInfo();

    $fileInput.on('change', function(e) {
      var el = $fileInput.get(0);
      if (el.files.length > 0) {
        parseFile(el.files[0], showResult);
      }
    });
  });
});
