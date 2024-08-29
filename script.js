//  클릭 시 새로운 창 열기
document.getElementById('openURL').addEventListener('click', function(){
  const url = 'https://blog.naver.com/kmad_';
  window.open(url, '_blank');
})


// ===========================================


// 모든 버튼 요소를 가져오기
const buttons = document.querySelectorAll("button");

// 각각의 버튼에 이벤트 추가
for (let i = 0; i < buttons.length; i++) {
  // 각 버튼을 변수에 저장
  let button = buttons[i];

  // 마우스 다운 시 active 클래스 추가
  button.addEventListener("mousedown", function (event) {
    event.target.classList.add("active");
  });
  // 마우스 업 시 active 클래스 제거
  button.addEventListener("mouseup", function (event) {
    event.target.classList.remove("active");
  });
  // 마우스가 버튼을 떠날 때 active 클래스 제거
  button.addEventListener("mouseleave", function (event) {
    event.target.classList.remove("active");
  });
  // 마우스가 버튼 위에 있을 때 hover 클래스 추가
  button.addEventListener("mouseenter", function (event) {
    event.target.classList.add("hover");
  });
  // 마우스가 버튼을 떠날 때 hover 클래스 제거
  button.addEventListener("mouseleave", function (event) {
    event.target.classList.remove("hover");
  });
}


// ===========================================

const btnContainer = document.getElementById("button");
const btns = btnContainer.querySelectorAll("button");
const text = document.querySelector("span");

// 첫번째 피연산자가 저장될 변수
let firstOperand = null;
// 연산자를 저장할 변수
let operator = null;
// 현재 입력이 숫자인지, 연산자인지에 대한 상태
let awaitingSecondOperand = false;

btns.forEach(function (button) {
  button.addEventListener("click", function (event) {
    const btnText = event.target.textContent;

    // 클릭된 버튼의 텍스트를 콘솔에 출력
    console.log("Button clicked: " + btnText);

    if (event.target.classList.contains("btn_num")) {
      if (text.textContent === "0" || awaitingSecondOperand) {
        text.textContent = btnText;
        awaitingSecondOperand = false;
      } else {
        text.textContent += btnText;
      }
      console.log("Current display: " + text.textContent);
    } else if (event.target.classList.contains("clear")) {
      text.textContent = "0";
      firstOperand = null;
      operator = null;
      awaitingSecondOperand = false;
      console.log("Calculator cleared");
    } else if (event.target.classList.contains("btn_decimal")) {
      if (!text.textContent.includes(".")) {
        text.textContent += ".";
      }
      console.log("Current display (with decimal): " + text.textContent);
    } else if (event.target.classList.contains("btn_opt")) {
      if (firstOperand === null) {
        firstOperand = parseFloat(text.textContent);
        console.log("First operand set: " + firstOperand);
      } else if (operator) {
        firstOperand = parseFloat(text.textContent);
      }
      operator = btnText;
      awaitingSecondOperand = true;
      console.log("Operator set: " + operator);
    } else if (event.target.classList.contains("btn_eqr")) {
      if (firstOperand !== null && operator !== null) {
        const secondOperand = parseFloat(text.textContent);
        const result = calculate(firstOperand, secondOperand, operator);
        text.textContent = result;
        firstOperand = result;
        operator = null;
        awaitingSecondOperand = true;
        console.log("Result: " + result);
      }
    }
  });
});

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return firstOperand / secondOperand;
    default:
      console.error("Unknown operator: " + operator);
      return "Error";
  }
}
