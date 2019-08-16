$(function(){
    function copylink()
    {
        var $input = $('#link-refer');
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          var el = $input.get(0);
          var editable = el.contentEditable;
          var readOnly = el.readOnly;
          el.contentEditable = true;
          el.readOnly = false;
          var range = document.createRange();
          range.selectNodeContents(el);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          el.setSelectionRange(0, 999999);
          el.contentEditable = editable;
          el.readOnly = readOnly;
        } else {
          $input.select();
        }
        document.execCommand('copy');
        $('#copy-refer').html('<span>copied</span>');
    }

	$(document).ready(function(){
		$("#copy-refer").click(function(e){
        copylink();
        setTimeout(function() { $('#copy-refer').html('<span>copy</span>'); }, 10000);
    });
	});

});