var outputDiv;
var lastInput;
var calculator;
var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var operators = ['+', '-', '*', '/'];
var operations = ['add', 'sub', 'mul', 'div'];

/**
 * @function calculate
 * @param  {string} mathExp {the expression to calculate}
 * @return {number} {the result of the calculation or NaN if it couldn't be done}
 */
function calculate(mathExp) {
  try {
    return eval(mathExp);
  } catch (e) {
    return NaN;
  }
}

/**
 * @function getOperator
 * @param  {string} elementId "add", "div", "sub", "mul"
 * @param {string} operator  "+", "/", "-", "*" 
 */
function getOperator(operatorId) {
  switch (operatorId) {
    case 'add':
      return '+';
      break;
    case 'sub':
      return '-';
      break;
    case 'mul':
      return '*';
      break;
    case 'div':
      return '/';
      break;
  }
}

function setMemory(value) {
  window.localStorage.setItem('memory', value)
  var memoryDiv = document.getElementById('memory');
  if (Number(value)) {
    memoryDiv.classList.remove('hidden')
  } else {
    memoryDiv.classList.add('hidden')
  }
}

var isResultShown = false;

document.addEventListener('DOMContentLoaded', function () {
  setMemory(window.localStorage.getItem('memory'))
  outputDiv = document.getElementById('output');
  calculator = document.getElementById('calc')
  calculator.addEventListener('click', function (event) {
    var elementId = event.target.id;
    // logging the element id for debug purposes
    console.log(elementId);
    if (elementId === 'clr') {
      outputDiv.innerText = '';
      isResultShown = false;
    } else if (elementId === 'eq') {
      var result = calculate(outputDiv.innerText).toString();
      var maxLength = 11
      if (result.length <= maxLength) {
        outputDiv.innerText = result
      } else {
        outputDiv.innerText = result.slice(0, maxLength)
      }
      isResultShown = true;
    } else if (elementId === 'ms') {
      setMemory(outputDiv.innerText)
    } else if (elementId === 'mr') {
      outputDiv.innerText = window.localStorage.getItem('memory')
      isResultShown = true;
    } else if (elementId === 'mp') {
      var prev = window.localStorage.getItem('memory')
      setMemory(Number(outputDiv.innerText) + Number(prev))
    } else if (elementId === 'del') {
      if (isResultShown) {
        outputDiv.innerText = '';
      } else {
        outputDiv.innerText = outputDiv.innerText.slice(0, -1);
      }
      isResultShown = false;
    } else if (outputDiv.innerText.length <= 11) {
      if (numbers.includes(elementId)) {
        if (isResultShown) {
          outputDiv.innerText = elementId;
        } else {
          outputDiv.innerText += elementId;
        }
      } else if (operations.includes(elementId)) {
        var output = outputDiv.innerText;
        var last = output[output.length - 1];
        if (operators.includes(last)) {
          outputDiv.innerText = output.slice(0, -1) + getOperator(elementId);
        } else {
          outputDiv.innerText += getOperator(elementId)
        }
      }
      isResultShown = false;
    }
  })
})