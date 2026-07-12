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

// ===== TYPING EFFECT (Graphic Designer / Frontend Dev) =====
const typingEl = document.getElementById("typingRole");

if (typingEl) {
  const typingRoles = ["Graphic Designer", "Frontend Dev"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentRole = typingRoles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      typingEl.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        window.setTimeout(typeLoop, 1000); // jeda 1 detik sebelum dihapus
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % typingRoles.length;
      }
    }

    window.setTimeout(typeLoop, isDeleting ? 45 : 90);
  };

  typeLoop();
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-fade, .reveal-zoom"
);

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target); // animasi cukup sekali
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}
