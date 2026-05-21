function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) themeBtn.textContent = '☀️ Светлая';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.textContent = isDark ? '☀️ Светлая' : '🌙 Тёмная';
}

function initNavigation() {
    const navLinks = document.querySelectorAll('[data-nav]');
    const sections = {
        home: document.getElementById('home'),
        top: document.getElementById('top'),
        actors: document.getElementById('actors'),
        feedback: document.getElementById('feedback')
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-nav');
            
            Object.values(sections).forEach(section => {
                if (section) section.classList.remove('active');
            });
            
            if (sections[sectionId]) {
                sections[sectionId].classList.add('active');
            }
            
            const sideMenu = document.getElementById('sideMenu');
            if (sideMenu) {
                sideMenu.classList.remove('open');
            }
        });
    });
}

function initSideMenu() {
    const dropdownBtn = document.getElementById('dropdownBtn');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeMenuBtn');
    
    if (dropdownBtn && sideMenu) {
        dropdownBtn.addEventListener('click', () => {
            sideMenu.classList.add('open');
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                sideMenu.classList.remove('open');
            });
        }
        
        sideMenu.addEventListener('click', (e) => {
            if (e.target === sideMenu) {
                sideMenu.classList.remove('open');
            }
        });
    }
}

function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modalClose');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function initSimpleFeedback() {
    const sendBtn = document.getElementById('sendReviewBtn');
    const reviewInput = document.getElementById('reviewText');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            if (reviewInput.value.trim()) {
                sendBtn.textContent = 'Спасибо за отзыв!';
                sendBtn.classList.add('sent');
                reviewInput.value = '';
                setTimeout(() => {
                    sendBtn.textContent = 'Отправить';
                    sendBtn.classList.remove('sent');
                }, 3000);
            } else {
                sendBtn.textContent = 'Напишите отзыв';
                sendBtn.classList.add('sent');
                setTimeout(() => {
                    sendBtn.textContent = 'Отправить';
                    sendBtn.classList.remove('sent');
                }, 2000);
            }
        });
    }
}

window.addEventListener('load', async () => {
    initTheme();
    initNavigation();
    initSideMenu();
    initModal();
    initSimpleFeedback();
    
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    
    await initData();
});