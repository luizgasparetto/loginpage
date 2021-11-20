/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import isEmail from 'validator/lib/isEmail';
import { User } from './formClass';

const SHOW_ERROR_MESSAGES = 'show-error-message'
const SUCCESS_MESSAGE = document.querySelector('.success') as HTMLDivElement

const form = document.querySelector('.form') as HTMLFormElement;
const user = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const rpassword = document.querySelector('.password2') as HTMLInputElement;

form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  SUCCESS_MESSAGE.classList.add('block')

  hideErrorMessage(form)
  checkEmptyFields(user, email, password, rpassword);
  checkEmail(email);
  validatePassword(password, rpassword)

  if (sendForm(form)) {
    SUCCESS_MESSAGE.classList.remove('block')
    const registeredUser = new User(user.value, email.value, password.value)
    console.log(registeredUser)
    form.querySelectorAll('input').forEach((input) => input.value = '')
  }
});

function hideErrorMessage(form: HTMLFormElement): void {
  form.querySelectorAll('.' + SHOW_ERROR_MESSAGES).forEach((item) => item.classList.remove(SHOW_ERROR_MESSAGES))
}

function showErrorMessage(input: HTMLInputElement, msg: string): void {
  const formFields = input.parentElement as HTMLDivElement // Seleciono o pai do input, que nesse caso, seria a form-fields
  const errorMessage = formFields.querySelector('.error-message') as HTMLSpanElement
  errorMessage.innerHTML = `${input.name} ${msg}`;
  formFields.classList.add(SHOW_ERROR_MESSAGES)
}

function checkEmptyFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) {
      return showErrorMessage(input, 'precisa estar preenchido.');
    }
  });
}

function checkEmail(email: HTMLInputElement): void {
  if (!isEmail(email.value)) showErrorMessage(email, 'precisa ser válido.');
}

function validatePassword(password: HTMLInputElement, rpassword: HTMLInputElement): void {
  if (password.value !== rpassword.value) {
    showErrorMessage(rpassword, `precisa ser igual a ${password.name}`)
  }
}

function sendForm(form: HTMLFormElement): boolean {
  let send = true
  const wrongInputs = form.querySelectorAll('.' + SHOW_ERROR_MESSAGES)
  wrongInputs.forEach(() => send = false)
  return send
}
