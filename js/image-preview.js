const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('#images');
const photoBlock = document.querySelector('.ad-form__photo');

const makeFileReader = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.objectFit = 'cover';
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

const onAvatarPreviewChange = () => makeFileReader(avatarChooser, avatarPreview);
avatarChooser.addEventListener('change', onAvatarPreviewChange);

const onPhotoPreviewChange = () => {
  const photoPreview = document.createElement('img');
  photoPreview.style.width = '100%';
  photoPreview.style.height = '100%';
  photoPreview.alt = 'Фотография жилья';
  photoBlock.appendChild(photoPreview);
  makeFileReader(photoChooser, photoPreview);
}

photoChooser.addEventListener('change', onPhotoPreviewChange);

const resetPreviews = () => {
  photoBlock.innerHTML = '';
  avatarPreview.src = '../img/muffin-grey.svg';
}

export { resetPreviews };
