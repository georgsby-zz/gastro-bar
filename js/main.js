function scroll_to(id){ 
    $('html, body').animate({ 
        scrollTop: $('#'+id).offset().top-20 
    }, 800); 
}

function alert_mess(_text) {
    $("#alert").fadeIn(200);
    $("#alert p").html(_text);
    setTimeout(function(){$("#alert").fadeOut(2000);}, 5000);
}

function getCart() {
    setTimeout(function() { 
        $.ajax({
            url: location.href,
            data:"ajax=getCart",
            success:function(json){
                console.log(json)
                $('#order').html(json.order);
                $('.cart').html(json.cart);   
                $('#cart_total').html(json.cart_total);           
            }
        });
    }, 500); 
}

function flyToElement(flyer, flyingTo, callBack /*callback is optional*/) {
    var $func = $(this);

    var divider = 3;

    var flyerClone = $(flyer).clone();
    $(flyerClone).css({
        position: 'absolute',
        top: $(flyer).offset().top + "px",
        left: $(flyer).offset().left + "px",
        opacity: 1,
        'z-index': 1000
    });
    $('body').append($(flyerClone));

    var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width()/divider)/2;
    var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height()/divider)/2;

    $(flyerClone).animate({
        opacity: 0.4,
        left: gotoX,
        top: gotoY,
        width: $(flyer).width()/divider,
        height: $(flyer).height()/divider
    }, 700,
    function () {
        $(flyingTo).fadeOut('fast', function () {
            $(flyingTo).fadeIn('fast', function () {
                $(flyerClone).fadeOut('fast', function () {
                    $(flyerClone).remove();
                    if( callBack != null ) {
                        callBack.apply($func);
                    }
                });
            });
        });
    });
}

$(document).ready(function(){
    //РЎР»Р°Р№РґРµСЂС‹
    $("#co1").owlCarousel({
        autoPlay : 6000,
        navigation : true,
        pagination:false,
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 4,
        itemsCustom : false,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [991,3],
        itemsTablet: [767,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        navigationText: ['<span class="prev_button"><i class="fa fa-caret-left"></i></span>','<span class="next_button"><i class="fa fa-caret-right"></i></span>']      
    });
    $("#co2").owlCarousel({
        autoPlay : 6000,
        navigation : true,
        pagination:false,
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 4,
        itemsCustom : false,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [991,3],
        itemsTablet: [767,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        navigationText: ['<span class="prev_button"><i class="fa fa-caret-left"></i></span>','<span class="next_button"><i class="fa fa-caret-right"></i></span>']      
    });

    $("#co3").owlCarousel({
        autoPlay : 6000,
        navigation : false,
        pagination:false,
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 1,
        itemsCustom : false,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [991,1],
        itemsTablet: [767,1],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        navigationText: ['<span class="prev_button"><i class="fa fa-caret-left"></i></span>','<span class="next_button"><i class="fa fa-caret-right"></i></span>']      
    });    

    //РњРѕР±РёР»СЊРЅРѕРµ РјРµРЅСЋ
    $(document).on('click','.pop_close, #overflow',function(){
        $('#overflow').fadeOut(200);
        $('body').removeClass('oh');
        $('.nav_ham').removeClass('open');
        $('.side_content_absolute').removeClass('side_visible');
        $('.side_content_absolute').css('display','none');      
        $('#trial').fadeOut(200);
        $('#RegistrationPopup').fadeOut(200);       
        return false;
    }); 

    $(document).on('click','.nav_ham', function(){
        if($('.side_content_absolute').hasClass('side_visible')){
            $('.nav_ham').removeClass('open');
            $('.side_content_absolute').removeClass('side_visible');
            $('.side_content_absolute').css('display','none');
            $('body').removeClass('oh');
            $('#overflow').fadeOut(200);
        }else{
            $('.side_content_absolute').addClass('side_visible');
            $('.side_content_absolute').css('display','block');
            $('.nav_ham').addClass('open');
            $('body').addClass('oh');
            $('#overflow').fadeIn(200);
            //scroll_to('nav_ham');
        }
        return false;
    });   
    $(document).on('click','.close_absolute',function(){
        $('.side_content_absolute').removeClass('side_visible');
        $('body').removeClass('oh');
        $('.nav_ham').toggleClass('open');
        $('#overflow').fadeOut(200);
        $('.side_content_absolute').css('display','none');
        return false;
    });

    $(document).on('click','.top-menu-a',function(){
        $(this).parent().find('ul').toggle('slow');
    });

    $(document).on('click','.mobile_menu li',function(){
        if ($(this).hasClass('Active')){
            $('.mobile_menu li').removeClass('Active'); 
        }else{
            $('.mobile_menu li').removeClass('Active');             
            $(this).toggleClass('Active');          
        }
    });


    $('.fancybox').fancybox();

    //РљРѕСЂР·РёРЅР° 
    $(document).on('click','.product_to_basket',function(){ //РћС‚РїСЂР°РІРєР° С‚РѕРІР°СЂР° РІ РєРѕСЂР·РёРЅСѓ
        var _data = $(this).attr('id');
        $.ajax({
            url: location.href,
            data:"ajax=buy&"+"id="+_data,
            success:function(_json){
                var json = jQuery.parseJSON(_json);
                if(json.ack == "Success"){                   
                    var imgtodrag = $('.product_view_image img').eq(0);
                    var cart = $('.CardWrap');
                    flyToElement(imgtodrag,cart);
                    getCart();
                    $('#overflow').fadeIn(200); 
                    $('body').addClass('oh2'); 
                    $('#success_adding').show(200);
                    $('.CardWrap').html(json.cart);
                }
            }
        });
        return false;
    }); 

    $(document).on('click','.CallBackBtn a',function(){
        $('#overflow').fadeIn(200); 
        $('body').addClass('oh2'); 
        $('#feedback').show(200);
        return false;
    });

    $(document).on('click','.PopupClose, #overflow, .hide_adding',function(){
        $('#success_adding').hide(200);
        $('#feedback').hide(200);
        $('#overflow').fadeOut(200);
        $('body').removeClass('oh2');
        return false;
    });

    $(document).on('click','.product_to_basket_cart',function(){ //РћС‚РїСЂР°РІРєР° С‚РѕРІР°СЂР° РІ РєРѕСЂР·РёРЅСѓ
        var _data = ($(this).attr('id')).substr(5);
        var _IB = '#IB' + _data;
        $.ajax({
            url: location.href,
            data:"ajax=buy&"+"id="+_data,
            success:function(_json){
                var json = jQuery.parseJSON(_json);
                if(json.ack == "Success"){                   
                    var imgtodrag = $(_IB).eq(0);
                    var cart = $('.CardWrap');
                    flyToElement(imgtodrag,cart);
                    getCart();
                    $('#overflow').fadeIn(200); 
                    $('body').addClass('oh2'); 
                    $('#success_adding').show(200);
                    $('.CardWrap').html(json.cart);
                }
            }
        });
        return false;
    }); 

    $(document).on('click','.product_to_basket_cart_main',function(){ //РћС‚РїСЂР°РІРєР° С‚РѕРІР°СЂР° РІ РєРѕСЂР·РёРЅСѓ
        var _data = ($(this).attr('id')).substr(5);
        var _IB = '#IB' + _data;
        $.ajax({
            url: location.href,
            data:"ajax=buy&"+"id="+_data,
            success:function(_json){
                var json = jQuery.parseJSON(_json);
                if(json.ack == "Success"){                   
                    $('#overflow').fadeIn(200); 
                    $('body').addClass('oh2'); 
                    $('#success_adding').show(200);
                }
            }
        });
        return false;
    });         

    $(document).on('click','.Minus',function(){
        var _data = ($(this).attr('id')).substr(1);
        var _id = '#C'+($(this).attr('id')).substr(1);
        $.ajax({
            url: location.href,
            data:"ajax=minus&"+"id="+_data,
            success:function(_json){
                var json = jQuery.parseJSON(_json);
                if(json.ack == "Success"){
                    $(_id).html(json.quant);
                    var ct = '#CT'+_data;
                    var cp = '#CP'+_data;
                    var cs = '#CS'+_data;
                    $(ct).html(json.cart_total);
                    $(cp).html(json.new_price);
                    $(cs).html(json.cart_sum);
                    $('.CardWrap').html(json.cart);
                    $('#CartAllTotal').html(json.all_total);
                }
            }
        });        
        return false;
    });    

    $(document).on('click','.Plus',function(){
        var _data = ($(this).attr('id')).substr(1);
        var _id = '#C'+($(this).attr('id')).substr(1);
        $.ajax({
            url: location.href,
            data:"ajax=plus&"+"id="+_data,
            success:function(_json){
                var json = jQuery.parseJSON(_json);
                if(json.ack == "Success"){
                    $(_id).html(json.quant);
                    var ct = '#CT'+_data;
                    var cp = '#CP'+_data;
                    var cs = '#CS'+_data;
                    $(ct).html(json.cart_total);
                    $(cp).html(json.new_price);
                    $(cs).html(json.cart_sum);
                    $('.CardWrap').html(json.cart);
                    $('#CartAllTotal').html(json.all_total);
                }
            }
        });        
        return false;
    });

    $(document).on('click','.CardItemClose',function(){
        var _data = ($(this).attr('id')).substr(2);
        $.ajax({
            url: location.href,
            data:"ajax=close&"+"id="+_data,
            success:function(_json){
                var json = jQuery.parseJSON(_json);
                if(json.ack == "Success"){
                    location.reload();
                }
            }
        });        
        return false;
    }); 

    $(document).on('click','.submit_order_basket',function(){
        $('.order_form').submit();
        return false;
    });

    $(document).on('submit', '.order_form', function(){
        var _this = $(this),
            _data = _this.serialize();
        $.ajax({
            data:"ajax=order&"+_data,
            success:function(_json){
                var json = jQuery.parseJSON(_json);
                $('.error_input').removeClass('error_input');

                if(json.ack == 'Failure'){
                    $.each(json.errors, function(key, value){
                        $('[name="'+value+'"]').addClass('error_input');
                        if(value == 'no_product'){
                            alert_mess('Р’Р°С€Р° РєРѕСЂР·РёРЅР° РїСѓСЃС‚Р°');
                        }
                    });
                }else{
                    window.location.replace(json.redirect);
                }
            }
        });
        return false;
    });

    $(document).on('submit', '#FEEDBACK', function(){
        var _this = $(this),
            _data = _this.serialize();
        $.ajax({
            url: location.href,
            data:"ajax=feedback&"+_data,
            success:function(json){
                var _json = jQuery.parseJSON(json);
                $('.error_input').removeClass('error_input');
                if(_json.ack == 'Failure'){
                    $.each(_json.errors, function(key, value){
                        _this.find('[name="'+value+'"]').addClass('error_input');                        
                    });
                }else{
                    _this.css('display', 'none');
                    _this.next('.ThanksText').fadeIn(200);
                }
            }
        });
        return false;
    });             

});




                                                            


