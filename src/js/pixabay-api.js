import axios from 'axios';

export async function fetchPhotos(input, currentPage) {
  const url = 'https://pixabay.com/api/';
  const params = {
    key: '44576070-519b0fb3235ae96b7cd44aad7',
    q: input,
    per_page: 15,
    page: currentPage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
