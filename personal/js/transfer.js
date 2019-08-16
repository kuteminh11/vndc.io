$(function(){
  Number.prototype.formatMoney = function(c, d, t){
      var n = this,
          c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
          j = (j = i.length) > 3 ? j % 3 : 0;
         return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  $(document).ready(function(){
    var reload = 0;
    $('#cashinAmount').change(function(e){
        var limit_min = $("#cashinAmount").data('min');
        var limit_min_format = Number(limit_min).formatMoney(0, '.', ',');
        var cashinAmount = $("#cashinAmount").val();
            cashinAmount = cashinAmount.replace(/,/g , "");
            if (cashinAmount == '' || isNaN(cashinAmount)) {
                $("#cashinAmount").val(limit_min_format);
                $(".error-text-input").show();
                $(".error-text-input").html('Invalid amount');
            }
            else if (Number(cashinAmount) < Number(limit_min)) {
                $("#cashinAmount").val(limit_min_format);
                $(".error-text-input").show();
                $(".error-text-input").html('Limit min '+limit_min_format+" VNDC");
            }
            else {
                $(".error-text-input").html("");
                $(".error-text-input").hide("");
                $("#cashinAmount").val(Number(cashinAmount).formatMoney(0, '.', ','));                
            }

            var fee_percent = $("#totalAmount").data('percentfee');
            var fee_min = $("#totalAmount").data('feemin');
            var fee_max = $("#totalAmount").data('feemax');
            var fee = 0;
            if (fee_percent != '' && fee_min != '' && fee_max != '') {
                fee = (Number(cashinAmount)*Number(fee_percent))/100;
                if (Number(fee) < Number(fee_min)) {
                  fee = fee_min;
                }
                else if (Number(fee) > Number(fee_max)) {
                  fee = fee_max;
                }
                $("#feeShow").html(Number(fee).formatMoney(0, '.', ','));


                var total = Number(cashinAmount) + Number(fee);
                if (Number(total) > 0) {
                    $("#totalAmount").val(Number(total).formatMoney(0, '.', ','));
                }
                else {
                    $("#totalAmount").val('0');
                }
            }
    });

    $("#btnTransfer").click(function(e){
        var accountReceive =$("#accountReceive").val();
        if (accountReceive == '') {
            $("#accountReceive").val("");
            $(".error-text-input").show();
            $(".error-text-input").html('Account receive is required');
            return;
        }

        var cashinAmount =$("#cashinAmount").val();
        cashinAmount = cashinAmount.replace(/,/g , "");
        var limit_min = $("#cashinAmount").data('min');
        var limit_min_format = Number(limit_min).formatMoney(0, '.', ',');
        if (cashinAmount == '' || isNaN(cashinAmount)) {
            $("#cashinAmount").val(limit_min_format);
            $(".error-text-input").show();
            $(".error-text-input").html('Invalid amount');
            return;
        }

        $("#btnTransfer").hide();
        $("#loading_input").show();

        $(".form-input").hide();
        $("#authenCode").val('');
        $(".form-authen").show();
    });

    $("#btnCancel").click(function(e){
      $(".form-input").show();
      $("#authenCode").val('');
      $(".form-authen").hide();
      $("#btnTransfer").show();
      $("#loading_input").hide();

      $(".fullname-receiver").html('');
      $(".amount-receiver").html('');
      $(".fee-receiver").html('');
      $(".total-receiver").html('');
    });

    $("#btnAuthen").click(function(e){        
        var accountReceive =$("#accountReceive").val();
        var amountTransfer =$("#cashinAmount").val();
        amountTransfer = amountTransfer.replace(/,/g , "");

        var authenCode =$("#authenCode").val();

        $("#btnAuthen").hide();
        $("#btnCancel").hide();
        $("#loading_authen").show();        
            
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
          .then(function () {
              location.reload();
           })            
    });

  });

});