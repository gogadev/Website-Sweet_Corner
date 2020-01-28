// animate main title

const h1 = document.querySelector(".banner-title");
const characters = h1.innerText.split("");
let html = "";

characters.forEach(character => {
  let classes = "";
  if (character !== " ") {
    classes = "character js-character";
  }
  html = html + `<span class='${classes}'>${character}</span>`;
});

h1.innerHTML = html;
const jsCharacter = document.querySelectorAll(".js-character");
jsCharacter.forEach(char => {
  char.addEventListener("mouseover", function(event) {
    this.classList.add("active");
  });
  char.addEventListener("mouseout", function(event) {
    this.classList.remove("active");
  });
});

// show cart

(function() {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfo.addEventListener("click", function() {
    cart.classList.toggle("show-cart");
  });
})();

// add items to the cart -longer way

(function() {
  const cartBtn = document.querySelectorAll(".store-item-icon");

  cartBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${partPath}`;
        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name;
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;

        let finalPrice = price.slice(1).trim();

        item.price = finalPrice;

        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );

        cartItem.innerHTML = `
      <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
      <div class="cart-item-text">

        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
        <span>$</span>
        <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
      </div>
      <a href="#" id='cart-item-remove' class="cart-item-remove">
        <i class="fas fa-trash"></i>
      </a>
    </div>
    `;

        // select cart
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);
        alert("item added to the cart");
        showTotals();

        // clear item
        cart.addEventListener("click", event => {
          if (
            event.target.parentElement.classList.contains("cart-item-remove")
          ) {
            event.target.parentElement.parentElement.remove();
            showTotals();
          }
        });

        // clear cart (newly added items)
        const clearCart = document.querySelector("#clear-cart");
        clearCart.addEventListener("click", removeCart);

        function removeCart() {
          cartItem.innerHTML = "";
          showTotals();
        }
      }
    });
  });

  // show totals
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach(function(item) {
      total.push(parseFloat(item.textContent));
    });

    const totalMoney = total.reduce(function(total, item) {
      total += item;
      return total;
    }, 0);

    const finalMoney = totalMoney.toFixed(2);

    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;
  }

  // filter items
  const filter = document.querySelector(".form-control");
  filter.addEventListener("keyup", filterItem);

  function filterItem(event) {
    const text = event.target.value.toLowerCase();

    document.querySelectorAll("#store-item-name").forEach(item => {
      let items = item.firstChild.textContent;
      let cards = item.parentElement.parentElement.parentElement;

      if (items.toLowerCase().indexOf(text) != -1) {
        item.style.display = "block";
        cards.style.display = "block";
      } else {
        item.style.display = "none";
        cards.style.display = "none";
      }
    });
  }
})();
