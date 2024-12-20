let currentStep = 1;
const steps = document.querySelectorAll('.step');
const progressBarFill = document.getElementById('progress-fill');

// Validation functions
const validators = {
    'full-name': (value) => {
        const words = value.trim().split(/\s+/);
        return words.length >= 2 && words.every(word => word.length >= 1);
    },
    'email': (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    'phone': (value) => {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(value);
    },
    'password': (value) => {
        return true
    },
    'confirm-password': (value) => {
        return true
    }
};

// Enhanced error message handling
function toggleError(inputId, show) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);

    if (show) {
        // Show error state
        errorElement.classList.remove('hidden');
        inputElement.classList.add('input-error');
        inputElement.classList.remove('input-success');
    } else {
        // Show success state
        errorElement.classList.add('hidden');
        inputElement.classList.remove('input-error');
        inputElement.classList.add('input-success');
    }
}

// Real-time validation with debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Validate input with debounced error handling
const validateInput = debounce((input) => {
    const validator = validators[input.id];
    if (validator) {
        const isValid = validator(input.value);
        toggleError(input.id, !isValid);
    }
}, 300); // 300ms debounce delay

// Add input listeners
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
    });

    // Clear error on focus
    input.addEventListener('focus', () => {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.classList.add('hidden');
    });

    // Validate on blur
    input.addEventListener('blur', () => {
        const validator = validators[input.id];
        if (validator) {
            const isValid = validator(input.value);
            toggleError(input.id, !isValid);
        }
    });
});

// Enhanced step validation
function validateStep(step) {
    const input = steps[step - 1].querySelector('input');
    const inputId = input.id;
    const validator = validators[inputId];

    const isValid = validator(input.value);
    toggleError(inputId, !isValid);
    return isValid;
}

// Enhanced next step handling
function nextStep(step) {
    if (!validateStep(step)) {
        return;
    }

    // Clear error message from current step
    const currentInput = steps[step - 1].querySelector('input');
    const errorElement = document.getElementById(`${currentInput.id}-error`);
    errorElement.classList.add('hidden');

    // Proceed to next step
    steps[step - 1].classList.remove('active');
    steps[step - 1].classList.add('inactive');

    steps[step].classList.remove('inactive');
    steps[step].classList.add('active');

    progressBarFill.style.width = `${((step + 1) / steps.length) * 100}%`;

    focusOnStepInput(step);
}

// Previous event listeners remain the same
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (currentStep < steps.length) {
            if (validateStep(currentStep)) {
                nextStep(currentStep);
                currentStep++;
            }
        }
    }
});

// Enhanced form submission
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    let firstInvalidStep = null;

    // Validate all fields
    for (let i = 0; i < steps.length; i++) {
        const input = steps[i].querySelector('input');
        const validator = validators[input.id];
        if (!validator(input.value)) {
            isValid = false;
            if (!firstInvalidStep) {
                firstInvalidStep = i;
            }
            toggleError(input.id, true);
        } else {
            toggleError(input.id, false);
        }
    }

    if (isValid) {
        alert('Signup successful!');
        // Here you would typically send the data to your server
    } else {
        // Show the first invalid step
        for (let i = 0; i < steps.length; i++) {
            if (i === firstInvalidStep) {
                steps[i].classList.add('active');
                steps[i].classList.remove('inactive');
                focusOnStepInput(i);
            } else {
                steps[i].classList.remove('active');
                steps[i].classList.add('inactive');
            }
        }
        progressBarFill.style.width = `${((firstInvalidStep + 1) / steps.length) * 100}%`;
    }
});

// Focus handling
const focusOnStepInput = (step) => {
    const input = steps[step].querySelector('input');
    input.focus();
};

// Initialize
window.onload = () => {
    focusOnStepInput(0);
};

document.querySelector('.google-btn').addEventListener('mouseover', function () {
    this.querySelector('.google-icon').style.transition = 'filter 0.3s ease-in-out';
});

document.addEventListener('DOMContentLoaded', function () {
    // Create hacker display container
    const hackerDisplay = document.createElement('div');
    hackerDisplay.className = 'hacker-display';
    document.body.appendChild(hackerDisplay);

    // Initialize fields
    const fields = {
        'full-name': {
            label: 'IDENTITY',
            class: 'field-value'
        },
        'email': {
            label: 'CONTACT_PROTOCOL',
            class: 'email-value'
        },
        'phone': {  // Added phone field
            label: 'CONTACT_NUMBER',
            class: 'phone-value'
        },
        'password': {
            label: 'ENCRYPTION_KEY',
            class: 'password-value'
        },

    };

    // Create field displays
    Object.keys(fields).forEach(fieldId => {
        const fieldContainer = document.createElement('div');
        fieldContainer.className = 'hacker-field';

        const fieldLabel = document.createElement('div');
        fieldLabel.className = 'field-name';
        fieldLabel.textContent = `[${fields[fieldId].label}]`;

        const fieldValue = document.createElement('div');
        fieldValue.className = fields[fieldId].class;
        fieldValue.id = `hacker-${fieldId}`;

        fieldContainer.appendChild(fieldLabel);
        fieldContainer.appendChild(fieldValue);
        hackerDisplay.appendChild(fieldContainer);
    });

    // Glitch characters pool
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    // Handle input events
    Object.keys(fields).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const display = document.getElementById(`hacker-${fieldId}`);
        let animationFrame;

        input.addEventListener('input', (e) => {
            const value = e.target.value;
            cancelAnimationFrame(animationFrame);
            display.innerHTML = '';

            // Special handling for password
            const displayText = fieldId === 'password' ?
                '*'.repeat(value.length) :
                value;

            // Animate characters
            [...displayText].forEach((char, index) => {
                const span = document.createElement('span');
                span.className = 'character';
                span.textContent = char;
                span.style.animationDelay = `${index * 50}ms`;
                display.appendChild(span);
            });

            // Add glitch effect
            const addGlitch = () => {
                if (value.length > 0) {
                    const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    const lastChar = display.lastChild;
                    if (lastChar) {
                        lastChar.textContent = glitchChar;
                        setTimeout(() => {
                            lastChar.textContent = displayText[displayText.length - 1] || '*';
                        }, 50);
                    }
                }
                animationFrame = requestAnimationFrame(addGlitch);
            };

            if (value.length > 0) {
                addGlitch();
                display.classList.add('glitch');
            }

            // Stop glitch effect after typing
            setTimeout(() => {
                cancelAnimationFrame(animationFrame);
                display.classList.remove('glitch');
            }, 1000);
        });
    });

    // Add scanning line effect
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    hackerDisplay.appendChild(scanLine);
});
