import { renderPhotos, picturesContainer } from './rendering-mini.js';
import { onMiniatureClick } from './rendering-full.js';
import { getUniqueRandomInteger, isEscKeydown, showAlert, debounce } from './util.js';

const RERENDER_DELAY = 500;

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successWindow = successTemplate.cloneNode(true);
successWindow.classList.add('hidden');
document.body.append(successWindow);
const closeSuccessButton = successWindow.querySelector('.success__button');
const successInner = document.querySelector('.success__inner');

const showSuccess = () => {
  const closeSuccessWindow = () => {
    successWindow.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  closeSuccessButton.addEventListener('click', closeSuccessWindow);

  document.addEventListener('keydown', (evt) => {
    if (isEscKeydown(evt)) {
      closeSuccessWindow();
    }
  });

  const onSuccessButtonClick = (evt) => {
    if (evt.target !== successInner) {
      closeSuccessWindow();
      document.removeEventListener('click', onSuccessButtonClick);
    }
  };
  successWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('click', onSuccessButtonClick);
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorWindow = errorTemplate.cloneNode(true);
errorWindow.classList.add('hidden');
document.body.append(errorWindow);
const closeErrorButton = errorWindow.querySelector('.error__button');
const errorInnerField = document.querySelector('.error__inner');

const showError = () => {
  const closeErrorWindow = () => {
    errorWindow.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  closeErrorButton.addEventListener('click', () => errorWindow.classList.add('hidden'));

  document.addEventListener('keydown', (evt) => {
    if (isEscKeydown(evt)) {
      closeErrorWindow();
    }
  });

  const onErrorButtonClick = (evt) => {
    if (evt.target !== errorInnerField) {
      closeErrorWindow();
      document.removeEventListener('click', onErrorButtonClick);
    }
  };
  errorWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('click', onErrorButtonClick);
};

const filterList = document.querySelector('.img-filters');
const compareByDiscussed = (a, b) => b.comments.length - a.comments.length;
const filterButtons = document.querySelectorAll('.img-filters__button');
const activeClass = 'img-filters__button--active';

const defaultFilterButton = filterList.querySelector('#filter-default');
const randomFilterButton = filterList.querySelector('#filter-random');
const discussedFilterButton = filterList.querySelector('#filter-discussed');

const toggleButtons = (filterId) => filterButtons.forEach((btn) => btn.classList.toggle(activeClass, btn.id === filterId));

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const btnId = btn.id;
    toggleButtons(btnId);
  });
});

const setDefaultFilterClick = (objects) => {
  defaultFilterButton.addEventListener('click', debounce(() => {
    renderPhotos(objects);
  }, RERENDER_DELAY));
};

const setRandomFilterClick = (objects) => {
  randomFilterButton.addEventListener('click', debounce(() => {
    const randomObjects = [];
    const randomIndex = getUniqueRandomInteger(0, 24);
    for (let i = 0; i < 10; i++) {
      randomObjects.push(objects[randomIndex()]);
    }
    renderPhotos(randomObjects);
  }, RERENDER_DELAY));
};

const setDiscussedFilterClick = (objects) => {
  discussedFilterButton.addEventListener('click', debounce(() => {
    renderPhotos(objects, compareByDiscussed);
  }, RERENDER_DELAY));
};

const getData = async () => {
  let response;
  try {
    response = await fetch('https://28.javascript.pages.academy/kekstagram/data');
    if (!response.ok) {
      throw new Error();
    }
  } catch {
    showAlert(ErrorText.GET_DATA);
  }
  const objects = await response.json();
  renderPhotos(objects);
  setDefaultFilterClick(objects);
  setRandomFilterClick(objects);
  setDiscussedFilterClick(objects);
  picturesContainer.addEventListener('click', (evt) => onMiniatureClick(evt, objects));
  filterList.classList.remove('img-filters--inactive');
};

const sendData = async (body, onSuccess) => {
  let response;
  try {
    response = await fetch(
      'https://28.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      });
    if (response.ok) {
      onSuccess();
      showSuccess();
    } else {
      showError();
    }
  } catch {
    showAlert(ErrorText.SEND_DATA);
  }
};

export { errorWindow, getData, sendData };
