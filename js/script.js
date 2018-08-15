//declaring basic info variables
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#mail')
const title = document.querySelector('#title');
const registerButton = document.querySelector('button');
const basicFieldset = document.querySelector('fieldset');
//declaring t-shirt info variables
const selectDesign = document.querySelector('#design');
const selectColor = document.querySelector('#color');
const optionColor = selectColor.children;
//declaring activities variables
const activities = document.querySelector('.activities');
let sum = 0;
//declaring paying variables
const paymentFieldset = document.querySelectorAll('fieldset')[3];
const selectPayment = document.querySelector('#payment');
const optionPayment = selectPayment.children;
const creditcardDiv = document.querySelector('#credit-card');
const paypalDiv = creditcardDiv.nextElementSibling;
const bitcoinDiv = paypalDiv.nextElementSibling;
const inputCard = document.querySelector('#cc-num');
//declaring form validation variables
const inputOther = document.querySelector('#other-title')
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

function defaultPayment(){
  optionPayment[0].style.display = 'none';
  selectPayment.selectedIndex = 1;
  paypalDiv.style.display = 'none';
  bitcoinDiv.style.display = 'none';
}

defaultPayment();

function defaultTotal(){
  const total = document.createElement('p');
  total.id = 'total';
  activities.appendChild(total);
  total.textContent = sum;
  total.style.display = 'none';
}

defaultTotal();

function showDefaultColor() {
  for(let i = 1; i < 7; i++){
    optionColor[i].style.display = 'none';
  }
  selectColor.selectedIndex = 0;
}

showDefaultColor();

inputOther.style.display = 'none';
inputName.focus();

title.addEventListener('change', () => {
  inputOther.style.display = 'none';
  if(title.value === 'other'){
    inputOther.style.display = '';
  }
});

selectDesign.addEventListener('change', () => {
  function loopJSPuns(text){
    for(let i = 1; i < 4; i++){
      optionColor[i].style.display = text;
    }
  }

  function loopHeartJS(text){
    for(let i = 4; i < 7; i++){
      optionColor[i].style.display = text;
    }
  }

  function showPuns(){
    optionColor[0].style.display = 'none';
    loopHeartJS('none');
    loopJSPuns('');
    selectColor.selectedIndex = 1;
  }

  function showHearts(){
    optionColor[0].style.display = 'none';
    loopJSPuns('none');
    loopHeartJS('');
    selectColor.selectedIndex = 4;
  }

  if(selectDesign.value === 'Select Theme'){
    showDefaultColor();
  } else if(selectDesign.value === 'js puns'){
    showPuns();
  } else if(selectDesign.value === 'heart js'){
    showHearts();
  }
});

activities.addEventListener('change', (e) => {
  function disableCompeting(name){
    const activity = document.getElementsByName(name)[0]
    activity.setAttribute('disabled', 'true');
    activity.parentNode.style.color = 'gray';
    sum+= 100;
  }

  function enableCompeting(name){
    const activity = document.getElementsByName(name)[0]
    activity.removeAttribute('disabled');
    activity.parentNode.style.color = 'black';
    sum-= 100;
  }

  switch(e.target.name){
    case 'all':
      e.target.checked ? sum+=200 : sum-=200;
      break;
    case 'js-frameworks':
      e.target.checked ? disableCompeting('express') : enableCompeting('express');
      break;
    case 'js-libs':
      e.target.checked ? disableCompeting('node') : enableCompeting('node');
      break;
    case 'express':
      e.target.checked ? disableCompeting('js-frameworks') : enableCompeting('js-frameworks');
      break;
    case 'node':
      e.target.checked ? disableCompeting('js-libs') : enableCompeting('js-libs');
      break;
    case 'build-tools':
      e.target.checked ? sum+=100 : sum-=100;
      break;
    case 'npm':
      e.target.checked ? sum+=100 : sum-=100;
  }
  if(sum === 0){
    total.style.display = 'none';
  } else {
    total.style.display = '';
    total.textContent = sum;
  }
});

selectPayment.addEventListener('change', () => {
  function creditcardPayment(){
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
    creditcardDiv.style.display = '';
  }
  function paypalPayment(){
    paypalDiv.style.display = '';
    bitcoinDiv.style.display = 'none';
    creditcardDiv.style.display = 'none';
  }
  function bitcoinPayment(){
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = '';
    creditcardDiv.style.display = 'none';
  }

  if(selectPayment.value === 'credit card'){
    creditcardPayment();
  } else if(selectPayment.value === 'paypal'){
    paypalPayment();
  } else if (selectPayment.value === 'bitcoin'){
    bitcoinPayment();
  }
});

//form validation
cardNumber.setAttribute('type', 'number');
zipCode.setAttribute('type', 'number');
cvv.setAttribute('type', 'number');

const checkboxError = document.createElement('label');
checkboxError.textContent = 'You have to select at least 1 activity';
checkboxError.classList.add('error');
activities.prepend(checkboxError);
checkboxError.style.display = 'none';

const inputError = document.createElement('label');
inputError.textContent = 'Insert a Name';
inputError.classList.add('error');
basicFieldset.insertBefore(inputError, inputName);
inputError.style.display = 'none';

const emailError = document.createElement('label');
emailError.textContent = 'Insert a valid email';
emailError.classList.add('error');
basicFieldset.insertBefore(emailError, inputEmail);
emailError.style.display = 'none';

const cvvError = document.createElement('label');
cvvError.textContent = 'Insert a valid cvv number';
cvvError.classList.add('error');
paymentFieldset.prepend(cvvError);
cvvError.style.display = 'none';

const zipError = document.createElement('label');
zipError.textContent = 'Insert a valid zip number';
zipError.classList.add('error');
paymentFieldset.prepend(zipError);
zipError.style.display = 'none';

const cardError = document.createElement('label');
cardError.textContent = 'Insert a valid card number';
cardError.classList.add('error');
paymentFieldset.prepend(cardError);
cardError.style.display = 'none';

registerButton.addEventListener('click', (e) => {
  inputError.style.display = 'none';
  checkboxError.style.display = 'none';
  emailError.style.display = 'none';
  cardError.style.display = 'none';
  zipError.style.display = 'none';
  cvvError.style.display = 'none';
  function checkEmail(email) {
    let at = email.indexOf("@");
    if(at < 1) return false;
    let dot = email.indexOf(".");
    if(dot <= at + 2) return false;
    if (dot === email.length - 1) return false;
    return true;
}
  let count = 0;
  for(let i = 0; i < checkboxes.length; i++){
    if(checkboxes[i].checked){
      count++;
    }
  }
  if(count === 0){
    checkboxError.style.display = '';
    e.preventDefault();
  }
  if(inputName.value.length === 0){
    inputError.style.display = '';
    e.preventDefault();
  }
  if(!checkEmail(inputEmail.value)){
    emailError.style.display = '';
    e.preventDefault();
  }
  if(selectPayment.value === 'credit card'){
    if(cardNumber.value.length < 13){
      cardError.style.display = '';
      e.preventDefault();
    }
    if(cardNumber.value.length > 16){
      cardError.style.display = '';
      e.preventDefault();
    }
    if(zipCode.value.length !== 5){
      zipError.style.display = '';
      e.preventDefault();
    }
    if(cvv.value.length !== 3){
      cvvError.style.display = '';
      e.preventDefault();
    }
  }
})
