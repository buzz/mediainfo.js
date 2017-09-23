$(function() {
  var $nav = $('nav#menu');
  var $pages = $('.page');
  var $loader = $('#loader');
  var $dropzone = $('#dropzone');
  var $dropcontrols = $('#dropcontrols');
  var $fileinput = $('#fileinput');
  var $results = $('#results');
  var $resultscontainer = $('#resultscontainer');
  var $status = $('#status');
  var $cancel = $dropzone.find('button.cancel');

  var CHUNK_SIZE = 5 * 1024 * 1024;
  var miLib, mi;
  var processing = false;

  var x2js = new X2JS();

  var template_results = _.template($('#template-results').html());

  // Results saving

  var results = [];
  function restoreResults() {
    var r = window.localStorage.getItem('results');
    if (r) {
      results = JSON.parse(r);
    }
    showResults();
  }

  function saveResults() {
    window.localStorage.setItem('results', JSON.stringify(results));
  }

  function showResults() {
    var $el = $resultscontainer.html(template_results({ results: results }));
    if (results.length > 0) {
      $results.fadeIn();
    }
  }

  function addResult(name, result) {
    var resultObj = x2js.xml_str2json(result);
    resultObj.date = _.now();
    resultObj.fileName = name;
    results.unshift(resultObj);
    saveResults();
    showResults();
    toggleResult($results.find('.result:first-child'));
  }

  function removeResult($result) {
    results.splice($result.index, 1);
    $result.animate({ height: 'toggle', opacity: 'toggle' }, function() {
      $result.remove();
    });
    if (results.length === 0) {
      $results.fadeOut();
    }
    saveResults();
  }

  function toggleResult($result) {
    $result
      .toggleClass('collapsed')
      .find('button.toggle-collapse > i').toggleClass('fa-rotate-90');
    $result.find('.result-body').slideToggle();
  }

  // Page handling

  function showPage(page) {
    var $page = $(page);
    if (!$page.hasClass('active')) {
      $pages.filter('.active').removeClass('active').fadeOut(function() {
        $page.addClass('active').fadeIn();
        $nav.find('a.active').removeClass('active');
        $nav.find('a[href="' + page + '"]').addClass('active');
      });
    }
  }

  $('body').on('click', 'a.pagelink', function(e) {
    e.preventDefault();
    var $a = $(e.currentTarget);
    showPage($a.attr('href'));
  });

  // MediaInfo processing

  function parseFile(file) {
    if (processing) {
      return;
    }
    processing = true;
    $dropcontrols.hide();
    $status.fadeIn();
    $cancel.fadeIn();

    var fileSize = file.size, offset = 0, state = 0, seekTo = -1, seek = null;

    mi.open_buffer_init(fileSize, offset);

    var processChunk = function(e) {
      var l;
      if (e.target.error === null) {
        var chunk = new Uint8Array(e.target.result);
        l = chunk.length;
        state = mi.open_buffer_continue(chunk, l);

        var seekTo = -1;
        var seekToLow = mi.open_buffer_continue_goto_get_lower();
        var seekToHigh = mi.open_buffer_continue_goto_get_upper();

        if (seekToLow == -1 && seekToHigh == -1) {
          seekTo = -1;
        } else if (seekToLow < 0) {
          seekTo = seekToLow + 4294967296 + (seekToHigh * 4294967296);
        } else {
          seekTo = seekToLow + (seekToHigh * 4294967296);
        }

        if(seekTo === -1){
          offset += l;
        }else{
          offset = seekTo;
          mi.open_buffer_init(fileSize, seekTo);
        }
        chunk = null;
      } else {
        var msg = 'An error happened reading your file!';
        console.err(msg, e.target.error);
        processingDone();
        alert(msg);
        return;
      }
      // bit 4 set means finalized
      if (state&0x08) {
        var result = mi.inform();
        mi.close();
        addResult(file.name, result);
        processingDone();
        return;
      }
      seek(l);
    };

    function processingDone() {
      processing = false;
      $status.hide();
      $cancel.hide();
      $dropcontrols.fadeIn();
      $fileinput.val('');
    }

    seek = function(length) {
      if (processing) {
        var r = new FileReader();
        var blob = file.slice(offset, length + offset);
        r.onload = processChunk;
        r.readAsArrayBuffer(blob);
      }
      else {
        mi.close();
        processingDone();
      }
    };

    // start
    seek(CHUNK_SIZE);

    _paq.push(['trackEvent', 'File', 'AnalysisRun', file.name]);
  }

  // prevent window from loading file if dropped on background
  $(window).on('dragover dragleave dragenter drop', function(e) {
    e.preventDefault();
  });

  // init drag 'n drop
  $dropzone.dragster({
    enter: function() {
      $dropzone.addClass('dragover');
    },
    leave: function() {
      $dropzone.removeClass('dragover');
    },
    drop: function(dragsterEvent, e) {
      $dropzone.removeClass('dragover');
      if(e.originalEvent.dataTransfer){
        if(e.originalEvent.dataTransfer.files.length > 0) {
          parseFile(e.originalEvent.dataTransfer.files[0]);
        }
      }
    }
  });

  // buttons
  $cancel.on('click', function() {
    processing = false;
  });
  $results
    .on('click', 'button.remove', function() {
      removeResult($(this).parents('.result'));
    })
    .on('click', 'button.toggle-collapse', function() {
      toggleResult($(this).parents('.result'));
    });

  // init mediainfo
  miLib = MediaInfo(function() {
    console.debug('MediaInfo ready');
    $loader.fadeOut(function() {
      $dropcontrols.fadeIn();

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

  restoreResults();
});
