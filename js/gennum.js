let num_min = document.getElementById('num_min');
let num_max = document.getElementById('num_max');
let numGenBtn = document.getElementById('result_btn');
let number = document.getElementById('number');

numGenBtn.addEventListener('click', genNum);

//let min = num_min.value;
//let max = num_max.value;

function genNum(){
	let random_num = getRandom(num_min.value, num_max.value);
	number.innerHTML = random_num;
	console.log(num_min.value);
	console.log(num_max.value);
	console.log(number.innerHTML);
};


function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1));	
};




