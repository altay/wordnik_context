var wjq; // jquery alias
var WORDNIK = new function() {
  var API_BASE_URL = "http://api.wordnik.com/api/";
	var API_KEY = "85b993ddaabe04346e0090d379b02d18ad04bda75d4e0ecca";

  this.dynascript = function(url) {
    if (typeof wjq != 'undefined') {
      var oldscript = wjq('#wordnik_dynascript');
      if (oldscript.length>0) {
        oldscript.attr('src', url);
      } else {
        wjq('head').append("<script type='text/javascript' id='wordnik_dynascript' src='"+url+"'></script>");
      }
    } else {
      var oldscript = document.getElementById('wordnik_dynascript');
      if (oldscript) {
        oldscript.src = url;
      } else {
        var s=document.createElement('script');
        s.id="wordnik_dynascript";
        s.type="text/javascript";
        s.src=url;
        document.getElementsByTagName('head')[0].appendChild(s);
      }
    }
  }
  this.dynacss = function(url) {
    var t = ((new Date())*1);
    wjq('head').append("<link rel='stylesheet' type='text/css' href='"+url+"?"+t+"'></link>");
  }
  this.dynascript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');

  this.Popup = new function() {
    var frame;
    var overlay;
    this.init = function() {
      if (wjq('#wordnik_overlay').length==0) {
        wjq('body').append("<div id='wordnik_overlay'></div><iframe src='http://localhost:3020/main' id='wordnik_pop_frame' frameborder=0></iframe>");
        frame = wjq('#wordnik_pop_frame');
        overlay = wjq('#wordnik_overlay');
        WORDNIK.Popup.set_position();
      }
    }
    this.set_position = function() {
      frame.css({top:(wjq(window).height()/2) - (frame.height()/2) - 36 + wjq(window).scrollTop(), left: (wjq(window).width()/2) - (frame.width()/2)});
      overlay.css({height:wjq(document).height()});
    }
    this.show = function() {
      WORDNIK.Popup.set_position();
      frame.show();
      overlay.show();
    }
    this.set_frame_src = function(url) {
      frame.attr('src', url);
    }
  }

  function get_selection() {
    if(window.getSelection){ var selected = window.getSelection(); } 
    else if(document.getSelection){ var selected = document.getSelection(); } 
    else if(document.selection){ var selected = document.selection.createRange().text; } 
    return selected;
  } 

  function get_surroundings(selection_obj) {
    var i=0;
    var current_node = wjq(selection_obj.anchorNode);
    while (wjq.trim(current_node.text()).length<400 && i<100) {
      current_node = current_node.parent();
      i=i+1; // prevent infinite loop
    }
    return wjq.trim(current_node.text());
  }

  setTimeout(function() { 
    wjq = jQuery.noConflict(); 
    wjq(document).ready(function() {
      alert('ready! double-click on a word.');
      WORDNIK.dynacss('http://localhost:3020/stylesheets/wordnik_context.css');
      WORDNIK.Popup.init();
      wjq(window).resize(WORDNIK.Popup.set_position);
      wjq(window).scroll(WORDNIK.Popup.set_position);
      wjq(window).dblclick(function(e) {
        var select_obj = get_selection();
        //var surrounding_text = get_surroundings(select_obj);
        WORDNIK.Popup.set_frame_src('http://localhost:3020/main/stub/'+encodeURIComponent(select_obj.toString()));
        WORDNIK.Popup.show();
      });
      // close the pop-up onclick
      wjq('#wordnik_overlay').click(function(){
        wjq(this).hide();
        wjq('#wordnik_pop_frame').hide();
        //if (wjq('.active_word')){ wjq('.active_word').removeClass('active_word');}
      });
    })
  }, 1000);
}
