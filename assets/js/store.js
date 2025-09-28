/* ==========================================================================
  Perfume Store — Cart & Wishlist Logic
  File: assets/js/store.js
  Author: YourName
  Notes:
    - إدارة السلة والمفضلة عبر localStorage.
    - إظهار التوست الموحد للرسائل.
========================================================================== */

(function(){
  const CART_KEY = "perfume_cart";
  const WISHLIST_KEY = "perfume_wishlist";
  const LOCATION_KEY = "perfume_cart_location";
  const LOCATION_OPTIONS = [
    { value: "", label: "اختر موقع التوصيل" },
    { value: "nkc", label: "نواكشوط" },
    { value: "nkt", label: "نواذيبو" },
    { value: "atar", label: "أطار" },
    { value: "rosso", label: "روصو" }
  ];

  let cart = [];
  let wishlist = [];
  let cartLocation = "";

  // ------------------- Storage Helpers -------------------
  function loadCart(){
    try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch(e){ cart = []; }
    return cart;
  }
  function saveCart(){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function loadWishlist(){
    try { wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch(e){ wishlist = []; }
    return wishlist;
  }
  function saveWishlist(){ localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); }

  function loadCartLocation(){
    try { cartLocation = localStorage.getItem(LOCATION_KEY) || ""; }
    catch(e){ cartLocation = ""; }
    return cartLocation;
  }
  function saveCartLocation(){ localStorage.setItem(LOCATION_KEY, cartLocation); }

  // ------------------- Cart Logic -------------------
  function addToCart(product){
    const existing = cart.find(i => i.id === product.id);
    if(existing){ existing.qty += 1; }
    else { product.qty = 1; cart.push(product); }
    saveCart();
    updateCartCount();
    showToast(t("toasts.added_cart", {name: product.name}), { withCart: true, type: "success" });
  }

  function removeFromCart(id){
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartCount();
    showToast(t("toasts.removed_cart"), { type: "danger" });
    renderCart();
  }

  function updateCartCount(){
    const count = cart.reduce((sum,i)=> sum+i.qty,0);
    document.querySelectorAll(".cart-count").forEach(el=>{
      if(count>0){ el.textContent = count; el.classList.remove("hidden"); }
      else { el.textContent=""; el.classList.add("hidden"); }
    });
  }

  // ------------------- Wishlist Logic -------------------
  function toggleWishlist(id){
    if(wishlist.includes(id)){
      wishlist = wishlist.filter(x=>x!==id);
      showToast(t("toasts.removed_wishlist"), { type: "info" });
    } else {
      wishlist.push(id);
      showToast(t("toasts.added_wishlist"), { type: "success" });
    }
    saveWishlist();
    updateWishlistUI();
  }

  function updateWishlistUI(){
    document.querySelectorAll(".product-card[data-id]").forEach(card=>{
      const id = card.dataset.id;
      const btn = card.querySelector(".product-card__wish");
      if(!btn) return;
      if(wishlist.includes(id)) btn.classList.add("active");
      else btn.classList.remove("active");
    });
  }

  function setCartLocation(value){
    const newValue = value || "";
    if(cartLocation === newValue) return;
    cartLocation = newValue;
    saveCartLocation();
    if(cartLocation){
      const label = LOCATION_OPTIONS.find(opt => opt.value === cartLocation)?.label || "";
      showToast(`تم تحديث موقع التوصيل إلى ${label}`, { type: "info" });
    }
  }

  function getCartLocation(){
    return cartLocation;
  }

  function getCartLocationLabel(){
    return LOCATION_OPTIONS.find(opt => opt.value === cartLocation)?.label || "";
  }

  // ------------------- Toast -------------------
  function showToast(message, options={}){
    const opts = typeof options === "boolean" ? { withCart: options } : (options || {});
    const { withCart = false, type = "success" } = opts;
    const existing = document.getElementById("toast");
    if(existing) existing.remove();

    const div = document.createElement("div");
    div.id = "toast";
    div.setAttribute("role","status");
    div.setAttribute("aria-live","polite");
    if(type) div.dataset.type = type;
    div.innerHTML = withCart
      ? `<span>${message}</span> <a href="cart.html">${t("buttons.checkout")}</a>`
      : `<span>${message}</span>`;
    document.body.appendChild(div);

    setTimeout(()=>{ div.classList.add("fade-out"); setTimeout(()=>div.remove(),300); }, 2600);
  }

  // ------------------- Render Cart Page -------------------
  function renderCart(){
    const container = document.getElementById("cartItems");
    if(!container) return;
    loadCart();
    loadCartLocation();
    if(cart.length===0){
      container.innerHTML = `<div class="text-center muted">
        <p>سلتك فارغة</p>
        <a href="catalog.html" class="btn btn-primary mt-3">${t("buttons.add_to_cart")}</a>
      </div>`;
      return;
    }
    let total = 0;
    const itemsHTML = cart.map(item=>{
      const itemTotal = item.price*item.qty;
      total += itemTotal;
      return `<div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item__meta">
          <p>${item.name}</p>
          <p class="muted">${formatNumber(item.price)} ${t("currency")} × ${item.qty}</p>
        </div>
        <button class="cart-item__remove" onclick="Store.removeFromCart('${item.id}')">
          <i class="fas fa-trash-alt"></i>
          <span>إزالة</span>
        </button>
      </div>`;
    }).join("");

    const locationOptions = LOCATION_OPTIONS.map(opt => {
      const selected = opt.value === cartLocation ? "selected" : "";
      return `<option value="${opt.value}" ${selected}>${opt.label}</option>`;
    }).join("");

    container.innerHTML = `${itemsHTML}
      <div class="cart-location">
        <label for="cartLocation" class="muted">موقع التوصيل</label>
        <select id="cartLocation" class="select" onchange="Store.setCartLocation(this.value)">
          ${locationOptions}
        </select>
      </div>
      <div class="summary">
        <span>الإجمالي</span>
        <span>${formatNumber(total)} ${t("currency")}</span>
      </div>
      <div class="cart-actions">
        <a href="catalog.html" class="btn btn-outline w-100">متابعة التسوق</a>
        <a href="checkout.html" class="btn btn-success w-100">${t("buttons.checkout")}</a>
      </div>`;
  }

  // ------------------- Expose -------------------
  window.Store = {
    loadCart, saveCart, addToCart, removeFromCart, renderCart,
    loadWishlist, saveWishlist, toggleWishlist, updateWishlistUI,
    updateCartCount, setCartLocation, getCartLocation, getCartLocationLabel,
    showToast
  };

  // ------------------- Init -------------------
  document.addEventListener("DOMContentLoaded", ()=>{
    loadCart(); loadWishlist(); loadCartLocation();
    updateCartCount(); updateWishlistUI();
  });

})();
