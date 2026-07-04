document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Menu Responsive (Hamburger) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu au clic sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- 2. Animation au Scroll (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.hero-content, .section-title, .skill-card, .project-card, .about-content');

    // Ajouter la classe de base pour l'animation CSS
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animation joue une seule fois
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Déclenche quand 15% de l'élément est visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. Validation du Formulaire ---
    const contactForm = document.getElementById('contact-form');
    const feedbackDiv = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêcher l'envoi réel
        let isValid = true;
        
        // Récupération des champs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Reset des erreurs
        resetError(nameInput);
        resetError(emailInput);
        resetError(messageInput);
        feedbackDiv.innerHTML = '';

        // Validation Nom
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Le nom est requis.');
            isValid = false;
        }

        // Validation Email (Regex simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Veuillez entrer un email valide.');
            isValid = false;
        }

        // Validation Message
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Le message doit contenir au moins 10 caractères.');
            isValid = false;
        }

        // Si tout est valide
        if (isValid) {
            // Simulation d'envoi
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Envoi en cours...';
            btn.disabled = true;

            setTimeout(() => {
                feedbackDiv.innerHTML = '<span class="success-message">Message envoyé avec succès ! Je vous répondrai bientôt.</span>';
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        }
    });

    // Fonctions utilitaires pour le formulaire
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-msg');
        
        formGroup.classList.add('error');
        errorDisplay.innerText = message;
    }

    function resetError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    }
});

