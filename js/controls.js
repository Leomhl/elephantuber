
// Press da tecla espaço
document.onkeypress = function(e) {
    if(e.keyCode == 32)
        accelerate(-0.2)
};

// Up da tecla espaço
document.onkeyup = function(e) {
    if(e.keyCode == 32)
        accelerate(0.05)
};