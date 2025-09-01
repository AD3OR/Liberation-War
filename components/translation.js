// translation.js

const translations = {
    en: {
        "brand-title": "Liberation War Museum",
        "brand-subtitle": "Archive & Collections",
        "nav-home": "Home",
        "nav-collections": "Collections",
        "nav-exhibitions": "Exhibitions",
        "nav-archive": "Archive",
        "nav-virtual": "Virtual Tour",
        "nav-about": "About",
        "nav-contact": "Contact",
        "hero-title": "Discover 1971",
        "hero-subtitle": "Explore our extensive collection of digitally preserved artifacts, artworks, and cultural treasures from around the world.",
        "hero-btn-1": "Explore Collections",
        "hero-btn-2": "Virtual Tour",
        "search-title": "Search the Archive",
        "search-placeholder": "Search artifacts, collections, or exhibitions...",
        "search-btn": "Search",
        "featured-collections": "Featured Collections",
        "featured-artifacts": "Featured Artifacts",
        "current-exhibitions": "Current Virtual Exhibitions",
        "archive-title": "Browse Archive",
        "newsletter-title": "Stay Updated",
        "newsletter-subtitle": "Subscribe to receive updates about new exhibitions, collections, and digital discoveries.",
        "newsletter-btn": "Subscribe",
        "footer-digital": "Digital Museum",
        "footer-quick": "Quick Links",
        "footer-resources": "Resources",
        "footer-contact": "Contact",
        "footer-rights": "© 2025 Liberation War Museum Archive. All rights reserved.",
        "asn": "Yashica Electro-Camera 1968",
        "bsn": "'71 Light Submachine Gun",
        "csn": "Placard Of Bangabandhu",
        "dsn": "Standard '71 Submachine Gun",
        "ed": "Bangladesh Before The War",
        "fd": "Art And Paintings Of 1971",
        "gd": "Post-Liberation Modern Sculptures",
        "hd": "Historical Manuscripts of 1971",
        "hero-stats-artifacts-number": "12,000+",
        "hero-stats-artifacts-label": "Digital Artifacts",
        "hero-stats-collections-number": "250+",
        "hero-stats-collections-label": "Collections",
        "hero-stats-exhibitions-number": "50+",
        "hero-stats-exhibitions-label": "Virtual Exhibitions",
        "exhibition-title-1": "Art And Drama of 1971",
        "exhibition-title-2": "The Art Of Liberation",
        "exhibition-title-3": "Arsenal Of Liberation"
    },
    bn: {
        "brand-title": "মুক্তিযুদ্ধ জাদুঘর",
        "brand-subtitle": "আর্কাইভ ও সংগ্রহশালা",
        "nav-home": "হোম",
        "nav-collections": "সংগ্রহশালা",
        "nav-exhibitions": "প্রদর্শনী",
        "nav-archive": "আর্কাইভ",
        "nav-virtual": "ভার্চুয়াল ভ্রমণ",
        "nav-about": "আমাদের সম্পর্কে",
        "nav-contact": "যোগাযোগ",
        "hero-title": "আবিষ্কার করুন ১৯৭১",
        "hero-subtitle": "বিশ্বব্যাপী সংরক্ষিত নিদর্শন, শিল্পকর্ম ও সাংস্কৃতিক সম্পদ আবিষ্কার করুন।",
        "hero-btn-1": "সংগ্রহশালা দেখুন",
        "hero-btn-2": "ভার্চুয়াল ভ্রমণ",
        "search-title": "আর্কাইভ খুঁজুন",
        "search-placeholder": "নিদর্শন, সংগ্রহশালা বা প্রদর্শনী অনুসন্ধান করুন...",
        "search-btn": "অনুসন্ধান",
        "featured-collections": "বিশেষ সংগ্রহশালা",
        "featured-artifacts": "বিশেষ নিদর্শন",
        "current-exhibitions": "বর্তমান ভার্চুয়াল প্রদর্শনী",
        "archive-title": "আর্কাইভ ব্রাউজ করুন",
        "newsletter-title": "আপডেট থাকুন",
        "newsletter-subtitle": "নতুন প্রদর্শনী ও সংগ্রহশালার খবর পেতে সাবস্ক্রাইব করুন।",
        "newsletter-btn": "সাবস্ক্রাইব",
        "footer-digital": "ডিজিটাল জাদুঘর",
        "footer-quick": "দ্রুত লিংক",
        "footer-resources": "রিসোর্স",
        "footer-contact": "যোগাযোগ",
        "footer-rights": "© ২০২৫ মুক্তিযুদ্ধ জাদুঘর আর্কাইভ। সর্বস্বত্ব সংরক্ষিত।",
        "asn": "ইয়াশিকা ইলেক্ট্রো-ক্যামেরা ১৯৬৮",
        "bsn": "‘৭১ হালকা সাবমেশিন গান",
        "csn": "বঙ্গবন্ধুর প্ল্যাকার্ড",
        "dsn": "স্ট্যান্ডার্ড ‘৭১ সাবমেশিন গান",
        "ed": "যুদ্ধের আগে বাংলাদেশ",
        "fd": "১৯৭১ এর শিল্পকলা ও চিত্রকর্ম",
        "gd": "মুক্তিযুদ্ধোত্তর আধুনিক ভাস্কর্য",
        "hd": "১৯৭১ এর ঐতিহাসিক পাণ্ডুলিপি",
        "hero-stats-artifacts-number": "১২,০০০+",
        "hero-stats-artifacts-label": "ডিজিটাল নিদর্শন",
        "hero-stats-collections-number": "২৫০+",
        "hero-stats-collections-label": "সংগ্রহশালা",
        "hero-stats-exhibitions-number": "৫০+",
        "hero-stats-exhibitions-label": "ভার্চুয়াল প্রদর্শনী",
        "exhibition-title-1": "১৯৭১-এর শিল্প ও নাটক",
        "exhibition-title-2": "মুক্তির শিল্প",
        "exhibition-title-3": "মুক্তির অস্ত্রাগার"

    }
};

function setLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang][key]) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById("lang-" + lang).classList.add("active");
}

document.getElementById("lang-en").addEventListener("click", () => setLanguage("en"));
document.getElementById("lang-bn").addEventListener("click", () => setLanguage("bn"));

// default language
setLanguage("en");
