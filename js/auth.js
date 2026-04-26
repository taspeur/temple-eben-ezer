class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('ebenezer_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('ebenezer_session')) || null;
        this.init();
    }

    init() {
        this.updateUI();
    }

    register(name, email, password) {
        const exists = this.users.find(u => u.email === email);
        if (exists) {
            alert('Un compte avec cet email existe déjà.');
            return false;
        }
        
        // Auto-assign admin role to the main pastor or specific mail
        const role = email.toLowerCase() === 'admin@eben.com' ? 'admin' : 'member';
        
        const newUser = { id: Date.now(), name, email, password, role };
        this.users.push(newUser);
        localStorage.setItem('ebenezer_users', JSON.stringify(this.users));
        this.login(email, password);
        return true;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('ebenezer_session', JSON.stringify(user));
            alert('Connexion réussie ! Bienvenue ' + user.name + (user.role === 'admin' ? ' (Admin)' : ''));
            window.location.href = 'dashboard.html';
            return true;
        }
        alert('Identifiants incorrects.');
        return false;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    getUserPole() {
        if (!this.currentUser) return null;
        if (this.isAdmin()) return 'admin';
        
        const audioTeam = JSON.parse(localStorage.getItem('ebenezer_audio_team') || '{}');
        const tel = this.currentUser.tel;

        // Check if in redaction
        if (audioTeam.redaction && audioTeam.redaction.some(m => m.tel === tel || m.name === this.currentUser.name)) return 'redaction';
        
        // Check if tech leader
        if (audioTeam.technique === this.currentUser.name) return 'technique';

        // Check if video leader
        if (audioTeam.video === this.currentUser.name) return 'video';

        return null;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('ebenezer_session');
        window.location.href = 'welcome.html';
    }

    updateUI() {
        const modalBtn = document.getElementById('openModalBtn');
        if (this.currentUser) {
            if (modalBtn) {
                modalBtn.textContent = 'Mon Tableau de Bord';
                modalBtn.href = 'dashboard.html';
                modalBtn.onclick = null; // Remove modal popup trigger
            }
        }
    }

    protectPage() {
        if (!this.currentUser) {
            alert('Accès refusé. Veuillez vous connecter.');
            window.location.href = 'welcome.html';
        }
    }
}

const auth = new AuthManager();

// Setup modal logic for index.html if it exists
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            auth.login(email, password);
        });
    }

    const contactForm = document.getElementById('mainContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Envoi en cours...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Votre message a été transmis avec succès au secrétariat du Temple Eben-Ezer. Que Dieu vous bénisse!');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
