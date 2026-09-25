/* =========================================================
   SKILLSHARE
   JAVASCRIPT
========================================================= */


/* =========================================================
   SAMPLE SKILLS
========================================================= */

let skills = [

    {
        id: 1,
        name: "Java",
        person: "Rahul",
        level: "Intermediate",
        description: "Java programming and OOP concepts",
        category: "Programming",
        icon: "fa-brands fa-java"
    },

    {
        id: 2,
        name: "Python",
        person: "Anjali",
        level: "Beginner",
        description: "Python basics and programming",
        category: "Programming",
        icon: "fa-brands fa-python"
    },

    {
        id: 3,
        name: "JavaScript",
        person: "Arjun",
        level: "Advanced",
        description: "Modern JavaScript and web development",
        category: "Web Development",
        icon: "fa-brands fa-js"
    },

    {
        id: 4,
        name: "UI/UX Design",
        person: "Sneha",
        level: "Intermediate",
        description: "User interface and user experience design",
        category: "Design",
        icon: "fa-solid fa-pen-ruler"
    },

    {
        id: 5,
        name: "C++",
        person: "Karthik",
        level: "Advanced",
        description: "C++ programming and problem solving",
        category: "Programming",
        icon: "fa-solid fa-code"
    },

    {
        id: 6,
        name: "HTML & CSS",
        person: "Priya",
        level: "Beginner",
        description: "Building responsive web pages",
        category: "Web Development",
        icon: "fa-brands fa-html5"
    },

    {
        id: 7,
        name: "Data Analytics",
        person: "Meera",
        level: "Intermediate",
        description: "Data analysis and visualization basics",
        category: "Data Science",
        icon: "fa-solid fa-chart-line"
    },

    {
        id: 8,
        name: "Public Speaking",
        person: "Aarav",
        level: "Advanced",
        description: "Improve confidence and presentation skills",
        category: "Communication",
        icon: "fa-solid fa-microphone"
    },

    {
        id: 9,
        name: "Digital Marketing",
        person: "Riya",
        level: "Intermediate",
        description: "Social media and digital marketing strategies",
        category: "Business",
        icon: "fa-solid fa-bullhorn"
    }

];


/* =========================================================
   LOCAL STORAGE
========================================================= */

const ADDED_SKILLS_KEY = "skillShareAddedSkills";
const CONNECTIONS_KEY = "skillShareConnections";
const THEME_KEY = "skillShareTheme";
const LOGIN_EMAIL_KEY = "skillShareEmail";


/* =========================================================
   GET HTML ELEMENTS
========================================================= */

const loginPage = document.getElementById("loginPage");
const app = document.getElementById("app");

const homePage = document.getElementById("homePage");
const explorePage = document.getElementById("explorePage");
const addSkillPage = document.getElementById("addSkillPage");
const profilePage = document.getElementById("profilePage");

const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const passwordToggle = document.getElementById("passwordToggle");

const homeSkillsGrid = document.getElementById("homeSkillsGrid");
const exploreSkillsGrid = document.getElementById("exploreSkillsGrid");

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const categoryButtons = document.querySelectorAll(".category-filter");

const addSkillForm = document.getElementById("addSkillForm");

const mySkillsGrid = document.getElementById("mySkillsGrid");
const connectionsGrid = document.getElementById("connectionsGrid");

const noMySkills = document.getElementById("noMySkills");
const noConnections = document.getElementById("noConnections");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

const profileDropdown = document.getElementById("profileDropdown");


/* =========================================================
   CURRENT STATE
========================================================= */

let currentCategory = "All";


/* =========================================================
   LOCAL STORAGE FUNCTIONS
========================================================= */

function getAddedSkills() {

    const savedSkills = localStorage.getItem(ADDED_SKILLS_KEY);

    if (savedSkills) {
        return JSON.parse(savedSkills);
    }

    return [];
}


function saveAddedSkills(addedSkills) {

    localStorage.setItem(
        ADDED_SKILLS_KEY,
        JSON.stringify(addedSkills)
    );

}


function getConnections() {

    const savedConnections =
        localStorage.getItem(CONNECTIONS_KEY);

    if (savedConnections) {
        return JSON.parse(savedConnections);
    }

    return [];
}


function saveConnections(connections) {

    localStorage.setItem(
        CONNECTIONS_KEY,
        JSON.stringify(connections)
    );

}


/* =========================================================
   INITIALIZE SKILLS
========================================================= */

function loadSavedSkills() {

    const addedSkills = getAddedSkills();

    skills = [...skills, ...addedSkills];

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function hideAllPages() {

    homePage.classList.remove("active-page");
    homePage.classList.add("hidden-page");

    explorePage.classList.remove("active-page");
    explorePage.classList.add("hidden-page");

    addSkillPage.classList.remove("active-page");
    addSkillPage.classList.add("hidden-page");

    profilePage.classList.remove("active-page");
    profilePage.classList.add("hidden-page");

}


/* =========================================================
   SHOW LOGIN
========================================================= */

function showLogin() {

    loginPage.classList.remove("hidden");

    app.classList.add("hidden");

    hideAllPages();

}


/* =========================================================
   SHOW HOME
========================================================= */

function showHome() {

    loginPage.classList.add("hidden");

    app.classList.remove("hidden");

    hideAllPages();

    homePage.classList.remove("hidden-page");
    homePage.classList.add("active-page");

    setActiveNav("homePage");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW EXPLORE
========================================================= */

function showExplore() {

    loginPage.classList.add("hidden");

    app.classList.remove("hidden");

    hideAllPages();

    explorePage.classList.remove("hidden-page");
    explorePage.classList.add("active-page");

    setActiveNav("explorePage");

    renderExploreSkills();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW ADD SKILL
========================================================= */

function showAddSkill() {

    loginPage.classList.add("hidden");

    app.classList.remove("hidden");

    hideAllPages();

    addSkillPage.classList.remove("hidden-page");
    addSkillPage.classList.add("active-page");

    setActiveNav("addSkillPage");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW PROFILE
========================================================= */

function showProfile(scrollToConnections = false) {

    loginPage.classList.add("hidden");

    app.classList.remove("hidden");

    hideAllPages();

    profilePage.classList.remove("hidden-page");
    profilePage.classList.add("active-page");

    setActiveNav("");

    renderProfile();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (scrollToConnections) {

        setTimeout(function () {

            document.getElementById(
                "connectionsSection"
            ).scrollIntoView({
                behavior: "smooth"
            });

        }, 150);

    }

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function setActiveNav(pageId) {

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        if (link.dataset.page === pageId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });

}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    let valid = true;


    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    }


    if (password === "") {

        passwordError.textContent =
            "Please enter your password.";

        valid = false;

    }


    if (!valid) {
        return;
    }


    localStorage.setItem(
        LOGIN_EMAIL_KEY,
        email
    );

    showHome();

    showToast(
        "Welcome back 👋",
        "You have successfully logged in."
    );

});


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

passwordToggle.addEventListener(
    "click",
    function () {

        if (loginPassword.type === "password") {

            loginPassword.type = "text";

            passwordToggle.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';

        } else {

            loginPassword.type = "password";

            passwordToggle.innerHTML =
                '<i class="fa-regular fa-eye"></i>';

        }

    }
);


/* =========================================================
   SIGN UP
========================================================= */

document.getElementById("signupLink")
    .addEventListener("click", function (event) {

        event.preventDefault();

        showToast(
            "Sign up",
            "This frontend demo does not use real authentication."
        );

    });


/* =========================================================
   NAVIGATION LINKS
========================================================= */

document.querySelectorAll(".nav-link")
    .forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const page = link.dataset.page;

            if (page === "homePage") {
                showHome();
            }

            if (page === "explorePage") {
                showExplore();
            }

            if (page === "addSkillPage") {
                showAddSkill();
            }

            document
                .getElementById("navLinks")
                .classList.remove("show");

        });

    });


/* =========================================================
   LOGO HOME
========================================================= */

document.getElementById("logoHome")
    .addEventListener("click", function (event) {

        event.preventDefault();

        showHome();

    });


/* =========================================================
   HERO BUTTONS
========================================================= */

document.getElementById("heroExploreButton")
    .addEventListener("click", showExplore);


document.getElementById("heroAddSkillButton")
    .addEventListener("click", showAddSkill);


document.getElementById("homeExploreAll")
    .addEventListener("click", showExplore);


/* =========================================================
   RENDER SKILL CARD
========================================================= */

function createSkillCard(skill) {

    const connections = getConnections();

    const isConnected = connections.some(function (connection) {

        return (
            connection.person === skill.person &&
            connection.skill === skill.name
        );

    });


    const levelClass =
        "level-" + skill.level.toLowerCase();


    const card = document.createElement("div");

    card.className = "skill-card";


    card.innerHTML = `

        <div class="skill-card-top">

            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>

            <span class="skill-level ${levelClass}">
                ${skill.level}
            </span>

        </div>


        <h3>${skill.name}</h3>

        <div class="skill-person">
            <i class="fa-regular fa-user"></i>
            ${skill.person}
        </div>

        <p class="skill-description">
            ${skill.description}
        </p>


        <div class="skill-card-bottom">

            <button
                class="connect-button ${isConnected ? "connected" : ""}"
                data-person="${skill.person}"
                data-skill="${skill.name}"
                data-level="${skill.level}"
                data-description="${skill.description}"
            >

                ${
                    isConnected
                    ? "Connected ✓"
                    : "Connect"
                }

            </button>


            <button class="favorite-button">

                <i class="fa-regular fa-heart"></i>

            </button>

        </div>

    `;


    const connectButton =
        card.querySelector(".connect-button");


    if (!isConnected) {

        connectButton.addEventListener(
            "click",
            function () {

                connectUser(skill);

            }
        );

    }


    const favoriteButton =
        card.querySelector(".favorite-button");


    favoriteButton.addEventListener(
        "click",
        function () {

            const icon =
                favoriteButton.querySelector("i");

            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");

            if (
                icon.classList.contains("fa-solid")
            ) {

                icon.style.color = "#ef4444";

            } else {

                icon.style.color = "";

            }

        }
    );


    return card;

}


/* =========================================================
   RENDER HOME SKILLS
========================================================= */

function renderHomeSkills() {

    homeSkillsGrid.innerHTML = "";

    const popularSkills = skills.slice(0, 4);

    popularSkills.forEach(function (skill) {

        homeSkillsGrid.appendChild(
            createSkillCard(skill)
        );

    });

}


/* =========================================================
   RENDER EXPLORE SKILLS
========================================================= */

function renderExploreSkills() {

    exploreSkillsGrid.innerHTML = "";

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredSkills =
        skills.filter(function (skill) {

            const matchesSearch =

                skill.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                skill.person
                    .toLowerCase()
                    .includes(searchText)

                ||

                skill.description
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =

                currentCategory === "All"

                ||

                skill.category === currentCategory;


            return matchesSearch && matchesCategory;

        });


    if (filteredSkills.length === 0) {

        exploreSkillsGrid.innerHTML = "";

        document
            .getElementById("emptySearchState")
            .classList.remove("hidden");

        return;

    }


    document
        .getElementById("emptySearchState")
        .classList.add("hidden");


    filteredSkills.forEach(function (skill) {

        exploreSkillsGrid.appendChild(
            createSkillCard(skill)
        );

    });

}


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    function () {

        if (searchInput.value.trim() !== "") {

            clearSearch.style.display = "block";

        } else {

            clearSearch.style.display = "none";

        }

        renderExploreSkills();

    }
);


clearSearch.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        clearSearch.style.display = "none";

        renderExploreSkills();

    }
);


/* =========================================================
   CATEGORY FILTER
========================================================= */

categoryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            currentCategory =
                button.dataset.category;

            renderExploreSkills();

        }
    );

});


/* =========================================================
   CONNECT USER
========================================================= */

function connectUser(skill) {

    const connections = getConnections();


    const alreadyConnected =
        connections.some(function (connection) {

            return (
                connection.person === skill.person &&
                connection.skill === skill.name
            );

        });


    if (alreadyConnected) {
        return;
    }


    const newConnection = {

        person: skill.person,

        skill: skill.name,

        level: skill.level,

        description: skill.description

    };


    connections.push(newConnection);

    saveConnections(connections);


    showToast(
        "Connection request sent!",
        `Connection request sent to ${skill.person}! 🤝`
    );


    renderExploreSkills();

    renderHomeSkills();

    renderProfile();

}


/* =========================================================
   ADD SKILL
========================================================= */

addSkillForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("skillPersonName")
                .value.trim();

        const skillName =
            document
                .getElementById("skillName")
                .value.trim();

        const category =
            document
                .getElementById("skillCategory")
                .value;

        const description =
            document
                .getElementById("skillDescription")
                .value.trim();

        const level =
            document
                .getElementById("skillLevel")
                .value;


        document.getElementById("nameError").textContent = "";
        document.getElementById("skillError").textContent = "";
        document.getElementById("categoryError").textContent = "";
        document.getElementById("descriptionError").textContent = "";
        document.getElementById("levelError").textContent = "";


        let valid = true;


        if (name === "") {

            document.getElementById("nameError").textContent =
                "Please enter your name.";

            valid = false;

        }


        if (skillName === "") {

            document.getElementById("skillError").textContent =
                "Please enter a skill.";

            valid = false;

        }


        if (category === "") {

            document.getElementById("categoryError").textContent =
                "Please select a category.";

            valid = false;

        }


        if (description === "") {

            document.getElementById("descriptionError").textContent =
                "Please enter a description.";

            valid = false;

        }


        if (level === "") {

            document.getElementById("levelError").textContent =
                "Please select proficiency.";

            valid = false;

        }


        if (!valid) {
            return;
        }


        let icon = "fa-solid fa-lightbulb";


        if (
            category === "Programming"
        ) {
            icon = "fa-solid fa-code";
        }

        if (
            category === "Web Development"
        ) {
            icon = "fa-solid fa-globe";
        }

        if (
            category === "Data Science"
        ) {
            icon = "fa-solid fa-chart-line";
        }

        if (
            category === "Design"
        ) {
            icon = "fa-solid fa-pen-ruler";
        }

        if (
            category === "Communication"
        ) {
            icon = "fa-solid fa-comments";
        }

        if (
            category === "Business"
        ) {
            icon = "fa-solid fa-briefcase";
        }


        const newSkill = {

            id: Date.now(),

            name: skillName,

            person: name,

            level: level,

            description: description,

            category: category,

            icon: icon,

            owner: "currentUser"

        };


        const addedSkills = getAddedSkills();

        addedSkills.push(newSkill);

        saveAddedSkills(addedSkills);


        skills.push(newSkill);


        addSkillForm.reset();


        showToast(
            "Skill added successfully! 🎉",
            `${skillName} has been added to SkillShare.`
        );


        renderHomeSkills();

        renderExploreSkills();

        renderProfile();


        setTimeout(function () {

            showExplore();

        }, 700);

    }
);


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

    const addedSkills = getAddedSkills();

    const connections = getConnections();


    document.getElementById(
        "sharedSkillsCount"
    ).textContent = addedSkills.length;


    document.getElementById(
        "connectionCount"
    ).textContent = connections.length;


    document.getElementById(
        "connectionBadge"
    ).textContent =
        `${connections.length} Connection${connections.length === 1 ? "" : "s"}`;


    /* USER EMAIL */

    const savedEmail =
        localStorage.getItem(LOGIN_EMAIL_KEY);

    if (savedEmail) {

        document.getElementById(
            "profileEmail"
        ).textContent = savedEmail;

    }


    /* SHARED SKILLS */

    mySkillsGrid.innerHTML = "";


    if (addedSkills.length === 0) {

        mySkillsGrid.classList.add("hidden");

        noMySkills.classList.remove("hidden");

    } else {

        mySkillsGrid.classList.remove("hidden");

        noMySkills.classList.add("hidden");


        addedSkills.forEach(function (skill) {

            mySkillsGrid.appendChild(
                createSkillCard(skill)
            );

        });

    }


    /* CONNECTIONS */

    connectionsGrid.innerHTML = "";


    if (connections.length === 0) {

        connectionsGrid.classList.add("hidden");

        noConnections.classList.remove("hidden");

    } else {

        connectionsGrid.classList.remove("hidden");

        noConnections.classList.add("hidden");


        connections.forEach(function (connection) {

            const card =
                document.createElement("div");

            card.className = "connection-card";


            card.innerHTML = `

                <div class="connection-avatar">
                    ${connection.person.charAt(0).toUpperCase()}
                </div>

                <div class="connection-info">

                    <h3>
                        ${connection.person}
                    </h3>

                    <div class="connection-skill">
                        ${connection.skill}
                    </div>

                    <span class="connection-level">
                        ${connection.level}
                    </span>

                    <p class="connection-description">
                        ${connection.description}
                    </p>

                </div>

                <span class="connection-status">
                    Connected ✓
                </span>

            `;


            connectionsGrid.appendChild(card);

        });

    }

}


/* =========================================================
   PROFILE BUTTON
========================================================= */

document.getElementById("profileButton")
    .addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            profileDropdown.classList.toggle("show");

        }
    );


/* CLOSE DROPDOWN */

document.addEventListener(
    "click",
    function () {

        profileDropdown.classList.remove("show");

    }
);


/* DROPDOWN OPTIONS */

document.querySelectorAll(
    "[data-profile-action]"
).forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const action =
                button.dataset.profileAction;


            profileDropdown.classList.remove("show");


            if (action === "profile") {
                showProfile(false);
            }


            if (action === "connections") {
                showProfile(true);
            }


            if (action === "logout") {
                logout();
            }

        }
    );

});


/* PROFILE ADD SKILL */

document.getElementById("profileAddSkill")
    .addEventListener(
        "click",
        showAddSkill
    );


document.getElementById("firstSkillButton")
    .addEventListener(
        "click",
        showAddSkill
    );


/* CONNECTION EXPLORE */

document.getElementById(
    "connectionExploreButton"
).addEventListener(
    "click",
    showExplore
);


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    loginPage.classList.remove("hidden");

    app.classList.add("hidden");

    hideAllPages();

    loginForm.reset();

    localStorage.removeItem(LOGIN_EMAIL_KEY);

    showToast(
        "Logged out",
        "You have been returned to the login page."
    );

}


/* =========================================================
   LOGOUT BUTTON
========================================================= */

document.getElementById("logoutButton")
    .addEventListener(
        "click",
        logout
    );


/* =========================================================
   DARK MODE
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(THEME_KEY);


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        document.getElementById(
            "themeToggle"
        ).innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

}


document.getElementById("themeToggle")
    .addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const dark =
                document.body.classList.contains(
                    "dark-mode"
                );


            if (dark) {

                localStorage.setItem(
                    THEME_KEY,
                    "dark"
                );

                this.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

            } else {

                localStorage.setItem(
                    THEME_KEY,
                    "light"
                );

                this.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

            }

        }
    );


/* =========================================================
   MOBILE MENU
========================================================= */

document.getElementById(
    "mobileMenuButton"
).addEventListener(
    "click",
    function () {

        document
            .getElementById("navLinks")
            .classList.toggle("show");

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(
        function () {

            toast.classList.remove("show");

        },
        3500
    );

}


document.getElementById("closeToast")
    .addEventListener(
        "click",
        function () {

            toast.classList.remove("show");

        }
    );


/* =========================================================
   INITIAL PAGE STATE
   VERY IMPORTANT:
   ALWAYS START WITH LOGIN PAGE.
========================================================= */

function initializeApplication() {

    /*
       We deliberately DO NOT check login state here.

       This means refreshing the browser will always
       return to the Login page.
    */

    loadSavedSkills();

    loadTheme();

    renderHomeSkills();

    renderExploreSkills();

    renderProfile();

    showLogin();

}


/* =========================================================
   START APPLICATION
========================================================= */

initializeApplication();