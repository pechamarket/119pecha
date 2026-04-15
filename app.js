document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-left, .animate-right, .stat-item, .step-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic animation for feedback
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = '상담 신청 중...';

            // Simulate API call
            setTimeout(() => {
                alert('상담 신청이 완료되었습니다. 전문가가 곧 연락드리겠습니다.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }, 1500);
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (simple version)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('모바일 메뉴 기능은 현재 준비 중입니다. 전화를 통해 빠른 상담이 가능합니다!');
        });
    }

    // 개인정보 모달 제어
    const privacyModal = document.getElementById('privacyModal');
    const openPrivacy = document.getElementById('openPrivacy');
    const closeButtons = document.querySelectorAll('.modal-close, .modal-ok');

    if (openPrivacy && privacyModal) {
        openPrivacy.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 부모 스크롤 방지
        });

        const closeModal = () => {
            privacyModal.classList.remove('active');
            document.body.style.overflow = ''; // 스크롤 복구
        };

        closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

        // 배경 클릭 시 닫기
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) closeModal();
        });

        // ESC 키로 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && privacyModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
