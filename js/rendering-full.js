import { renderComments } from './rendering-comments.js';
import { SHOWABLE_COMMENTS_COUNT, commentsLoader, onLoaderClick } from './change-comments.js';
import { isEscKeydown } from './util.js';

const bigPicture = document.querySelector('.big-picture');

const onMiniatureClick = (evt, objects) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const id = evt.target.closest('a').dataset.id;
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = objects[id].url;
    bigPicture.querySelector('.big-picture__img img').alt = objects[id].description;
    bigPicture.querySelector('.social__caption').textContent = objects[id].description;
    bigPicture.querySelector('.likes-count').textContent = objects[id].likes;
    bigPicture.querySelector('.comments-count').textContent = objects[id].comments.length;
    renderComments(id, objects);

    const commentsLength = bigPicture.querySelector('.social__comments').children.length;
    commentsLoader.classList.toggle('hidden', commentsLength <= SHOWABLE_COMMENTS_COUNT);
    bigPicture.querySelector('.visible-comments-count').textContent = (commentsLength > SHOWABLE_COMMENTS_COUNT) ? SHOWABLE_COMMENTS_COUNT : commentsLength;

    commentsLoader.addEventListener('click', onLoaderClick);
    document.querySelector('body').classList.add('modal-open');
  }
};

const onCloseClick = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
};

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onCloseClick);

document.addEventListener('keydown', (evt) => {
  if (isEscKeydown(evt)) {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
    document.querySelector('body').classList.remove('modal-open');
  }
});

export { onMiniatureClick };
