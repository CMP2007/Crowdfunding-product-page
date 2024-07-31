const navItems = document.querySelectorAll("#navDetails, .hamburger");
const formItem = document.querySelectorAll(".dark2, .closeModal ");
const rewardItem = document.querySelectorAll(".formRewardConteiner, .reward");
const buttons  = document.querySelectorAll(".button");
const bodyChange = document.body;
const successItem = document.querySelector(".dark3");
const radios = document.querySelectorAll(".radio");
const bookmark = document.querySelectorAll(".bookmarkConteiner, .bookmark, .circle, .path, .bookmarkLabel, .back");
const textItems = document.querySelectorAll(".pledge");
const barItems = document.querySelectorAll(".bar");
const numberTittleItems = document.querySelectorAll(".gridTitle");
const availableNumbers = document.querySelectorAll(".available, .smallAvailable");
let checked = [];
let availables = []
let availablesString = []
let donation;
let addDonations = 0;
let missingDonation = 10086;
let totalDonation = 89914;

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
    if (i == 3) {//This if and else is used to prevent the blocked button from executing
    }
    else{
        buttons[i].addEventListener("click", ()=>{
            formItem[0].style.display = "flex";
            bodyChange.classList.add("no-scroll");
            rewardItem[3].scrollTop = 0;
        })   
    }
}
function closeFormItem(i) {
    rewardItem[i].removeAttribute("open");
    checked[0].style.borderColor = "hsla(0, 0%, 92%, 1)"; 
    let radioCheck = i -4;
    radios[radioCheck].checked = false;
}

formItem[1].addEventListener("click", ()=>{
        formItem[0].style.display = "none";
        bodyChange.classList.remove("no-scroll");
        for (let i = 4; i < rewardItem.length-1; i++){
            closeFormItem(i)
        }
    });

/************************ alert hidden ******************************/
function checkValue1(i) {//Validates whether or not a piece of data exists and triggers the alert
    if (textItems[i].value != "" && textItems[i].value != 0) {
        formItem[0].style.display = "none";
        successItem.style.display = "flex";
        let cont = i+4;
        donation = parseInt(textItems[i].value);
        textItems[i].value = "";

        closeFormItem(cont)
        ChangeAvailable(i)
        additionDonation()
        maxDonation()
    } else{
        alert("You must define an amount to donate")
    }
}

for (let i = 4; i < 8; i++) {
    if (i == 7) {//The value 7 corresponds to the alert button
    }
    else{
        let cont = i -4;
        buttons[i].addEventListener("click", ()=>{
            checkValue1(cont)
        })   
        textItems[cont].addEventListener("input", ()=>{//Validates if there is data and changes the button styles
            if (textItems[cont].value) {
                buttons[i].classList.remove("opcity");
            } else{
                buttons[i].classList.add("opcity");
            }
        })
    }
}
    buttons[8].addEventListener("click", ()=>{// close the correct donation alert
        successItem.style.display = "none";
        bodyChange.classList.remove("no-scroll");
    })

/************************ label check ******************************/
for (let i = 4; i < rewardItem.length-1; i++) {
        const element = rewardItem[i];
        let radioCheck = i -4;

        rewardItem[i].addEventListener("click", ()=>{//This function opens the details when clicked
            if (!element.open) {
                checked.push(element);
                element.style.borderColor = "hsl(176, 50%, 47%)";
                radios[radioCheck].checked = true;
                if (checked[1] && checked[0].id == checked[1].id) {            
                    checked.shift()    
                }
            }//This part of the function closes the element when another element is clicked details
            if (checked.length >=2 && checked[0].id != checked[1].id) {
                checked[0].removeAttribute("open")
                checked.shift().style.borderColor = "hsla(0, 0%, 92%, 1)";
            }
        });
    }

/************************ bookmark chage ******************************/
let bookmarkCheck = false
bookmark[0].addEventListener("click", ()=>{//This event listener modifies the save button
    if (bookmarkCheck === false) {
        bookmarkCheck = true
        bookmark[2].classList.add("greenBook");
        bookmark[2].classList.remove("circle");
        bookmark[3].classList.add("whitePath");
        bookmark[3].classList.remove("path");
        bookmark[4].innerHTML = "Bookmarked";
        bookmark[4].classList.add("bookmarkLabelGreen");
        bookmark[5].classList.add("backMarked");
    }
    else{
        bookmarkCheck = false
        bookmark[2].classList.remove("greenBook")
        bookmark[2].classList.add("circle");
        bookmark[3].classList.remove("whitePath");
        bookmark[3].classList.add("path");
        bookmark[4].innerHTML = "Bookmark";
        bookmark[4].classList.remove("bookmarkLabelGreen");
        bookmark[5].classList.remove("backMarked");
    }
})
console.log(bookmark);
/************************ donations calc ******************************/
for (let i = 0; i < 3; i++) {
    availablesString.push(availableNumbers[i].textContent);
    availables.push(parseInt(availablesString[i])); 
}

function ChangeAvailable(i) { //This function modifies the amount of remaining donations
    if (i == 0) {}
    else {
        let cont  = i -1
        availables[cont] = availables[cont]- 1;
        availableNumbers[cont].innerHTML = availables[cont];
        availableNumbers[cont+3].innerHTML = availables[cont];
        maxAvailable(i,cont)
    }
    //Here the number of registered donors is modified
    let StringAvailable = numberTittleItems[1].textContent
    let numberAvailable = parseInt(StringAvailable.replace(/,/, ""));
    numberAvailable = numberAvailable + 1;
    numberTittleItems[1].innerHTML = new Intl.NumberFormat('en-US').format(numberAvailable);
}

function additionDonation() {//This function adds the amount donated to the total count
    let donationsString = parseInt(numberTittleItems[0].textContent.replace(/[,$]/g, ''))
    addDonations = addDonations + donation;
    numberTittleItems[0].innerHTML = new Intl.NumberFormat('en-US').format(donationsString + donation);
    missingDonation = missingDonation - donation;
}

function barChange() {//Modify the progress bar
    barItems[1].setAttribute(`style`, `width: ${77+ (addDonations * 2.305 /1000)}%`);
}

function maxDonation() {//Limit the progress bar
    if (totalDonation + addDonations < 100000) {
        barChange()
    }
    else{//Blocks donation slots when the desired amount is exceeded
        console.log("maximum bar reached");
        for (let i = 0; i < 3; i++) {
            rewardItem[i].classList.add("opcity");
            rewardItem[i].classList.add("rewardOff");
            rewardItem[i+5].classList.add("opcity");
            rewardItem[i+5].classList.add("rewardOff");
            buttons[i+1].classList.add("none");
        }
    }
}

function maxAvailable(i, cont) {//This function blocks donations when the available places are exhausted
    if ( availables[cont] === 0) {
        rewardItem[cont].classList.add("opcity");
        rewardItem[cont].classList.add("rewardOff");
        rewardItem[cont+5].classList.add("opcity");
        rewardItem[cont+5].classList.add("rewardOff");
        buttons[i].classList.add("none");
    }
};