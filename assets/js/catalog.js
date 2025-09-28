/* ==========================================================================
  Perfume Store — Catalog Logic (search + filters + render)
  File: assets/js/catalog.js
  Author: YourName
  Depends on: core.js, ui.js, store.js, data.js
  صفحات مستهدفة: catalog.html, best.html, discounts.html (نفس المنطق مع فلاتر مختلفة)
========================================================================== */

(function(){

  // عناصر الواجهة (يتم إنشاؤها عند التحميل)
  let gridEl, queryInput, priceSelect, categorySelect, availabilitySelect, viewButtons;

  // خريطة التصنيفات المقروءة من كويري (men|women|unisex|all)
  const categoryLabels = {
    men: "العطور الرجالية",
    women: "العطور النسائية",
    unisex: "العطور المختلطة",
    all: "جميع العطور"
  };

  // نطاقات الأسعار الافتراضية (MRU)
  const PRICE_RANGES = [
    { key: "all", label: "جميع الأسعار", test: () => true },
    { key: "1000-3000", label: "MRU 1000 - MRU 3000", test: p => p >= 1000 && p <= 3000 },
    { key: "3000-5000", label: "MRU 3001 - MRU 5000", test: p => p >= 3001 && p <= 5000 },
    { key: "5000-7000", label: "MRU 5001 - MRU 7000", test: p => p >= 5001 && p <= 7000 },
    { key: "7000-9000", label: "MRU 7001 - MRU 9000", test: p => p >= 7001 && p <= 9000 },
    { key: "9000+", label: "MRU 9001 وأكثر", test: p => p > 9000 }
  ];

  // قراءة باراميترات الصفحة لتحديد سياق العرض
  function getContext(){
    const url = new URL(window.location.href);
    const page = url.pathname.split("/").pop().toLowerCase(); // catalog.html or best.html or discounts.html
    const catFromQuery = url.searchParams.get("category") || "all";
    const isBest = page.includes("best");
    const isDiscounts = page.includes("discounts");
    return { page, catFromQuery, isBest, isDiscounts };
  }

  // تهيئة شريط الأدوات أعلى الشبكة
  function renderToolbar(ctx){
    const toolbar = document.getElementById("toolbar");
    if(!toolbar) return;

    toolbar.innerHTML = `
      <div class="toolbar__top w-100">
        <div class="search-bar">
          <span class="search-bar__icon"><i class="fas fa-search"></i></span>
          <input id="q" class="input" type="text" placeholder="ابحث عن عطر…">
          <button id="searchBtn" class="btn btn-primary btn-sm">ابحث</button>
        </div>
        <a href="checkout.html" class="btn btn-success toolbar__cta">${t("buttons.order_now")}</a>
      </div>

      <div class="toolbar w-100">
        <select id="categorySel" class="select">
          <option value="all">جميع الفئات</option>
          <option value="men">رجالي</option>
          <option value="women">نسائي</option>
          <option value="unisex">مختلط</option>
        </select>

        <select id="priceSel" class="select">
          ${PRICE_RANGES.map(r=>`<option value="${r.key}">${r.label}</option>`).join("")}
        </select>

        <select id="availabilitySel" class="select">
          <option value="all">الكل (متوفر/غير متوفر)</option>
          <option value="yes">متوفر فقط</option>
          <option value="no">غير متوفر فقط</option>
        </select>

        <div class="view-switch" role="tablist" aria-label="تغيير طريقة العرض">
          <button id="viewGrid" aria-pressed="true" title="شبكة"><i class="fas fa-border-all"></i></button>
          <button id="viewList" aria-pressed="false" title="قائمة"><i class="fas fa-list"></i></button>
        </div>
      </div>
    `;

    // ربط العناصر
    queryInput = document.getElementById("q");
    priceSelect = document.getElementById("priceSel");
    categorySelect = document.getElementById("categorySel");
    availabilitySelect = document.getElementById("availabilitySel");
    viewButtons = {
      grid: document.getElementById("viewGrid"),
      list: document.getElementById("viewList")
    };

    // ضبط التصنيف من السياق إن وجد
    categorySelect.value = (ctx.isBest || ctx.isDiscounts) ? "all" : (ctx.catFromQuery || "all");

    // أحداث
    queryInput.addEventListener("input", render);
    priceSelect.addEventListener("change", render);
    categorySelect.addEventListener("change", render);
    availabilitySelect.addEventListener("change", render);
    document.getElementById("searchBtn").addEventListener("click", render);

    viewButtons.grid.addEventListener("click", ()=> setView("grid"));
    viewButtons.list.addEventListener("click", ()=> setView("list"));
  }

  // ترويسة القسم (العنوان والوصف)
  function renderBanner(ctx){
    const titleEl = document.getElementById("bannerTitle");
    const subEl = document.getElementById("bannerSub");
    if(!titleEl || !subEl) return;

    if(ctx.isBest){
      titleEl.textContent = "الأكثر مبيعاً";
      subEl.textContent = "اختيارات العملاء الأكثر شعبية";
    } else if(ctx.isDiscounts){
      titleEl.textContent = "التخفيضات";
      subEl.textContent = "عطور بأسعار مخفّضة لفترة محدودة";
    } else {
      const label = categoryLabels[ctx.catFromQuery] || categoryLabels.all;
      titleEl.textContent = label;
      subEl.textContent = "ابحث وفلتر بسهولة — أضف للسلة أو للمفضلة";
    }
  }

  // تحديد طريقة العرض (شبكة/قائمة)
  function setView(mode){
    const wrapper = document.getElementById("grid");
    if(!wrapper) return;
    if(mode === "list"){
      wrapper.classList.remove("grid-3","grid-4");
      wrapper.classList.add("grid-2");
      viewButtons.grid.setAttribute("aria-pressed","false");
      viewButtons.list.setAttribute("aria-pressed","true");
      wrapper.dataset.view = "list";
    } else {
      wrapper.classList.remove("grid-2");
      wrapper.classList.add("grid-4");
      viewButtons.grid.setAttribute("aria-pressed","true");
      viewButtons.list.setAttribute("aria-pressed","false");
      wrapper.dataset.view = "grid";
    }
  }

  // منطق الفلترة
  function filterProducts(ctx){
    const q = (queryInput?.value || "").trim().toLowerCase();
    const priceKey = priceSelect?.value || "all";
    const cat = categorySelect?.value || "all";
    const avail = availabilitySelect?.value || "all";

    const priceTest = PRICE_RANGES.find(r => r.key === priceKey)?.test || PRICE_RANGES[0].test;

    return (ProductsData.products || []).filter(p => {
      // سياق الصفحة (best/discounts) إن وجد
      if(ctx.isBest && p.badge !== "الأكثر مبيعاً") return false;
      if(ctx.isDiscounts && !(p.originalPrice > 0 && p.price > 0 && p.price < p.originalPrice)) return false;

      // بحث
      const matchesQ = !q || p.name.toLowerCase().includes(q) || (p.desc||"").toLowerCase().includes(q);

      // تصنيف
      const matchesCat = (cat === "all") || (p.category === cat);

      // سعر
      const priceNum = Number(p.price) || 0;
      const matchesPrice = priceTest(priceNum);

      // توفر
      const matchesAvail = (avail === "all")
        ? true
        : (avail === "yes" ? !!p.available : !p.available);

      return matchesQ && matchesCat && matchesPrice && matchesAvail;
    });
  }

  // توليد بطاقة نمط قائمة (إذا وضعنا العرض كقائمة)
  function createListItem(product){
    const price = product.originalPrice && product.price > 0
      ? `<span class="price--old">${formatCurrency(product.originalPrice)}</span> <span class="price">${formatCurrency(product.price)}</span>`
      : (product.price > 0 ? `<span class="price">${formatCurrency(product.price)}</span>` : `<span class="chip">السعر عند الطلب</span>`);

    const wishActive = Store.loadWishlist().includes(product.name);

    const availability = product.available
      ? `<span class="availability availability--yes">${t("availability.yes")}</span>`
      : `<span class="availability availability--no">${t("availability.no")}</span>`;

    return `
      <div class="surface fade-in list-item" data-id="${product.name}" style="display:flex; gap:.8rem; padding:.8rem; position:relative;">
        <button class="list-item__wish ${wishActive ? "active" : ""}" data-wishlist-id="${product.name}" aria-pressed="${wishActive}" onclick="Store.toggleWishlist('${product.name}')">
          <i class="fas fa-heart"></i>
        </button>
        <img src="${product.img}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/200?text=عطر'" style="width:110px;height:110px;object-fit:contain;border-radius:12px;">
        <div style="flex:1;">
          <div style="display:flex; align-items:center; gap:.5rem; flex-wrap:wrap;">
            <h3 class="product-card__title" style="margin:0;">${product.name}</h3>
            ${product.badge ? `<span class="chip">${product.badge}</span>` : ""}
          </div>
          <p class="product-card__desc mt-1">${product.desc || ""}</p>
          <div class="product-card__meta mt-1" style="display:flex; align-items:center; justify-content:space-between;">
            <div>${price}</div>
            ${availability}
          </div>
          <div class="product-card__actions mt-2">
            ${
              product.available
              ? `<button class="btn btn-primary btn-sm" onclick="Store.addToCart({id:'${product.name}',name:'${product.name}',price:${Number(product.price)||0},image:'${product.img}'})">${t("buttons.add_to_cart")}</button>`
              : `<button class="btn btn-outline btn-sm" disabled>غير متوفر</button>`
            }
            <button class="btn btn-outline btn-sm" onclick="Store.toggleWishlist('${product.name}')"><i class="fas fa-heart"></i> إدارة المفضلة</button>
          </div>
        </div>
      </div>
    `;
  }

  // رندر الشبكة
  function render(){
    const ctx = getContext();
    const list = filterProducts(ctx);
    const wrapper = document.getElementById("grid");
    const emptyEl = document.getElementById("emptyState");
    if(!wrapper || !emptyEl) return;

    wrapper.innerHTML = "";
    if(list.length === 0){
      emptyEl.classList.remove("hidden");
      wrapper.classList.add("hidden");
      return;
    }
    emptyEl.classList.add("hidden");
    wrapper.classList.remove("hidden");

    const useList = (wrapper.dataset.view === "list");

    list.forEach(p => {
      if(useList){
        const html = createListItem(p);
        wrapper.insertAdjacentHTML("beforeend", html);
      } else {
        const card = UI.createProductCard(p);
        wrapper.insertAdjacentHTML("beforeend", card);
      }
    });

    // تحديث قلوب المفضلة والعداد
    Store.updateWishlistUI?.();
    Store.updateCartCount?.();
  }

  // تهيئة الصفحة
  function initCatalogPage(){
    const ctx = getContext();

    // ترويسة وهيدر/فوتر جاهزين من ui.js
    UI.renderHeader?.();
    UI.renderFooter?.();

    // بانر + شريط الأدوات
    renderBanner(ctx);
    renderToolbar(ctx);

    // الشبكة
    gridEl = document.getElementById("grid");
    setView("grid"); // الافتراضي

    // SEO
    applySEO({
      title: ctx.isBest ? "الأكثر مبيعًا" : ctx.isDiscounts ? "التخفيضات" : (categoryLabels[ctx.catFromQuery] || "الكتالوج"),
      description: "تصفّح مجموعة واسعة من العطور، ابحث وفلتر حسب الفئة والسعر والتوفر."
    });

    // عرض أولي
    render();
  }

  // نقطة الدخول
  document.addEventListener("DOMContentLoaded", initCatalogPage);

})();
