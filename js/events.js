// ######## Listeners and events ########

// Menu Btns
var startBtn = document.getElementById('startBtn');
var instructionsBtn = document.getElementById('instructionsBtn');

// Level Btns
var easyBtn = document.getElementById('easyBtn');
var normalBtn = document.getElementById('normalBtn');
var hardBtn = document.getElementById('hardBtn');

// Others
var restartBtn = document.getElementById('restartBtn');


// ######## Events ########
// Menu
	startBtn.addEventListener("click", function(){
	  document.getElementById('levelChoose').style.display = "initial";
	});

	instructionsBtn.addEventListener("click", function(){
	  alert('Pendente de implementação');
	});

// Level
	easyBtn.addEventListener("click", function(){
	  start(0);
	});

	normalBtn.addEventListener("click", function(){
	  start(1);
	});

	hardBtn.addEventListener("click", function(){
	  start(2);
	});

// Hanking

	rankingBtn.addEventListener("click", function(){
	  alert('pendente de implementação');
	});

// Others
	restartBtn.addEventListener("click", function(){
	  restart();
	});