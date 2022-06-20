$(function(){

    $(".menu a, .go-top").on("click", function (event){
        event.preventDefault();
        var id = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });



    $('.button_btn').on('click', function(){
        // $('.menu_list').toggleClass('menu_list--active');
            $('.header_top_inner').toggleClass('header_top_inner--active');

    })

    var mixer = mixitup('.portfolio_content');
});