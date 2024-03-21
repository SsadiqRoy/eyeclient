import { alertResponse, rotateBtn, stopRotateBtn, displayError } from '../../utils/utils';

// ============================= CONSTANT VARIABLES

/*





*/

// ============================== RENDERES

export function renderNewUser(response) {
  alertResponse(response.message);

  window.setTimeout(() => window.location.assign('/executive/users'), 5500);
}

/*





*/

// ============================== GETTERS

export function getUserData() {
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const access = document.getElementById('acces').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('confirm-password').value;

  return { name, email, password, passwordConfirm, access };
}

/*





*/

// ============================== HANDLERS

export function handleNewUser(controlNewUser) {
  const form = document.getElementById('form-new-user');

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const btnid = 'btn-new-user';
    rotateBtn(btnid);

    try {
      await controlNewUser();
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

/*





*/

// ============================== NON-EXPORTING
