import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images) {
  const photoGallery = document.querySelector('.gallery');
  photoGallery.innerHTML = '';

    const cardMarkup = images.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) =>
            `<li class="gallery-item">
            <a href = "${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}"/>
    <ul class="gallery-info">
        <li>Likes<p>${likes}</p></li>
        <li>Views<p>${views}</p></li>
        <li>Comments<p>${comments}</p></li>
        <li>Downloads<p>${downloads}</p></li>
    </ul>
    </a>
    </li>`
        
    ).join('');

    photoGallery.insertAdjacentHTML('beforeend', cardMarkup);

  const optionsGallery = {
    captionsData: 'alt',
    captionDelay: 250,
  };

  let gallery = new SimpleLightbox('.gallery a', optionsGallery);
  gallery.refresh();
}