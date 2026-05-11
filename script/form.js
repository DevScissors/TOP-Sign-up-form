const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm_password");
const submitButton = document.querySelector(".submit-btn");
const isProperLength = document.querySelector(".is-eight-chars-long");
const includesUpperCaseLetter = document.querySelector(".includes-one-uppercase-letter");
const includesLowerCaseLetter = document.querySelector(".includes-one-lowercase-letter");
const includesNumber = document.querySelector(".includes-one-number");
const includesSpecialChar = document.querySelector(".includes-one-special-char");
const emailInput = document.querySelector("#email");
submitButton.disabled = true;

function showPasswordError(message) {
    let passErrSpan = confirmPasswordInput.nextElementSibling;

    if (!passErrSpan || passErrSpan.tagName !== "SPAN") {
        passErrSpan = document.createElement("span");
        passErrSpan.className = "password-error";
        confirmPasswordInput.insertAdjacentElement("afterend", passErrSpan);
    }

    passErrSpan.textContent = message;
}

function clearPasswordError() {
    const passErrSpan = confirmPasswordInput.nextElementSibling;
    if (passErrSpan && passErrSpan.classList.contains("password-error")) {
        passErrSpan.remove();
    }
}

function checkIfPasswordsMatch() {
    if (!confirmPasswordInput.value) {
        clearPasswordError();
        submitButton.disabled = true;
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        showPasswordError("Passwords must match!");
    } else {
        clearPasswordError();
        submitButton.disabled = !isFormValid();
    }
}

function updateValidation(id, passed) {
    const element = document.querySelector(`#${id}`);

    if (passed) {
        element.textContent = `✓ ${element.textContent.replace(/^✓|✗/, "").trim()}`;
        element.classList.remove("invalid");
        element.classList.add("valid");
    } else {
        element.textContent = `✗ ${element.textContent.replace(/^✓|✗/, "").trim()}`;
        element.classList.remove("valid");
        element.classList.add("invalid");
    }
}

const passwordRules = {
    hasLowercase: /[a-z]/,
    hasUppercase: /[A-Z]/,
    hasNumber: /\d/,
    hasSpecial: /[@$!%*?&]/,
    hasMinLength: /.{8,}/,
};

function checkEmailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

emailInput.addEventListener("input", () => {
    submitButton.disabled = !isFormValid();
    checkEmailIsValid(emailInput.value);
})

function validatePassword(password) {
    return {
        hasLowercase: passwordRules.hasLowercase.test(password),
        hasUppercase: passwordRules.hasUppercase.test(password),
        hasNumber: passwordRules.hasNumber.test(password),
        hasSpecial: passwordRules.hasSpecial.test(password),
        hasMinLength: passwordRules.hasMinLength.test(password),
    };
}

passwordInput.addEventListener("input", (event) => {
    const results = validatePassword(event.target.value);

    updateValidation("lowercase", results.hasLowercase);
    updateValidation("uppercase", results.hasUppercase);
    updateValidation("number", results.hasNumber);
    updateValidation("special", results.hasSpecial);
    updateValidation("length", results.hasMinLength);

    // Update button state whenever password changes
    submitButton.disabled = !isFormValid();
    checkIfPasswordsMatch();
});

confirmPasswordInput.addEventListener("input", checkIfPasswordsMatch);

function isFormValid() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let passwordsMatch = false;
    if (password === confirmPassword) {
        passwordsMatch = true;
    }

    const email = emailInput.value;
    const emailValid = checkEmailIsValid(email);
    console.log(emailValid);

    const validatePassObj = validatePassword(password);
    const passwordValid = Object.values(validatePassObj).every(req => req);

    let validationPasses = false;
    // Check all requirements are met AND passwords match
    if (passwordsMatch && passwordValid && emailValid) {
        validationPasses = true;
    }

    return passwordValid && validationPasses;
}