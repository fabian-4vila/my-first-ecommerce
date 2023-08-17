function cart (db, printProducts) {
  // Elementos del DOM 
  const productsDOM = document.querySelector('.products__container')
  const notifyDOM = document.querySelector('.notify')
  const cartDOM = document.querySelector('.cart__body')
  const countDOM = document.querySelector('.cart__count--item')
  const totalDOM = document.querySelector('.cart__total--item')
  const checkoutDOM = document.querySelector('.btn--buy')

  let cart = []
  
  // Funciones 
  function printCart () {
    let htmlCart = ''

    if (cart.length === 0) {
      htmlCart += `
      <div class="cart__empty">
        <i class="bx bx-cart"></i>
        <p class="cart__empty--text">No hay productos en el carrito</p>
      </div>
      `
      notifyDOM.classList.remove('show--notify')
    } else {
      for (const item of cart) {
        const product = db.find(p => p.id === item.id)
        htmlCart += `
        <article class="article">
          <div class="article__image">
            <img
              src="${product.image}"
              alt="${product.name}"
            />
          </div>
          <div class="article__content">
            <h3 class="article__title">
              ${product.name}
            </h3>
            <span class="article__price">$${product.price}</span>
            <div class="article__quantity">
              <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                <i class='bx bx-minus' ></i>
              </button>
              <span class="article__quantity-text">${item.qty}</span>
              <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                <i class='bx bx-plus' ></i>
              </button>
            </div>
            <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
              <i class='bx bx-trash' ></i>
            </button>
          </div>
        </article>
        `
      }
      notifyDOM.classList.add('show--notify')
    }

    cartDOM.innerHTML = htmlCart
    notifyDOM.innerHTML = showItemsCount()
    countDOM.innerHTML = showItemsCount()
    totalDOM.innerHTML = showTotal()
  }

  function addToCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id);
    const productFinded = db.find(p => p.id === id);
  
    if (itemFinded) {
      const newQty = itemFinded.qty + qty;
      if (newQty <= 10 && newQty <= productFinded.quantity) {
        itemFinded.qty = newQty;
      } else {
        showAlertModal('Límite de stock alcanzado para este producto.');
      }
    } else {
      if (qty <= 10 && qty <= productFinded.quantity) {
        cart.push({ id, qty });
      } else {
        showAlertModal('Límite de stock alcanzado para este producto.');
      }
    }
  
    printCart();
  }

  function removeFromCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id);
  
    if (itemFinded) {
      const result = itemFinded.qty - qty;
  
      if (result >= 1) {
        itemFinded.qty -= qty;
      } else {
        cart = cart.filter(i => i.id !== id);
      }
  
      printCart();
    }
  }

  function deleteFromCart(id) {
    showConfirmationModal('¿Estás seguro de que deseas vaciar todo el carrito?', () => {
      cart = [];
      printCart();
    });
  }
  function showConfirmationModal(message, callback) {
    const modal = document.getElementById('confirmationModal');
    const modalMessage = modal.querySelector('.modal__message');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  
    const confirmButton = modal.querySelector('.modal__confirm');
    confirmButton.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      callback();
    });
  
    const cancelButton = modal.querySelector('.modal__cancel');
    cancelButton.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
  }
  function showItemsCount() {
    let suma = 0
    for (const item of cart) {
      suma += item.qty
    }
    return suma
  }

  function showTotal() {
    let total = 0
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      total += item.qty * productFinded.price 
    }
    return total
  }

  function checkout() {
    let insufficientStock = false;
  
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id);
      const newQuantity = productFinded.quantity - item.qty;
  
      if (newQuantity >= 0) {
        productFinded.quantity = newQuantity;
      } else {
        insufficientStock = true;
        showAlertModal(`Stock insuficiente para ${productFinded.name}.`);
      }
    }
  
    if (!insufficientStock) {
      cart = [];
      printCart();
      printProducts();
      showAlertModal('Gracias por su compra');
    }
  }

  printCart()

  // Eventos 
  productsDOM.addEventListener('click', function (e) {
    if (e.target.closest('.add--to--cart')) {
      const id = +e.target.closest('.add--to--cart').dataset.id
      addToCart(id)
    }
  })

  cartDOM.addEventListener('click', function (e) {
    if (e.target.closest('.article--minus')) {
      const id = +e.target.closest('.article--minus').dataset.id
      removeFromCart(id)
    }

    if (e.target.closest('.article--plus')) {
      const id = +e.target.closest('.article--plus').dataset.id
      addToCart(id)
    }

    if (e.target.closest('.remove-from-cart')) {
      const id = +e.target.closest('.remove-from-cart').dataset.id
      deleteFromCart(id)
    }
    
  })

  checkoutDOM.addEventListener('click', function () {
    checkout()
  })
  function showAlertModal(message) {
    const modal = document.getElementById('alertModal');
    const modalMessage = modal.querySelector('.modal__message');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  
    const modalCloseButton = modal.querySelector('.modal__close');
    modalCloseButton.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
  }
}

export default cart