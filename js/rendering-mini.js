const picturesContainer = document.querySelector('.pictures');

const renderPhotos = (objects, sortMethod) => {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content;

  objects
    .slice()
    .sort(sortMethod)
    .forEach(({id, url, description, likes, comments}) => {
      const picture = pictureTemplate.cloneNode(true);
      picture.querySelector('a').dataset.id = id;
      picture.querySelector('.picture__img').src = url;
      picture.querySelector('.picture__img').alt = description;
      picture.querySelector('.picture__likes').textContent = likes;
      picture.querySelector('.picture__comments').textContent = comments.length;
      fragment.append(picture);
    });

  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => {
    picture.remove();
  });
  picturesContainer.append(fragment);
};

export { renderPhotos, picturesContainer };
