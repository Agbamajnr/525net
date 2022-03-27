//functions
function changeImage(id, src) {
  var elmnt = document.getElementById(`${id}`);
  elmnt.setAttribute('src', src)
}



//query dom
const themeToggle = document.querySelector('#theme');
const _body = document.getElementById('body');


//take care of dlight and dark mode
themeToggle.addEventListener('change', (e) => {
  if(themeToggle.checked === true) {
    _body.classList.remove('light');
    _body.classList.add('dark');



    document.querySelector('.toolbox').style.backgroundColor = 'white';
    document.querySelector('.toolbox').style.color = 'black';

    //update theme for joining lines
    if(_body.classList.contains('dark') === true) {
      if(document.querySelectorAll('.line')) {
        document.querySelectorAll('.line').forEach(line => {
          if (line.style.backgroundColor === 'black') {
            line.style.backgroundColor = 'white';
          }
        })
      }
    }  else {
      console.log('not in dark mode');
    }

    //update color of border for tool
    if(_body.classList.contains('dark') === true) {
      if(document.querySelectorAll('.tool')) {
        document.querySelectorAll('.tool').forEach(tool => {
          tool.style.backgroundColor = '#DFD3C3';
        })
      }
    }  else {
      console.log('not in dark mode');
    }
  }


  if(themeToggle.checked === false) {
    _body.classList.remove('dark');
    _body.classList.add('light');

    document.querySelector('.toolbox').style.border = '1px solid black';

    //update theme for joining lines
    if(!_body.classList.contains('dark') === true) {
      if(document.querySelectorAll('.line')) {
        document.querySelectorAll('.line').forEach(line => {
          if (line.style.backgroundColor === 'white') {
            line.style.backgroundColor = 'black';
          }
        })
      } else {
        console.log('no line')
      }
    }  else {
      console.log('not in dark mode');
    }

    //udate color for border of tool
    if(!_body.classList.contains('dark') === true) {
      if(document.querySelectorAll('.tool')) {
        document.querySelectorAll('.tool').forEach(tool => {
          tool.style.border = '1px solid black';
          tool.style.backgroundColor = 'white';

          tool.addEventListener('mouseover', (e) => {
            console.log(e.target);
          })
        })
      } else {
        console.log('no line')
      }
    }  else {
      console.log('not in dark mode');
    }
    //document.querySelectorAll('.line').style.backgroundColor = 'black';
  }
})
/*
document.styleSheets[1].cssRules[16].findRule('0%').style.boxShadow = "rgba(255, 0, 13, 0.6) 0px 0px 10px 0px";
document.styleSheets[1].cssRules[16].findRule('100%').style.boxShadow = "rgba(255, 0, 13, 0.6) 0px 0px 18px 0px";

var bgAnime = document.styleSheets[1].cssRules[16].findRule('100%');
console.log(bgAnime);
*/


//tippy tooltips
  

