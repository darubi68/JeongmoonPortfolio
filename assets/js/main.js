const contact = document.getElementById('contact');
const project = document.getElementById('project');
const projectBtn = document.querySelectorAll('.project-item button');
const sceneBackground = document.querySelector('.project-background');
const normalScene = document.querySelectorAll('.normal-scene');

// 프로젝트 background 스크롤 이벤트
function projectBackScroll() {
    let normalSceneHeight = 0;
    for (let i = 0; i < normalScene.length; i++) {
        normalSceneHeight += normalScene[i].scrollHeight;
    }
    const scrollSceneHeight = project.scrollHeight;
    const scrollRatio = ((window.pageYOffset - normalSceneHeight) - (scrollSceneHeight - window.innerHeight)) / (scrollSceneHeight - window.innerHeight);
    if (window.pageYOffset < normalSceneHeight) {
        sceneBackground.style.transform = 'translate3d(0, -100%, 0)';
        sceneBackground.style.opacity = 0;
        sceneBackground.classList.remove('scroll-on');
    } else if (window.pageYOffset > normalSceneHeight && window.pageYOffset < (normalSceneHeight + (scrollSceneHeight - window.innerHeight))) {
        sceneBackground.classList.add('scroll-on');
        sceneBackground.style.transform = `translate3d(0, ${Math.round(scrollRatio*100)}%, 0)`;
        sceneBackground.style.opacity = 1;
    } else if (window.pageYOffset > (normalSceneHeight + (scrollSceneHeight - window.innerHeight))) {
        sceneBackground.style.transform = 'translate3d(0, 0, 0)';
        sceneBackground.style.opacity = 1;
        sceneBackground.classList.remove('scroll-on');
    }
}

// 프로젝트 레이아웃 변경에 따른 이벤트 트리거 변경
function projectEventChange() {
    const projectItem = document.querySelectorAll('#project .project-item');
    projectItem.forEach((el, idx) => {
        el.setAttribute('tabindex','0');
        el.addEventListener('click', () => { 
            projectBtn[idx].click(); 
        });
        el.addEventListener('keydown', (e) => {
            if(e.key === "Enter") projectBtn[idx].click();
         });
    })
}

// 프로젝트 서브페이지 연결
function subPageChange(event) {
    const el = event.target;
    let link = el.closest('.project-item').dataset.page;
    if (event.ctrlKey) {
        window.open(`/page/${link}.html`, '_blank').focus();
    } else {
        location.href = `/page/${link}.html`;
    }
}

projectBtn.forEach(el => {
    el.addEventListener('click', (event) => subPageChange(event));
})

/* -------------------- design -------------------- */
const tabContentLi = document.querySelectorAll('.design-list > ul > li');

tabContentLi.forEach(e => {
    e.addEventListener('click', () => {
        modalOpen(e)
    });
    e.addEventListener('keydown', (el) => {
        if (el.key === "Enter") modalOpen(e);
    });
});

let swiper = new Swiper(".design-list", {
    slidesPerView: '1',
    centeredSlides: true,
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    speed: 300,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: '2',
            spaceBetween: 30,
        },
        992: {
            slidesPerView: '2',
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: '3',
            spaceBetween: 40,
        }
    },
});

/* -------------------- about -------------------- */
const about = document.getElementById('about');
const aboutImg = document.querySelector('.about-img');
const aboutText = document.querySelectorAll('.about-text > *');
const aboutBtn = document.querySelector('.about-text button');

function aboutSetLayout(hd922) {
    if (hd922) {
        aboutImg.setAttribute('data-aos', '');
        aboutText.forEach(el => {
            el.setAttribute('data-aos', '');
        });
    } else {
        aboutImg.setAttribute('data-aos', 'fade-up');
        aboutText.forEach(el => {
            el.setAttribute('data-aos', 'fade-up');
        });
    }
    AOS.refresh();
}


/* -------------------- main -------------------- */
const main = document.getElementById('main');
const mainImgGrid = document.querySelector('.main-imgGrid');
const imgBox = document.querySelectorAll('.main-imgBox img');

// 메인 레이아웃 셋팅
function mainSetLayout() {
    const b = window.innerHeight * Math.cos(55 * Math.PI / 180);
    let a = 0;
    if (hd922) a = (window.innerWidth / 2) * Math.cos(35 * Math.PI / 180);
    else a = window.innerWidth * Math.cos(35 * Math.PI / 180);
    mainImgGrid.style.width = `${a+b}px`;
}


/* -------------------- nav header -------------------- */
const header = document.querySelector('header');
const openNavBtn = document.querySelector('.open-nav-btn');
const pageAnchorBtn = document.querySelectorAll('.page-anchor-btn');
const paNav = document.querySelectorAll('.header-left-wrap .page-anchor-btn');
const mobileNav = document.querySelectorAll('.open-nav-wrap .page-anchor-btn');

function navToggle() {
    header.classList.toggle('active');
    document.body.classList.contains('active') ? document.body.classList.remove('active') : '';

    if(header.classList.contains('active')) {
        mobileNav.forEach(el => { el.setAttribute('tabindex', '0'); });
    } else {
        mobileNav.forEach(el => { el.setAttribute('tabindex', '-1'); }); 
    }
}

function navTabindexChange(value) {
    if(!value) paNav.forEach(el => { el.setAttribute('tabindex', '-1'); })
}

pageAnchorBtn.forEach(el => {
    el.addEventListener('click', function (e) {
        navToggle();
        const elementId = e.target.innerHTML;
        document.getElementById(elementId).scrollIntoView({
            behavior: 'smooth',
        });
        document.activeElement.blur();
    })
});

openNavBtn.addEventListener('click', navToggle);


/* -------------------- modal -------------------- */
// 모달 open/close
const modal = document.querySelectorAll('.modal');
const inactiveModal = document.getElementById('inactive-modal');
const designModal = document.getElementById('design-modal');
const designModalContainer = document.querySelector('#design-modal .modal-container');
const designLoading = document.getElementById('design-loading');
const modalCloseBtn = document.querySelectorAll('.modal-close');
let elm;

function modalOpen(e) {
    document.body.classList.add('not-scroll');
    elm = e;

    if (e.classList.contains('inactive')) {
        inactiveModal.setAttribute('aria-modal', 'true');
        inactiveModal.focus();
        inactiveModal.classList.add('modal-show');
        inactiveModal.classList.remove('modal-hide');
    } else if (e.closest('.design-list')) {
        designModal.setAttribute('aria-modal', 'true');
        designModal.focus();
        const img = document.createElement('img');
        img.src = `./assets/img/design/${e.dataset.img}.webp`;
        designModal.classList.remove('modal-hide');
        designModal.classList.add('modal-show');
        designModalContainer.appendChild(img);
        img.onload = () => {
            modalLoading();
        }
    }

    function modalLoading() {
        designModal.classList.remove('before-load');
        designLoading.addEventListener('transitionend', (e) => {
            designLoading.style.display = 'none';
        });
    }
}

function modalClose(e) {
    document.body.classList.remove('not-scroll');
    elm.focus();
    e.closest('.modal').classList.add('modal-hide');
    e.closest('.modal').classList.remove('modal-show');
    inactiveModal.setAttribute('aria-modal', 'false');
    designModal.setAttribute('aria-modal', 'false');
    setTimeout(() => {
        designModal.classList.add('before-load');
        designLoading.style.display = 'flex';
        designModalContainer.replaceChildren();
    }, 400);
}

modalCloseBtn.forEach(e => {
    e.addEventListener('click', () => modalClose(e));
    e.addEventListener('keydown', (el) => {
        if (el.key === "Enter") modalClose(e)
    });
});


function checkOS() {
    const type = navigator.userAgent.toLowerCase();
    if (type.indexOf('iphone') > -1 || type.indexOf('ipad') > -1 || type.indexOf('ipod') > -1) {
        return true;
    }
};


/* -------------------- window -------------------- */

// width가 992px보다 크면 true 작으면 false 
let hd922 = !matchMedia("screen and (max-width: 992px)").matches;

window.addEventListener('load', () => {

    mainSetLayout();
    navTabindexChange(hd922);
    aboutSetLayout(hd922);

    checkOS() ? imgBox.forEach(el => el.className = 'ios-type') : '';

    const yOffset = window.pageYOffset;
    if (hd922) {
        if (yOffset > project.offsetTop) {
            window.scrollTo({
                top: yOffset - 1
            });
            projectBackScroll();
        }
    } else {
        projectEventChange();
    }

    if (sessionStorage.getItem('url')) {
        document.querySelector(`.project-item[data-page="${sessionStorage.getItem('url')}"]`).scrollIntoView({
            block: "center"
        });
        sessionStorage.clear('url');
    }

    document.body.classList.remove('before-load');
    document.getElementById('main-loading').addEventListener('transitionend', (e) => {
        e.target.remove();
    });

    window.addEventListener('scroll', () => {
        if (hd922) projectBackScroll();
    });

    let width = window.innerWidth;
    window.addEventListener('resize', () => {
        if (width !== window.innerWidth) {
            hd922 = !matchMedia("screen and (max-width: 992px)").matches;
            mainSetLayout();
            navTabindexChange(hd922);
            aboutSetLayout(hd922);
            projectEventChange();
            width = window.innerWidth;
        }
    });
});