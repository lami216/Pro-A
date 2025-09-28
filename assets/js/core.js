/* ==========================================================================
  Perfume Store — Core Initialization
  File: assets/js/core.js
  Author: YourName
  Notes:
    - تهيئة عامة للموقع (i18n, SEO, Branding, Theme).
    - يستورد إعدادات العلامة التجارية من /config/store.json.
    - يوفر وظائف مساعدة لكل الملفات الأخرى.
========================================================================== */

(function(){
  // ------------------- Load Config -------------------
  let cfg = {
    brand: { name: "متجر العطور" },
    whatsapp: { number: "", template: "السلام عليكم، أريد:\n{{items}}\nالإجمالي: {{total}}\nالاسم: {{name}}\nالهاتف: {{phone}}\nالعنوان: {{address}}" },
    ui: { theme: "light" }
  };

  function loadConfig(){
    return fetch("config/store.json")
      .then(r => r.json())
      .then(data => { cfg = {...cfg, ...data}; applyBranding(); applyTheme(); return cfg; })
      .catch(() => cfg);
  }

  // ------------------- Branding -------------------
  function applyBranding(){
    document.querySelectorAll(".logo__text").forEach(el => {
      el.textContent = cfg.brand?.name || "المتجر";
    });
    document.title = cfg.brand?.name || document.title;
  }

  // ------------------- Theme -------------------
  function applyTheme(theme){
    const th = theme || cfg.ui?.theme || "light";
    document.documentElement.setAttribute("data-theme", th);
  }

  // ------------------- Translations (basic) -------------------
  const i18nData = {
    currency: "MRU",
    availability: { yes: "متوفر", no: "غير متوفر" },
    buttons: {
      add_to_cart: "أضف للسلة",
      order_now: "اطلب الآن",
      add_to_wishlist: "إضافة للمفضلة",
      checkout: "إتمام الطلب"
    },
    toasts: {
      added_cart: "تمت إضافة {{name}} إلى السلة",
      added_wishlist: "أُضيف للمفضلة",
      removed_wishlist: "أُزيل من المفضلة",
      removed_cart: "أُزيل من السلة",
      checkout_success: "تم إرسال الطلب عبر واتساب",
      checkout_failed: "فشل إرسال الطلب"
    }
  };

  function t(key, params={}){
    const parts = key.split(".");
    let res = parts.reduce((o,p)=>o?o[p]:undefined, i18nData);
    if(typeof res === "string"){
      for(const k in params){
        res = res.replace(new RegExp("\\{\\{"+k+"\\}\\}","g"), params[k]);
      }
      return res;
    }
    return key;
  }

  // ------------------- Number Format -------------------
  function formatNumber(num){
    return Number(num).toLocaleString("fr-FR");
  }

  // ------------------- SEO Helpers -------------------
  function applySEO(page){
    const title = `${cfg.brand?.name || ""} - ${page?.title || ""}`;
    const desc = page?.description || "";
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", desc);

    // canonical
    let url = window.location.origin + window.location.pathname;
    let link = document.querySelector('link[rel="canonical"]');
    if(!link){
      link = document.createElement("link");
      link.setAttribute("rel","canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    // structured data
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": cfg.brand?.name || "",
      "url": window.location.origin,
      "logo": window.location.origin + "/image/logo.png"
    };
    const old = document.getElementById("ld-json");
    if(old) old.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ld-json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // ------------------- Expose Globals -------------------
  window.config = cfg;
  window.loadConfig = loadConfig;
  window.applyBranding = applyBranding;
  window.applyTheme = applyTheme;
  window.t = t;
  window.formatNumber = formatNumber;
  window.applySEO = applySEO;

  // ------------------- Init -------------------
  document.addEventListener("DOMContentLoaded", () => {
    loadConfig();
  });

})();
