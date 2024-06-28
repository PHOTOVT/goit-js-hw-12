import { fetchPhotos } from './js/pixabay-api';
import { galleryTemplate } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreButton: document.querySelector('.load-more-button'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let query = '';
let currentPage = 1;
let maxPage = 0;
const perPage = 15;

refs.searchForm.addEventListener('submit', onSearchButtonSubmit);
refs.loadMoreButton.addEventListener('click', handleLoadMoreButtonClick);

async function onSearchButtonSubmit(event) {
  event.preventDefault();
  hideElement(refs.loadMoreButton);
  refs.gallery.innerHTML = '';
  query = event.target.elements.searchField.value.trim();
  currentPage = 1;
  maxPage = 0;
  if (query === '') {
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

  showElement(refs.loader);

  try {
    const { totalHits, hits } = await fetchPhotos(query, currentPage);
    updateGallery(totalHits, hits);
  } catch (error) {
    showErrorMessage(error);
  } finally {
    catchLastPage();
    hideElement(refs.loader);
  }
}

async function handleLoadMoreButtonClick() {
  hideElement(refs.loadMoreButton);
  showElement(refs.loader);
  currentPage++;
  try {
    const { hits } = await fetchPhotos(query, currentPage);
    const markup = galleryTemplate(hits);
    refs.gallery.insertAdjacentHTML('afterbegin', markup);
    lightbox.refresh();
    scrollOldElements();
  } catch (error) {
    showErrorMessage(error);
  } finally {
    catchLastPage();
    hideElement(refs.loader);
  }
}

function catchLastPage() {
  if (maxPage === 0) {
    return;
  } else if (maxPage !== currentPage) {
    showElement(refs.loadMoreButton);
    return;
  } else {
    iziToast.show({
      message:
        'We are re sorry, but you have reached the end of search results.',
      position: 'bottomCenter',
      backgroundColor: '#5271ff',
      messageColor: '#ffffff',
      theme: 'dark',
      maxWidth: '350px',
    });
    hideElement(refs.loadMoreButton);
  }
  refs.searchForm.reset();
}

function hideElement(element) {
  element.classList.add('visually-hidden');
}
function showElement(element) {
  element.classList.remove('visually-hidden');
}

function showErrorMessage(error) {
  console.log(error);
  iziToast.show({
    message:
      'An error occurred while fetching photos. Please, try again later.',
    position: 'bottomCenter',
    backgroundColor: '#ff5757',
    messageColor: '#ffffff',
    theme: 'dark',
    maxWidth: '350px',
  });
}

function scrollOldElements() {
  const galleryItem = refs.gallery.children[0];
  const galleryItemHeight = galleryItem.getBoundingClientRect().height;
  const scrollHeight = galleryItemHeight * 2;
  scrollBy({
    top: scrollHeight,
    behavior: 'smooth',
  });
}

function updateGallery(totalElements, elementsArray) {
  if (totalElements === 0) {
    iziToast.show({
      message: 'No images matching your search query. Please try again!',
      position: 'bottomCenter',
      backgroundColor: '#ff66c4',
      messageColor: '#ffffff',
      theme: 'dark',
      maxWidth: '350px',
    });
    hideElement(refs.loader);
    hideElement(refs.loadMoreButton);
    refs.searchForm.reset();
    return;
  }
  maxPage = Math.ceil(totalElements / perPage);
  const markup = galleryTemplate(elementsArray);
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
  lightbox.refresh();
  catchLastPage();
}
