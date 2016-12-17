document.onkeypress = function(e) {
	//space bar
    if(e.keyCode == 32)
    {
		accelerate(-0.2)
    }
};


document.onkeyup = function(e) {
	//spacebar
    if(e.keyCode == 32)
    {
		accelerate(0.05)
    }
    //esc   
    if(e.keyCode == 27)
    {
    	pause();
    }
};
