const navItems = document.querySelectorAll("#navDetails, .hamburger, #dark1");
const formItem = document.querySelectorAll(".dark2, .closeModal ");
const rewardItem = document.querySelectorAll(".formRewardConteiner, .reward");
const buttons  = document.querySelectorAll(".button");
const bodyChange = document.body;
const successItem = document.querySelector(".dark3");
const radios = document.querySelectorAll(".radio");
const bookmark = document.querySelectorAll(".bookmarkConteiner, .bookmark, .circle, .path");


/************************ hamburger change ******************************/

navItems[1].addEventListener("click", ()=>{
    if (!navItems[0].open) {
        navItems[1].src = "./images/icon-close-menu.svg";
    } else{
        navItems[1].src = "./images/icon-hamburger.svg";
    }
})

/************************ Form hidden ******************************/

for (let i = 0; i < 4; i++) {
    const element = buttons[i];
    if (i == 3) {
    }
    else{
        buttons[i].addEventListener("click", ()=>{
            formItem[0].style.display = "flex";
            bodyChange.classList.add("no-scroll");
            rewardItem[3].scrollTop = 0;
        })   
    }
}

formItem[1].addEventListener("click", ()=>{
        formItem[0].style.display = "none";
        bodyChange.classList.remove("no-scroll");

        for (let i = 4; i < rewardItem.length-1; i++) {
            rewardItem[i].removeAttribute("open");
            checked[0].style.borderColor = "hsla(0, 0%, 92%, 1)";   
        }
    });



/************************ alert hidden ******************************/
for (let i = 4; i < 8; i++) {
    const element = buttons[i];
    if (i == 7) {
    } else if(i == 5){
        
    }
    else{
        buttons[i].addEventListener("click", ()=>{
            formItem[0].style.display = "none";
            successItem.style.display = "flex";
            bodyChange.classList.add("no-scroll");
        })   
    }
}

    buttons[8].addEventListener("click", ()=>{
        successItem.style.display = "none";
        bodyChange.classList.remove("no-scroll");
    })


/************************ label check ******************************/
let checked = [];
for (let i = 4; i < rewardItem.length-1; i++) {
        const element = rewardItem[i];
        let radioCheck = i -4;
        
        rewardItem[i].addEventListener("click", ()=>{
            if (!element.open) {
                checked.push(element);
                element.style.borderColor = "hsl(176, 50%, 47%)";
                radios[radioCheck].checked = true;
                if (checked[1] && checked[0].id == checked[1].id) {            
                    checked.shift()    
                }
            }
            if (checked.length >=2 && checked[0].id != checked[1].id) {
                console.log(checked);
                checked[0].removeAttribute("open")
                checked.shift().style.borderColor = "hsla(0, 0%, 92%, 1)";
            }
        });
    }


/************************ bookmark chage ******************************/
let bookmarkCheck = false
bookmark[1].addEventListener("click", ()=>{
    if (bookmarkCheck === false) {
        bookmarkCheck = true
        bookmark[2].classList.add("greenBook");
        bookmark[2].classList.remove("circle");
        bookmark[3].classList.add("whitePath");
        bookmark[3].classList.remove("path");
        
    }
    else{
        bookmarkCheck = false
        bookmark[2].classList.remove("greenBook")
        bookmark[2].classList.add("circle");
        bookmark[3].classList.remove("whitePath");
        bookmark[3].classList.add("path");
    }
})