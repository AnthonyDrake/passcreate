let ip = document.getElementById('ip');
let mask = document.getElementById('mask');
let button = document.getElementById('result_btn');
let parent = document.getElementById('parent');
let newStr2 = '';
let arrIp = [];
let copyright_ip = document.getElementById('copyright_ip');

button.addEventListener('click', checkIp);

function checkIp () {
	let tested_ip = /\b(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])\b/;
	get_ip = ip.value;
	if (get_ip.search(tested_ip) == 0){
		getAllIp();
	} else {
		alert('Введите корректный ip');
	}
};

function getAllIp(){
	arrIp.push(ip.value);
	arrIp.push(mask.value);
	arrIp.push(getBitMask(mask.value));
	arrIp.push(getWildcardMask(mask.value));
	arrIp.push(getNetwork(ip.value, mask.value));
	arrIp.push(getBroadcastIp(getNetwork(ip.value, mask.value), getWildcardMask(mask.value)));
	arrIp.push(getHostminIp(getNetwork(ip.value, mask.value)));
	arrIp.push(getHostmaxIp(getBroadcastIp(getNetwork(ip.value, mask.value), getWildcardMask(mask.value))));
	arrIp.push(getHosts(mask.value));
	if (parent.firstElementChild === null) {
		getTable(arrIp);
	} else {
		parent.removeChild(table);
		getTable(arrIp);
	}
	copyright_ip.style.cssText = 'margin-top: 23px; font-size: 14px;';
	arrIp = [];
	newStr2 = '';
};

//получение маски
function getBitMask(str) {
	let newStr = getBin(str);
	let sum = 0;
	for(let i=0;i<newStr.length;i++) {
		sum += Number(newStr[i]);
}
return sum;
};

//получение обратной маски
function getWildcardMask(str) {
	let arr = str.split('.');
	let num;
	let newArr = [];
	for(let i=0;i<arr.length;i++) {
		num = 255 - arr[i];
		newArr.push(num);
	}
	let newStr = newArr.join('.');
	return newStr;
};

//получение десятичного адреса подсети
function getNetwork(str1, str2) {
	for(let i=0;i<32;i++) {
		let sum = getBin(str1)[i] * getBin(str2)[i];//операция поразрядной конъюнкции(логическое И)
newStr2 += sum;
}
let str_dot = '';
start = 0;
end = 8;
for(let i=0;i<4;i++) {
	i>0 ? str_dot += '.' + newStr2.slice(start,end) : str_dot += newStr2.slice(start,end);
	start = end;
	end += 8; 
}
return getDes(str_dot)		
};

//перевод адреса в десятичную систему
function getDes(str) {
	let arr = str.split('.');
	let newStr = '';
	let num = 0;
	for(let i=0;i<arr.length;i++) {
		let elem = arr[i];
		for(let j=0;j<8;j++) {
			num += Number(elem[j]) * Math.pow(2, 7-j);
		}
		i==0 ? newStr += num : newStr += '.' + num;
		num = 0;
	}
	return newStr;
};

//перевод адреса в двоичную систему
function getBin(str) {
	let binIp = '';
	let ost;
	let bin = '';
	let oktet_ip = str.split('.');
	for(i=0;i<oktet_ip.length;i++) {
		let chast = oktet_ip[i];
		for(let i=0;bin.length<8;i++) {
			ost = chast%2;
			chast = Math.floor(chast/2);
			bin += ost;
		}
		binIp += reverse(bin);
bin = '';	
}
return binIp;		
};

//переворот строки
function reverse(str) {
	let newStr = '';
	for(let i=0;i<=str.length;i++) {
		newStr += str.charAt(str.length - i);
	}
	return newStr;
};

//получение широковещательного адреса
function getBroadcastIp(str1, str2) {
	let arr1 = str1.split('.');
	let arr2 = str2.split('.');
	let num;
	let arrSum = [];
	for(let i=0;i<arr1.length;i++) {
		num = Number(arr1[i]) + Number(arr2[i]);
arrSum.push(num);
}
let newStr = arrSum.join('.');
return newStr;
};

//получение минимального адреса узла
function getHostminIp(str) {
	let arr = str.split('.');
	let num = Number(arr[3]) + 1;
	arr.pop();
	arr.push(num);
	let newStr = arr.join('.');
	return newStr;
};

//получение максимального адреса узла
function getHostmaxIp(str) {
	let arr = str.split('.');
	let num = Number(arr[3]) - 1;
	arr.pop();
	arr.push(num);
	let newStr = arr.join('.');
	return newStr;
};

//получение количества узлов
function getHosts(str) {
	let binStr = getBin(str);
	let sum = 0;
	for(let i=0;i<binStr.length;i++) {
		binStr[i]==0 ? sum++ : sum;
	}
	let hosts = Math.pow(2,sum) - 2;
	return hosts;
};

//вставка таблицы
function getTable(arrIp){
	let arr = ['Address:', 'Netmask:', 'Bitmask:', 'Wildcard:', 'Network:', 'Broadcast:', 'Hostmin:', 'Hostmax:', 'Hosts:'];
	let table = document.createElement('table');
	parent.appendChild(table);
	table.setAttribute('id', 'table');
	for(let i=0;i<9;i++) {
		let tr = document.createElement('tr');
		for(let j=0;j<2;j++) {
			let td = document.createElement('td');
			tr.appendChild(td);
			j==0 ? td.innerHTML = arr[i] : 
			j==1 ? td.innerHTML = arrIp[i] : td.innerHTML='';
		}
		table.appendChild(tr);
	}	
};