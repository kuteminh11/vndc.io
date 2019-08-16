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

  var rate_ltd_usd = 0;
  var rate_btc_usd = 0;
  var rate_eth_usd = 0;
  var rate_ltc_usd = 0;
  set_price_token();

  function set_price_token()
  {
    $.ajax({
        type: "POST",
        url: link_process,
        data: "key=get_list_price",
        success: function(msg)
        {
          var list_price = JSON.parse(msg);
          rate_ltd_usd = list_price.rate_ltd_usd;
          rate_btc_usd = list_price.rate_btc_usd;
          rate_eth_usd = list_price.rate_eth_usd;
          rate_ltc_usd = list_price.rate_ltc_usd;
        }
    });
  }

  generate_address_wallet();
  function generate_address_wallet()
  {
    $.ajax({
        type: "POST",
        url: link_process,
        data: "key=generate_address_wallet"
    });
  }

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
        new Promise(function(l, u) {
            $.post(link_process, {
                key:'get_address_buy_token',
                coin:'btc'
            }).done(function(e) {
              if (e.length > 20) {
                $(".box-address").html(e);
                $(".box-address").removeAttr('style');
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
              }
              else {
                $(".box-address").attr('style', 'display:none');
              }  
            }).fail(function(e) {
                $(".box-address").attr('style', 'display:none');
            })
        })
    });

    $("#btn-pay-eth").click(function(){
        new Promise(function(l, u) {
            $.post(link_process, {
                key:'get_address_buy_token',
                coin:'eth'
            }).done(function(e) {
              if (e.length > 20) {
                $(".box-address").html(e);
                $(".box-address").removeAttr('style');
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
              }
              else {
                $(".box-address").attr('style', 'display:none');
              }  
            }).fail(function(e) {
                $(".box-address").attr('style', 'display:none');
            })
        })
    });

    $("#btn-pay-ltc").click(function(){
        new Promise(function(l, u) {
            $.post(link_process, {
                key:'get_address_buy_token',
                coin:'ltc'
            }).done(function(e) {
              if (e.length > 20) {
                $(".box-address").html(e);
                $(".box-address").removeAttr('style');
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
              }
              else {
                $(".box-address").attr('style', 'display:none');
              }  
            }).fail(function(e) {
                $(".box-address").attr('style', 'display:none');
            })
        })
    });
	});
});