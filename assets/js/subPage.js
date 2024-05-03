// 하단 목록, 이전, 다음 버튼
const subPageBtn = document.querySelectorAll('.page-navigation .section-grid > div');
const projectListBtn = document.querySelectorAll('.page-navigation .section-grid > span');

function moveSubPage(e) {
    if (e.type === 'click' || e.key === "Enter") location.href = `../../page/${e.target.dataset.url}.html`;
}

function moveProjectList(e) {
    const address = e.target.closest('.wrapper').id;
    if (e.type === 'click' || e.key === "Enter") {
        sessionStorage.setItem('url',`${address}`);
        location.href = `../../index.html`;
    }
}

subPageBtn.forEach(el => {
    el.addEventListener('click', moveSubPage)
    el.addEventListener('keydown', moveSubPage);
});

projectListBtn.forEach(el => {
    el.addEventListener('click', moveProjectList)
    el.addEventListener('keydown', moveProjectList);
})

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
const wrapper = document.querySelectorAll('.wrapper');

window.addEventListener('load', () => {

    includeHtml();

    // if (matchMedia("screen and (min-width: 1367px)").matches) vhSet();

    window.addEventListener('scroll', () => {});

    window.addEventListener('orientationchange', () => {});

    window.addEventListener('resize', () => {
        // matchMedia("screen and (min-width: 1367px)").matches ? vhSet() : main[0].style.height = 'auto';
    });

    document.body.classList.remove('before-load');
    document.getElementById('sub-loading').addEventListener('transitionend', (e) => {
        e.target.remove();
    });

});