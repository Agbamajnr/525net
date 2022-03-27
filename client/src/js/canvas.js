
const toolbox = document.querySelector('.toolbox');
const canvas = document.querySelector('.canvas');
canvas.style.width = '80%';
canvas.style.height = '80vh';
canvas.style.position = 'relative';
canvas.style.margin = '50px';



//ip request
const url = 'http://localhost:3000/api/network/';




//health analysid
const handleReq = (ip) => {
    try {
        axios.post(url, {
            ip: ip
        })
        .then(response => {
            const data = response.data;
        })
    } catch (err) {
      console.log(err);
    }
  }

  function saveIp(ip, name, type) {
	axios.post('http://localhost:3000/api/network/save', {
		ip: ip,
		name: name,
		type: type
	})
		.then(response => {
			alert('save data', response);
		})
		.catch(err => {
			console.log(err);
		})
  }

  const getIp = async () => {
	const res = await axios.get(url);
	const data = res.data
	console.log(data.length);

	data.forEach(dt => {
		const element = dt;
		let name = element.name;
		let type = element.type;
		let ipId = element._id;
		let ip = element.ip;

		var tool = document.createElement('div')
		tool.classList.add('tool');
		tool.setAttribute('name', name);
		tool.setAttribute('ip', ip);
		tool.setAttribute('ipId', ipId);
		tool.setAttribute('type', type);
		tool.id = id2++;

		let img = document.createElement('img');

		if (type == 'hr') {
			tool.classList.add('hr')
			img.style.width = '60px';
			img.style.height = '60px';
			img.src = 'https://img.icons8.com/ios-glyphs/30/fa314a/online.png';
		}
		if (type == 'ap') {
			img.src = 'https://img.icons8.com/ios-glyphs/35/000000/hotspot.png';
			tool.style.width = '60px';
			tool.style.height = '60px';
		}
		if (type == 'bs') {
			img.src = 'https://img.icons8.com/ios/35/000000/wired-network.png';
			tool.style.width = '60px';
			tool.style.height = '60px';
		}
		if (type == 'rs') {
			img.src = 'https://img.icons8.com/external-flatart-icons-solid-flatarticons/35/000000/external-wifi-network-and-cloud-computing-flatart-icons-solid-flatarticons.png';
			tool.style.width = '60px';
			tool.style.height = '60px';
		}
		if (type == 'cl') {
			img.src = 'https://img.icons8.com/external-bearicons-glyph-bearicons/30/000000/external-User-essential-collection-bearicons-glyph-bearicons.png';
			tool.style.width = '60px';
			tool.style.height = '60px';
		}

		tool.appendChild(img);
		img.style.cursor = 'pointer';
		canvas.appendChild(tool);

		$(function() {
			$(tool).draggable();
		})


		img.addEventListener('mouseover', function(e) {
			let name = e.target.parentNode.getAttribute('name');
			let ip = e.target.parentNode.getAttribute('ip');
	
	
			tippy(e.target.parentNode, {
				content: `Name: ${name}----IP: ${ip}`,
				placement: 'left',
				arrow: true,
			});
		})
	})

	/*
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		let name = element.name;
		let type = element.type;
		let ip = element.ip;

		console.log(name,type,ip);

		var tool = document.createElement('div')
		tool.classList.add('tool');
		tool.setAttribute('name', name);
		tool.setAttribute('ip', ip);
		tool.setAttribute('type', type);

		let img = document.createElement('img');

		if (type == 'hr') {
			tool.classList.add('hr')
			img.style.width = '60px';
			img.style.height = '60px';
			img.src = 'https://img.icons8.com/ios-glyphs/30/fa314a/online.png';
		}
		if (type == 'ap') {
			img.src = 'https://img.icons8.com/ios-glyphs/35/000000/hotspot.png';
		}
		if (type == 'bs') {
			img.src = 'https://img.icons8.com/ios/35/000000/wired-network.png';
		}
		if (type == 'rs') {
			img.src = 'https://img.icons8.com/external-flatart-icons-solid-flatarticons/35/000000/external-wifi-network-and-cloud-computing-flatart-icons-solid-flatarticons.png';
		}
		if (type == 'cl') {
			img.src = 'https://img.icons8.com/external-bearicons-glyph-bearicons/30/000000/external-User-essential-collection-bearicons-glyph-bearicons.png';
		}

		tool.appendChild(img);
		img.style.cursor = 'pointer';
		canvas.appendChild(tool);

		tool.forEach(t => {
			console.log(t);
		})

	}
	*/
	
  }

  getIp();




var id = 1;
var id2 = 100;


function setAttr(str, addr, elmt, tip) {

	if (elmt.length < 1) {
		elmt.firstChild.setAttribute('name', str)
		elmt.firstChild.setAttribute('ip', addr)
	} else {
		elmt.lastChild.setAttribute('name', str)
		elmt.lastChild.setAttribute('ip', addr)
	}

		

	tip.addEventListener('mouseover', function(e) {
		let name = e.target.parentNode.getAttribute('name');
		let ip = e.target.parentNode.getAttribute('ip');


		tippy(e.target.parentNode, {
			content: `Name: ${name}----IP: ${ip}`,
			placement: 'left',
			arrow: true,
		});
	})

}

toolbox.childNodes.forEach(tool => {
	tool.addEventListener('click', (e) => {
		let rank  = tool.getAttribute('rank');

		document.querySelector('.bg-modal').style.display = "flex";
		let name, ip;
 
		document.querySelector('#submitIp').addEventListener('click', (e) => {
			ip = document.querySelector('#ipAddress').value;
			name = document.querySelector('#ipName').value;

			document.querySelector('.bg-modal').style.display = "none";

			saveIp(ip, name, rank);

			setTimeout(setAttr, 500, name, ip, canvas, sprite)
		})

		

		const img = tool.childNodes[1];

		var toolOne = document.createElement('div')
		toolOne.classList.add('tool')
		toolOne.setAttribute('type', rank);
		var sprite = document.createElement(img.tagName);



		if(img.src === 'https://img.icons8.com/ios-glyphs/30/fa314a/online.png') {
			toolOne.classList.add('hr');
			sprite.style.width = '60px';
			sprite.style.height = '60px';
		} else {
			toolOne.maxWidth = 'fit-content';
			toolOne.maxHeight = 'fit-content';
			toolOne.style.width = '60px';
			toolOne.style.height = '60px';
		}


		toolOne.style.cursor = 'pointer';
		sprite.style.cursor = 'pointer';
		toolOne.id  = id++;

		


		if(_body.classList.contains('dark')) {
			toolOne.style.backgroundColor = 'white';
		}

		sprite.setAttribute('src', img.getAttribute('src'));

		toolOne.appendChild(sprite);
		canvas.appendChild(toolOne);


		$(function() {
			$(toolOne).draggable();
		})
 	})
});





const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight
  };
}

const connect = (div1, div2, thickness) => {
  let theme = div1.getAttribute('theme') || div2.getAttribute('theme');
  let color;
  if(theme === 'true'){
	  color = 'rgba(0, 255, 0, 0.9)';
  } else {
	  color = 'red';
  } 
  
  const off1 = getOffset(div1);
  const off2 = getOffset(div2);

  const x1 = off1.left + off1.width;
  const y1 = off1.top + off1.height;

  const x2 = off2.left + off2.width;
  const y2 = off2.top + off2.height;

  const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))) -47;

  const cx = ((x1 + x2) / 2) - (length / 2);
  const cy = ((y1 + y2) / 2) - (thickness / 2);

  const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

  const htmlLine = "<div class='line' style='padding:0px; background-color:" + color + ";  cursor: pointer; margin:0px; height:" + thickness + "px; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";

  canvas.innerHTML += htmlLine;
	$(function() {
		$(canvas.children).draggable();
	})
}


var divs = [];

canvas.addEventListener('click', (e) => {
    var div = e.target.parentNode.id || e.target.id;
    divs.push(div);

  if(divs.length === 2 || divs.length > 2) {
		if(_body.classList.contains('dark')) {
			connect(document.getElementById(divs[0]), document.getElementById(divs[1]), '2')
		} else {
			connect(document.getElementById(divs[0]), document.getElementById(divs[1]),'2')
		}
    divs.length = 0;
  }
});


const deleteIp = async (id) => {
	const response = await axios.delete('http://localhost:3000/api/network/delete/' + id);
}


setInterval(() => {


	if (document.querySelectorAll('.tool') ) {
		document.querySelectorAll('.tool').forEach(tool => {

			

			tool.firstChild.addEventListener('dblclick', async (e) => {

				const object = e.target.parentNode || e.target;
	
				const act = await deleteIp(object.getAttribute('ipId'))

				object.remove();
			})

			let ip = tool.getAttribute('ip');
			let ip_State;
			if (ip !== null && ip !== undefined) {
				try {
					axios.post(url, {
						ip: ip
					})
					.then(response => {
						 const data = response.data;
						 ip_State = data;
						 if (ip_State !== undefined) {
							tool.setAttribute('theme', ip_State)
						 }

						 let theme = tool.getAttribute('theme')
						 console.log(theme);

						 if(theme == true || theme == 'true') {
							tool.style.animationName = 'toolSuccess';
						} else {
							tool.style.animationName = 'toolFail';
						}
						
					})
					
				} catch (err) {
				  console.log(err);
				}
			}
		})
	}
}, 3000);



//modal
document.querySelector('.close').addEventListener("click", function(e) {
	if (canvas.lastChild !== null) {
		canvas.lastChild.remove();
	}

	document.querySelector('.bg-modal').style.display = "none";
});

