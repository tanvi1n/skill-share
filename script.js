/* =========================================================
   SKILLSHARE - COMPLETE FRONTEND JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let loggedIn = false;
let currentCategory = "All";

let registeredUser =
    JSON.parse(localStorage.getItem("registeredUser")) || null;

let savedSkills =
    JSON.parse(localStorage.getItem("skills")) || [];

let connections =
    JSON.parse(localStorage.getItem("connections")) || [];


/* =========================================================
   BASE / DEMO SKILLS
========================================================= */

const baseSkills = [

    {
        id: "java",
        skill: "Java",
        person: "Rahul",
        level: "Intermediate",
        description: "Java programming and OOP concepts",
        category: "Programming",
        icon: "☕"
    },

    {
        id: "python",
        skill: "Python",
        person: "Anjali",
        level: "Beginner",
        description: "Python basics and programming",
        category: "Programming",
        icon: "🐍"
    },

    {
        id: "javascript",
        skill: "JavaScript",
        person: "Arjun",
        level: "Advanced",
        description: "Modern JavaScript and web development",
        category: "Web Development",
        icon: "JS"
    },

    {
        id: "uiux",
        skill: "UI/UX Design",
        person: "Sneha",
        level: "Intermediate",
        description: "User interface and user experience design",
        category: "Design",
        icon: "🎨"
    },

    {
        id: "cpp",
        skill: "C++",
        person: "Karthik",
        level: "Advanced",
        description: "C++ programming and problem solving",
        category: "Programming",
        icon: "C++"
    },

    {
        id: "htmlcss",
        skill: "HTML & CSS",
        person: "Priya",
        level: "Beginner",
        description: "Building responsive web pages",
        category: "Web Development",
        icon: "🌐"
    },

    {
        id: "datastructures",
        skill: "Data Structures",
        person: "Vikram",
        level: "Intermediate",
        description: "Arrays, linked lists, stacks, queues and trees",
        category: "Programming",
        icon: "DS"
    },

    {
        id: "machinelearning",
        skill: "Machine Learning",
        person: "Meera",
        level: "Advanced",
        description: "Machine learning concepts and model building",
        category: "Data Science",
        icon: "ML"
    },

    {
        id: "communication",
        skill: "Communication",
        person: "Neha",
        level: "Advanced",
        description: "Public speaking and effective communication",
        category: "Communication",
        icon: "💬"
    },

    {
        id: "git",
        skill: "Git & GitHub",
        person: "Aditya",
        level: "Intermediate",
        description: "Version control and collaborative development",
        category: "Other",
        icon: "Git"
    },

    {
        id: "sql",
        skill: "SQL",
        person: "Riya",
        level: "Intermediate",
        description: "Database queries and SQL fundamentals",
        category: "Programming",
        icon: "DB"
    },

    {
        id: "devops",
        skill: "DevOps",
        person: "Sanjay",
        level: "Beginner",
        description: "CI/CD, Docker and deployment basics",
        category: "Other",
        icon: "⚙"
    }

];


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    applySavedTheme();

    /*
       IMPORTANT:
       We deliberately do NOT automatically log the user in
       after refresh.

       The user must explicitly sign in.
    */

    loggedIn = false;

    registeredUser =
        JSON.parse(localStorage.getItem("registeredUser")) || null;

    savedSkills =
        JSON.parse(localStorage.getItem("skills")) || [];

    connections =
        JSON.parse(localStorage.getItem("connections")) || [];


    if (registeredUser) {

        showSignIn();

        const rememberedEmail =
            localStorage.getItem("rememberedEmail");

        if (rememberedEmail) {
            document.getElementById("loginIdentifier").value =
                rememberedEmail;
        }

    } else {

        showSignUp();

    }


    setupOutsideClick();

});


/* =========================================================
   AUTHENTICATION - SIGN UP
========================================================= */

function showSignUp() {

    document.getElementById("signUpForm").classList.remove("hidden");
    document.getElementById("signInForm").classList.add("hidden");

    document.getElementById("signUpTab").classList.add("active");
    document.getElementById("signInTab").classList.remove("active");

    document.getElementById("authTitle").textContent =
        "Create your account";

    document.getElementById("authSubtitle").textContent =
        "Start sharing your skills with others.";

    clearAuthErrors();
}


/* =========================================================
   AUTHENTICATION - SIGN IN
========================================================= */

function showSignIn() {

    document.getElementById("signUpForm").classList.add("hidden");
    document.getElementById("signInForm").classList.remove("hidden");

    document.getElementById("signUpTab").classList.remove("active");
    document.getElementById("signInTab").classList.add("active");

    document.getElementById("authTitle").textContent =
        "Welcome back";

    document.getElementById("authSubtitle").textContent =
        "Sign in to continue your SkillShare journey.";

    clearAuthErrors();
}


/* =========================================================
   REGISTER USER
========================================================= */

function registerUser(event) {

    event.preventDefault();

    clearSignupErrors();

    const fullName =
        document.getElementById("fullName").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const skillInterest =
        document.getElementById("skillInterest").value;

    const proficiency =
        document.getElementById("proficiency").value;

    const terms =
        document.getElementById("terms").checked;


    let valid = true;


    /* Full Name */

    if (fullName.length < 2) {

        setError(
            "fullNameError",
            "Please enter your full name."
        );

        valid = false;
    }


    /* Username */

    if (username.length < 3) {

        setError(
            "usernameError",
            "Username must contain at least 3 characters."
        );

        valid = false;

    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {

        setError(
            "usernameError",
            "Use only letters, numbers and underscore."
        );

        valid = false;
    }


    /* Email */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        setError(
            "emailError",
            "Please enter a valid email address."
        );

        valid = false;
    }


    /* Mobile */

    const mobileDigits =
        mobile.replace(/\D/g, "");

    if (mobileDigits.length !== 10) {

        setError(
            "mobileError",
            "Mobile number must contain 10 digits."
        );

        valid = false;
    }


    /* Password */

    if (password.length < 6) {

        setError(
            "passwordError",
            "Password must contain at least 6 characters."
        );

        valid = false;
    }


    /* Confirm */

    if (confirmPassword !== password) {

        setError(
            "confirmPasswordError",
            "Passwords do not match."
        );

        valid = false;
    }


    /* Skill */

    if (!skillInterest) {

        setError(
            "skillInterestError",
            "Please select a skill."
        );

        valid = false;
    }


    /* Proficiency */

    if (!proficiency) {

        setError(
            "proficiencyError",
            "Please select a proficiency level."
        );

        valid = false;
    }


    /* Terms */

    if (!terms) {

        setError(
            "termsError",
            "Please accept the Terms & Conditions."
        );

        valid = false;
    }


    if (!valid) {
        return;
    }


    /*
       Check if another account already exists.

       This is a frontend demo, so only one registered account
       is maintained in localStorage.
    */

    if (registeredUser) {

        const sameUsername =
            registeredUser.username.toLowerCase() ===
            username.toLowerCase();

        const sameEmail =
            registeredUser.email.toLowerCase() ===
            email.toLowerCase();

        if (sameUsername) {

            setError(
                "usernameError",
                "This username is already registered."
            );

            return;
        }

        if (sameEmail) {

            setError(
                "emailError",
                "This email is already registered."
            );

            return;
        }
    }


    /* Save account */

    registeredUser = {

        id: Date.now(),

        fullName: fullName,

        username: username,

        email: email,

        mobile: mobile,

        password: password,

        skillInterest: skillInterest,

        proficiency: proficiency

    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(registeredUser)
    );


    showToast(
        "Account created successfully! Please sign in."
    );


    /* Prefill login */

    document.getElementById("loginIdentifier").value =
        username;

    document.getElementById("loginPassword").value = "";


    /*
       IMPORTANT:
       Signup NEVER opens Home.
       It switches to Sign In.
    */

    setTimeout(function () {

        showSignIn();

    }, 500);

}


/* =========================================================
   LOGIN USER
========================================================= */

function loginUser(event) {

    event.preventDefault();

    clearLoginErrors();


    const identifier =
        document.getElementById("loginIdentifier")
            .value
            .trim();

    const password =
        document.getElementById("loginPassword")
            .value;

    const rememberMe =
        document.getElementById("rememberMe").checked;


    let valid = true;


    if (!identifier) {

        setError(
            "loginIdentifierError",
            "Please enter your username or email."
        );

        valid = false;
    }


    if (!password) {

        setError(
            "loginPasswordError",
            "Please enter your password."
        );

        valid = false;
    }


    if (!valid) {
        return;
    }


    if (!registeredUser) {

        setError(
            "loginIdentifierError",
            "No account found. Please sign up first."
        );

        return;
    }


    const identifierMatches =
        registeredUser.username.toLowerCase() ===
            identifier.toLowerCase()
        ||
        registeredUser.email.toLowerCase() ===
            identifier.toLowerCase();


    const passwordMatches =
        registeredUser.password === password;


    if (!identifierMatches || !passwordMatches) {

        setError(
            "loginIdentifierError",
            "Invalid username/email or password."
        );

        return;
    }


    /* =====================================================
       SUCCESSFUL LOGIN
       THIS IS THE IMPORTANT PART
    ====================================================== */

    loggedIn = true;


    /*
       Save current session information.
       The page still requires explicit login after refresh.
    */

    localStorage.setItem(
        "currentUser",
        JSON.stringify({
            id: registeredUser.id,
            username: registeredUser.username,
            email: registeredUser.email
        })
    );


    if (rememberMe) {

        localStorage.setItem(
            "rememberedEmail",
            registeredUser.email
        );

    } else {

        localStorage.removeItem("rememberedEmail");

    }


    /* Update user information */

    updateUserInterface();


    showToast("Login successful!");


    /*
       IMPORTANT:
       Hide authentication completely.
    */

    document
        .getElementById("authScreen")
        .classList.add("hidden");


    /*
       IMPORTANT:
       Show COMPLETE application.
    */

    document
        .getElementById("appScreen")
        .classList.remove("hidden");


    /*
       IMPORTANT:
       Open HOME immediately after login.
    */

    showHome();

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    loggedIn = false;

    /*
       Remove only current session.
       Do NOT delete account, skills or connections.
    */

    localStorage.removeItem("currentUser");


    document
        .getElementById("appScreen")
        .classList.add("hidden");


    document
        .getElementById("authScreen")
        .classList.remove("hidden");


    showSignIn();

    showToast("Logged out successfully!");

}


/* =========================================================
   AUTH ERROR HELPERS
========================================================= */

function setError(elementId, message) {

    const element =
        document.getElementById(elementId);

    if (element) {
        element.textContent = message;
    }
}


function clearSignupErrors() {

    const ids = [

        "fullNameError",
        "usernameError",
        "emailError",
        "mobileError",
        "passwordError",
        "confirmPasswordError",
        "skillInterestError",
        "proficiencyError",
        "termsError"

    ];

    ids.forEach(function (id) {
        setError(id, "");
    });

}


function clearLoginErrors() {

    setError(
        "loginIdentifierError",
        ""
    );

    setError(
        "loginPasswordError",
        ""
    );

}


function clearAuthErrors() {

    clearSignupErrors();
    clearLoginErrors();

}


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }

}


/* =========================================================
   USER INTERFACE
========================================================= */

function updateUserInterface() {

    if (!registeredUser) {
        return;
    }


    const username =
        registeredUser.username;

    const firstLetter =
        username.charAt(0).toUpperCase();


    document.getElementById("navUsername")
        .textContent = username;

    document.getElementById("navAvatar")
        .textContent = firstLetter;

    document.getElementById("heroUsername")
        .textContent = username;


    document.getElementById("profileAvatar")
        .textContent = firstLetter;

    document.getElementById("profileUsername")
        .textContent = "@" + username;

    document.getElementById("profileFullName")
        .textContent = registeredUser.fullName;


    document.getElementById("profileNameDetail")
        .textContent = registeredUser.fullName;

    document.getElementById("profileUsernameDetail")
        .textContent = registeredUser.username;

    document.getElementById("profileEmailDetail")
        .textContent = registeredUser.email;

    document.getElementById("profileMobileDetail")
        .textContent = registeredUser.mobile;

    document.getElementById("profileInterestDetail")
        .textContent = registeredUser.skillInterest;

    document.getElementById("profileLevelDetail")
        .textContent = registeredUser.proficiency;

}


/* =========================================================
   VIEW CONTROL
========================================================= */

function hideAllViews() {

    const views = [

        "homeView",
        "skillExchangeView",
        "addSkillView",
        "profileView"

    ];

    views.forEach(function (id) {

        document
            .getElementById(id)
            .classList.add("hidden");

    });

}


/* =========================================================
   NAV ACTIVE STATE
========================================================= */

function clearNavActive() {

    const navs = [

        "homeNav",
        "exploreNav",
        "addSkillNav"

    ];

    navs.forEach(function (id) {

        document
            .getElementById(id)
            .classList.remove("active");

    });

}


/* =========================================================
   SHOW HOME
========================================================= */

function showHome() {

    if (!loggedIn) {
        return;
    }

    hideAllViews();

    clearNavActive();

    document
        .getElementById("homeView")
        .classList.remove("hidden");

    document
        .getElementById("homeNav")
        .classList.add("active");

    closeProfileDropdown();
    closeMobileMenu();

    updateUserInterface();

    updateStatistics();

    renderFeaturedSkills();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW SKILL EXCHANGE
========================================================= */

function showSkillExchange() {

    if (!loggedIn) {
        return;
    }

    hideAllViews();

    clearNavActive();

    document
        .getElementById("skillExchangeView")
        .classList.remove("hidden");

    document
        .getElementById("exploreNav")
        .classList.add("active");

    closeProfileDropdown();
    closeMobileMenu();

    renderSkills();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW ADD SKILL
========================================================= */

function showAddSkill() {

    if (!loggedIn) {
        return;
    }

    hideAllViews();

    clearNavActive();

    document
        .getElementById("addSkillView")
        .classList.remove("hidden");

    document
        .getElementById("addSkillNav")
        .classList.add("active");

    closeProfileDropdown();
    closeMobileMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW PROFILE
========================================================= */

function showProfile(section) {

    if (!loggedIn) {
        return;
    }

    hideAllViews();

    clearNavActive();

    document
        .getElementById("profileView")
        .classList.remove("hidden");

    closeProfileDropdown();
    closeMobileMenu();

    updateUserInterface();

    renderConnections();

    renderMySkills();

    updateStatistics();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /*
       Optional section scrolling.
    */

    if (section === "connections") {

        setTimeout(function () {

            document
                .getElementById("connectionsSection")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }, 200);

    }


    if (section === "skills") {

        setTimeout(function () {

            document
                .getElementById("mySkillsSection")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }, 200);

    }


    showToast("Profile opened!");

}


/* =========================================================
   GET ALL SKILLS
========================================================= */

function getAllSkills() {

    return [
        ...baseSkills,
        ...savedSkills
    ];

}


/* =========================================================
   RENDER FEATURED SKILLS
========================================================= */

function renderFeaturedSkills() {

    const container =
        document.getElementById("featuredSkills");

    const skills =
        getAllSkills().slice(0, 6);


    container.innerHTML = "";


    skills.forEach(function (item) {

        const card =
            createSkillCard(item);

        container.appendChild(card);

    });

}


/* =========================================================
   RENDER ALL SKILLS
========================================================= */

function renderSkills() {

    const container =
        document.getElementById("allSkillsGrid");

    const searchInput =
        document.getElementById("skillSearch");

    const search =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    let skills =
        getAllSkills();


    /* Category */

    if (currentCategory !== "All") {

        skills =
            skills.filter(function (item) {

                return item.category === currentCategory;

            });

    }


    /* Search */

    if (search) {

        skills =
            skills.filter(function (item) {

                return (

                    item.skill
                        .toLowerCase()
                        .includes(search)

                    ||

                    item.person
                        .toLowerCase()
                        .includes(search)

                    ||

                    item.description
                        .toLowerCase()
                        .includes(search)

                );

            });

    }


    container.innerHTML = "";


    document.getElementById("resultsCount")
        .textContent =
        skills.length +
        (skills.length === 1 ? " skill" : " skills");


    const clearButton =
        document.getElementById("clearSearch");


    if (search) {
        clearButton.classList.add("show");
    } else {
        clearButton.classList.remove("show");
    }


    if (skills.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⌕
                </div>

                <h3>No skills found</h3>

                <p>
                    Try another search or choose a different category.
                </p>

            </div>

        `;

        return;
    }


    skills.forEach(function (item) {

        const card =
            createSkillCard(item);

        container.appendChild(card);

    });

}


/* =========================================================
   CREATE SKILL CARD
========================================================= */

function createSkillCard(item) {

    const card =
        document.createElement("div");

    card.className = "skill-card";


    const isOwnSkill =
        registeredUser &&
        item.ownerEmail &&
        item.ownerEmail.toLowerCase() ===
            registeredUser.email.toLowerCase();


    const connected =
        isConnected(item);


    let buttonText =
        connected
            ? "✓ Connected"
            : "Connect";


    card.innerHTML = `

        <div class="skill-card-top">

            <div class="skill-icon">
                ${item.icon || getSkillIcon(item.skill)}
            </div>

            <span class="level-badge">
                ${escapeHtml(item.level)}
            </span>

        </div>


        <h3>
            ${escapeHtml(item.skill)}
        </h3>


        <div class="skill-owner">
            by ${escapeHtml(item.person)}
        </div>


        <p class="skill-description">
            ${escapeHtml(item.description)}
        </p>


        ${
            isOwnSkill
            ?

            `
            <button
                class="connect-button connected"
                disabled
            >
                Your Skill
            </button>
            `

            :

            `
            <button
                class="connect-button ${connected ? "connected" : ""}"
                onclick="connectUser('${item.id}')"
                ${connected ? "disabled" : ""}
            >
                ${buttonText}
            </button>
            `
        }

    `;


    return card;

}


/* =========================================================
   SKILL ICON
========================================================= */

function getSkillIcon(skillName) {

    const name =
        skillName.toLowerCase();


    if (name.includes("java")) {
        return "☕";
    }

    if (name.includes("python")) {
        return "🐍";
    }

    if (name.includes("design")) {
        return "🎨";
    }

    if (name.includes("web")) {
        return "🌐";
    }

    if (name.includes("machine")) {
        return "ML";
    }

    if (name.includes("data")) {
        return "DS";
    }

    if (name.includes("communication")) {
        return "💬";
    }

    if (name.includes("devops")) {
        return "⚙";
    }

    return "✦";

}


/* =========================================================
   SEARCH
========================================================= */

function searchSkills() {

    renderSkills();

}


/* =========================================================
   CLEAR SEARCH
========================================================= */

function clearSearch() {

    const input =
        document.getElementById("skillSearch");

    input.value = "";

    renderSkills();

    input.focus();

}


/* =========================================================
   FILTER CATEGORY
========================================================= */

function filterCategory(category, button) {

    currentCategory = category;


    document
        .querySelectorAll(".category-button")
        .forEach(function (item) {

            item.classList.remove("active");

        });


    button.classList.add("active");

    renderSkills();

}


/* =========================================================
   CONNECTION CHECK
========================================================= */

function isConnected(skill) {

    if (!registeredUser) {
        return false;
    }


    return connections.some(function (connection) {

        return (

            connection.ownerEmail ===
                registeredUser.email

            &&

            connection.person ===
                skill.person

            &&

            connection.skill ===
                skill.skill

        );

    });

}


/* =========================================================
   CONNECT USER
========================================================= */

function connectUser(skillId) {

    if (!loggedIn || !registeredUser) {
        return;
    }


    const skill =
        getAllSkills().find(function (item) {

            return item.id === skillId;

        });


    if (!skill) {
        return;
    }


    /* Don't connect to own skill */

    if (
        skill.ownerEmail &&
        skill.ownerEmail.toLowerCase() ===
            registeredUser.email.toLowerCase()
    ) {

        return;

    }


    /* Prevent duplicate */

    if (isConnected(skill)) {

        showToast("You are already connected!");

        return;

    }


    const newConnection = {

        id: Date.now(),

        ownerEmail: registeredUser.email,

        person: skill.person,

        skill: skill.skill,

        level: skill.level,

        description: skill.description,

        category: skill.category

    };


    connections.push(newConnection);


    localStorage.setItem(
        "connections",
        JSON.stringify(connections)
    );


    renderSkills();

    updateStatistics();

    renderConnections();


    showToast(
        "Connection added successfully!"
    );

}


/* =========================================================
   ADD SKILL
========================================================= */

function addSkill(event) {

    event.preventDefault();

    if (!loggedIn || !registeredUser) {
        return;
    }


    clearAddSkillErrors();


    const skillName =
        document.getElementById("newSkillName")
            .value
            .trim();

    const category =
        document.getElementById("newSkillCategory")
            .value;

    const level =
        document.getElementById("newSkillLevel")
            .value;

    const description =
        document.getElementById("newSkillDescription")
            .value
            .trim();


    let valid = true;


    if (!skillName) {

        setError(
            "newSkillNameError",
            "Please enter a skill name."
        );

        valid = false;

    }


    if (!category) {

        setError(
            "newSkillCategoryError",
            "Please select a category."
        );

        valid = false;

    }


    if (!level) {

        setError(
            "newSkillLevelError",
            "Please select your proficiency level."
        );

        valid = false;

    }


    if (description.length < 5) {

        setError(
            "newSkillDescriptionError",
            "Please add a short description."
        );

        valid = false;

    }


    if (!valid) {
        return;
    }


    const newSkill = {

        id:
            "skill-" +
            Date.now(),

        skill:
            skillName,

        person:
            registeredUser.username,

        level:
            level,

        description:
            description,

        category:
            category,

        icon:
            getSkillIcon(skillName),

        ownerEmail:
            registeredUser.email

    };


    savedSkills.push(newSkill);


    localStorage.setItem(
        "skills",
        JSON.stringify(savedSkills)
    );


    /*
       Clear form
    */

    document.getElementById("newSkillName").value = "";

    document.getElementById("newSkillCategory").value = "";

    document.getElementById("newSkillLevel").value = "";

    document.getElementById("newSkillDescription").value = "";


    updateStatistics();

    renderMySkills();


    showToast(
        "Skill shared successfully!"
    );


    /*
       Keep user on Add Skill page.
       The skill is now available in Skill Exchange.
    */

}


/* =========================================================
   CLEAR ADD SKILL ERRORS
========================================================= */

function clearAddSkillErrors() {

    setError(
        "newSkillNameError",
        ""
    );

    setError(
        "newSkillCategoryError",
        ""
    );

    setError(
        "newSkillLevelError",
        ""
    );

    setError(
        "newSkillDescriptionError",
        ""
    );

}


/* =========================================================
   MY SKILLS
========================================================= */

function renderMySkills() {

    const container =
        document.getElementById("mySkillsList");

    if (!registeredUser) {
        return;
    }


    const mySkills =
        savedSkills.filter(function (skill) {

            return (

                skill.ownerEmail &&
                skill.ownerEmail.toLowerCase() ===
                    registeredUser.email.toLowerCase()

            );

        });


    container.innerHTML = "";


    if (mySkills.length === 0) {

        container.innerHTML = `

            <div class="profile-empty">

                <div class="profile-empty-icon">
                    ✦
                </div>

                <p>
                    You haven't shared any skills yet.
                </p>

                <button
                    class="small-primary-button"
                    onclick="showAddSkill()"
                >
                    Add Your First Skill
                </button>

            </div>

        `;

        return;
    }


    mySkills.forEach(function (skill) {

        const item =
            document.createElement("div");

        item.className =
            "my-skill-item";


        item.innerHTML = `

            <div class="my-skill-info">

                <h3>
                    ${escapeHtml(skill.skill)}
                </h3>

                <p>
                    ${escapeHtml(skill.description)}
                </p>

            </div>


            <div class="my-skill-meta">

                <span>
                    ${escapeHtml(skill.level)}
                </span>

                <div class="skill-actions">

                    <button
                        onclick="editSkill('${skill.id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteSkill('${skill.id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        container.appendChild(item);

    });

}


/* =========================================================
   EDIT SKILL
========================================================= */

function editSkill(skillId) {

    const skill =
        savedSkills.find(function (item) {

            return item.id === skillId;

        });


    if (!skill) {
        return;
    }


    const newName =
        prompt(
            "Enter the new skill name:",
            skill.skill
        );


    if (newName === null) {
        return;
    }


    const cleanName =
        newName.trim();


    if (!cleanName) {

        showToast(
            "Skill name cannot be empty."
        );

        return;
    }


    skill.skill =
        cleanName;


    skill.icon =
        getSkillIcon(cleanName);


    localStorage.setItem(
        "skills",
        JSON.stringify(savedSkills)
    );


    renderMySkills();

    renderSkills();

    renderFeaturedSkills();

    showToast("Skill updated successfully!");

}


/* =========================================================
   DELETE SKILL
========================================================= */

function deleteSkill(skillId) {

    const index =
        savedSkills.findIndex(function (skill) {

            return skill.id === skillId;

        });


    if (index === -1) {
        return;
    }


    savedSkills.splice(index, 1);


    localStorage.setItem(
        "skills",
        JSON.stringify(savedSkills)
    );


    renderMySkills();

    renderSkills();

    renderFeaturedSkills();

    updateStatistics();


    showToast(
        "Skill deleted successfully!"
    );

}


/* =========================================================
   RENDER CONNECTIONS
========================================================= */

function renderConnections() {

    const container =
        document.getElementById("connectionsList");

    const badge =
        document.getElementById("connectionCountBadge");


    if (!registeredUser) {
        return;
    }


    const myConnections =
        connections.filter(function (connection) {

            return (

                connection.ownerEmail &&
                connection.ownerEmail.toLowerCase() ===
                    registeredUser.email.toLowerCase()

            );

        });


    badge.textContent =
        myConnections.length;


    container.innerHTML = "";


    if (myConnections.length === 0) {

        container.innerHTML = `

            <div class="profile-empty">

                <div class="profile-empty-icon">
                    🤝
                </div>

                <p>
                    You don't have any connections yet.
                    Explore Skill Exchange and connect with learners!
                </p>

                <button
                    class="small-primary-button"
                    onclick="showSkillExchange()"
                >
                    Explore Skills
                </button>

            </div>

        `;

        return;
    }


    myConnections.forEach(function (connection) {

        const item =
            document.createElement("div");

        item.className =
            "connection-item";


        item.innerHTML = `

            <div class="connection-avatar">
                ${escapeHtml(
                    connection.person
                        .charAt(0)
                        .toUpperCase()
                )}
            </div>


            <div>

                <strong>
                    ${escapeHtml(connection.person)}
                </strong>

                <span>
                    ${escapeHtml(connection.skill)}
                    •
                    ${escapeHtml(connection.level)}
                </span>

            </div>

        `;


        container.appendChild(item);

    });

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const allSkills =
        getAllSkills();


    /*
       Available skills
    */

    document.getElementById(
        "availableSkillsStat"
    ).textContent =
        allSkills.length;


    /*
       Skills shared = user-added skills
       + demo base skills
    */

    document.getElementById(
        "skillsSharedStat"
    ).textContent =
        allSkills.length;


    /*
       Active learners
       Count unique skill owners.
    */

    const people =
        new Set(
            allSkills.map(function (skill) {

                return skill.person;

            })
        );


    /*
       Include current user.
    */

    if (registeredUser) {
        people.add(registeredUser.username);
    }


    document.getElementById(
        "activeLearnersStat"
    ).textContent =
        people.size;


    /*
       My connections
    */

    let myConnectionCount = 0;


    if (registeredUser) {

        myConnectionCount =
            connections.filter(function (connection) {

                return (

                    connection.ownerEmail &&
                    connection.ownerEmail.toLowerCase() ===
                        registeredUser.email.toLowerCase()

                );

            }).length;

    }


    document.getElementById(
        "connectionsStat"
    ).textContent =
        myConnectionCount;

}


/* =========================================================
   DARK MODE
========================================================= */

function toggleTheme() {

    document
        .body
        .classList
        .toggle("dark-mode");


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );


    updateThemeIcon();

}


/* =========================================================
   APPLY SAVED THEME
========================================================= */

function applySavedTheme() {

    const theme =
        localStorage.getItem("theme");


    if (theme === "dark") {

        document
            .body
            .classList
            .add("dark-mode");

    } else {

        document
            .body
            .classList
            .remove("dark-mode");

    }


    updateThemeIcon();

}


/* =========================================================
   THEME ICON
========================================================= */

function updateThemeIcon() {

    const icon =
        document.getElementById("themeIcon");


    if (!icon) {
        return;
    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    icon.textContent =
        isDark ? "☀️" : "🌙";

}


/* =========================================================
   PROFILE DROPDOWN
========================================================= */

function toggleProfileDropdown() {

    const dropdown =
        document.getElementById(
            "profileDropdown"
        );


    dropdown.classList.toggle("show");

}


function closeProfileDropdown() {

    const dropdown =
        document.getElementById(
            "profileDropdown"
        );


    dropdown.classList.remove("show");

}


/* =========================================================
   OUTSIDE CLICK
========================================================= */

function setupOutsideClick() {

    document.addEventListener(
        "click",
        function (event) {

            const wrapper =
                document.querySelector(
                    ".profile-menu-wrapper"
                );

            const dropdown =
                document.getElementById(
                    "profileDropdown"
                );


            if (
                wrapper &&
                dropdown &&
                !wrapper.contains(event.target)
            ) {

                dropdown.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    const nav =
        document.getElementById("navLinks");

    nav.classList.toggle(
        "mobile-open"
    );

}


function closeMobileMenu() {

    const nav =
        document.getElementById("navLinks");

    nav.classList.remove(
        "mobile-open"
    );

}


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

function showToast(message) {

    const container =
        document.getElementById(
            "toastContainer"
        );


    const toast =
        document.createElement("div");


    toast.className =
        "toast";


    toast.innerHTML = `

        <div class="toast-icon">
            ✓
        </div>

        <span>
            ${escapeHtml(message)}
        </span>

    `;


    container.appendChild(toast);


    setTimeout(function () {

        toast.classList.add("removing");


        setTimeout(function () {

            toast.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    if (value === undefined || value === null) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}