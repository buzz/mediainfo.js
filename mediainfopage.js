$(function() {
  var $loader = $('#loader');
  var $dropzone = $('#dropzone');
  var $dropcontrols = $('#dropcontrols');
  var $fileinput = $('#file-input');
  var $results = $('#results');
  var $status = $('#status');
  var $statuspercent = $('#status-percent');

  var CHUNK_SIZE = 5 * 1024 * 1024;
  var miLib, mi;
  var processing = false;

  var results = [];

  function showResult(result) {
    $results.append('<div class="result"><pre>' + result + '</pre></div>');
  }

  function processingDone() {
    processing = false;
    $status.hide();
    $dropcontrols.fadeIn();
  }

  function parseFile(file) {
    if (processing) {
      console.log('Already processing, aborting…');
      return;
    }
    processing = true;
    $dropcontrols.hide();
    $status.fadeIn();

    var fileSize = file.size, offset = 0, state = 0, seek = null;

    mi.open_buffer_init(fileSize, offset);

    var processChunk = function(e) {
      var l;
      $statuspercent.text((offset / fileSize * 100).toFixed(1));
      if (e.target.error === null) {
        var chunk = new Uint8Array(e.target.result);
        l = chunk.length;
        state = mi.open_buffer_continue(chunk, l);
        offset += l;
        chunk = null;
      } else {
        console.log('Read error: ' + e.target.error);
        processingDone();
        return;
      }
      // bit 4 set means finalized
      if ((state >> 3) % 2 !== 0 || offset >= fileSize) {
        console.log('Done reading file');
        var result = mi.inform();
        mi.close();
        showResult(result);
        processingDone();
        return;
      }
      seek(l);
    };

    seek = function(length) {
      var r = new FileReader();
      var blob = file.slice(offset, length + offset);
      r.onload = processChunk;
      r.readAsArrayBuffer(blob);
    };

    seek(CHUNK_SIZE);
  }

  // prevent window from loading file if dropped on background
  $(window).on('dragover dragleave dragenter drop', function(e) {
    e.preventDefault();
  });

  // init drag 'n drop
  $dropzone.on('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
  $dropzone.on('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $dropzone.removeClass('dragover');
  });
  $dropzone.on('dragenter', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $dropzone.addClass('dragover');
  });
  $dropzone.on('drop', function(e){
    e.preventDefault();
    e.stopPropagation();
    $dropzone.removeClass('dragover');
    if(e.originalEvent.dataTransfer){
      if(e.originalEvent.dataTransfer.files.length > 0) {
        parseFile(e.originalEvent.dataTransfer.files[0]);
      }
    }
  });

  // init mediainfo
  miLib = MediaInfo(function() {
    console.debug('mediainfo.js initialized');

    $loader.fadeOut(function() {
      $dropzone.fadeIn();

      window['miLib'] = miLib; // debug
      mi = new miLib.MediaInfo();

      $fileinput.on('change', function(e) {
        var el = $fileinput.get(0);
        if (el.files.length > 0) {
          parseFile(el.files[0]);
        }
      });
    });
  });
});
