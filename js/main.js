$(function () {

    const accoButtons = document.querySelectorAll('.team__name');
    const accoItems = document.querySelectorAll('.team__item');
    const accoHiddens = document.querySelectorAll('.team__hidden');

    for (let i = 0; i < accoButtons.length; ++i) {
        let button = accoButtons[i];
        button.addEventListener('click', function () {
            let item = this.parentElement,
                wrapper = item.querySelector('.team__wrapper'),
                wrapperStyles = getComputedStyle(wrapper),
                wrapperHeight = parseInt(wrapperStyles.height),
                hidden = item.querySelector('.team__hidden');


            if (item.classList.contains('active')) {
                hidden.style.height = 0;
                item.classList.remove('active');

            } else {
                for (let j = 0; j < accoItems.length; ++j) {
                    accoItems[j].classList.remove('active');
                }
                for (let j = 0; j < accoHiddens.length; ++j) {
                    accoHiddens[j].style.height = 0;
                }
                hidden.style.height = wrapperHeight + 'px';
                item.classList.add('active');
            }

        });
    }


    const haccoButtons = document.querySelectorAll('.haccor__title');
    const haccoItems = document.querySelectorAll('.haccor__item');

    for (let i = 0; i < haccoButtons.length; ++i) {
        let button = haccoButtons[i];
        button.addEventListener('click', function () {
            let item = this.parentElement;

            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                for (let j = 0; j < haccoItems.length; ++j) {
                    haccoItems[j].classList.remove('active');
                }
                item.classList.add('active');
            }

        });
    }

    const hamOpen = document.querySelector('.menu-button ');
    const hamClose = document.querySelector('.ham__close');
    const ham = document.querySelector('.ham');

    hamOpen.addEventListener('click', function (e) {
        ham.classList.add('open');
    });
    hamClose.addEventListener('click', function (e) {
        ham.classList.remove('open');
    });

    var mySwiper = new Swiper('.burgers__container', {
        loop: true,
        navigation: {
            nextEl: '.burgers__next',
            prevEl: '.burgers__prev',
        },
    })

    const orderForm = document.querySelector('.order__form');
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        let els = this.elements,
            data = {
                name: els.name.value,
                phone: els.tel.value,
                comment: els.comment.value,
                to: 'email@email'
            };

        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.responseType = 'json';
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', function () {
            if (xhr.status < 400) {
                alert('Спасибо за заказ!!!');
            }
        })
    });


    const reviewButtons = document.querySelectorAll('.review__button');
    const popup = document.querySelector('.popup');
    const popupContent = popup.querySelector('.popup__content');

    for (let i = 0; i < reviewButtons.length; i++) {
        let reviewButton = reviewButtons[i];

        reviewButton.addEventListener('click', function () {
            let content = this.previousElementSibling.innerHTML;

            popupContent.innerHTML = content;
            popup.classList.add('active');
        });
    }
    popup.querySelector('.popup__close').addEventListener('click', function () {
        popup.classList.remove('active');
    });
    popup.addEventListener('click', function (e) {

        if (e.target.classList.contains('popup')) {
            popup.classList.remove('active');
        }
    });


    let sections = $('section'),
        mainContent = $('.main'),
        inScroll = false,
        screen = 0;

    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();


    function scrollToSection(sectionIndex) {
        let position = '0vh';

        position = ((sections.eq(sectionIndex).index()) * -100) + '%';

        sections.eq(sectionIndex).addClass('active')
            .siblings()
            .removeClass('active');

        mainContent.css({
            'transform': 'translate3d(0,' + position + ', 0)'
        });
        $('.pagination__item').eq(sectionIndex).addClass('active')
            .siblings()
            .removeClass('active');

        setTimeout(function () {
            inScroll = false;
        }, 500);
    }

    $(document).on({
            wheel: function (e) {
                e.preventDefault();

                let deltaY = e.originalEvent.deltaY,
                    activeSection = sections.filter('.active'),
                    nextSection = activeSection.next(),
                    prevSection = activeSection.prev();

                if (inScroll) return;

                inScroll = true;

                if (deltaY > 0) {
                    if (nextSection.length) {
                        scrollToSection(nextSection.index());
                    } else {
                        inScroll = false;
                    }
                } else {
                    if (prevSection.length) {
                        scrollToSection(prevSection.index());
                    } else {
                        inScroll = false;
                    }
                }
            },
            keydown: function (e) {
                let activeSection = sections.filter('.active'),
                    nextSection = activeSection.next(),
                    prevSection = activeSection.prev();

                if ($(e.target).is('textarea')) return;

                // if (!(e.keyCode === 38 || e.keyCode === 40)) return;

                if (e.keyCode == '38') {
                    if (prevSection.length) {
                        screen = prevSection.index();
                    }
                } else if (e.keyCode == '40') {
                    if (nextSection.length) {
                        screen = nextSection.index();
                    }
                }


                scrollToSection(screen);

            }
        });

    $('.wrapper').on('touchmove', function (e) {
        e.preventDefault();
    });


    $('.pagination__item, .nav__item, .logo, .header__button').on('click', function (e) {
        e.preventDefault();
        let href = $(this).attr('href'),
            target = sections.filter(href);

        inScroll = true;

        scrollToSection(target.index());
    });

    $('.ham__item, .logo').on('click', function (e) {
        e.preventDefault();
        let href = $(this).attr('href'),
            target = sections.filter(href);

        inScroll = true;
        $('.ham').removeClass('open');
        scrollToSection(target.index());
    });

    const video = document.querySelector('.video__video');
    const pin = $('.video__scale-pin');
    const pinVolume = $('.video__volume-pin');
    const start = $('.video__start');
    const play = $('.video__play');

    function startVideo(){
        video.play();
        start.hide();
        play.addClass('pause');
    };
    function pauseVideo() {
        video.pause();
        start.show();
        play.removeClass('pause');
    };
    $('.video__start, .video__play-svg_play').on('click', function (e) {
        startVideo()
    });
    $('.video__play-svg_pause').on('click', function (e) {
        pauseVideo();
    });
    function setDurationPin(percent){
        pin.css({
            left: percent
        });
    }
    $('.video__scale').on('click', function (e) {
        e.preventDefault();

        let bar = $(e.currentTarget),
            newPosition = e.pageX - bar.offset().left,
            percent = newPosition / bar.width() * 100 + '%';

        video.currentTime = video.duration*(newPosition / bar.width());

        setDurationPin(percent);
    });
    video.ontimeupdate = function () {
        let duration = video.duration,
            currentTime = video.currentTime,
            percent = currentTime / duration * 100 + '%';

        setDurationPin(percent);
    };
    $('.video__volume-pin').css({
        left: video.volume*100+'%'
    });


    const volume = $('.video__volume');
    function mute(){
        volume.addClass('muted');
        video.volume = 0;
        pinVolume.css({
            left: 0
        });
    }
    function unmute(percent) {
        volume.removeClass('muted');
        video.volume = 1;
        pinVolume.css({
            left: percent
        });
    }
    $('.video__volume-scale').on('click', function (e) {
        e.preventDefault();

        let bar = $(e.currentTarget),
            newPosition = e.pageX - bar.offset().left,
            percent = newPosition / bar.width() * 100 + '%';

        video.volume = newPosition / bar.width();

        unmute(percent);
    });

    $('.video__volume-svg_mute').on('click',function () {
        unmute('100%');
    });
    $('.video__volume-svg_unmute').on('click',function () {
        mute();
    });


    if (isMobile) {
        $(document).swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                /**
                 * плагин возвращает фактическое...
                 * ...
                 */
                const scrollDirection = direction === 'down' ? 'up' : 'down';

                let activeSection = sections.filter('.active'),
                    nextSection = activeSection.next(),
                    prevSection = activeSection.prev();


                if (scrollDirection == 'down') {
                    if (nextSection.length) {
                        scrollToSection(nextSection.index());
                    } else {
                        inScroll = false;
                    }
                } else {
                    if (prevSection.length) {
                        scrollToSection(prevSection.index());
                    } else {
                        inScroll = false;
                    }
                }
            }
        });
    }

});

//yandex-map
(function () {
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [55.65587627, 37.54100446],
            zoom: 14,
            controls: []
        });

        myMap.behaviors.disable(['scrollZoom']);
        // myMap.controls.remove('geolocationControl')
        //     .remove('searchControl')
        //     .remove('trafficControl')
        //     .remove('typeSelector')
        //     .remove('fullscreenControl')
        //     .remove('zoomControl')
        //     .remove('rulerControl');

        myPin = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: '/images/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-15, -55]
        });

        myPlacemark1 = new ymaps.Placemark([55.65587627, 37.54100446], {});
        myPlacemark2 = new ymaps.Placemark([55.64158266, 37.52660636], {});
        myPlacemark3 = new ymaps.Placemark([55.65672547, 37.57243995], {});
        myPlacemark4 = new ymaps.Placemark([55.66958253, 37.55184058], {});

        myPin.add(myPlacemark1).add(myPlacemark2).add(myPlacemark3).add(myPlacemark4);
        myMap.geoObjects.add(myPin);
    }
}());