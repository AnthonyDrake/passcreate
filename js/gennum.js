let num_min = document.getElementById('num_min');
let num_max = document.getElementById('num_max');
let numGenBtn = document.getElementById('result_btn');
let number = document.getElementById('number');

numGenBtn.addEventListener('click', checkNum);

function checkNum() {
	if (/\D/.test(num_min.value) || num_min.value<0 || num_min.value>999999999) {
		alert('Ошибка! Введите корректное число');
		num_min.value = '';
	} else if (/\D/.test(num_max.value) || num_max.value<0 || num_max.value>999999999) {
		alert('Ошибка! Введите корректное число');
		num_max.value = '';
	} else {
		genNum();
	}
};

function genNum(){
	let random_num = getRandom(num_min.value, num_max.value);
	number.innerHTML = random_num;
};

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1));	
};




