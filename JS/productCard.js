document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://voodoo-sandbox.myshopify.com/products.json?limit=45';
  let pageCount = 0;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      pageCount = Math.ceil(data.products.length / 9);
      addPagination(pageCount);
      loadPage(1);
    })
    .catch(error => console.error('Ошибка при запросе к API:', error));

  function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(product => {
      const productDiv = createProductDiv(product);
      container.appendChild(productDiv);
    });
  }

  function createProductDiv(product) {
    const productDiv = document.createElement('div');
    productDiv.style.maxWidth = '285px';
    const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : 'image 8.png';
    const price = getProductPrice(product);

    productDiv.innerHTML = `
      <div class="product">
        <div class="product-item">
          <div class="product-item__img">
            <img src="${imageUrl}" alt="${product.title}" style="width: 285px; height: 289px; border-radius: 20px;">
          </div>
          <div class="product-item__title">
            ${product.title}
          </div>
          <div class="product-item__comment">
            <div class="product-item__comment-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                <!-- Остальной код для рейтинга -->
              </svg>
            </div>
            <div class="product-item__comment">
             <div class="product-item__comment-svg">
               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                 <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                 <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                 <path d="M3.76406 16.7243L9.1981 13.701V0L6.57889 5.63991L0.40564 6.38809L4.96013 10.6219L3.76406 16.7243Z" fill="#FFC633"/>
               </svg>
             </div>
             <div class="product-item__comment-text">
               3.5/5
             </div>
           </div>
          <div class="product-item__price">
            ${price}
          </div>
        </div>
      </div>
    `;

    productDiv.addEventListener('click', () => showProductDetails(product));

    return productDiv;
  }

  function showProductDetails(product) {
    const modalDiv = document.createElement('div');
    const modalImageUrl = product.images && product.images.length > 0 ? product.images[0].src : 'image 8.png';
    modalDiv.innerHTML = `
      <div class="modal">
        <div class="modal-content">

          <img src="${modalImageUrl}" alt="${product.title}" style="width: 200px; height: 200px;">
          <div class="modal-content-text">
          <div class="close-button">
          
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 35 33" fill="none">
          <path d="M28.2041 24.6868C28.4992 24.9774 28.665 25.3716 28.665 25.7825C28.665 26.1935 28.4992 26.5876 28.2041 26.8782C27.9089 27.1688 27.5087 27.3321 27.0913 27.3321C26.6739 27.3321 26.2737 27.1688 25.9785 26.8782L17.6668 18.6914L9.35247 26.8757C9.05735 27.1663 8.65708 27.3295 8.23971 27.3295C7.82234 27.3295 7.42206 27.1663 7.12694 26.8757C6.83181 26.5851 6.66602 26.1909 6.66602 25.78C6.66602 25.369 6.83181 24.9749 7.12694 24.6843L15.4413 16.5L7.12956 8.31316C6.83443 8.02257 6.66863 7.62843 6.66863 7.21746C6.66863 6.80649 6.83443 6.41236 7.12956 6.12176C7.42468 5.83116 7.82496 5.6679 8.24232 5.6679C8.65969 5.6679 9.05997 5.83116 9.35509 6.12176L17.6668 14.3086L25.9811 6.12047C26.2763 5.82987 26.6765 5.66661 27.0939 5.66661C27.5113 5.66661 27.9116 5.82987 28.2067 6.12047C28.5018 6.41107 28.6676 6.8052 28.6676 7.21617C28.6676 7.62714 28.5018 8.02128 28.2067 8.31188L19.8923 16.5L28.2041 24.6868Z" fill="black"/>
        </svg>
          </div>
            <h2 class="modal-content-text-title">${product.title}</h2>
            <div class="product-item__comment">
            <div class="product-item__comment-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
              </svg>
            </div>
            <div class="product-item__comment">
             <div class="product-item__comment-svg">
               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                 <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                 <path d="M9.24494 0L11.8641 5.63991L18.0374 6.38809L13.4829 10.6219L14.679 16.7243L9.24494 13.701L3.8109 16.7243L5.00697 10.6219L0.452479 6.38809L6.62573 5.63991L9.24494 0Z" fill="#FFC633"/>
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                 <path d="M3.76406 16.7243L9.1981 13.701V0L6.57889 5.63991L0.40564 6.38809L4.96013 10.6219L3.76406 16.7243Z" fill="#FFC633"/>
               </svg>
             </div>
             <div class="product-item__comment-text">
               3.5/5
             </div>
           </div>
            <p>Цена: ${getProductPrice(product)}</p>
          </div>
          
          
        </div>
      </div>
    `;

    modalDiv.classList.add('modal-container');
    document.body.appendChild(modalDiv);

    const closeButton = modalDiv.querySelector('.close-button');
    closeButton.addEventListener('click', () => closeModal(modalDiv));
  }

  function closeModal(modalContainer) {
    document.body.removeChild(modalContainer);
  }

  function getProductPrice(product) {
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].price;
    } else {
      return product.price ? product.price : 'Цена не указана';
    }
  }

  function addPagination(pageCount) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    const navButtons = document.createElement('div');
    navButtons.classList.add('nav-buttons');

    const prevButton = createPaginationButton('Previous', 'prev', `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M15.8333 9.99996H4.16663M4.16663 9.99996L9.99996 15.8333M4.16663 9.99996L9.99996 4.16663" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);
    navButtons.appendChild(prevButton);

    for (let i = 1; i <= pageCount; i++) {
      const pageButton = createPaginationButton(i, 'page');
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = createPaginationButton('Next', 'next', `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4.16675 9.99996H15.8334M15.8334 9.99996L10.0001 4.16663M15.8334 9.99996L10.0001 15.8333" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);
    navButtons.appendChild(nextButton);

    paginationContainer.appendChild(navButtons);
  }

  function createPaginationButton(label, type, svg = '') {
    const button = document.createElement('button');
    button.innerHTML = `${svg}${label}`;
    button.addEventListener('click', () => {
      if (type === 'prev' || type === 'next') {
        navigatePages(type);
      } else {
        loadPage(label);
      }
    });

    return button;
  }

  function loadPage(pageNumber) {
    const start = (pageNumber - 1) * 9;
    const end = start + 9;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const products = data.products.slice(start, end);
        displayProducts(products);
        highlightCurrentPage(pageNumber);
      })
      .catch(error => console.error('Ошибка при загрузке страницы:', error));
  }

  function navigatePages(direction) {
    const currentPageButton = document.querySelector('#pagination-container button.selected');
    const currentPage = parseInt(currentPageButton.textContent);

    if (direction === 'prev' && currentPage > 1) {
      loadPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < pageCount) {
      loadPage(currentPage + 1);
    }
  }

  function highlightCurrentPage(pageNumber) {
    const buttons = document.querySelectorAll('#pagination-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
      if (parseInt(button.textContent) === pageNumber) {
        button.classList.add('selected');
      }
    });
  }
});
