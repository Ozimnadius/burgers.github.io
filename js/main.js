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
    })
});