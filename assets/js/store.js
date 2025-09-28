/* ==========================================================================
  Perfume Store — Cart & Wishlist Logic
  File: assets/js/store.js
  Author: YourName
  Notes:
    - إدارة السلة والمفضلة عبر localStorage.
    - إظهار التوست الموحد للرسائل.
========================================================================== */

(function(){
  let cart = [];
  let wishlist = [];

  // ------------------- Storage Helpers -------------------
  function loadCart(){
    try { cart = JSON.parse(localStorage.getItem("perfume_cart")) || []; }
    catch(e){ cart = []; }
    return cart;
  }
  function saveCart(){ localStorage.setItem("perfume_cart", JSON.stringify(cart)); }

  function loadWishlist(){
    try { wishlist = JSON.parse(localStorage.getItem("perfume_wishlist")) || []; }
    catch(e){ wishlist = []; }
    return wishlist;
  }
  function saveWishlist(){ localStorage.setItem("perfume_wishlist", JSON.stringify(wishlist)); }

  // ------------------- Cart Logic -------------------
  function addToCart(product){
    const existing = cart.find(i => i.id === product.id);
    if(existing){ existing.qty += 1; }
    else { product.qty = 1; cart.push(product); }
    saveCart();
    updateCartCount();
    showToast(t("toasts.added_cart", {name: product.name}), true);
  }

  function removeFromCart(id){
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartCount();
    showToast(t("toasts.removed_cart"));
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
      showToast(t("toasts.removed_wishlist"));
    } else {
      wishlist.push(id);
      showToast(t("toasts.added_wishlist"));
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

  // ------------------- Toast -------------------
  function showToast(message, withCart){
    const existing = document.getElementById("toast");
    if(existing) existing.remove();

    const div = document.createElement("div");
    div.id = "toast";
    div.innerHTML = withCart
      ? `<span>${message}</span> <a href="cart.html" class="underline">${t("buttons.checkout")}</a>`
      : `<span>${message}</span>`;
    document.body.appendChild(div);

    setTimeout(()=>{ div.classList.add("fade-out"); setTimeout(()=>div.remove(),300); }, 2500);
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
    container.innerHTML = cart.map(item=>{
      const itemTotal = item.price*item.qty;
      total += itemTotal;
      return `<div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item__meta">
          <p>${item.name}</p>
          <p class="muted">${formatNumber(item.price)} ${t("currency")} × ${item.qty}</p>
        </div>
        <button class="cart-item__remove" onclick="Store.removeFromCart('${item.id}')">&times;</button>
      </div>`;
    }).join("");
    container.innerHTML += `<div class="summary">
      <span>الإجمالي</span>
      <span>${formatNumber(total)} ${t("currency")}</span>
    </div>
    <div class="mt-3 flex gap-2">
      <a href="catalog.html" class="btn btn-outline w-100">متابعة التسوق</a>
      <a href="checkout.html" class="btn btn-success w-100">${t("buttons.checkout")}</a>
    </div>`;
  }

  // ------------------- Expose -------------------
  window.Store = {
    loadCart, saveCart, addToCart, removeFromCart, renderCart,
    loadWishlist, saveWishlist, toggleWishlist, updateWishlistUI,
    updateCartCount
  };

  // ------------------- Init -------------------
  document.addEventListener("DOMContentLoaded", ()=>{
    loadCart(); loadWishlist(); updateCartCount(); updateWishlistUI();
  });

})();
