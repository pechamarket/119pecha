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
                entry.target.style.opacity = '1';
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
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = '상담 신청 중...';

            // 실제 작동하는 폐차마켓 텔레그램 정보 적용
            const botToken = '8602319567:AAG8VPaq0Ia0DsRAPe5fyCKXo6yzA40kSm0';
            const chatId = '8781562240';
            
            // 데이터 수집
            const carNumber = document.getElementById('car-number').value;
            const phone = document.getElementById('phone').value;
            const messageData = document.getElementById('message').value;

            // 텔레그램 메시지 구성
            const text = `🔔 [119폐차 신청 알림]\n>> 119폐차(119pecha.life)\n\n🚗 차량번호: ${carNumber}\n📞 연락처: ${phone}\n💬 문의내용: ${messageData || '없음'}\n⏰ 시간: ${new Date().toLocaleString()}`;

            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('상담 신청이 완료되었습니다. 전문가가 곧 연락드리겠습니다.');
                    contactForm.reset();
                } else {
                    alert('알림 전송 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('네트워크 연결 문제로 상담 신청에 실패했습니다.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            });
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
