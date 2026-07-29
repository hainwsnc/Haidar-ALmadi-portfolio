// 1. تحديد العناصر الأساسية
const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const body = document.body;

// 2. نظام آمن للذاكرة المحلية (لتجنب الأخطاء عند فتح الموقع بدون سيرفر محلي)
const storage = {
    get: (key, defaultValue) => {
        try { return localStorage.getItem(key) || defaultValue; } 
        catch (e) { return defaultValue; }
    },
    set: (key, value) => {
        try { localStorage.setItem(key, value); } 
        catch (e) {}
    }
};

// إعداد الحالة الابتدائية من الذاكرة أو القيم الافتراضية
let currentLang = storage.get('portfolio-lang', 'ar');
let currentTheme = storage.get('portfolio-theme', 'light');

// 3. دالة تطبيق السمة (Theme)
const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '🌙';
    } else {
        body.removeAttribute('data-theme');
        themeToggleBtn.textContent = '☀️';
    }
    storage.set('portfolio-theme', theme);
};

// 4. دالة تطبيق اللغة (Language)
// ملاحظة: بعد نقل .controls داخل شريط التنقل العلوي (top-nav)،
// اتجاه الصفحة (dir) هو المسؤول تلقائياً عن ترتيب العناصر (يمين/يسار)
// فما عاد في داعي نتحكم يدوياً بموقع .controls زي قبل.
const applyLanguage = (lang) => {
    const arElements = document.querySelectorAll('.ar-text');
    const enElements = document.querySelectorAll('.en-text');

    if (lang === 'en') {
        body.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');

        // إخفاء العربي وإظهار الإنجليزي (استخدام '' يحافظ على تنسيق الـ CSS الأصلي)
        arElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => el.style.display = '');

        langToggleBtn.textContent = 'عربي';
    } else {
        body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');

        // إخفاء الإنجليزي وإظهار العربي
        enElements.forEach(el => el.style.display = 'none');
        arElements.forEach(el => el.style.display = '');

        langToggleBtn.textContent = 'English';
    }

    currentLang = lang;
    storage.set('portfolio-lang', lang);
};

// 5. تهيئة الموقع عند التحميل الأول (Initialization)
const init = () => {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
};

// 6. إضافة مستمعي الأحداث (Event Listeners) للأزرار
themeToggleBtn.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

langToggleBtn.addEventListener('click', () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(newLang);
});

// تشغيل دوال التهيئة فوراً
init();