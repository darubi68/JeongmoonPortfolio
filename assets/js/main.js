/* -------------------- project -------------------- */
const contact = document.getElementById('contact');
const project = document.getElementById('project');
const projectBody = document.querySelector('.project-body');
const projectBtn = document.querySelectorAll('.project-item button');
const projectSwitch = document.getElementById('project-switch');
const sceneBackground = document.querySelector('.project-background');
const normalScene = document.querySelectorAll('.normal-scene');

// 프로젝트(grid) background 스크롤 이벤트
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

// 프로젝트 서브페이지 연결
function subPageChange(event) {
    const el = event.target;
    let link = el.closest('.project-item').dataset.page;
    // if (event.ctrlKey) {
    //     window.open(`/page/${link}.html`, '_blank').focus();
    // } else {
    //     location.href = `/page/${link}.html`;
    // }
    location.href = `/page/${link}.html`;
}

// full&grid 변경 이벤트
function projectSetClass(value) {
    project.className = value;
    contact.className = value;
    AOS.refresh();

    if(value === 'grid') {
        matchMedia("screen and (max-width: 992px)").matches ? '' : localStorage.setItem('mode',`${value}`);

        const projectItem = document.querySelectorAll('#project.grid .project-item');
        projectItem.forEach((el, idx) => {
            el.addEventListener('click', ()=> {
                projectBtn[idx].click();
            });
        })
    } else {
        localStorage.clear('mode');
    }
}

//프로젝트 보기방식 변경 
function projectChangeView(check) {
    projectBody.style.opacity = 0;

    // if(!matchMedia("screen and (max-width: 992px)").matches && check) {
        
    // }

    projectBody.addEventListener('transitionend', () => {
        if (check === false) {
            projectSetClass('full');
        } else {
            projectSetClass('grid');
        }
        projectBody.style.opacity = 1;
    }, {
        once: true
    });
}

projectBtn.forEach(el => {
    el.addEventListener('click', (event) => subPageChange(event));
})

projectSwitch.addEventListener('change', () => projectChangeView(projectSwitch.checked));



/* -------------------- design -------------------- */
const tabContentLi = document.querySelectorAll('.design-list > ul > li');

tabContentLi.forEach(e => {
    e.addEventListener('click', () => {
        modalOpen(e);
    });
});

let swiper = new Swiper(".design-list", {
    // mousewheel: true,    
    slidesPerView: '1',
    centeredSlides: true,
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    // loopAdditionalSlides: 2,
    speed: 300,
    pagination: {
        el: ".design-list .swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
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

function aboutSetLayout(value) {
    if (value === 'grid') {
        aboutImg.setAttribute('data-aos', 'fade-up');
        aboutText.forEach(el => {
            el.setAttribute('data-aos', 'fade-up');
        });
    } else {
        aboutImg.setAttribute('data-aos', '');
        aboutText.forEach(el => {
            el.setAttribute('data-aos', '');
        });
    }
    AOS.refresh();
}

aboutBtn.addEventListener('click', function() {
    location.href = 'https://smiling-cesium-689.notion.site/259c32eafc6840cfa9082670ccdd404f?pvs=4';
})



/* -------------------- main -------------------- */
const main = document.getElementById('main');
const mainImgGrid = document.querySelector('.main-imgGrid');
const imgBox = document.querySelectorAll('.main-imgBox >div');

// 메인 레이아웃 셋팅
function mainSetLayout() {
    const b = window.innerHeight * Math.cos(55 * Math.PI / 180);
    let a = 0;
    if (matchMedia("screen and (max-width: 992px)").matches) a = window.innerWidth * Math.cos(35 * Math.PI / 180);
    else a = (window.innerWidth / 2) * Math.cos(35 * Math.PI / 180);
    mainImgGrid.style.width = `${a+b}px`;
}



/* -------------------- nav header -------------------- */
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const navList = document.querySelectorAll("#nav ul li");
let prevScroll = window.pageYOffset;

// a태그 대신 jqvascript로 페이지 내 이동
navList.forEach(e => {
    e.addEventListener('click', (el) => {
        const elName = el.target.innerHTML;
        document.getElementById(elName).scrollIntoView({
            behavior: 'smooth'
        });
    })
})

function navHeaderAnimation() {
    const currentScroll = window.pageYOffset;
    if (prevScroll > currentScroll) {
        nav.style.top = "0px";
        header.style.top = "-50px";
    } else {
        nav.style.top = "-50px";
        header.style.top = "0px";
    }
    prevScroll = currentScroll;
}



/* -------------------- top button -------------------- */
// const topButton = document.getElementById('top-button');
// // 탑버튼 이벤트
// function scrollTop() {
//     if (window.scrollY > 200) {
//         topButton.classList.add('top-active');
//     } else {
//         topButton.classList.remove('top-active');
//     }
// }
// topButton.addEventListener('click', () => {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
//     // vhSet();
// })



/* -------------------- modal -------------------- */
// 모달 open/close
const modal = document.querySelectorAll('.modal');
const inactiveModal = document.getElementById('inactive-modal');
const designModal = document.getElementById('design-modal');
const designModalContainer = document.querySelector('#design-modal .modal-container');
const designLoading = document.getElementById('design-loading');
const modalCloseBtn = document.querySelectorAll('.modal-close');

function modalOpen(e) {
    document.body.classList.add('not-scroll');
    swiper.autoplay.stop();
    if (e.classList.contains('inactive')) {
        inactiveModal.classList.add('modal-show');
        inactiveModal.classList.remove('modal-hide');
    } else if (e.closest('.design-list')) {
        const img = document.createElement('img');
        img.src = `./assets/img/design/${e.dataset.img}.png`;
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
    swiper.autoplay.start();
    e.closest('.modal').classList.add('modal-hide');
    e.closest('.modal').classList.remove('modal-show');
    setTimeout(() => {
        designModal.classList.add('before-load');
        designLoading.style.display = 'flex';
        designModalContainer.replaceChildren();
    }, 400);
}

modalCloseBtn.forEach(e => {
    e.addEventListener('click', () => {
        modalClose(e);
    })
});




function checkOS() {
    const type = navigator.userAgent.toLowerCase();
    if (type.indexOf('iphone') > -1 || type.indexOf('ipad') > -1 || type.indexOf('ipod') > -1) {
        return true;
    }
};



/* -------------------- window -------------------- */
const bodyLoading = document.getElementById('body-loading');

window.addEventListener('load', () => {
    main.style.height = `${window.innerHeight}px`;
    mainSetLayout();
    checkOS() ? imgBox.forEach(el => el.className = 'ios-type') : '';

    // function mainImgLoad() {
    //     const mainImg = document.querySelectorAll('.main-imgGrid img');
    //     let value;
    //     mainImg.forEach(el => {
    //         value = el.complete && el.naturalWidth !== 0;
    //     })
    //     return value;
    // }

    // if (mainImgLoad()) {
    //     document.body.classList.remove('before-load');
    //     bodyLoading.addEventListener('transitionend', (e) => {
    //         // document.body.removeChild(e.target);
    //     });
    // }

    if(matchMedia("screen and (max-width: 992px)").matches) {
        projectSwitch.checked = true;
        projectSetClass('grid');
        aboutSetLayout('grid');
        localStorage.clear('mode');
    } else {
        if(localStorage.getItem('mode') === 'grid') {
            projectSwitch.checked = true;
            projectSetClass('grid');
        }
        aboutSetLayout('full');
    }

    if (sessionStorage.getItem('url')) {
        document.querySelector(`.project-item[data-page="${sessionStorage.getItem('url')}"]`).scrollIntoView({
            block: "center"
        });

        sessionStorage.clear('url');
    }

    if (window.pageYOffset > project.offsetTop-window.innerHeight) {
        window.scrollTo({
            top: window.pageYOffset - 1
        });
        projectBackScroll();
    }

    document.body.classList.remove('before-load');
    bodyLoading.addEventListener('transitionend', (e) => {
        // document.body.removeChild(e.target);
    });

    window.addEventListener('scroll', () => {
        navHeaderAnimation();
        if (project.className === 'full') projectBackScroll();
    });

    window.addEventListener('orientationchange', () => {});

    let width = window.innerWidth;
    window.addEventListener('resize', () => {
        if (width !== window.innerWidth) {
            main.style.height = `${window.innerHeight}px`;
            mainSetLayout();

            if(matchMedia("screen and (max-width: 992px)").matches) {
                projectSwitch.checked = true;
                projectSetClass('grid');
                aboutSetLayout('grid');
                localStorage.clear('mode');
            } else {
                if(localStorage.getItem('mode') === null) {
                    projectSwitch.checked = false;
                    projectSetClass('full');
                }
                aboutSetLayout('full');
            }
            width = window.innerWidth;
        }
    });
});