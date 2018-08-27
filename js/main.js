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
});