const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm_password");
const submitButton = document.querySelector(".submit-btn");
const isProperLength = document.querySelector(".is-eight-chars-long");
const includesUpperCaseLetter = document.querySelector(".includes-one-uppercase-letter");
const includesLowerCaseLetter = document.querySelector(".includes-one-lowercase-letter");
const includesNumber = document.querySelector(".includes-one-number");
const includesSpecialChar = document.querySelector(".includes-one-special-char");


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
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        showPasswordError("Passwords must match!");
    } else {
        clearPasswordError();
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
    checkIfPasswordsMatch();
});

confirmPasswordInput.addEventListener("input", checkIfPasswordsMatch);