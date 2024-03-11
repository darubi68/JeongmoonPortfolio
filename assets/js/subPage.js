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
    const nw = (w < 577) ? 50
    : (w < 993) ? 75
    : 100;

    if (window.pageYOffset > 200) {
        header[0].style.height = '50px';
    } else {
        header[0].style.height = `${nw}px`;
    }
}

// header, footer 끌어다 쓰기
function includeHtml() {
    const includeTarget = document.querySelectorAll('.include');
    includeTarget.forEach(function(el, idx) {
        const targetFile = el.dataset.includeFile;
        if(targetFile){
            let xhttp = new XMLHttpRequest();
        
            xhttp.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE) {
                    this.status === 200 ? (el.innerHTML = this.responseText) : null
                    this.status === 404 ? (el.innerHTML = 'include not found.') : null
                }
            }
            xhttp.open('GET', targetFile, true);
            xhttp.send();
            return;
        }
    });
};


/* -------------------- window -------------------- */
const loading = document.querySelector('.loading');
const wrapper = document.querySelectorAll('.wrapper');

const jsonData = JSON.parse(JSON.stringify(ProjectJson));

window.addEventListener('load', () => {

    // console.log(jsonData);
    // console.log(JSON.stringify(jsonData));

    includeHtml();

    if (matchMedia("screen and (min-width: 993px)").matches) vhSet();

    window.addEventListener('scroll', () => { headerAnimation(); });

    window.addEventListener('orientationchange', () => {});

    window.addEventListener('resize', () => {});

    document.body.classList.remove('before-load');
    loading.addEventListener('transitionend', (e) => {
        // document.body.removeChild(e.target);
    });

});