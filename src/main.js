import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { pixabayAPI } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";

  const optionsGallery = {
    captionsData: 'alt',
    captionDelay: 250,
  };

  let gallery = new SimpleLightbox('.gallery a', optionsGallery);

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-images');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-more-button');
const photoGallery = document.querySelector('.gallery');

export let page = 1;
let searchTerm = '';
let currentImages = [];
let totalPages = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadBtn.style.display = 'none';
  scrollToTopBtn.style.display = 'none'; 
});
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const value = searchInput.value.trim();

    loader.style.display = 'block';
    photoGallery.innerHTML = '';
    page = 1; 

    if (value === '') {
      iziToast.error({
        message: 'Please enter a search term!',
        position: 'topRight',
      });
      loader.style.display = 'none';
      return;
    }

    try {
      const data = await pixabayAPI(value, page);
      if (data.hits.length === 0) {
        renderImages([]);
        loadBtn.style.display = 'none';
        iziToast.error({
          title: 'Error!',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        renderImages(data.hits, gallery);
        gallery.refresh();
        loadBtn.style.display = 'block';
        searchTerm = value;
        currentImages = data.hits;
        totalPages = Math.ceil(data.totalHits / data.hits.length);

        if (data.totalHits <= data.hits.length) {
          loadBtn.style.display = 'none';
        } else {
      loadBtn.style.display = 'block';
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error!',
        message:
          'An error occurred while fetching images. Please try again later.',
        position: 'topRight',
      });
    } finally {
      loader.style.display = 'none';
    }
    searchInput.value = '';
  });


loadBtn.addEventListener('click', async () => {
  if (page >= totalPages) {
    loadBtn.style.display = 'none';
    iziToast.info({
      message: "You've reached the end of search results.",
      position: 'topRight',
    });
    return;
    }

  try {
    loader.style.display = 'block';
    const data = await pixabayAPI(searchTerm, ++page);
    if (data.hits.length === 0) {
      loadBtn.style.display = 'none';
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      renderImages(data.hits, gallery);
      const firstImage = document.querySelector('.gallery-item');

      gallery.refresh();

      const cardHeight = firstImage.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

    if (page >= totalPages) {
        loadBtn.style.display = 'none';
      }

    }
  } catch (error) {
    console.log(error);

  } finally {
    loader.style.display = 'none';
  }
});


window.addEventListener('scroll', () => {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'block';
  } else {
      scrollToTopBtn.style.display = 'none';
  }
});


document.getElementById('scrollToTopBtn').addEventListener('click', () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});