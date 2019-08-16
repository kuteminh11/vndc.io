$(function(){ 
    function validate(input) {
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
        else if($(input).data('format') == 'date' || $(input).attr('name') == 'document_date' || $(input).attr('name') == 'birthday_day') {
            if($(input).val().trim().match(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }
    /*==================================================================
    Hàm Xử lý phần quên mật khẩu*/
    var changePassword = function(e, c, d) {
                      swal.queue([{
                            title: '',
                            confirmButtonText: 'OK',
                            type: 'success',
                            html: 'The password has been changed',
                            showLoaderOnConfirm: true,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            preConfirm: function () {
                                location.reload();
                            }
                        }])
                }
    /*Hàm Xử lý phần quên mật khẩu
    ==================================================================*/

    /*==================================================================
    Hàm Xử lý phần xác thực*/
    var verifyAccount = function(type_document, document_country, document_number, document_date, birthday_day, gender, address, txtFile1, txtFile2, txtFile3) {
                      swal.queue([{
                            title: '',
                            confirmButtonText: 'OK',
                            type: 'success',
                            html: '',
                            showLoaderOnConfirm: true,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            preConfirm: function () {
                                location.reload();
                            }
                        }])
                }
    /*Hàm Xử lý phần xác thực
    ==================================================================*/


	$(document).ready(function(){
        /*==================================================================
        Change-password*/
        var input_password = $('.change-password .form-row .icon-input .input');
        $('.change-password .form-row .icon-input .input').each(function(){
            $(this).focus(function(){
                var thisAlert = $(this).parent();
                $(thisAlert).removeClass('error-input');
            });

            $(this).keyup(function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    document.getElementById("btn-change-password").click();
                }
            });
        });

		$("#btn-change-password").click(function(e) {
            var check = true;
            $(".error-input").removeClass('error-input');
            $(".form-row .error-text").html('');            

            /*Kiểm tra dữ liệu input*/
            for (var i=0; i<input_password.length; i++) {
                if (validate(input_password[i]) == false) {
                    var thisAlert = $(input_password[i]).parent();
                    $(thisAlert).addClass('error-input');
                    check = false;
                }
            }

            if (check == false) {
                return;
            }
            else {
                var current_password = $("#current-password").val();
                var new_password = $("#new-password").val();
                var new_password_again = $("#new-password-again").val();

                if (new_password == new_password_again) {
                    changePassword(current_password, new_password, new_password_again);
                }
                else {
                    var thisAlert = $("#new-password").parent();
                    $(thisAlert).addClass('error-input');
                    var thisAlert = $("#new-password-again").parent();
                    $(thisAlert).addClass('error-input');
                    $(".form-row .error-text").html('Password not match');
                    return;
                }
            }
	    });

        /*Change-password END
        ==================================================================*/

        /*==================================================================
        Two-step verification*/
        $(".2fa-status").click(function(e) {
            $(".2fa-status").attr('style', 'display: none');
            $(".2fa-cancel").removeAttr('style');
            $(".authen-enable-content").removeAttr('style');
        });
        $(".2fa-cancel").click(function(e) {
            $(".2fa-cancel").attr('style', 'display: none');
            $(".authen-enable-content").attr('style', 'display: none');
            $(".2fa-status").removeAttr('style');
        });
        $("#btn-authen-submit").click(function(e) {
            if ($("#auth-code").val() != '') {
                $("#error-msg").hide();
                $("#btn-authen-submit").hide();
                $("#loading").show();

                swal.queue([{
                    title: '',
                    confirmButtonText: 'OK',
                    type: 'success',
                    text: 'Enable two-step verification successful',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    preConfirm: function () {
                        location.reload();
                    }
                }])
            }
            else {
                $("#error-msg").html('Authentication code is required');
            }
        });
        /*Two-step verification
        ==================================================================*/

        /*==================================================================
        Verification account*/
        var input_verify = $('.step-informations .input-group .input');
        $('.step-informations .input-group .input').each(function(){
            $(this).focus(function(){
                var thisAlert = $(this).parent();
                $(thisAlert).removeClass('error-input');
            });
        });

        $("#btn_submit_verify").click(function(e) {
            var check = true;
            $(".error-input").removeClass('error-input');
            $(".error-text").html('');            

            /*Kiểm tra dữ liệu input*/
            for (var i=0; i<input_verify.length; i++) {
                if (validate(input_verify[i]) == false) {
                    var thisAlert = $(input_verify[i]).parent();
                    $(thisAlert).addClass('error-input');
                    check = false;
                }
            }

            if (check == false) {
                $("html, body").animate({ scrollTop: 330 }, 1000);
                return;
            }
            else {
                var type_document = $("#type_document").val();
                var document_country = $("#document_country").val();
                var document_number = $("#document_number").val();
                var document_date = $("#document_date").val();
                var birthday_day = $("#birthday_day").val();
                var gender = $("#gender").val();
                var address = $("#address").val();

                var body_filename1 = $("#fileinput-filename1").html();
                if (body_filename1 == '') {
                    $("#txtFile1").val('');
                }
                var body_filename2 = $("#fileinput-filename2").html();
                if (body_filename2 == '') {
                    $("#txtFile2").val('');
                }
                var body_filename3 = $("#fileinput-filename3").html();
                if (body_filename3 == '') {
                    $("#txtFile3").val('');
                }

                var txtFile1 = $("#txtFile1").val();                
                var txtFile2 = $("#txtFile2").val();
                var txtFile3 = $("#txtFile3").val();
                if (typeof txtFile1 === 'undefined' || typeof txtFile2 === 'undefined' || typeof txtFile3 === 'undefined' || txtFile1 == '' || txtFile2 == '' || txtFile3 == '') {
                    $(".error-text").html('Please upload your document image');
                    return;
                }

                verifyAccount(type_document, document_country, document_number, document_date, birthday_day, gender, address, txtFile1, txtFile2, txtFile3);
            }
        });
        /*Verification account
        ==================================================================*/
	});
});