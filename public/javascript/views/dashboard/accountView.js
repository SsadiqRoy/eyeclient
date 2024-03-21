// ============================= CONSTANT VARIABLES

import { alertResponse, displayError, rotateBtn, stopRotateBtn } from '../../utils/utils';

/*





*/

// ============================== RENDERES

export function renderUpdate(response) {
  alertResponse(response.message);
}

export function renderChangePassword(response) {
  alertResponse(response.message);

  document.getElementById('current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirm-password').value = '';
}

/*





*/

// ============================== GETTERS

export function getUpdate() {
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;

  return { name, email };
}

//

export function getPasswords() {
  const currentPassword = document.getElementById('current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('confirm-password').value;

  return { currentPassword, password, passwordConfirm };
}

/*





*/

// ============================== HANDLERS

export function handleUpdate(controlUpdate) {
  const form = document.getElementById('form-account');
  const btnid = 'btn-account';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    rotateBtn(btnid);

    try {
      await controlUpdate();
      stopRotateBtn(btnid);
    } catch (error) {
      displayError(error, btnid);
    }
  });
}

//

export function handleChangePassword(controlChangePassword) {
  const form = document.getElementById('form-password');
  const btnid = 'btn-password';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    rotateBtn(btnid);

    try {
      await controlChangePassword();
      stopRotateBtn(btnid);
    } catch (error) {
      displayError(error, btnid);
    }
  });
}

/*





*/

// ============================== INITIALIZER

/*





*/

// ============================== NON-EXPORTING
