let passlength = document.getElementById('pass_length');
let numbers = document.getElementById('numbers');
let uppercase = document.getElementById('uppercase');
let lowercase = document.getElementById('lowercase');
let special = document.getElementById('special');
let passGenBtn = document.getElementById('result_btn');
let password = document.getElementById('password');


passGenBtn.addEventListener('click', checkPass);

function checkPass() {
	if (/\D/.test(passlength.value) || passlength.value<4 || passlength.value>25) {
		alert('Введите корректную длину пароля');
		passlength.value = '';
	} else {
		genPass();
	}
};

function genPass() {
	let str = '';
	let rand = [];

	if (numbers.checked) {
		str = str + '0123456789';
	}

	if (uppercase.checked) {
		str = str + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}

	if (lowercase.checked) {
		str = str + 'abcdefghijklmnopqrstuvwxyz';
	}

	if (special.checked) {
		str = str + '@#$%^&*()[]{}';
	}
	
	newStr = '';

	passlength.value

	for (var i = 0; i < passlength.value; i++) {
		newStr = newStr + str.charAt(Math.floor(Math.random() * str.length));
	}
	
	password.value = newStr;


};


