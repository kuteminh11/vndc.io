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

		$("#input-amount-token").keyup(function(e){
      var amount = $("#input-amount-token").val();
      amount = amount.replace(/,/g , "");
      amount = Number(amount).formatMoney(0, '.', '');
      if (isNaN(amount) || amount == '' || Number(amount) == 0) {
        $("#input-amount-token").val('0');
        $("#amount-btc").val((0).formatMoney(8, '.', ','));
        $("#amount-eth").val((0).formatMoney(8, '.', ','));
        $("#amount-ltc").val((0).formatMoney(8, '.', ','));
      }
      else {
        $("#input-amount-token").val(Number(amount).formatMoney(0, '.', ','));
        $("#amount-btc").val((Number(amount)/Number(rate_btc_usd)).formatMoney(8, '.', ','));
        $("#amount-eth").val((Number(amount)/Number(rate_eth_usd)).formatMoney(8, '.', ','));
        $("#amount-ltc").val((Number(amount)/Number(rate_ltc_usd)).formatMoney(8, '.', ','));
      }

      //Kiểm tra giới hạn nhỏ nhất
      if (Number(amount) < 100) {
        $("#info-show").addClass('info-req');
      }
      else {
        $("#info-show").removeClass('info-req');
      }      
    });

    /* Banking */
    $("#cashinAmount").keyup(function(e){
      var amount = $("#cashinAmount").val();
      amount = amount.replace(/,/g , "");
      amount = Number(amount).formatMoney(0, '.', '');
      var limit_min = $("#cashinAmount").data('min');
      var limit_max = $("#cashinAmount").data('max');
      if (isNaN(amount) || amount == '' || Number(amount) == 0) {
        amount = limit_min;
        $("#cashinAmount").val(Number(amount).formatMoney(0, '.', ','));        
      }
      else {
        $("#cashinAmount").val(Number(amount).formatMoney(0, '.', ','));
      }

      //Kiểm tra giới hạn nhỏ nhất
      if (Number(amount) < Number(limit_min)) {
        amount = limit_min;
        $("#error-amount-min").show();
      }
      else {
        $("#error-amount-min").hide();
      }

      //Kiểm tra giới hạn lớn nhất
      if (Number(amount) > Number(limit_max)) {
        amount = limit_max;
        $("#error-amount-max").show();
      }
      else {
        $("#error-amount-max").hide();
      }

      var fee = 0;
      if (Number(amount) <= Number(amount_for_calc_fee)) {
        fee = fee_amount;
      }
      else {
        fee = Number(fee_amount_over) + Number(amount)*Number(fee_percent);
      }
      var totalAmount = Number(amount) - Number(fee);
      if (Number(totalAmount) < 0) {
        totalAmount = 0;
      }
      $("#totalAmount").val(Number(totalAmount).formatMoney(0, '.', ','));
      $("#sp-fees").html(Number(fee).formatMoney(0, '.', ',')+" VNDC");
    });

    function disable_input(e)
    {
      if (e == true) {
        $("#sl_bank").attr('disabled', 'disabled');
        $("#bank-branch").attr('disabled', 'disabled');
        $("#bank-beneficiary-name").attr('disabled', 'disabled');
        $("#account_number").attr('disabled', 'disabled');
        $("#cashinAmount").attr('disabled', 'disabled');
      }
      else {
        $("#sl_bank").removeAttr('disabled');
        $("#bank-branch").removeAttr('disabled');
        $("#bank-beneficiary-name").attr('disabled');
        $("#account_number").removeAttr('disabled');
        $("#cashinAmount").removeAttr('disabled');
      }        
    }

    $("#btnCheckWithdraw").click(function(){
      var bank_code = $("#sl_bank").find(':selected').data('bankcode');
      var bank_name = $("#sl_bank :selected").text();
      var bank_branch = $("#bank-branch").val();
      var bank_beneficiary_name = $("#bank-beneficiary-name").val();
      var account_number = $("#account_number").val();
      var amount = $("#cashinAmount").val();
      if (typeof amount !== 'undefined') {
        amount = amount.replace(/,/g , "");
      }

      disable_input(true);
      
      $("#btnCheckWithdraw").hide();
      $("#loading_input").show();
      $("#error-show").hide();
      $("#error-amount-min").hide();
      $("#error-amount-max").hide();
      $("#error-amount-invalid").hide();

      $("#loading_input").hide();
      $(".box-result-bank").show();
      $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });

    $("#btnWithdraw").click(function(){
        var bank_key = $("#sl_bank").val();
        var bank_code = $("#sl_bank").find(':selected').data('bankcode');
        var bank_name = $("#sl_bank :selected").text();
        var bank_branch = $("#bank-branch").val();
        var bank_beneficiary_name = $("#bank-beneficiary-name").val();
        var account_number = $("#account_number").val();
        // var comment = $("#comment").val();
        var amount = $("#cashinAmount").val();
        if (typeof amount !== 'undefined') {
          amount = amount.replace(/,/g , "");
        }
        var authen_code = $("#authen-code").val();
        disable_input(true);

        $("#btnWithdraw").hide();
        $("#loading_input_authen").show();
        $(".error-authen").hide();

        $("#loading_input_authen").hide();
        $(".box-result-bank").html('<div class="col-md-12 col-12 m-b-20 text-center"><img src="https://sandbox.trustpay.vn/dev01/vndc.io/personal/images/inc/success.png" class="m-b-10"><p class="text-success fs-25 m-b-0">Withdraw successful</p></div>');$("html, body").animate({ scrollTop: $(document).height() }, 1000);

    });

    /*Khi đóng modal rút thì reset modal*/
    $("#btnCancelOrder").click(function(e){
      var code = $(this).data('code');
      $("#btnCancelOrder").hide();
      $("#loading-"+code).show();
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