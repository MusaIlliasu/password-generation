const form = document.querySelector("form");
const copy = document.querySelector("#copy");
const output = document.querySelector(".output");
const toast = document.querySelector(".toast");

copy.addEventListener("click", () => {
    if(output.textContent.length > 0){
        const textarea = document.createElement("textarea");
        textarea.value = output.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        toast.textContent = "Copied to clipboard!";
        toast.style.visibility = "visible";
        toast.style.transform = `translateX(0%)`;
        return setTimeout(() => {
            toast.style.transform = `translateX(200%)`;
            toast.style.visibility = "visible";
        }, 2000);
    } 
    return false;
});

const genLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
const genUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
const genNumbers = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
const genSymbols = () => {
    const symbols = "!@#$%&*().,{}";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const passwordObject = {
    lowerCase: genLowerCase,
    upperCase: genUpperCase,
    numbers: genNumbers,
    symbols: genSymbols
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const passwordLength = form["pLength"].value;
    const upperCase = form["uLetters"].checked;
    const lowerCase = form["lLetters"].checked;
    const numbers = form["numbers"].checked;
    const symbols = form["symbols"].checked;

    if(passwordLength < 4){
        return alert("Password length should be greater than 4 characters.");
    }

    const selected = [
        {lowerCase},
        {upperCase},
        {numbers},
        {symbols}
    ].filter(item => Object.values(item)[0]);
    const selectedCount = lowerCase + upperCase + numbers + symbols;

    if(selectedCount === 0){
        return false;
    }
    
    let genPassword = "";
    let i = 0;
    for(i; i < passwordLength; i += selectedCount){
        selected.forEach(select => {
            genPassword += passwordObject[Object.keys(select)[0]]();
        });
    }

    const password = genPassword.slice(0, passwordLength);
    output.textContent = password;

});
