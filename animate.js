const expandable = document.querySelectorAll('.expandable');
const divs = document.querySelectorAll('.grid-item');
const parentGrid = document.querySelectorAll('main')[0];
const btnGroup = document.querySelectorAll('.btn-group')[0];
const backBtn = document.querySelectorAll('.back-btn')[0];
const body = document.querySelector('body');
const darkBtn = document.querySelector('#dark-mode-btn');

let clickedInitialSize, clickedInitialPos, activeDiv,
    clickedFinalSize, clickedFinalPos, clickedFinalBG;

const gridAnimate = (grid) => {
  const initialSize = `height: ${grid.offsetHeight-6}px; width:${grid.offsetWidth-6}px;`;
  const finalSize = `width: calc(100% - 6px); height: max-content;`;

  const initialPos = `position: absolute; top: ${grid.offsetTop}px; left: ${grid.offsetLeft}px;`;
  const finalPos = `margin: 0; top: 0; left: 0;`;

  const backgroundInit = `background-color: rgb(49, 50, 45);`
  const finalBackground= `background-color: transparent`;

  const displayInit = `opacity: 0; `;
  const content = Array.prototype.slice.call(grid.children);

  if (!grid.classList.contains("active")) {
    backBtn.style.cssText = `display: block;`;
    activeDiv = grid;

    if (window.innerHeight > window.innerWidth) {
      grid.classList.toggle('active');
      return
    }

    content.forEach(el => {
      el.style.cssText += displayInit;
    })

    clickedInitialSize = initialSize;
    clickedInitialPos = initialPos;
    clickedFinalPos = finalPos;
    clickedFinalSize = finalSize;
    clickedFinalBG = finalBackground;
    
    divs.forEach(el => { if (el !== grid) { lowerGridOpacity(el); } })

    grid.style.cssText = initialPos + initialSize + backgroundInit;
    grid.classList.toggle('active');

    setTimeout(() => {
      grid.style.cssText += finalSize + finalPos + finalBackground;
    }, 250);

    setTimeout(() => {
      content.forEach(el => {
        el.style.cssText -= displayInit;
      })
      grid.style.cssText = "";
    }, 450);
    
  } else {  
    grid.removeEventListener('click', () => gridAnimate());
  }
}

const backHandler = () => {
  const backgroundInit = `background-color: rgb(49, 50, 45);`
  const content = Array.prototype.slice.call(activeDiv.children);
  const displayInit = `opacity: 0; `;

  activeDiv.style.cssText += clickedFinalSize + clickedFinalPos + clickedFinalBG;

  setTimeout(() => {
    activeDiv.style.cssText = clickedInitialSize + clickedInitialPos + backgroundInit;
  }, 50)

  content.forEach(el => {
    el.style.cssText += displayInit;
  })

  divs.forEach(el => { if (el !== activeDiv) { higherGridOpacity(el); } });

  setTimeout(() => {
    content.forEach(el => {
      el.style.cssText -= displayInit;
    })
    activeDiv.classList.toggle('active');
    activeDiv.style.cssText = `display: static;`;
  }, 250)

  backBtn.style.cssText = `display: none;`;
}

const lowerGridOpacity = (grid) => {
  const fxOpacity = `opacity: 0;`;
  grid.style.cssText += fxOpacity;
}

const higherGridOpacity = (grid) => {
  const fxOpacity = `opacity: 1;`;
  grid.style.cssText -= fxOpacity;
}

const toggleDarkMode = () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
      
  }
}

backBtn.addEventListener('click', () => backHandler());

expandable.forEach(grid => {
  grid.addEventListener('click', () => gridAnimate(grid));
})

darkBtn.addEventListener('click', () => toggleDarkMode());