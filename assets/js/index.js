// full&grid 변경 이벤트
const contact = document.getElementById('contact');

function projectClassSet(value) {
    project.className = value;
    contact.className = value;
    AOS.refresh();
}

const project = document.getElementById('project');
const projectBody = document.querySelector('.project-body');
const projectCard = document.querySelectorAll('.project-card');
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

//프로젝트 보기방식 변경 
function projectChange(check) {
    projectBody.style.opacity = 0;

    projectBody.addEventListener('transitionend', () => {
        if (check === false) {
            projectClassSet('full');
        } else {
            projectClassSet('grid');
        }
        projectBody.style.opacity = 1;
    }, {
        once: true
    })
}

projectSwitch.addEventListener('change', () => projectChange(projectSwitch.checked));

/* ---------- 프로젝트섹션 end ---------- */


const tabContentLi = document.querySelectorAll('.design-list > ul > li');

tabContentLi.forEach(e => {
    e.addEventListener('click', () => {
        modalOpen(e);
    })
});

let swiper = new Swiper(".design-list", {
    // mousewheel: true,    
    slidesPerView: '1',
    centeredSlides: true,
    spaceBetween: 10,
    grabCursor: true,
    // loop: true,
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

/* ---------- 디자인섹션 end ---------- */


const img = document.querySelector('.about-img');
const text = document.querySelectorAll('.about-text > *');

function aboutLayoutSet(value) {
    if (value === 'grid') {
        img.setAttribute('data-aos', 'fade-up');
        text.forEach(el => {
            el.setAttribute('data-aos', 'fade-up');
        });
        projectClassSet('grid');
    } else {
        img.setAttribute('data-aos', '');
        text.forEach(el => {
            el.setAttribute('data-aos', '');
        });
        projectClassSet('full');
    }
}

/* ---------- 어바웃 반응형 레이아웃 end ---------- */


// 메인 이미지 롤링 애니메이션
const imgList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

function mainRolling() {

    const lane = document.querySelectorAll('.main-imgBox');

    for (let i = 0; i < lane.length; i++) {
        const randomArray = imgList.sort(() => 0.5 - Math.random());
        const roller = document.createElement('div');

        randomArray.forEach(num => {
            const img = document.createElement('img');
            img.src = `./assets/img/white/${num}.png`;
            roller.appendChild(img);
        })

        const clone = roller.cloneNode(true);
        lane[i].appendChild(roller);
        lane[i].appendChild(clone);

        if (i === 1) {
            roller.classList.add('main-original');
            clone.classList.add('main-clone');
        } else {
            roller.classList.add('original');
            clone.classList.add('clone');
        }
    }
}

// 메인 이미지 롤링 셋팅
function mainSetLayout() {
    const b = window.innerHeight * Math.cos(55 * Math.PI / 180);
    const a = (window.innerWidth / 2) * Math.cos(35 * Math.PI / 180);
    document.querySelector('.main-imgGrid').style.width = `${a+b}px`;
}

/* ---------- 메인 end ---------- */


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

function navOpen() {
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

/* ---------- nav,header end ---------- */


const topButton = document.getElementById('top-button');

// 탑버튼 이벤트
function scrollTop() {
    if (window.scrollY > 200) {
        topButton.classList.add('top-active');
    } else {
        topButton.classList.remove('top-active');
    }
}

topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

/* ---------- 탑버튼 end ---------- */


// 모달 open/close
const inactiveModal = document.getElementById('inactive-modal');
const activationModal = document.getElementById('design-modal');
const activationImg = document.querySelector('#design-modal .modal-container');
const modalCloseBtn = document.querySelectorAll('.modal-close');

function modalOpen(e) {
    document.body.classList.add('not-scroll');

    if (e.classList.contains('inactive')) {
        inactiveModal.classList.add('modal-show');
        inactiveModal.classList.remove('modal-hide');
    } else {
        const img = document.createElement('img');
        img.src = `./assets/img/design/${e.dataset.img}.jpg`;
        activationImg.appendChild(img);
        activationModal.classList.add('modal-show');
        activationModal.classList.remove('modal-hide');
    }
}

function modalClose(e) {
    document.body.classList.remove('not-scroll');
    e.closest('.modal').classList.add('modal-hide');
    e.closest('.modal').classList.remove('modal-show');
    setTimeout(() => activationImg.replaceChildren(), 400);
}

modalCloseBtn.forEach(e => {
    e.addEventListener('click', () => {
        modalClose(e)
    })
});

/* ---------- 모달 end ---------- */



const loading = document.querySelector('.loading');

window.addEventListener('load', () => {
    let vh = window.innerHeight * 0.01;
    document.getElementById('main').style.height = `calc(${vh}px * 100)`;

    mainSetLayout();
    mainRolling();

    // 992px 이하일때
    if (matchMedia("screen and (max-width: 992px)").matches) {
        aboutLayoutSet('grid');
    } else {
        projectBackScroll();
        aboutLayoutSet('full');
    }

    window.addEventListener('scroll', () => {
        navOpen();
        scrollTop();
        if (project.className === 'full') projectBackScroll();
    });

    window.addEventListener('orientationchange', () => {});

    window.addEventListener('resize', () => {
        mainSetLayout();

        if (matchMedia("screen and (max-width: 992px)").matches) {
            aboutLayoutSet('grid');
        } else {
            aboutLayoutSet('full');
        }
    });

    document.body.classList.remove('before-load');
    // 로딩 트랜지션이 끝난 후 자연스럽게 사라지도록
    loading.addEventListener('transitionend', (e) => {
        document.body.removeChild(e.target);
    });
});