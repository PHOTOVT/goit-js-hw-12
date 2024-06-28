import { fetchPhotos } from './js/pixabay-api';
import { galleryTemplate } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearchBtnSubmit);

function onSearchBtnSubmit(event) {
  event.preventDefault();
  const valueToSearch = event.target.elements.searchField.value.trim();

  if (valueToSearch === '') {
    gallery.innerHTML = '';
    iziToast.show({
      message: 'Please enter a query',
      position: 'bottomCenter',
      backgroundColor: '#ffbd59',
      messageColor: '#ffffff',
      theme: 'dark',
      maxWidth: '350px',
    });
    return;
  }
  loader.classList.remove('visually-hidden');

  fetchPhotos(valueToSearch)
    .then(data => {
      if (data.hits.length === 0) {
        gallery.innerHTML = '';
        iziToast.show({
          message: 'No images matching your search query. Please try again!',
          position: 'bottomCenter',
          backgroundColor: '#ff5757',
          messageColor: '#ffffff',
          theme: 'dark',
          maxWidth: '350px',
        });
      } else {
        const markup = galleryTemplate(data.hits);
        gallery.innerHTML = markup;
        lightbox.refresh();
      }

      loader.classList.add('visually-hidden');
    })
    .catch(error => {
      iziToast.show({
        message:
          'An error occurred while fetching photos. Please, try again later.',
        position: 'bottomCenter',
        backgroundColor: '#ff3131',
        messageColor: '#ffffff',
        theme: 'dark',
        maxWidth: '350px',
      });
      loader.classList.add('visually-hidden');
    });
  searchForm.reset();
}
