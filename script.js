// // import "./styles.css";

// let diplayvalue = "0";
// let acc = 0;
// let sec = 0;
// let display = document.querySelector(".display");
// function UpdateDisplay(value) {
//   display.textContent = String(value);
// }

// function numberClick(value) {
//   let s = display.textContent + value;
//   UpdateDisplay(s);
// }

// function Delete() {
//   let s = display.textContent.slice(0, -1);
//   console.log(s);
//   UpdateDisplay(s);
// }

// function add(a, b) {
//   return a + b;
// }
// function sub(a, b) {
//   return a - b;
// }
// function mul(a, b) {
//   return a * b;
// }
// function div(a, b) {
//   return a / b;
// }

// let clear = () => {
//   UpdateDisplay(0);
//   acc = 0;
//   sec = 0;
// };

// const buttons = document.querySelectorAll(".btn");

// // Step 2: Add event listeners to all buttons
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     // Step 3: Access the `data-action` value
//     const action = button.dataset.action;
//     console.log(action);

//     // Step 4: Perform actions based on `data-action`
//     if (action === "clear") {
//       clear();
//     } else if (action === "number1") {
//       sec = Number(display.textContent);
//       numberClick("1");
//     } else if (action === "number2") {
//       sec = Number(display.textContent);
//       numberClick("2");
//     } else if (action === "number3") {
//       sec = Number(display.textContent);
//       numberClick("3");
//     } else if (action === "number4") {
//       sec = Number(display.textContent);
//       numberClick("4");
//     } else if (action === "number5") {
//       sec = Number(display.textContent);
//       numberClick("5");
//     } else if (action === "number6") {
//       sec = Number(display.textContent);
//       numberClick("6");
//     } else if (action === "number7") {
//       sec = Number(display.textContent);
//       numberClick("7");
//     } else if (action === "number8") {
//       sec = Number(display.textContent);
//       numberClick("8");
//     } else if (action === "number9") {
//       sec = Number(display.textContent);
//       numberClick("9");
//     } else if (action === "delete") {
//       Delete();
//       console.log("Delete last character");
//     } else if (action === "number") {
//       console.log("Append this number:", button.textContent);
//     } else if (action === "add") {
//       let c = Number(display.textContent);
//       let s = add(acc, c);
//       UpdateDisplay(s);
//     }
//   });
// });

let acc = 0;
let currentOperator = null;
let shouldResetDisplay = false;
let display = document.querySelector(".display");

function UpdateDisplay(value) {
  display.textContent = value;
}

function clear() {
  acc = 0;
  currentOperator = null;
  UpdateDisplay(0);
}

function numberClick(value) {
  if (display.textContent === "0" || shouldResetDisplay) {
    UpdateDisplay(value); // Replace display if reset is needed
    shouldResetDisplay = false;
  } else {
    UpdateDisplay(display.textContent + value); // Append the value
  }
}

function Delete() {
  let s = display.textContent.slice(0, -1) || "0";
  UpdateDisplay(s);
}

function performOperation() {
  console.log("working?");
  let secondOperand = Number(display.textContent);
  if (currentOperator) {
    switch (currentOperator) {
      case "add":
        acc += secondOperand;
        break;
      case "sub":
        acc -= secondOperand;
        break;
      case "mul":
        acc *= secondOperand;
        break;
      case "div":
        acc = secondOperand === 0 ? "Error" : acc / secondOperand;
        break;
    }
    UpdateDisplay(acc);
    currentOperator = null; // Reset operator
  }
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "clear") {
      clear();
    } else if (action === "delete") {
      Delete();
    } else if (action === "number") {
      numberClick(button.textContent);
    } else if (["add", "sub", "mul", "div"].includes(action)) {
      acc = Number(display.textContent); // Store current value
      currentOperator = action; // Store operator
      shouldResetDisplay = true; // Indicate next number will replace display
    } else if (action === "equal") {
      performOperation();
    }
  });
});
