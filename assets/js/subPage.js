//메인 높이 값 설정
// function vhSet() {
//     let vh = window.innerHeight * 0.01;
//     document.getElementsByTagName('main').style.height = `calc(${vh}px * 100)`;
// }

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

window.addEventListener('load', () => {

    includeHtml();

    window.addEventListener('scroll', () => {});

    window.addEventListener('orientationchange', () => {});

    window.addEventListener('resize', () => {});

    document.body.classList.remove('before-load');

    loading.addEventListener('transitionend', (e) => {
        document.body.removeChild(e.target);
    });
});