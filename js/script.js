




/*slick slider*/
function mainSliderInit() {
    if ($('.slider').length) {
        $('.slider').slick({
            prevArrow: '<a class="slick-arrow-prev" />',
            nextArrow: '<a class="slick-arrow-next" />',
            dots: true,
        });
    }
}

$(document).on('ready', function () {
   // $('.header__form-wrap').hover( function(){
   //     $(this).parent().find('.input').fadeToggle();
   //     // $(this).toggleClass('bgc');
   //
   // })

    if ($('.main__slider').length) {
        $('.main__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            fade: true,
            arrows: true,
            prevArrow:"<img class='a-left control-c prev slick-prev' src='img/arrow_left.png'>",
            nextArrow:"<img class='a-right control-c next slick-next' src='img/arrow_right.png'>",
            dots: true,
            draggable: false,
            swipe: true,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }]
        });
    }
    if ($('.reviews__slider').length) {
        $('.reviews__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            fade: true,
            arrows: true,
            prevArrow:"<img class='a-left control-c prev slick-prev' src='img/arr_left_reviews.png'>",
            nextArrow:"<img class='a-right control-c next slick-next' src='img/arr_right_reviews.png'>",
            dots: true,
            draggable: false,
            swipe: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }]
        });
    }


});

$(window).on('resize', function () {

});