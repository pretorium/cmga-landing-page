/** Variables y Selectores */
const btnBurger = document.querySelector('.header__btnBurger');
const navBar = document.querySelector('.navBar');
const navVertical = document.querySelector('.header__navVertical');
const optionsNavBar = document.querySelector('.header__options');
const optionsNavBarVertical = document.querySelector('.header__navVertical');
const allOptions = document.querySelectorAll('.option');
const allSections = document.querySelectorAll('div[id*="__divider"]');

/** Funciones */
const handleOpenMenu = () => {
	const { classList: classListBtn } = btnBurger;
	const { classList: classListNav } = navVertical;
	classListBtn.toggle('header__btnBurger--active');
	classListNav.toggle('header__navVertical--active')
};

const handleScrollToSection = (e) => {
	const { target } = e;
	const sectionNumber = Array.prototype.indexOf.call(target.parentNode.children, target);
	const sectionPositionY = allSections[sectionNumber].getBoundingClientRect().top;
	const documentTop = document.body.getBoundingClientRect().top;
	const offset = sectionPositionY - documentTop;
	window.scroll(0, offset);

	if (window.innerWidth <= 768) {
		handleOpenMenu();	
	}
};

const handleMenuSticky = () => {
	const { classList } = navBar;
	const windowTop = window.pageYOffset;
	const firstSection = allSections[0].getBoundingClientRect().top + windowTop;
	if (firstSection <= windowTop && !classList.contains('navBar--active')) {
		classList.add('navBar--active');
	} else if (firstSection > windowTop && classList.contains('navBar--active')) {
		classList.remove('navBar--active');
	}
};

const handleOptionsActive = () => {
	const lengthOps = allOptions.length;
	const windowTop = window.pageYOffset;
	const sectionsPosition = [...allSections].map((section) => (
		section.getBoundingClientRect().top + windowTop
	));

	[...allOptions].forEach((option, idx) => {
		const { classList } = option;
		console.log(idx, lengthOps);
		if (idx + 1 < lengthOps) {
			windowTop >= sectionsPosition[idx] && windowTop < sectionsPosition[idx + 1]
			? classList.add('option--active')
			: classList.remove('option--active')
		} else {
			windowTop >= sectionsPosition[idx]
			? classList.add('option--active')
			: classList.remove('option--active')
		}
	});
};

/** Eventos */
const eventListeners = (() => {
	/** Abrir y cerrar menú lateral */
	btnBurger.addEventListener('click', handleOpenMenu);

	/** Hacer scroll a las secciones */
	optionsNavBar.addEventListener('click', handleScrollToSection);

	/** Hacer scroll a las secciones Nav Vertical */
	optionsNavBarVertical.addEventListener('click', handleScrollToSection);

	window.addEventListener('scroll', () => {
		handleMenuSticky();
		handleOptionsActive();
	});
})();
