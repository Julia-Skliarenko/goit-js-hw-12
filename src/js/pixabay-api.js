const API_KEY = '43804338-e495c959d27dd2a0f1faf63f4';
const BASE_URL = 'https://pixabay.com/api/';
import axios from 'axios';


export async function pixabayAPI(images, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: images,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 15,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}