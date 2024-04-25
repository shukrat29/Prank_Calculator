const displayElm = document.querySelector(".display");

const allBtns = document.querySelectorAll(".btn");
let strToDisplay = "";

const operators = ["%", "/", "*", "-", "+"];

let lastOperator = "";

const audio = new Audio("./aa.wav");

const buttonAction = (value) => {
  if (value === "AC") {
    strToDisplay = "";
    display();
    return;
  }

  if (value === "=" || value === "Enter") {
    // get the last character

    const lc = strToDisplay[strToDisplay.length - 1];

    // check if it i sthe operator
    if (operators.includes(lc)) {
      ///// if yes, then remove it and update the display
      strToDisplay = strToDisplay.slice(0, -1);
    }

    return total();
  }

  if (value === "C") {
    strToDisplay = strToDisplay.slice(0, -1);
    return display(strToDisplay);
  }

  //operator is clicked
  if (operators.includes(value)) {
    lastOperator = value;
    const lc = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lc)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }

  // handle the . issues
  if (value === ".") {
    const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

    const lastNumberSet = strToDisplay.slice(lastOperatorIndex);

    if (lastNumberSet.includes(".")) {
      return;
    }

    if (!lastOperator && strToDisplay.includes(".")) {
      return;
    }
  }

  strToDisplay += value;
  display(strToDisplay);
};

//capture the kek press event
document.addEventListener("keypress", (e) => {
  const value = e.key;
  if (e.code.includes("Key")) {
    return;
  }

  buttonAction(value);
});

allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayElm.classList.remove("prank");

    const value = btn.innerText;
    buttonAction(value);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.0";
};

const total = () => {
  const extraVal = randomValue();
  if (extraVal) {
    displayElm.classList.add("prank");
    audio.play();
  }
  const ttl = eval(strToDisplay) + extraVal;
  strToDisplay = ttl.toString();
  display(ttl);
};

const randomValue = () => {
  const num = Math.round(Math.random() * 10);
  return num <= 3 ? num : 0;
};
