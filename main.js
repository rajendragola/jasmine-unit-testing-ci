function calculate(input)
{
  const expression = /\+|\-|\*|\//;

  const numbers = input.split(expression);

  const numb1 = parseInt(numbers[0]);
  const numb2 = parseInt(numbers[1]);

  var operation = input.match(expression);

  if(Number.isNaN(numb1) || Number.isNaN(numb2) || operation === null)
  {
    updateResult('Expression not recognized');
    return;
  }

  const calculator = new Calculator();
  calculator.add(numb1);
  let result;
  switch(operation[0])
  {
    case '+' :
      result = calculator.add(numb2);
      break;
    case '-' :
      result = calculator.subtract(numb2);
      break;
    case '*' :
      result = calculator.multiply(numb2);
      break;
    case '/' :
      result = calculator.divide(numb2);
      break;
  }

  //debugger;

  updateResult(result);
}

function updateResult(result)
{
  const element = document.getElementById('result');

  if(element)
  {
    element.innerText = result;
  }
}

function showVersion()
{
  const calculator = new Calculator();

  const element = document.getElementById('version');

  calculator.version
  .then(function(version){
    element.innerText = version;
  })
  .catch(function(error)
  {
    element.innerText = "unknown";
  });

  //element.innerText = calculator.version;
}