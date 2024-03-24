
// 홈으로 
function moveHome() {
    location.href = `../../index.html`;
}

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
const moveSubPage = document.querySelectorAll('.page-navigation .section-grid > div');
const moveProjectList = document.querySelectorAll('.page-navigation .section-grid > span');


window.addEventListener('load', () => {

    includeHtml();

    if (matchMedia("screen and (min-width: 993px)").matches) vhSet();

    moveSubPage.forEach(el => {
        el.addEventListener('click', function(el){
            location.href = `../../page/${el.target.dataset.url}.html`;
        })
    })

    moveProjectList.forEach(el => {
        el.addEventListener('click', function(el) {
            const address = el.target.closest('.wrapper').id;
            sessionStorage.setItem('url',`${address}`);
            location.href = `../../index.html`;
        })
    })

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