// ============================= CONSTANT VARIABLES

import { alertResponse, displayError, parseQuery, rotateBtn, stopRotateBtn } from '../../utils/utils';

/*





*/

// ============================== RENDERES
export function renderAbout(response) {
  alertResponse(response.message);
}

/*





*/

// ============================== GETTERS
export function getData() {
  const editor = tinymce.get('about');
  const about = editor.getContent();

  return { about };
}

/*





*/

// ============================== HANDLERS
export function handleAbout(controlAbout) {
  const form = document.getElementById('form-about');
  const btnid = 'btn-about';

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    rotateBtn(btnid);

    const { id } = parseQuery(window.location.search);

    try {
      await controlAbout(id);
      stopRotateBtn(btnid);

      window.setTimeout(() => window.history.back(), 3000);
    } catch (error) {
      displayError(error, btnid);
    }
  });
}

/*





*/

// ============================== INITIALIZER
export function initialize() {
  initTinymce();
}

/*





*/

// ============================== NON-EXPORTING
function initTinymce() {
  tinymce.init({
    selector: '#about',
    // plugins: [
    //   'advlist autolink link image lists charmap print  anchor ',
    //   'searchreplace wordcount visualblocks insertdatetime media nonbreaking',
    //   'table   paste help',
    // ],
    plugins: [
      // 'a11ychecker',
      // 'advcode',
      // 'advtable',
      // 'checklist',
      // 'export',
      // 'powerpaste',
      // 'formatpainter',
      // 'media',
      // 'image',
      'advlist',
      'autolink',
      'lists',
      'link',
      'charmap',
      'anchor',
      'searchreplace',
      'visualblocks',
      'insertdatetime',
      'table',
      'wordcount',
    ],
    // unincluded pulugins: pagebreak visualchars code emoticons template
    // unwanted plugins : print preview hr fullscreen help
    toolbar:
      'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent |image media link ' +
      'forecolor backcolor emoticons | help',
    // unwanted toolbar : print    fullscreen
    menu: {
      favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' },
    },
    menubar: 'favs file edit view insert format tools table help',
    skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
    content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
    // images_upload_url: `${utils.image_url}/about`,
    // automatic_uploads: false,
    // images_upload_credentials: true,
    // content_css: 'css/content.css'
  });
}
