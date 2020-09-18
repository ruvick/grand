jQuery(document).ready(function ($) {
  $('.hamburger').click(function () {
    $('.mob-menu').css('bottom', 0);
  });
  $(".close-menu").click(function () {
    $('.mob-menu').css('bottom', '120%');
  });
  $('.mob-menu a').click(function() {
    $('.mob-menu').css('bottom', '120%');
  });
  var inputmask_96e76a5f = {"mask":"+7(999)999-99-99"};
  jQuery("input[type=tel]").inputmask(inputmask_96e76a5f);
  $(".popup-content").click(function(e) {
  	e.preventDefault();
    var mailmsg = $(this).data('mailmsg');
    $('#order-modal .uniSendBtn').attr('data-mailmsg', mailmsg);
    $('#order-modal').arcticmodal();
  });

  $(".header-nav").scrollToFixed({
    marginTop: -1,
  });

  $('.results-slider').slick({
    slidesToShow: 4,
    autoplay: 4000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
  });

    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'albumLabel': ''
    })

  $('.services-item').click(function() {
	  
    var pict = $(this).find('.services-item__img').css("background-image");
	console.log(pict);
	$(".serv-modal__photo").css("background-image", pict);
	
	var title = $(this).children('.services-item__title').text();
	
    $('#serv-modal .uniSendBtn').attr('data-mailmsg', 'Вопрос по услуге ' + title);
    $(".serv-modal__title").html('Заинтересовала услуга: <br/> <span style = "color:#c4041c">' + title + '</span>');
    $("#serv-modal").arcticmodal();
  });

  var $page = $('html, body');
    $('.menu a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
    });
  jQuery(".uniSendBtn").click(function(e){ 
	  	e.preventDefault();
      var formid = jQuery(this).data("formid");
      var message = jQuery(this).data("mailmsg");
      var phone = jQuery(this).parent().find('input[type=tel]');
      var name = jQuery(this).parent().find('input[name=name]').val();
      
      if ((phone.val() == "")||(phone.val().indexOf("_")>0)) {
        phone.css("background-color","#ff91a4")
      } else {
        var  jqXHR = jQuery.post(
          allAjax.ajaxurl,
          {
            action: 'universal_send',    
            nonce: allAjax.nonce,
            msg: message,
            name: name,
            tel: phone.val()
          }
          
        );
        
        
        jqXHR.done(function (responce) {
          $.arcticmodal('close');
          // jQuery('#messgeModal #lineMsg').html("Ваша заявка принята. Мы свяжемся с Вами в ближайшее время.");
          // jQuery('#messgeModal').arcticmodal();
          window.location.href = "https://grand-kg.ru/страница-благодарности/";
        });
        
        jqXHR.fail(function (responce) {
          jQuery('#messgeModal #lineIcon').html('');
          jQuery('#messgeModal #lineMsg').html("Произошла ошибка! Попробуйте позднее.");
          jQuery('#messgeModal').arcticmodal();
        });
      }
    });
});
