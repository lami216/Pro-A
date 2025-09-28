/* ==========================================================================
  Perfume Store — Products Data (converted from your original list)
  File: assets/js/data.js
  Notes:
    - احتفظنا بنفس أسماء المنتجات والصور والفئات والحالة والشارات.
    - الأسعار في ملفك كانت "0000" كنص؛ حفظناها كأرقام 0 (تقدر تحدّثها لاحقًا).
    - أزلنا اللاحقة " - 0000 MRU" من الوصف إن وُجدت.
========================================================================== */

window.ProductsData = {
  products: [
    { name: 'jean paul gaultier le male elixir', desc: 'عطر شبابي عصري بنفحات حارة', price: 0, img: 'image/jean_paul_gaultier_le_male_elixir.png', category: 'men', available: true },
    { name: 'Dior sauvage', desc: 'أحد أشهر العطور الرجالية حول العالم', price: 0, img: 'image/Dior_sauvage_200ml.png', category: 'men', available: true, badge: 'الأكثر مبيعاً' },
    { name: 'officer', desc: 'عطر رسمي أنيق يلائم جميع المناسبات', price: 0, img: 'image/officer.png', category: 'men', available: true, badge: 'الأكثر مبيعاً' },
    { name: 'jean_paul_gaultier_paradise', desc: 'عطر شبابي فاخر بنفحات برية منعشة', price: 0, img: 'image/jean_paul_gaultier_paradise.png', category: 'men', available: true, badge: 'جديد' },
    { name: 'tom_ford_noir', desc: 'عطر رجالي غامض بنفحات خشبية دافئة', price: 0, img: 'image/tom_ford_noir.png', category: 'men', available: false, badge: 'الأكثر مبيعاً' },
    { name: '212_VIP_black', desc: 'عطر شبابي جريء بنكهات عصرية', price: 0, img: 'image/212_VIP_black.png', category: 'men', available: true },
    { name: 'Acqua_di_Gio_Armani', desc: 'عطر رجالي منعش مستوحى من البحر', price: 0, img: 'image/Acqua_di_Gio_Armani.png', category: 'men', available: true },
    { name: 'La_Nuit_Trésor', desc: 'عطر نسائي رومانسي بنفحات الفانيليا', price: 0, img: 'image/La_Nuit_Tresor.png', category: 'women', available: false, badge: 'الأكثر مبيعاً' },
    { name: 'MY_WAY', desc: 'عطر نسائي أنيق بنكهات زهرية مشرقة', price: 0, img: 'image/MY_WAY.png', category: 'women', available: false, badge: 'الأكثر مبيعاً' },
    { name: 'Dolce_and_Gabbana_the_one', desc: 'عطر رجالي فاخر بنفحات شرقية دافئة', price: 0, img: 'image/Dolce_and_Gabbana_the_one.png', category: 'men', available: true },
    { name: 'You_Intensely', desc: 'عطر رجالي قوي بنكهات فاكهية جذابة', price: 0, img: 'image/You_Intensely.png', category: 'men', available: true },
    { name: 'Supremacy_Collectors_Edition', desc: 'عطر رجالي مميز بنفحات شرقية فاخرة', price: 0, img: 'image/Supremacy_Collector_s_Edition.png', category: 'men', available: true },
    { name: 'Hawas_Black_Rasasi', desc: 'هوس اسود عطر رجالي قوي بنكهات خشبية منعشة', price: 0, img: 'image/Hawas_Black_Rasasi.png', category: 'men', available: true },
    { name: 'Club_de_Nuit_Intense_Man_200ml', desc: 'عطر رجالي مكثف بنفحات فاكهية وعنبرية', price: 0, img: 'image/Club_de_Nuit_Intense_Man_200ml.png', category: 'men', available: true },
    { name: 'Supremacy_Not_Only_Intense', desc: 'عطر رجالي عصري بنكهات قوية ومنعشة', price: 0, img: 'image/Supremacy_Not_Only_Intense.png', category: 'men', available: true },
    { name: 'Oud_lavender', desc: 'عود لافندر عطر شرقي مميز يمزج العود واللافندر', price: 0, img: 'image/Oud_lavender.png', category: 'unisex', available: true },
    { name: '9PM_rebel', desc: 'عطر شبابي مفعم بالحيوية بنكهات جريئة', price: 0, img: 'image/9PM_Rebel.png', category: 'men', available: true },
    { name: 'Liquid_Brun', desc: 'عطر رجالي كلاسيكي بنفحات خشبية دافئة', price: 0, img: 'image/Liquid_Brun.png', category: 'men', available: true },
    { name: 'Odyssey_Spectra', desc: 'عطر منعش بنكهات مائية وفاكهية', price: 0, img: 'image/Odyssey_Spectra.png', category: 'unisex', available: true, badge: 'الأكثر مبيعاً' },
    { name: 'Club_de_Nuit_Sillage', desc: 'عطر رجالي فاخر بلمسة فاكهية ومنعشة', price: 0, img: 'image/Club_de_Nuit_Sillage.png', category: 'men', available: true },
    { name: 'hawas_elixir', desc: 'هوس الكسير عطر رجالي منعش بنكهات حمضية قوية', price: 0, img: 'image/hawas_elixir.png', category: 'men', available: true },
    { name: 'Club_De_Nuit_Urban_Elixir', desc: 'عطر شبابي عصري بنكهات منعشة', price: 0, img: 'image/Club_De_Nuit_Urban_Elixir.png', category: 'men', available: true },
    { name: '9am_Dive', desc: 'عطر منعش مستوحى من الصباح البارد', price: 0, img: 'image/9am_Dive.png', category: 'unisex', available: true },
    { name: 'Turathi_Blue', desc: 'عطر شرقي منعش بنفحات بحرية', price: 0, img: 'image/Turathi_Blue.png', category: 'unisex', available: true },
    { name: 'Hawas_for_Him', desc: 'هوس فور هيم عطر رجالي منعش بنكهات مائية وحمضية', price: 0, img: 'image/Hawas_for_Him.png', category: 'men', available: true },
    { name: '9PM', desc: 'عطر شبابي جذاب بنكهات فاكهية دافئة', price: 0, img: 'image/9PM.png', category: 'men', available: true },
    { name: 'Hawas_Ice_for_Him', desc: 'هوس آيس عطر رجالي منعش بنكهات جليدية', price: 0, img: 'image/Hawas_Ice_for_Him.png', category: 'men', available: true },
    { name: 'Al_Wisam', desc: 'الوسام عطر شرقي كلاسيكي بنكهات دافئة', price: 0, img: 'image/Al_Wisam.png', category: 'unisex', available: true },
    { name: 'Confidential', desc: 'عطر أنيق بنفحات غامضة وفاخرة', price: 0, img: 'image/Confidential.png', category: 'unisex', available: true },
    { name: 'Supremacy Incense', desc: 'عطر رجالي فاخر', price: 0, img: 'image/Supremacy Incense.png', category: 'men', available: true },
    { name: 'Mandarin Sky', desc: 'عطر رجالي منعش', price: 0, img: 'image/Mandarin Sky.png', category: 'men', available: true },
    { name: 'Khamrah', desc: 'خمرة عطر مختلط برائحة القرفة والفانيليا', price: 0, img: 'image/Khamrah.png', category: 'unisex', available: true, badge: 'عرض خاص' },
    { name: 'Khamrah Qahwa', desc: 'خمرة قهوة عطر مختلط بنفحات القهوة والتوابل', price: 0, img: 'image/Khamrah Qahwa.png', category: 'unisex', available: true },
    { name: "Ra'ed", desc: 'الرائد عطر رجالي شرقي', price: 0, img: 'image/Raed.png', category: 'men', available: true },
    { name: 'Fakhar Lattafa Black', desc: 'فخر الطافة عطر رجالي فاخر', price: 0, img: 'image/Fakhar Lattafa Black.png', category: 'men', available: true },
    { name: 'Fakhar Lattafa White', desc: 'فخر الطافة عطر نسائي أنيق', price: 0, img: 'image/Fakhar Lattafa White.png', category: 'women', available: false },
    { name: 'Saheb White', desc: 'الصاحب عطر رجالي كلاسيكي', price: 0, img: 'image/Saheb White.png', category: 'men', available: true },
    { name: 'Saheb Brown', desc: 'الصاحب عطر رجالي دافئ', price: 0, img: 'image/Saheb Brown.png', category: 'men', available: true },
    { name: 'Asad', desc: 'أسد عطر رجالي قوي', price: 0, img: 'image/Asad.png', category: 'men', available: true },
    { name: 'Box Musoof', desc: 'بوكس موصوف مجموعة عطور متنوعة', price: 0, img: 'image/Box Musoof.png', category: 'unisex', available: true },
    { name: "Bade'e Al Oud", desc: 'بديع العود عطر مختلط برائحة العود', price: 0, img: 'image/Badee Al Oud.png', category: 'unisex', available: true },
    { name: 'Mayar', desc: 'ميار عطر نسائي ناعم', price: 0, img: 'image/Mayar.png', category: 'women', available: false },
    { name: 'Gissah', desc: 'قصة عطر نسائي جذاب', price: 0, img: 'image/Gissah.png', category: 'women', available: false },
    { name: 'Asad Zanzibar', desc: 'أسد عطر رجالي بنفحات الزنجبيل', price: 0, img: 'image/Asad Zanzibar.png', category: 'men', available: true },
    { name: 'Saif Al Batal', desc: 'سيف البطل عطر رجالي شرقي', price: 0, img: 'image/Saif Al Batal.png', category: 'men', available: true },
    { name: 'EL GHAWAS', desc: 'الغواص عطر رجالي بحري', price: 0, img: 'image/EL GHAWAS.png', category: 'men', available: true },
    { name: 'Fakhar Lattafa Gold', desc: 'فخر عطر رجالي فاخر', price: 0, img: 'image/Fakhar Lattafa Gold.png', category: 'men', available: true },
    { name: 'Yara', desc: 'يارا عطر نسائي زهري', price: 0, img: 'image/Yara.png', category: 'women', available: false },
    { name: 'Tamima', desc: 'تميمة عطر نسائي أنيق', price: 0, img: 'image/Tamima.png', category: 'women', available: false },
    { name: 'Ramz Lattafa', desc: 'رمز الطافة عطر رجالي شرقي', price: 0, img: 'image/Ramz Lattafa.png', category: 'men', available: true },
    { name: 'Ameerat Al Arab', desc: 'اميرة العرب عطر نسائي فاخر', price: 0, img: 'image/Ameerat Al Arab.png', category: 'women', available: false },
    { name: 'Ana Abiyedh', desc: 'أنا الأبيض عطر مختلط برائحة المسك', price: 0, img: 'image/Ana Abiyedh.png', category: 'unisex', available: true },
    { name: 'Sayaad Al Quloob', desc: 'صياد عطر رجالي جذاب', price: 0, img: 'image/Sayaad Al Quloob.png', category: 'men', available: true },
    { name: 'moosouf', desc: 'موصوف عطر رجالي شرقي فاخر يدوم طويلاً', price: 0, img: 'image/Moosouf.png', category: 'men', available: true },
    { name: 'In The Stars Body Lotion', desc: 'لوشن معطر برائحة النجوم مع مزيج من الفواكه والمسك الدافئ', price: 0, img: 'image/In_The_Stars_Body_Lotion.png', category: 'unisex', available: true },
    { name: 'Into the Night perfume', desc: 'عطر نسائي غامض بنفحات التوت الأسود والفانيليا', price: 0, img: 'image/Into_the_Night_perfume.png', category: 'women', available: false },
    { name: 'INTO THE NIGHT Body Lotion', desc: 'لوشن برائحة العطر الشهير Into the Night', price: 0, img: 'image/INTO_THE_NIGHT_Body_Lotion.png', category: 'women', available: false },
    { name: "You're The One", desc: 'عطر زهري فاخر بمزيج من الورد والفراولة', price: 0, img: 'image/Youre_The_0ne.png', category: 'women', available: false },
    { name: 'Gingham', desc: 'عطر نقي ومنعش برائحة الزهور البيضاء والليمون', price: 0, img: 'image/Gingham.png', category: 'unisex', available: true },
    { name: 'In the Stars', desc: 'عطر يجمع بين رائحة الكشمير والتمر الهندي', price: 0, img: 'image/In_the_Stars.png', category: 'unisex', available: true },
    { name: 'Sense Laverne', desc: 'عطر جورجينا قوي بنفحات الفلفل الأسود والعود', price: 0, img: 'image/Sense_Laverne.png', category: 'women', available: false }
  ]
};
