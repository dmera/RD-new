(function(){
	// Theme mode management (system/light/dark)
	const themeMedia = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
	const getSystemTheme = () => (themeMedia && themeMedia.matches ? 'dark' : 'light');

	const applyTheme = (mode) => {
		const body = document.body;
		body.classList.remove('theme-dark', 'theme-light');
		if (mode === 'dark') {
			body.classList.add('theme-dark');
		} else if (mode === 'light') {
			body.classList.add('theme-light');
		} // 'system' means no explicit class

		// Swap brand logos to dark/light variants
		const isDark = mode === 'dark' || (mode === 'system' && getSystemTheme() === 'dark');
		const logos = document.querySelectorAll('.brand-logo');
		logos.forEach((img) => {
			const lightSrc = img.getAttribute('data-light-src');
			const darkSrc = img.getAttribute('data-dark-src');
			if (lightSrc && darkSrc) {
				img.setAttribute('src', isDark ? darkSrc : lightSrc);
			}
		});

		// Swap portfolio card images (default only; hover handled separately)
		const portfolioImgs = document.querySelectorAll('.card-media img[data-light-src][data-dark-src]');
		portfolioImgs.forEach((img) => {
			const lightSrc = img.getAttribute('data-light-src');
			const darkSrc = img.getAttribute('data-dark-src');
			if (lightSrc && darkSrc) {
				img.setAttribute('src', isDark ? darkSrc : lightSrc);
			}
		});
	};

	const updateToggleUI = (mode) => {
		const toggles = document.querySelectorAll('.theme-toggle');
		toggles.forEach(btn => {
			btn.setAttribute('data-mode', mode);
			const label = mode === 'system' ? `system (${getSystemTheme()})` : mode;
			btn.textContent = `theme: ${label}`;
			btn.setAttribute('aria-pressed', mode !== 'system');
		});
	};

	const initTheme = () => {
		const saved = localStorage.getItem('theme') || 'system';
		applyTheme(saved);
		updateToggleUI(saved);
		// React to system changes when in system mode
		if (themeMedia) {
			themeMedia.addEventListener('change', () => {
				const current = localStorage.getItem('theme') || 'system';
				if (current === 'system') {
					applyTheme('system');
					updateToggleUI('system');
				}
			});
		}
	};

	const cycleMode = (current) => {
		if (current === 'system') return 'dark';
		if (current === 'dark') return 'light';
		return 'system';
	};

	const bindThemeToggle = () => {
		const toggles = document.querySelectorAll('.theme-toggle');
		toggles.forEach(btn => {
			btn.addEventListener('click', () => {
				const current = localStorage.getItem('theme') || 'system';
				const next = cycleMode(current);
				localStorage.setItem('theme', next);
				applyTheme(next);
				updateToggleUI(next);
			});
		});
	};

	initTheme();
	bindThemeToggle();
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

	// Highlight active navigation link
	const navLinks = document.querySelectorAll('.nav-list a');
	if (navLinks.length > 0) {
		const currentPathname = window.location.pathname.toLowerCase();
		const currentPage = currentPathname.split('/').pop() || '';
		
		navLinks.forEach(link => {
			const linkHref = link.getAttribute('href');
			if (linkHref) {
				const linkHrefLower = linkHref.toLowerCase();
				// Extract page name from href (e.g., "team.html" -> "team")
				const linkFileName = linkHrefLower.split('/').pop() || linkHrefLower;
				const linkPage = linkFileName.replace('.html', '');
				const currentPageNoExt = currentPage.replace('.html', '');
				
				// Check if current page matches
				if (currentPage === linkFileName || 
				    currentPageNoExt === linkPage ||
				    (linkPage === 'team' && currentPathname.includes('team')) ||
				    (linkPage === 'privacy' && currentPathname.includes('privacy')) ||
				    (linkPage === 'imprint' && currentPathname.includes('imprint')) ||
				    (linkPage === 'index' && (currentPage === '' || currentPage === 'index.html'))) {
					link.classList.add('active');
				}
			}
		});
	}

	// Highlight active footer link (same logic as header)
	const footerLinks = document.querySelectorAll('.footer-links a');
	if (footerLinks.length > 0) {
		const currentPathname = window.location.pathname.toLowerCase();
		const currentPage = currentPathname.split('/').pop() || '';
		
		footerLinks.forEach(link => {
			const linkHref = link.getAttribute('href');
			if (linkHref) {
				const linkHrefLower = linkHref.toLowerCase();
				// Extract page name from href (e.g., "team.html" -> "team")
				const linkFileName = linkHrefLower.split('/').pop() || linkHrefLower;
				const linkPage = linkFileName.replace('.html', '');
				const currentPageNoExt = currentPage.replace('.html', '');
				
				// Check if current page matches
				if (currentPage === linkFileName || 
				    currentPageNoExt === linkPage ||
				    (linkPage === 'team' && currentPathname.includes('team')) ||
				    (linkPage === 'privacy' && currentPathname.includes('privacy')) ||
				    (linkPage === 'imprint' && currentPathname.includes('imprint')) ||
				    (linkPage === 'index' && (currentPage === '' || currentPage === 'index.html'))) {
					link.classList.add('active');
				}
			}
		});
	}

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

	// Header shadow on scroll
	const siteHeader = document.querySelector('.site-header');
	if (siteHeader) {
		window.addEventListener('scroll', () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			
			if (scrollTop > 0) {
				siteHeader.classList.add('scrolled');
			} else {
				siteHeader.classList.remove('scrolled');
			}
		});
		
		// Check initial scroll position
		const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (initialScrollTop > 0) {
			siteHeader.classList.add('scrolled');
		}
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
			const dataHover = img.getAttribute('data-hover-src');
			const hoverSrc = dataHover || originalSrc.replace('.png', '-hover.png').replace('.jpg', '-hover.jpg').replace('.svg', '-hover.svg');
			
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
		// Function to check if element is in viewport (with tolerance)
		const isInViewport = (el) => {
			const rect = el.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
			
			// Check if element is visible (fully or partially) within viewport
			// Allow some tolerance for elements that are just above or below
			return (
				rect.top < viewportHeight + 300 && // 300px below viewport
				rect.bottom > -100 && // 100px above viewport
				rect.left < viewportWidth &&
				rect.right > 0
			);
		};

		// Function to trigger animation
		const triggerAnimation = (el) => {
			if (!el.classList.contains('is-visible')) {
				el.classList.remove('is-hidden');
				el.classList.add('is-visible');
			}
		};

		// Hide elements initially
		revealElements.forEach((el) => {
			el.classList.add('is-hidden');
		});
		
		// Separate cards from other elements
		const cards = document.querySelectorAll('.card.reveal-up');
		const teamMembers = document.querySelectorAll('.team-member.reveal-up');
		const otherElements = Array.from(revealElements).filter(el => !el.classList.contains('card') && !el.classList.contains('team-member'));
		
		// Observer for cards with earlier trigger
		const cardObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					triggerAnimation(entry.target);
					cardObserver.unobserve(entry.target);
				}
			});
		}, { 
			rootMargin: '300px 0px -100px 0px',
			threshold: 0.01 
		});

		// Observer for team members
		const teamObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					triggerAnimation(entry.target);
					teamObserver.unobserve(entry.target);
				}
			});
		}, { 
			rootMargin: '300px 0px -100px 0px',
			threshold: 0.01 
		});

		// Observer for other elements (title, subtitle, etc.)
		const otherObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					triggerAnimation(entry.target);
					otherObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		// Check elements on page load and trigger animation if already visible
		const checkInitialViewport = () => {
			// Use requestAnimationFrame twice to ensure layout is complete
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setTimeout(() => {
						Array.from(revealElements).forEach((el, index) => {
							if (isInViewport(el) && !el.classList.contains('is-visible')) {
								// Staggered delay for smooth sequential animation
								setTimeout(() => {
									triggerAnimation(el);
								}, 200 + (index * 30)); // 200ms initial delay + 30ms between each element
							}
						});
					}, 100); // Delay to ensure page is fully rendered
				});
			});
		};

		// Trigger animations for elements already in viewport on load
		const runOnLoad = () => {
			checkInitialViewport();
		};

		// Wait for page to be fully loaded
		if (document.readyState === 'loading') {
			window.addEventListener('load', runOnLoad);
			document.addEventListener('DOMContentLoaded', checkInitialViewport);
		} else if (document.readyState === 'interactive') {
			window.addEventListener('load', runOnLoad);
			checkInitialViewport();
		} else {
			// Document is already complete
			runOnLoad();
		}

		// Observe cards with early trigger (only if not already visible)
		cards.forEach((card) => {
			if (!card.classList.contains('is-visible')) {
				cardObserver.observe(card);
			}
		});

		// Observe team members (only if not already visible)
		teamMembers.forEach((member) => {
			if (!member.classList.contains('is-visible')) {
				teamObserver.observe(member);
			}
		});
		
		// Observe other elements with normal trigger (only if not already visible)
		otherElements.forEach((el) => {
			if (!el.classList.contains('is-visible')) {
				otherObserver.observe(el);
			}
		});
	}

	// Floating navigation active section highlighting
	const floatingNavLinks = document.querySelectorAll('.floating-nav-list a');
	if (floatingNavLinks.length > 0) {
		// Only get sections that have corresponding links in the navbar
		const sections = Array.from(floatingNavLinks).map(link => {
			const href = link.getAttribute('href');
			if (href && href.startsWith('#')) {
				return document.querySelector(href);
			}
			return null;
		}).filter(section => section !== null);
		
		const updateActiveNav = () => {
			const scrollPosition = window.scrollY + 150; // Offset for better UX
			let currentSection = null;
			
			// Find the current section based on scroll position
			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				const sectionTop = section.offsetTop;
				
				if (scrollPosition >= sectionTop) {
					currentSection = section;
					break;
				}
			}
			
			// If we're at the very top, highlight the first section
			if (scrollPosition < sections[0]?.offsetTop - 100) {
				currentSection = sections[0];
			}
			
			// Remove active class from all links
			floatingNavLinks.forEach(link => link.classList.remove('active'));
			
			// Add active class to current section link
			if (currentSection) {
				const sectionId = currentSection.getAttribute('id');
				const activeLink = document.querySelector(`.floating-nav-list a[href="#${sectionId}"]`);
				if (activeLink) {
					activeLink.classList.add('active');
				}
			}
		};
		
		// Update on scroll
		window.addEventListener('scroll', updateActiveNav);
		
		// Update on page load
		updateActiveNav();
	}
})();


