var outputDiv;
var equation = '';
var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var operators = ['+', '-', '*', '/'];
var operations = ['add', 'sub', 'mul', 'div']

/**
 * @function calculate
 * @param  {string} mathExp {the expression to calculate}
 * @return {number} {the result of the calculation or NaN if it couldn't be done}
 */
function calculate(mathExp) {
  try {
    return eval(mathExp)
  } catch (error) {
    return NaN
  }
}


document.addEventListener('DOMContentLoaded', function () {
  outputDiv = document.getElementById('output');

  document.addEventListener('click', function (event) {
    var elementId = event.target.id;

    if (numbers.includes(elementId)) {
      outputDiv.innerText += elementId;
    }

    if (elementId === 'eq') {
      outputDiv.innerText = calculate(equation);
    } else if (numbers.indexOf(elementId) !== -1) {
      equation += numbers[numbers.indexOf(elementId)];
    } else {
      equation += operators[operations.indexOf(elementId)]; 
      outputDiv.innerText += operators[operations.indexOf(elementId)];
    }

    if(elementId === 'clr'){
      equation = '';
      outputDiv.innerText = ''
    }

    // if (elementId === 'eq') {
    //   calculate(equation)
    // }

    // logging the element id for debug purposes
    console.log(elementId)
    // console.log(outputDiv)
    console.log(equation)
    // console.log(calculate(equation))
  })
})