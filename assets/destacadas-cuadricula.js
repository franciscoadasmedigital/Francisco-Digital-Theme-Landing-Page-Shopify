/* destacadas-cuadricula.js */
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('StoreModal');
  if (!modal) return; // Salir si el modal no existe

  const modalOverlay = modal.querySelector('.store-modal__overlay');
  const modalContainer = modal.querySelector('.store-modal__container');
  const modalTitle = modal.querySelector('.store-modal__title');
  const modalCategory = modal.querySelector('.store-modal__category');
  const modalImageWrapper = modal.querySelector('.store-modal__image-wrapper');
  const closeBtn = modal.querySelector('.store-modal__close');

  const openModal = (storeName, storeCategory, fullImageUrl) => {
    modalTitle.textContent = storeName;
    modalCategory.textContent = storeCategory;
    modalImageWrapper.innerHTML = `<img src="${fullImageUrl}" alt="${storeName} página de inicio completa">`;
    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden'; // Previene el scroll de fondo
  };

  const closeModal = () => {
    modal.classList.remove('is-visible');
    document.body.style.overflow = ''; // Rehabilita el scroll de fondo
    modalImageWrapper.innerHTML = ''; // Limpia la imagen para evitar FOUC
  };

  // Escuchadores de clics en las tarjetas de la tienda
  document.querySelectorAll('.store-card__quick-view').forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation(); // Evita clics no deseados si hay enlaces
      const storeCard = this.closest('.store-card');
      const storeData = storeCard.querySelector('.store-card__data');
      const storeName = storeData.getAttribute('data-name');
      const storeCategory = storeData.getAttribute('data-category');
      const fullImageUrl = storeData.querySelector('img').src;

      openModal(storeName, storeCategory, fullImageUrl);
    });
  });

  // Escuchadores de clics para cerrar el modal
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
      closeModal();
    }
  });
});