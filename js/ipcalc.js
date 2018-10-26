let ip = document.getElementById('ip');
let mask = document.getElementById('mask');
let ipGenBtn = document.getElementById('result_btn');
let parent = document.getElementById('parent');
let elem = document.getElementById('copyright_ip');
// alert(elem.style.marginTop)

ipGenBtn.addEventListener('click', getTable);

function getTable() {
	let str
	// str = ''
	alert(str.toUpperCase())
	let arr = ['Address:', 'Netmask:', 'Bitmask:', 'Wildcard:', 'Network:', 'Broadcast:', 'Hostmin:', 'Hostmax:', 'Hosts:'];
	let table = document.createElement('table');
	parent.appendChild(table);
	for(let i=0;i<9;i++) {
		let tr = document.createElement('tr');
		for(let j=0;j<2;j++) {
			let td = document.createElement('td');
			tr.appendChild(td);
			j==0 ? td.innerHTML = arr[i] : td.innerHTML='';
		}
		table.appendChild(tr);
	}

	ipGenBtn.removeEventListener('click', getTable);
	
};