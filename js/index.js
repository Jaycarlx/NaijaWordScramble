const wordContent = document.querySelector(".wrapper .word"),
    hint = document.querySelector(".details .hint span"),
    refreshBtn = document.querySelector(".buttons button.refresh"),
    checkBtn = document.querySelector(".buttons button.check"),
    userInput = document.querySelector(".content input"),
    wrapper = document.querySelector(".wrapper"),
    feedbackBtn = document.querySelector(".feedback button"),
    timeText = document.querySelector(".details .time b");
let correctWord, timer; 

const startTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime
        }
        wrapper.classList.add("active");
        wrapper.querySelector(".feedback img").src ="./img/verify-reg-fail.svg"
        wrapper.querySelector(".reply p").innerText = `Pencils up! ${correctWord.toUpperCase()} be the answer. Try again..`
            startGame();
        },1000)
}
const startGame = () => {
    startTimer(30);
    let chosenObj = words[Math.floor(Math.random() * words.length)];
    let listWord = chosenObj.word.split("");
    for (let i = listWord.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [listWord[i], listWord[j]] = [listWord[j], listWord[i]];
    }
    wordContent.innerText = listWord.join("");
    hint.innerText = chosenObj.hint;
    correctWord = chosenObj.word.toLowerCase();
    userInput.value = ""
    userInput.setAttribute("maxlength",correctWord.length)
}
startGame();

const checkWord = () => {
    let answer = userInput.value.toLocaleLowerCase();
    if (!answer) {
        wrapper.classList.add("active");
        wrapper.querySelector(".feedback img").src ="./img/verify-reg-fail.svg"
        wrapper.querySelector(".reply p").innerText = "You no enter anything, type in something"
    }
        else if (answer !== correctWord){
            wrapper.classList.add("active");
            wrapper.querySelector(".feedback img").src ="./img/verify-reg-fail.svg"
            wrapper.querySelector(".reply p").innerText = `Ehyaa, ${answer} no dey correct. Try again..`
    }
    else if(answer === correctWord){
        wrapper.classList.add("active");
        wrapper.querySelector(".feedback img").src = "./img/verify-reg-success.svg";
        wrapper.querySelector(".reply p").innerText = `Tuale boss!! ${answer.toUpperCase()} dey correct`;
        feedbackBtn.innerText = "Go again"
        startGame()
    }
}

refreshBtn.addEventListener("click", startGame);
checkBtn.addEventListener("click", checkWord)
feedbackBtn.addEventListener("click",  () => {
    wrapper.classList.remove("active");
    startGame()
})
