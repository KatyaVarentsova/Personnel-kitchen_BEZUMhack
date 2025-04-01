elem = document.querySelector('._button-invited-more');

function startAnimation() {
    const ovals = document.querySelectorAll('._oval');
    elem.style.display = 'none';
    ovals.forEach((oval, index) => {
        setTimeout(() => {
            oval.style.animation = 'moveUp 7s linear forwards';
            if (index === ovals.length - 1) {
                setTimeout(() => {
                    elem.style.display = 'block';
                }, 7000);
            }
        }, index * 2000);
    });
}

startAnimation();

var elemLeft, elemTop, maxElemLeft, maxElemTop, elem;

maxElemLeft = document.documentElement.clientWidth - elem.offsetWidth;
maxElemTop = document.documentElement.clientHeight - elem.offsetHeight - 100;

elem.onmousemove = handler;

function handler() {
  elemLeft = Math.random() * maxElemLeft;
  elem.style.left = elemLeft + 'px';
  elemTop = Math.random() * maxElemTop;
  elem.style.top = elemTop + 'px';
}

elem.addEventListener('click', function () {
    startAnimation();
  })


export {startAnimation}