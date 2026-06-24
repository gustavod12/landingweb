// ===== DOM ELEMENTS =====
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const navbar = document.querySelector(".navbar")
const slides = document.querySelectorAll(".slide")
const sliderDots = document.querySelector(".slider-dots")
const prevBtn = document.querySelector(".slider-btn.prev")
const nextBtn = document.querySelector(".slider-btn.next")
const particlesContainer = document.querySelector(".particles")
const loadingScreen = document.querySelector(".loading-screen")
const customCursor = document.querySelector(".custom-cursor")
const cursorFollower = document.querySelector(".cursor-follower")

// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    document.body.classList.add("loaded")
    initAnimations()
    initTextAnimations()
  }, 2200)
})

// ===== CUSTOM CURSOR =====
if (window.innerWidth > 992) {
  document.addEventListener("mousemove", (e) => {
    customCursor.style.left = e.clientX + "px"
    customCursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 50)
  })

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .service-card, .about-card, .contact-item, .product-category, .badge, .why-item, .tienda-btn",
  )
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => customCursor.classList.add("hover"))
    el.addEventListener("mouseleave", () => customCursor.classList.remove("hover"))
  })
}

// ===== HAMBURGER MENU - Updated for new navbar structure =====
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
  })
}

// Close menu when clicking nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active")
    if (navMenu) navMenu.classList.remove("active")
    document.body.style.overflow = ""

    navLinks.forEach((l) => l.classList.remove("active"))
    link.classList.add("active")
  })
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (hamburger && navMenu) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      document.body.style.overflow = ""
    }
  }
})

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ===== SLIDER =====
let currentSlide = 0
let slideInterval

if (slides.length > 0 && sliderDots) {
  slides.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("slider-dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(index))
    sliderDots.appendChild(dot)
  })
}

const dots = document.querySelectorAll(".slider-dot")

function updateSlider() {
  if (slides.length === 0) return

  slides.forEach((slide, index) => {
    slide.classList.remove("active")
    if (dots[index]) dots[index].classList.remove("active")
  })
  slides[currentSlide].classList.add("active")
  if (dots[currentSlide]) dots[currentSlide].classList.add("active")

  // Trigger text animations on active slide
  const activeSlide = slides[currentSlide]
  const revealLines = activeSlide.querySelectorAll(".reveal-line")
  revealLines.forEach((line, i) => {
    line.style.animation = "none"
    line.offsetHeight
    line.style.animation = `reveal-up 0.8s ${i * 0.1}s var(--transition-smooth) forwards`
  })

  const slideFeatures = activeSlide.querySelectorAll(".slide-feature")
  slideFeatures.forEach((feature, i) => {
    feature.style.opacity = "0"
    feature.style.transform = "translateY(20px)"
    setTimeout(
      () => {
        feature.style.transition = "all 0.5s var(--transition-smooth)"
        feature.style.opacity = "1"
        feature.style.transform = "translateY(0)"
      },
      800 + i * 150,
    )
  })
}

function nextSlide() {
  if (slides.length === 0) return
  currentSlide = (currentSlide + 1) % slides.length
  updateSlider()
}

function prevSlide() {
  if (slides.length === 0) return
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  updateSlider()
}

function goToSlide(index) {
  currentSlide = index
  updateSlider()
  resetInterval()
}

function resetInterval() {
  clearInterval(slideInterval)
  slideInterval = setInterval(nextSlide, 5000)
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide()
    resetInterval()
  })
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide()
    resetInterval()
  })
}

if (slides.length > 0) {
  slideInterval = setInterval(nextSlide, 5000)
}

// ===== PARTICLES =====
function createParticles() {
  if (!particlesContainer) return

  for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 20 + "s"
    particle.style.animationDuration = Math.random() * 15 + 15 + "s"
    particle.style.opacity = Math.random() * 0.5 + 0.3
    particlesContainer.appendChild(particle)
  }
}

createParticles()

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe scroll reveal elements
  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    scrollObserver.observe(el)
  })

  // Stagger animation for cards
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible")
        }, index * 100)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".scroll-reveal-stagger").forEach((el) => {
    staggerObserver.observe(el)
  })
}

function initTextAnimations() {
  // Observe section titles for word animation
  const titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.3 },
  )

  document.querySelectorAll(".section-title-animated").forEach((title) => {
    titleObserver.observe(title)
  })

  // Animate badges on scroll
  const badgeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const badges = entry.target.querySelectorAll(".badge")
          badges.forEach((badge, i) => {
            badge.style.opacity = "0"
            badge.style.transform = "translateY(20px) scale(0.9)"
            setTimeout(() => {
              badge.style.transition = "all 0.4s var(--transition-bounce)"
              badge.style.opacity = "1"
              badge.style.transform = "translateY(0) scale(1)"
            }, i * 80)
          })
          badgeObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".specialty-badges").forEach((container) => {
    badgeObserver.observe(container)
  })

  // Animate product category items
  const categoryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".category-items li")
          items.forEach((item, i) => {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
            setTimeout(
              () => {
                item.style.transition = "all 0.3s var(--transition-bounce)"
                item.style.opacity = "1"
                item.style.transform = "scale(1)"
              },
              300 + i * 60,
            )
          })
        }
      })
    },
    { threshold: 0.3 },
  )

  document.querySelectorAll(".product-category").forEach((category) => {
    categoryObserver.observe(category)
  })

  // Animate why-us items
  const whyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".why-item")
          items.forEach((item, i) => {
            item.style.opacity = "0"
            item.style.transform = "translateY(40px)"
            setTimeout(() => {
              item.style.transition = "all 0.6s var(--transition-smooth)"
              item.style.opacity = "1"
              item.style.transform = "translateY(0)"
            }, i * 150)
          })
          whyObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  document.querySelectorAll(".why-grid").forEach((grid) => {
    whyObserver.observe(grid)
  })

  // Animate repair list items
  const repairObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".repair-items span")
          items.forEach((item, i) => {
            item.style.opacity = "0"
            item.style.transform = "scale(0.7)"
            setTimeout(() => {
              item.style.transition = "all 0.4s var(--transition-bounce)"
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, i * 70)
          })
          repairObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".repair-list").forEach((list) => {
    repairObserver.observe(list)
  })

  // Animate benefits bar
  const benefitsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".benefit-item")
          items.forEach((item, i) => {
            item.style.opacity = "0"
            item.style.transform = "translateX(-30px)"
            setTimeout(() => {
              item.style.transition = "all 0.5s var(--transition-smooth)"
              item.style.opacity = "1"
              item.style.transform = "translateX(0)"
            }, i * 120)
          })
          benefitsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".benefits-container").forEach((container) => {
    benefitsObserver.observe(container)
  })
}

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll(".stat-number")

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2500
  const increment = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach((stat) => animateCounter(stat))
        // Animate progress bars
        document.querySelectorAll(".stat-item").forEach((item) => {
          item.classList.add("animated")
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsContainer = document.querySelector(".stats-container")
if (statsContainer) {
  statsObserver.observe(statsContainer)
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const target = document.querySelector(targetId)
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ===== FORM HANDLING =====
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const nombre = document.getElementById("nombre").value
    const email = document.getElementById("email").value
    const asunto = document.getElementById("asunto").value
    const mensaje = document.getElementById("mensaje").value

    const whatsappMessage = `¡Hola! Soy *${nombre}*%0A%0A📧 Email: ${email}%0A📌 Asunto: ${asunto}%0A%0A💬 Mensaje:%0A${mensaje}`

    window.open(`https://wa.me/543757506239?text=${whatsappMessage}`, "_blank")

    contactForm.reset()

    const submitBtn = contactForm.querySelector(".submit-btn")
    const originalHTML = submitBtn.innerHTML
    submitBtn.innerHTML = `<span>✓ Mensaje Enviado</span>`
    submitBtn.style.background = "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)"

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML
      submitBtn.style.background = ""
    }, 3000)
  })
}

// ===== MAGNETIC BUTTON EFFECT =====
const magneticBtns = document.querySelectorAll(".magnetic-btn")

magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = ""
  })
})

// ===== TILT CARD EFFECT =====
const tiltCards = document.querySelectorAll(".tilt-card")

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = ""
  })
})

// ===== TYPING EFFECT =====
const typingTexts = document.querySelectorAll(".typing-cursor")

typingTexts.forEach((text) => {
  const originalText = text.textContent
  text.textContent = ""
  let i = 0

  function typeWriter() {
    if (i < originalText.length) {
      text.textContent += originalText.charAt(i)
      i++
      setTimeout(typeWriter, 35)
    }
  }

  // Start typing when slide is active
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(typeWriter, 600)
        observer.unobserve(entry.target)
      }
    })
  })

  observer.observe(text)
})

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href && href === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ===== PARALLAX ON SCROLL =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset

  document.querySelectorAll(".float-shape").forEach((shape, i) => {
    const speed = 0.1 + i * 0.05
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// ===== SCROLL INDICATOR =====
const scrollIndicator = document.querySelector(".scroll-indicator")
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    const aboutSection = document.querySelector("#about-intro") || document.querySelector(".benefits-bar")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  })
  scrollIndicator.style.cursor = "pointer"
}

// ===== SERVICE CARD TAG ANIMATION =====
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const tags = card.querySelectorAll(".service-tags span")
    tags.forEach((tag, i) => {
      tag.style.transition = `all 0.3s ${i * 0.1}s var(--transition-bounce)`
      tag.style.transform = "translateY(-3px)"
    })
  })

  card.addEventListener("mouseleave", () => {
    const tags = card.querySelectorAll(".service-tags span")
    tags.forEach((tag) => {
      tag.style.transform = ""
    })
  })
})

// ===== NAV LINK HOVER EFFECTS - Added smooth indicator animation =====
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const indicator = link.querySelector(".nav-link-indicator")
    if (indicator) {
      indicator.style.transform = "translateX(-50%) scaleX(1)"
    }
  })

  link.addEventListener("mouseleave", () => {
    if (!link.classList.contains("active")) {
      const indicator = link.querySelector(".nav-link-indicator")
      if (indicator) {
        indicator.style.transform = "translateX(-50%) scaleX(0)"
      }
    }
  })
})

// ===== TIENDA BUTTON GLOW EFFECT =====
const tiendaBtn = document.querySelector(".tienda-btn")
if (tiendaBtn) {
  tiendaBtn.addEventListener("mouseenter", () => {
    const glow = tiendaBtn.querySelector(".btn-glow")
    if (glow) {
      glow.style.left = "100%"
    }
  })

  tiendaBtn.addEventListener("mouseleave", () => {
    const glow = tiendaBtn.querySelector(".btn-glow")
    if (glow) {
      setTimeout(() => {
        glow.style.transition = "none"
        glow.style.left = "-100%"
        setTimeout(() => {
          glow.style.transition = ""
        }, 50)
      }, 600)
    }
  })
}

console.log("🚀 GUDU INFORMÁTICA - Website loaded with Nunito fonts and redesigned navbar!")
