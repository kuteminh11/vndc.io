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

  var rate_btc_usd = 240507675;
  var rate_eth_usd = 5142184;
  var rate_ltc_usd = 2197622;

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

    $("#btn-pay-btc").click(function(){
        $(".box-address").html('<img src="https://chart.googleapis.com/chart?chs=200x200&amp;cht=qr&amp;chld=L|1&amp;chl=0xe12ad93cdc43983ff0a45f1d03c63b3ea8998551" alt="qrcode" class="qrcode"><h2 class="box-title"><span>Your BTC wallet address</span></h2><p class="perex"><span>This is the address of your wallet on VNDC.io. You can send BTC from any wallet supporting BTC.</span></p><p class="perex alert alert-warning"><span>** Note: Send only <b>BTC</b> to this deposit address. Sending any other coin or token to this address may result in the loss of your deposit.</span></p><input id="address-value" type="text" class="input address" readonly="" value="0xe12ad93cdc43983ff0a45f1d03c63b3ea8998551"><button id="btn-copy-address" onclick="copyAddress()" class="btn btn-sm"><span>COPY</span></button>');
        $(".box-address").removeAttr('style');
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });

    $("#btn-pay-eth").click(function(){
        $(".box-address").html('<img src="https://chart.googleapis.com/chart?chs=200x200&amp;cht=qr&amp;chld=L|1&amp;chl=0x1ccfbb7fb56a8ef0036cc8f9b938021bf2e0cafb" alt="qrcode" class="qrcode"><h2 class="box-title"><span>Your ETH wallet address</span></h2><p class="perex"><span>This is the address of your wallet on VNDC.io. You can send ETH from any wallet supporting ETH.</span></p><p class="perex alert alert-warning"><span>** Note: Send only <b>ETH</b> to this deposit address. Sending any other coin or token to this address may result in the loss of your deposit.</span></p><input id="address-value" type="text" class="input address" readonly="" value="0x1ccfbb7fb56a8ef0036cc8f9b938021bf2e0cafb"><button id="btn-copy-address" onclick="copyAddress()" class="btn btn-sm"><span>COPY</span></button>');
        $(".box-address").removeAttr('style');
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });

    /* Banking */
    $("#cashinAmount").keyup(function(e){
      var amount = $("#cashinAmount").val();
      amount = amount.replace(/,/g , "");
      amount = Number(amount).formatMoney(0, '.', '');
      var limit_min = $("#cashinAmount").data('min');
      if (isNaN(amount) || amount == '' || Number(amount) == 0) {
        $("#cashinAmount").val(Number(limit_min).formatMoney(0, '.', ','));
      }
      else {
        $("#cashinAmount").val(Number(amount).formatMoney(0, '.', ','));
      }

      //Kiểm tra giới hạn nhỏ nhất
      if (Number(amount) < Number(limit_min)) {
        $("#info-show").addClass('info-req');
        // $("#cashinAmount").val(Number(limit_min).formatMoney(0, '.', ','));
      }
      else {
        $("#info-show").removeClass('info-req');
      }
    });

    function disable_input(e)
    {
      if (e == true) {
        $("#cashinAmount").attr('disabled', 'disabled');
        $("#sl_bank").attr('disabled', 'disabled');
      }
      else {
        $("#cashinAmount").removeAttr('disabled');
        $("#sl_bank").removeAttr('disabled');
      }        
    }

    $("#btnDeposit").click(function(){
        var amount = $("#cashinAmount").val();
        amount = amount.replace(/,/g , "");
        var bank = $("#sl_bank").val();

        disable_input(true);

        $("#btnDeposit").hide();
        $("#loading_input").show();
        $("#error-show").hide();
        $("#info-show").removeClass('info-req');

        $(".box-result-bank").show();
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });

	});
});