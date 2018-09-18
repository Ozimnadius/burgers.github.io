$(function () {
    $('.team__name').on('click', function (e) {
        var button = $(this),
            item = button.closest('.team__item'),
            wrapperHeight = item.find('.team__wrapper').outerHeight(),
            hidden = item.find('.team__hidden'),
            items = $('.team__item').not(item),
            hiddens = $('.team__hidden').not(hidden);

        items.removeClass('active');
        hiddens.css({
            height: 0
        });
        hidden.css({
            height: wrapperHeight
        });
        item.addClass('active');


    });

    const hamOpen = document.querySelector('.menu-button ');
    const hamClose = document.querySelector('.ham__close');
    const ham = document.querySelector('.ham');

    hamOpen.addEventListener('click', function (e) {
        ham.classList.add('open');
    });

    hamClose.addEventListener('click', function (e) {
        ham.classList.remove('open');
    })
});