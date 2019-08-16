
(function ($) {
    "use strict";
    var lang = '';
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
            if($(input[i]).attr('type') == 'checkbox' || $(input[i]).attr('name') == 'agree-term') {
                if(!$(input[i]).prop("checked")) {
                    showValidate(input[i]);
                    check=false;
                }
            }
            if ($("#hiddenRecaptcha").val() == '') {
                $("#errre").html('Please check reCaptcha');
                check=false;
            }
            else {
                $("#errre").html('');
            }
        }        
        return check;
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
        
        $(this).change(function() {
            if($(this).attr('type') == 'checkbox' || $(this).attr('name') == 'agree-term') {
                if($(this).prop("checked")) {
                    hideValidate(this);
                }
            }
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if($(input).attr('type') == 'tel' || $(input).attr('name') == 'phone') {
            if($(input).val().trim().match(/^([0-9]{10})+$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================*/
    /*Xử lý đăng ký tài khoản*/
    function registration (name, email, phone, code) {
        $('#register-form').hide();
        $('#show_result').show();
    }
    /*Xử lý phần quên mật khẩu*/
    function resetPasswordLink(e, c) {
      $('#forgot-form').hide();
        $('#show_result').show();
    }

})(jQuery);