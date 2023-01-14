import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);

const gallery = document.querySelector(".gallery");

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryItemsMarkup);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
}

gallery.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(e) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const selectedImage = event.target.dataset.source;
  const modal = basicLightbox.create(`
    <img src="${selectedImage}" width="800" height="600">
  `);
  modal.show();

  gallery.addEventListener("keydown", (e) => {
    if (event.key === "Escape") {
      modal.close();
    }
  });
}

// console.log();
