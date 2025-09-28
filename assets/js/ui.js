/* ==========================================================================
  Perfume Store — UI Components
  File: assets/js/ui.js
  Author: YourName
  Notes:
    - مسؤول عن توليد العناصر المشتركة (الهيدر/الفوتر/بطاقات المنتجات).
    - يعتمد على Store و core.js.
========================================================================== */

(function(){

  // ------------------- Header -------------------
  function renderHeader(){
    const header = document.querySelector("header");
    if(!header) return;
    header.innerHTML = `
      <div class="container header__wrap">
        <a href="index.html" class="brand">
          <div class="brand__logo"><i class="fas fa-spray-can-sparkles"></i></div>
          <span class="brand__text logo__text"></span>
        </a>
        <div class="header__actions">
          <a href="wishlist.html" class="icon-btn icon-btn--pill" title="المفضلة">
            <img src="image/icon-heart.svg" alt="المفضلة" class="icon-btn__image" loading="lazy">
            <span class="icon-btn__label">المفضلة</span>
          </a>
          <a href="cart.html" class="icon-btn icon-btn--pill" title="السلة">
            <img src="image/icon-cart.svg" alt="السلة" class="icon-btn__image" loading="lazy">
            <span class="icon-btn__label">السلة</span>
            <span class="icon-btn__badge cart-count hidden"></span>
          </a>
        </div>
      </div>
    `;
    applyBranding();
    Store.updateCartCount();
  }

  // ------------------- Footer -------------------
  function renderFooter(){
    const footer = document.querySelector("footer");
    if(!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <p class="mb-2">&copy; ${year} <span class="logo__text"></span> — جميع الحقوق محفوظة</p>
      <div class="footer__links">
        <a href="about.html">من نحن</a>
        <a href="contact.html">تواصل معنا</a>
        <a href="privacy.html">سياسة الخصوصية</a>
        <a href="terms.html">الشروط والأحكام</a>
      </div>
    `;
    applyBranding();
  }

  // ------------------- Product Card -------------------
  function createProductCard(product){
    const badgeHTML = product.badge
      ? `<span class="product-card__badge ${
          product.badge==="الأكثر مبيعاً" ? "badge--best" :
          product.badge==="جديد" ? "badge--new" : "badge--special"
        }">${product.badge}</span>` : "";

    const wishActive = Store.loadWishlist().includes(product.name);
    const heartClass = wishActive ? "fa-solid fas" : "fa-regular far";

    const availability = product.available
      ? `<span class="availability availability--yes">${t("availability.yes")}</span>`
      : `<span class="availability availability--no">${t("availability.no")}</span>`;

    const button = product.available
      ? `<button class="btn btn-primary btn-sm w-100" onclick="Store.addToCart({id:'${product.name}',name:'${product.name}',price:${product.price},image:'${product.img}'})">${t("buttons.add_to_cart")}</button>`
      : `<button class="btn btn-outline btn-sm w-100" disabled>غير متوفر</button>`;

    const price = product.originalPrice
      ? `<span class="price--old">${formatCurrency(product.originalPrice)}</span> <span class="price">${formatCurrency(product.price)}</span>`
      : `<span class="price">${formatCurrency(product.price)}</span>`;

    return `
      <div class="product-card fade-in" data-id="${product.name}">
        ${badgeHTML}
        <button class="product-card__wish ${wishActive ? "active" : ""}" data-wishlist-id="${product.name}" aria-pressed="${wishActive}" onclick="Store.toggleWishlist('${product.name}')">
          <i class="${heartClass} fa-heart"></i>
        </button>
        <img class="product-card__image" src="${product.img}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/250?text=عطر'">
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__desc">${product.desc || ""}</p>
        <div class="product-card__meta">
          <div>${price}</div>
          ${availability}
        </div>
        <div class="product-card__actions">${button}</div>
      </div>
    `;
  }

  // ------------------- Expose -------------------
  window.UI = {
    renderHeader,
    renderFooter,
    createProductCard
  };

  // ------------------- Init -------------------
  document.addEventListener("DOMContentLoaded", ()=>{
    renderHeader();
    renderFooter();
  });

})();
