import { commentsContainer } from './change-comments.js';

const renderComments = (id, objects) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects[id].comments.length; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.dataset.id = objects[id].comments[i].id;
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = objects[id].comments[i].avatar;
    img.alt = objects[id].comments[i].name;
    img.width = '35';
    img.height = '35';
    li.appendChild(img);
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = objects[id].comments[i].message;
    li.appendChild(p);
    if (fragment.children.length >= 5) {
      li.classList.add('hidden');
    }
    fragment.append(li);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
};

export { renderComments };
