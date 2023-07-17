const projectList = [
  {
    name: "Scien-T",
    summary: "Scien-T is web-based gamified learning system to help students be motivated and pique their interest in chemistry. Learn through Trivias, Mixing Table, and an interactive Periodic Table. Play and learn with games like Mix Dash, Test Battle and Electron Configuration. Collect cosmetics to personalize your avatar.",
    images: [
      "./images/projects/scien-t/main-page.png",
      "./images/projects/scien-t/mixing-table.png",
      "./images/projects/scien-t/mix-dash.png",
      "./images/projects/scien-t/test-battle.png",
      "./images/projects/scien-t/shop.png",
      "./images/projects/scien-t/user-progress.png",
    ],
    code: "https://github.com/gnahhr/Scien-T",
    live: "https://scien-t.onrender.com",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    active: true
  },
  {
    name: "Escafe",
    summary: "Escafe is a coffee shop website that features not only coffee beans but also equipments. It is a POS system that has CRUD for inventory and an online buying feature.",
    images: [
      "./images/projects/escafe/landing-page.png",
      "./images/projects/escafe/about.png",
      "./images/projects/escafe/shop.png",
      "./images/projects/escafe/selected-item.png",
      "./images/projects/escafe/inventory.png",
    ],
    code: "https://github.com/gnahhr/websys-php-finals",
    live: "",
    techStack: ["HTML", "CSS", "PHP", "MySQL"],
    active: false
  },
  {
    name: "Concheck",
    summary: "Concheck is a progressive web application which can check the progress of the project within the specified deadline by tracking tasks done for a day along with their reasons for delay for transparency within peers. The employee side of the project also includes time in and time out along with the generation of their own date-time record.",
    images: [
      "./images/projects/concheck/landing-page.png",
      "./images/projects/concheck/projects.png",
      "./images/projects/concheck/dashboard.png",
      "./images/projects/concheck/images.png",
      "./images/projects/concheck/crew.png",
    ],
    code: "https://github.com/gnahhr/concheck",
    live: "",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    active: false
  }
]

// Container Elements
const projectsDiv = document.getElementById("projects");
const projectsNavDiv = document.getElementsByClassName("grid-nav")[0].querySelector("ul");
const projectsInfoDiv = projectsDiv.getElementsByClassName("project-gallery")[0];
const projectsSummaryDiv = projectsDiv.getElementsByClassName("project-summary")[0];
const linksDiv = projectsInfoDiv.getElementsByClassName("links")[0];
const techStackDiv = projectsInfoDiv.getElementsByClassName("tech-stack")[0];

// Project Carousel Elements
const carouselNav = projectsInfoDiv.getElementsByClassName("carousel-controls")[0];
const leftArrow = carouselNav.getElementsByClassName("left-chevron")[0];
const rightArrow = carouselNav.getElementsByClassName("right-chevron")[0];

// CLASS CONSTANT
const ACTIVE_NAV_CLASS = "grid-nav-active";

// ICON CONSTANTS
const REG_CIRCLE = `<i class="fa-regular fa-circle"></i>`;
const SOLID_CIRCLE = `<i class="fa-solid fa-circle"></i>`;

let selectedProject, curPos = 0;

const updateProject = (activeProject) => {
  const data = projectList.filter(project => project.name === activeProject)[0];
  const projectSummary = document.createElement("p");
  
  // Reset position of carousel per update
  curPos = 0;

  selectedProject = activeProject;
  projectsSummaryDiv.innerHTML = "";
  techStackDiv.innerHTML = "";

  projectSummary.innerText = data.summary;
  projectsInfoDiv.querySelector("img").src = data.images[curPos];
  projectsInfoDiv.querySelector("h2").innerText = data.name;

  projectsSummaryDiv.append(projectSummary);
  
  data.techStack.forEach(tech => {
    const techStack = document.createElement("span");
    techStack.innerText = tech;
    techStackDiv.append(techStack);
  })

  updateLinks(data);
  updateCarousel(curPos, data);

  leftArrow.onclick = () => prevImage(data);
  rightArrow.onclick = () => nextImage(data);
}

function prevImage(data){
  if (curPos > 0) {
    updateCarousel(curPos -= 1, data)
  };
}

function nextImage (data) {
  if (curPos < data.images.length - 1) {
    updateCarousel(curPos += 1, data)
  };
}

const updateLinks = (data) => {
  const fragment = document.createDocumentFragment();
  const codeDiv = document.createElement('a');
  const visitDiv = document.createElement('a');
  linksDiv.innerHTML = "";

  if (data.code) {
    codeDiv.href = data.code;
    codeDiv.innerHTML = `<span>View Code</span><i class="fa-brands fa-github"></i>`;
    codeDiv.classList.add("code-link");
    codeDiv.target = "_blank";
    fragment.appendChild(codeDiv);
  }

  if (data.live) {
    visitDiv.href = data.live;
    visitDiv.innerHTML = `<span>Visit Site</span><i class="fa-solid fa-arrow-up-right-from-square"></i>`;
    visitDiv.classList.add("live-link");
    visitDiv.target = "_blank";
    fragment.appendChild(visitDiv);
  }  
  
  linksDiv.append(fragment);
}

const updateCarousel = (curPos, data) => {
  const fragment = document.createDocumentFragment();
  const projectsInfoDiv = projectsDiv.getElementsByClassName("project-gallery")[0];
  const carouselNav = projectsInfoDiv.getElementsByClassName("carousel-controls")[0];
  const controls = carouselNav.getElementsByClassName("circles")[0];
  const cirNav = document.createElement("i");
  controls.innerHTML = "";

  data.images.forEach((img, idx) => {
    idx === curPos ? cirNav.innerHTML = SOLID_CIRCLE : cirNav.innerHTML = REG_CIRCLE;
    fragment.appendChild(cirNav.cloneNode(true));
  });

  projectsInfoDiv.querySelector("img").src = data.images[curPos];
  
  controls.append(fragment);
}

// Iterate from projects and add them to the navLinks
projectList.forEach((project) => {
  const navLink = document.createElement("li");

  if (project.active) {
    navLink.className = ACTIVE_NAV_CLASS;
    updateProject(project.name);
  };

  navLink.innerText = project.name;
  navLink.addEventListener("click", () => selectActiveProject(navLink))
  projectsNavDiv.appendChild(navLink);
})

const selectActiveProject = (selectedNav) => {
  const projectNavLinks = projectsNavDiv.querySelectorAll("li");

  projectNavLinks.forEach(nav => {
    if (selectedNav !== nav && nav.className.includes(ACTIVE_NAV_CLASS)) {
      nav.classList.toggle(ACTIVE_NAV_CLASS);
    }
  })

  selectedNav.classList.toggle(ACTIVE_NAV_CLASS);
  updateProject(selectedNav.innerText);
}