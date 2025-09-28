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
  let cart = [];
  let wishlist = [];

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
    const ids = new Set(wishlist);
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.dataset.wishlistId;
      if(!id) return;
      const isHeartButton = btn.classList.contains('product-card__wish') || btn.classList.contains('list-item__wish');
      if(ids.has(id)){
        if(isHeartButton){ btn.classList.add('active'); }
        btn.setAttribute('aria-pressed','true');
        const icon = btn.querySelector('i');
        if(icon){
          icon.classList.remove('far','fa-regular');
          icon.classList.add('fas','fa-solid');
        }
      } else {
        if(isHeartButton){ btn.classList.remove('active'); }
        btn.setAttribute('aria-pressed','false');
        const icon = btn.querySelector('i');
        if(icon){
          icon.classList.remove('fas','fa-solid');
          icon.classList.add('far','fa-regular');
        }
      }
    });
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
          <p class="muted">${formatCurrency(item.price)} × ${item.qty}</p>
        </div>
        <button class="cart-item__remove" onclick="Store.removeFromCart('${item.id}')">
          <i class="fas fa-trash-alt"></i>
          <span>إزالة</span>
        </button>
      </div>`;
    }).join("");

    container.innerHTML = `${itemsHTML}
      <div class="summary">
        <span>الإجمالي</span>
        <span>${formatCurrency(total)}</span>
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
    updateCartCount,
    showToast
  };

  // ------------------- Init -------------------
  document.addEventListener("DOMContentLoaded", ()=>{
    loadCart(); loadWishlist();
    updateCartCount(); updateWishlistUI();
  });

})();
