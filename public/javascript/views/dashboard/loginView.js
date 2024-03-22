import { alertResponse, rotateBtn, stopRotateBtn, displayError } from '../../utils/utils';

// ============================= CONSTANT VARIABLES

/*



*/

// ============================== RENDERES

// export const displayError = DE;

export function renderLogin(data) {
  alertResponse(`Welcome back to eyeclient ${data.name}`);

  window.setTimeout(() => window.location.assign('/executive'), 5500);
}

/*





*/

// ============================== GETTERS

export function getLogins() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  return { email, password };
}

/*





*/

// ============================== HANDLERS

export function handleLogin(controlLogin) {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const btnid = 'btn-login';
    rotateBtn(btnid);

    try {
      await controlLogin();
      stopRotateBtn(btnid);
    } catch (error) {
      displayError(error, btnid);
    }
  });

  //
}

/*





*/

// ============================== INITIALIZER

// export function initializer() {
// window.setTimeout(() => {
//   alertResponse('Here is a new message', '', 5);
//   rotateBtn('btn-login');
// }, 1000);
// window.setTimeout(() => {
//   // alertResponse('Here is a new message', '', 5);
//   stopRotateBtn('btn-login');
// }, 6000);
// }

/*





*/

// ============================== NON-EXPORTING

// =======================================================================

// ============================= CONSTANT VARIABLES

/*





*/

// ============================== RENDERES

/*





*/

// ============================== GETTERS

/*





*/

// ============================== HANDLERS

/*





*/

// ============================== INITIALIZER

/*





*/

// ============================== NON-EXPORTING
