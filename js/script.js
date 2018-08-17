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
const colorDiv = document.querySelector('#colors-js-puns');
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

//this function set the default payment to credit card and hides the others
function defaultPayment(){
  optionPayment[0].style.display = 'none';
  selectPayment.selectedIndex = 1;
  paypalDiv.style.display = 'none';
  bitcoinDiv.style.display = 'none';
}

defaultPayment();

//this function create functionality to count the total amount spent on activities
function defaultTotal(){
  const total = document.createElement('p');
  total.id = 'total';
  activities.appendChild(total);
  total.textContent = `Total: $${sum}`;
  total.style.display = 'none';
}

defaultTotal();

//this function shows as default the "Please select a T-shirt theme" option
function showDefaultColor() {
  for(let i = 1; i < 7; i++){
    optionColor[i].style.display = 'none';
  }
  selectColor.selectedIndex = 0;
}

showDefaultColor();

//hide the other input when the other option is not selected
inputOther.style.display = 'none';
//focus on the input name when the app start
inputName.focus();

//show the other input when "Other" is selected as a Job Role option
title.addEventListener('change', () => {
  inputOther.style.display = 'none';
  if(title.value === 'other'){
    inputOther.style.display = '';
  }
});

//hide the color selection until a design is selected
colorDiv.style.display = 'none';

//filters the t-shirt colors based on the choosen design
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
    colorDiv.style.display = 'none';
    showDefaultColor();
  } else if(selectDesign.value === 'js puns'){
    colorDiv.style.display = '';
    showPuns();
  } else if(selectDesign.value === 'heart js'){
    colorDiv.style.display = '';
    showHearts();
  }
});

//if there are two activities at the same time when one is selected disable the others
//sum the total spent on activities
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
    total.textContent = `Total: $${sum}`;
  }
});

//listen for a change in the select payment and shows only the selected payment div
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

//this function create an error message for when a wrong input is submitted
function checkErrorMsg(element, msg, func, parent, next){
  element.textContent = msg;
  element.classList.add('error');
  func(parent, element, next);
  element.style.display = 'none';
}

function prepend(parent, child){
  parent.prepend(child);
}

function insertBefore(parent, child, nextChild){
  parent.insertBefore(child, nextChild);
}

//create all the error messages
const checkboxError = document.createElement('label');
checkErrorMsg(checkboxError, 'You have to select at least 1 activity', prepend, activities);

const inputError = document.createElement('label');
checkErrorMsg(inputError, 'Insert a valid Name', insertBefore, basicFieldset, inputName);

const emailError = document.createElement('label');
checkErrorMsg(emailError, 'Insert a valid Email', insertBefore, basicFieldset, inputEmail);

const cvvError = document.createElement('label');
checkErrorMsg(cvvError, 'Insert a valid cvv number', prepend, paymentFieldset);

const zipError = document.createElement('label');
checkErrorMsg(zipError, 'Insert a valid zip number', prepend, paymentFieldset);

const cardError = document.createElement('label');
checkErrorMsg(cardError, 'Insert a credit card number', prepend, paymentFieldset);

const card2Error = document.createElement('label');
checkErrorMsg(card2Error, 'Insert a valid credit card number between 13 and 16 digits long', prepend, paymentFieldset);

//function to validate email
function checkEmail(email) {
  let at = email.indexOf("@");
  if(at < 1) return false;
  let dot = email.indexOf(".");
  if(dot <= at + 2) return false;
  if (dot === email.length - 1) return false;
  return true;
}

//function to check that the name input only contains letters and spaces
function checkName(name){
  console.log(/^[A-Za-z\s]+$/.test(name));
  return /^[A-Za-z\s]+$/.test(name);
}

//listen for a click on the submit button, prevent the form to be submitted if
//the required input are not correct
registerButton.addEventListener('click', (e) => {
  inputError.style.display = 'none';
  checkboxError.style.display = 'none';
  emailError.style.display = 'none';
  cardError.style.display = 'none';
  card2Error.style.display = 'none';
  zipError.style.display = 'none';
  cvvError.style.display = 'none';

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
  if(!checkName(inputName.value)){
    inputError.style.display = '';
    e.preventDefault();
  }
  if(!checkEmail(inputEmail.value)){
    emailError.style.display = '';
    e.preventDefault();
  }
  if(selectPayment.value === 'credit card'){
    if(cardNumber.value.length === 0){
      cardError.style.display = '';
      e.preventDefault();
    } else if (cardNumber.value.length < 13){
      card2Error.style.display = '';
      e.preventDefault();
    } else if (cardNumber.value.length > 16){
      card2Error.style.display = '';
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

//real time email validation
inputEmail.addEventListener('keyup', () => {
  emailError.style.display = 'none';
  if(!checkEmail(inputEmail.value)){
    emailError.style.display = '';
  }
  if(inputEmail.value.length === 0){
    emailError.style.display = 'none';
  }
});
