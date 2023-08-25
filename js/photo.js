const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const miniatureList = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const isMatch = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isMatch) {
    preview.src = URL.createObjectURL(file);
    miniatureList.forEach((miniature) => {
      miniature.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});
