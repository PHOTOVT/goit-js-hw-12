export function fetchPhotos(input) {
    const params = new URLSearchParams({
      key: '44576070-519b0fb3235ae96b7cd44aad7',
      q: input,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    const url = `https://pixabay.com/api/?${params}`;
  
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => console.log('Error:', error));
  }