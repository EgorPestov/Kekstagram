import { isEscKeydown, showAlert } from './util.js';
import { sendData, errorWindow } from './fetch.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_TEXT_LENGTH = 140;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCloseButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const textInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtagsByExample = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = value.trim().split(' ');
  const hashtagExample = /^#[a-zа-яё0-9]{1,19}$/i;
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (!hashtagExample.test(hashtag)) {
      return false;
    }
  }
  return true;
};

const validateHashtagsByUsed = (value) => {
  const hashtags = value.trim().split(' ');
  const usedTags = {};
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (usedTags[hashtag.toLowerCase()]) {
      return false;
    } else {
      usedTags[hashtag.toLowerCase()] = true;
    }
  }
  return true;

};

const validateHashtagsByLength = (value) => {
  const hashtags = value.trim().split(' ');
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }
  return true;
};

pristine.addValidator(hashtagsInput, validateHashtagsByExample, 'Хэштег должен содержать только буквы и цифры, длина не более 20 символов!');
pristine.addValidator(hashtagsInput, validateHashtagsByUsed, 'Хэштег уже использовался!');
pristine.addValidator(hashtagsInput, validateHashtagsByLength, 'Количество хэштегов - не более 5!');

hashtagsInput.addEventListener('keyup', () => {
  pristine.validate();
  submitButton.disabled = (!pristine.validate());
});

const validateText = (value) => value.length <= MAX_TEXT_LENGTH;

pristine.addValidator(textInput, validateText, `Максимальная длина комментария - ${MAX_TEXT_LENGTH} символов`);

textInput.addEventListener('keyup', () => {
  pristine.validate();
  submitButton.disabled = (!pristine.validate());
});

hashtagsInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

textInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const onUploadButtonChange = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

uploadButton.addEventListener('change', onUploadButtonChange);

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  uploadButton.value = '';
  document.querySelector('body').classList.remove('modal-open');
  uploadForm.reset();
};

formCloseButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (isEscKeydown(evt)) {
    if (errorWindow.classList.contains('hidden')) {
      closeForm();
    }
  }
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(new FormData(evt.target), onSuccess)
      .catch((err) => {
        showAlert(err.message);
      }).finally(unblockSubmitButton);
  });
};

export { closeForm, setFormSubmit };
