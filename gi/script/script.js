const Button = document.getElementById('burger');
const Menu = document.querySelector('.mb_nav');

let isVisible = true;
 
Button.addEventListener('click', function() {
    if (isVisible){
        Menu.style.display = "inline";
    } else{
        Menu.style.display = "none";
    }
    isVisible = !isVisible; 
})
