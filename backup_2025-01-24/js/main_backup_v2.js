(function(){
	const navToggleButton = document.querySelector('.nav-toggle');
	const navElement = document.getElementById('site-nav');
	if (navToggleButton && navElement) {
		navToggleButton.addEventListener('click', () => {
			const isExpanded = navToggleButton.getAttribute('aria-expanded') === 'true';
			navToggleButton.setAttribute('aria-expanded', String(!isExpanded));
			navElement.classList.toggle('open');
		});
	}
	// Close mobile nav on link click
	navElement?.addEventListener('click', (e) => {
		const target = e.target;
		if (target instanceof HTMLElement && target.tagName.toLowerCase() === 'a') {
			navElement.classList.remove('open');
			navToggleButton?.setAttribute('aria-expanded', 'false');
		}
	});

	// Scroll down button functionality
	const scrollDownBtn = document.querySelector('.scroll-down-btn');
	if (scrollDownBtn) {
		scrollDownBtn.addEventListener('click', () => {
			const portfolioSection = document.getElementById('portfolio');
			if (portfolioSection) {
				portfolioSection.scrollIntoView({ behavior: 'smooth' });
			}
		});
	}

	// Back to top button functionality
	const backToTopBtn = document.querySelector('.back-to-top');
	if (backToTopBtn) {
		// Show/hide button based on scroll position
		window.addEventListener('scroll', () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const viewportHeight = window.innerHeight;
			
			if (scrollTop > viewportHeight) {
				backToTopBtn.classList.add('visible');
			} else {
				backToTopBtn.classList.remove('visible');
			}
		});

		// Scroll to top when clicked
		backToTopBtn.addEventListener('click', () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// Card hover image functionality
	const cards = document.querySelectorAll('.card');
	cards.forEach(card => {
		const img = card.querySelector('.card-media img');
		if (img) {
			const originalSrc = img.src;
			const hoverSrc = originalSrc.replace('.png', '-hover.png').replace('.jpg', '-hover.jpg').replace('.svg', '-hover.svg');
			
			card.addEventListener('mouseenter', () => {
				img.src = hoverSrc;
			});
			
			card.addEventListener('mouseleave', () => {
				img.src = originalSrc;
			});
		}
	});

	// Reveal-on-scroll (slide-up) animation
	const revealElements = document.querySelectorAll('.reveal-up');
	if (revealElements.length > 0) {
		// Hide elements initially
		revealElements.forEach((el) => {
			el.classList.add('is-hidden');
		});
		
		// Separate cards from other elements
		const cards = document.querySelectorAll('.card.reveal-up');
		const otherElements = Array.from(revealElements).filter(el => !el.classList.contains('card'));
		
		// Observer for cards with earlier trigger
		const cardObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.remove('is-hidden');
					entry.target.classList.add('is-visible');
					cardObserver.unobserve(entry.target);
				}
			});
		}, { 
			rootMargin: '300px 0px -100px 0px', // Trigger much earlier before card enters viewport
			threshold: 0.01 
		});

		// Observer for other elements (title, subtitle, etc.)
		const otherObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.remove('is-hidden');
					entry.target.classList.add('is-visible');
					otherObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		// Observe cards with early trigger
		cards.forEach((card) => cardObserver.observe(card));
		
		// Observe other elements with normal trigger
		otherElements.forEach((el) => otherObserver.observe(el));
	}
})();

