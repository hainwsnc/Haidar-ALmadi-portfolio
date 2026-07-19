// 1. تحديد العناصر الأساسية
const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const body = document.body;
const controls = document.querySelector('.controls');

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
const applyLanguage = (lang) => {
    const arElements = document.querySelectorAll('.ar-text');
    const enElements = document.querySelectorAll('.en-text');

    if (lang === 'en') {
        body.setAttribute('dir', 'ltr');
        
        // إخفاء العربي وإظهار الإنجليزي (استخدام '' يحافظ على تنسيق الـ CSS الأصلي)
        arElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => el.style.display = ''); 
        
        langToggleBtn.textContent = 'عربي';
        controls.style.left = 'auto';
        controls.style.right = '20px';
    } else {
        body.setAttribute('dir', 'rtl');
        
        // إخفاء الإنجليزي وإظهار العربي
        enElements.forEach(el => el.style.display = 'none');
        arElements.forEach(el => el.style.display = '');
        
        langToggleBtn.textContent = 'English';
        controls.style.right = 'auto';
        controls.style.left = '20px';
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