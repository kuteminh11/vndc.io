var lang = '';

function change_language(e)
{
    $("#lang_now").val(e);
    $("#form_lang").submit();
}

$(function(){
    $('.with-submenu').click(function(e){
        if ($('.with-submenu').hasClass('c-active')) {
            $('.with-submenu').removeClass('c-active');
        }
        else {
            $('.with-submenu').addClass('c-active');
        }
    });

    $('.main-menu-toggler').click(function(e){
        if ($('.right').hasClass('showed-menu')) {
            $('.right').removeClass('showed-menu');
        }
        else {
            $('.right').addClass('showed-menu');
        }
    });
});