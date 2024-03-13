// modal
// const modal = document.getElementById('image-editor');
// const modalCloseBtn = document.querySelectorAll('.modal-close');
// const contentImg = document.querySelectorAll('.content-detail img');
// const slide = document.querySelectorAll(".swiper-slide");
// const slideImgBox = document.querySelectorAll(".img-box");
// const slideImg = document.querySelectorAll(".img-box img");

// function zoomRemove() {
//     slide.forEach(el => {
//         el.classList.remove('zoom');
//         el.classList.remove('overflowY');
//     })
// }

// function modalClose(e) {
//     document.body.classList.remove('not-scroll');
//     modal.classList.add('modal-hide');
//     modal.classList.remove('modal-show');
//     zoomRemove();
// }

// function modalOpen(e) {
//     document.body.classList.add('not-scroll');
//     modal.classList.add('modal-show');
//     modal.classList.remove('modal-hide');
// }

// modalCloseBtn.forEach(el => {
//     el.addEventListener('click', () => {
//         modalClose(el);
//     })
// });

// function imgEditorModalOpen(el) {
//     let resetView = Number(el.target.dataset.num);
//     swiper.slideTo(resetView, 0);
//     modalOpen(el);
// }

// let swiperSetting = {
//     slidesPerView: '1',
//     centeredSlides: true,
//     // loop: true,
//     speed: 300,
//     allowTouchMove: false,
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         type: "fraction",
//     },
//     on: {
//         activeIndexChange: function (swipe) {
//             zoomRemove();
//         },
//     },
// }

// let swiper = new Swiper('.swiper', swiperSetting);


// 메인 vh 조정
const main = document.getElementsByTagName('main');

function vhSet() {
    let vh = window.innerHeight * 0.01;
    main[0].style.height = `calc(${vh}px * 100)`;
}


// 헤더 높이 효과
const header = document.getElementsByTagName("header");

function headerAnimation() {
    let w = window.innerWidth;
    const nw = (w < 577) ? 50 :
        (w < 993) ? 75 :
        100;

    if (window.pageYOffset > 200) {
        header[0].style.height = '50px';
    } else {
        header[0].style.height = `${nw}px`;
    }
}

// header, footer 끌어다 쓰기
function includeHtml() {
    const includeTarget = document.querySelectorAll('.include');
    includeTarget.forEach(function (el, idx) {
        fetch(`../../page/include/${el.id}.html`)
            .then(function (response) {
                response.text().then(function (html) {
                    let html_dom = new DOMParser().parseFromString(html, 'text/html');
                    html_dom = html_dom.body.firstChild;
                    let parent = document.getElementById(`${el.id}`);
                    parent.insertAdjacentElement('beforeend', html_dom);
                })
            });
    })
};


/* -------------------- window -------------------- */
const loading = document.querySelector('.loading');
const wrapper = document.querySelectorAll('.wrapper');
const pageMove = document.querySelectorAll('.page-navigation .section-grid > div');
const homeMove = document.querySelectorAll('.icon-home');

window.addEventListener('load', () => {

    includeHtml();

    if (matchMedia("screen and (min-width: 993px)").matches) vhSet();

    pageMove.forEach(el => {
        el.addEventListener('click', function(el){
            location.href = `../../page/${el.target.dataset.url}.html`;
        })
    })

    homeMove.forEach(el => {
        el.addEventListener('click', function(el){
            location.href = `../../index.html`;
        })
    })


    // if (window.innerWidth < window.innerHeight) {
    //     slideImgBox.forEach(el => {
    //         window.innerWidth < window.innerHeight ? el.classList.add('portrait') : '';
    //     })
    // }

    // slideImg.forEach(el => {
    //     el.naturalWidth < el.naturalHeight ? el.classList.add('portrait') : '';
    // })

    // slideImgBox.forEach(el => {
    //     el.addEventListener('click', (e) => {
    //         const el = e.target;
    //         const parent = el.closest('.swiper-slide');

    //         parent.classList.toggle('zoom');

    //         if (parent.classList.contains('zoom')) {
    //             parent.clientHeight > el.scrollHeight ? parent.classList.add('overflowY') : '';
    //         } else {
    //             parent.classList.remove('overflowY');
    //         }
    //     })
    // })

    // contentImg.forEach(el => {
    //     el.addEventListener('click', (event) => imgEditorModalOpen(event));
    // })

    window.addEventListener('scroll', () => {
        headerAnimation();
    });

    window.addEventListener('orientationchange', () => {});

    window.addEventListener('resize', () => {});

    document.body.classList.remove('before-load');
    loading.addEventListener('transitionend', (e) => {
        // document.body.removeChild(e.target);
    });

});