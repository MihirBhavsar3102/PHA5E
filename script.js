const projects = document.querySelectorAll(".project-card");
const outlineText = document.querySelector(".outline-text");
const hero = document.querySelector(".hero");
const tl = gsap.timeline();

// Animate loading logo and text
tl.to(".loading-logo", {
  opacity: 1,
  duration: 1,
  ease: "power2.out",
})
  .to(
    ".loading-text",
    {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.5"
  )
  .to(
    ".loading-logo",
    {
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
    },
    "+=1"
  )
  .to(".loading-logo, .loading-text", {
    opacity: 0,
    duration: 1,
    color: "white",
    ease: "power2.in",
  })
  .to(".loading-screen", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      document.querySelector(".loading-screen").style.display = "none";
    },
  })
  .from("nav", {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: "power2.out",
  })
  .from(
    ".outline-text h1",
    {
      opacity: 1,
      y: 50,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    },
    "-=0.3"
  )
  .from(
    ".project-card",
    {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    },
    "-=0.5"
  );

// Mouse following effect
projects.forEach((project) => {
  let rect = project.getBoundingClientRect();
  let projectCenterX = rect.left + rect.width / 2;
  let projectCenterY = rect.top + rect.height / 2;

  project.addEventListener("mousemove", (e) => {
    // Calculate distance from mouse to center of card
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    // Calculate the movement range (px)
    let moveX = (mouseX - projectCenterX) * 0.1;
    let moveY = (mouseY - projectCenterY) * 0.1;

    // Apply the transform
    project.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  project.addEventListener("mouseleave", () => {
    // Reset position smoothly
    project.style.transform = "translate(0, 0)";
  });

  // Add outline text effect
  project.addEventListener("mouseenter", () => {
    outlineText.classList.add("outline-mode");
    // Update center position on hover start
    rect = project.getBoundingClientRect();
    projectCenterX = rect.left + rect.width / 2;
    projectCenterY = rect.top + rect.height / 2;
  });

  project.addEventListener("mouseleave", () => {
    outlineText.classList.remove("outline-mode");
  });
});

// Update positions on window resize
window.addEventListener("resize", () => {
  projects.forEach((project) => {
    let rect = project.getBoundingClientRect();
    projectCenterX = rect.left + rect.width / 2;
    projectCenterY = rect.top + rect.height / 2;
  });
});

// Initial animation
gsap.from(".outline-text h1", {
  opacity: 10,
  y: 50,
  duration: 1,
  stagger: 0.1,
  ease: "power3.out",
});

// Initial animation for project cards
gsap.from(".project-card", {
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 0.5,
});
