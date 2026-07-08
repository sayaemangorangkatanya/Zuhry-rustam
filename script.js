
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const yearText = document.getElementById("year");
const pageLinks = document.querySelectorAll('a[href^="#"]');
const navbar = document.querySelector(".site-header");
const galleryCards = document.querySelectorAll(".gallery-card");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

if (yearText) {
  yearText.textContent = new Date().getFullYear().toString();
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight +
          1;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        if (navMenu && navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
        }
      }
    }
  });
});

if (galleryCards.length) {
  const slotOrder = ["far-left", "left", "center", "right"];
  let isRotating = false;

  const applySlots = () => {
    galleryCards.forEach((card, index) => {
      const currentSlot = slotOrder[index];
      card.dataset.slot = currentSlot;
      card.classList.remove(
        "gallery-far-left",
        "gallery-left",
        "gallery-center",
        "gallery-right"
      );
      card.classList.add(`gallery-${currentSlot}`);
    });
  };

  const rotateGallery = () => {
    if (isRotating || window.innerWidth <= 640) {
      return;
    }

    isRotating = true;
    galleryCards.forEach((card) => card.classList.add("is-animating"));
    slotOrder.unshift(slotOrder.pop());
    applySlots();

    window.setTimeout(() => {
      galleryCards.forEach((card) => card.classList.remove("is-animating"));
      isRotating = false;
    }, 700);
  };

  galleryCards.forEach((card) => {
    card.tabIndex = 0;
    card.addEventListener("mouseenter", rotateGallery);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        rotateGallery();
      }
    });
  });

  applySlots();
}
