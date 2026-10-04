window.submitted = false;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('creator-form');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }

        // Form is valid, let it submit to hidden iframe
        window.submitted = true;
        
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span>Submitting...</span>';
    });

    function validateForm() {
        let isValid = true;
        
        // Reset all error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
            const errorMsg = group.querySelector('.error-msg');
            if (errorMsg) errorMsg.textContent = '';
        });

        // Validate text/email/tel inputs
        const requiredInputs = form.querySelectorAll('input[required]:not([type="radio"]), textarea[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input.id, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input.id, 'Please enter a valid email address');
                isValid = false;
            } else if (input.type === 'tel' && input.value.trim().length < 8) {
                showError(input.id, 'Please enter a valid phone number');
                isValid = false;
            }
        });

        // Validate radio groups
        const radioGroups = ['entry.827313799', 'entry.515218526', 'entry.817545408', 'entry.831166553'];
        radioGroups.forEach(name => {
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                const container = form.querySelector(`input[name="${name}"]`).closest('.form-group');
                container.classList.add('has-error');
                const errorMsg = container.querySelector('.error-msg');
                if (errorMsg) errorMsg.textContent = 'Please select an option';
                isValid = false;
            }
        });

        // URL validation (optional but validate if entered)
        const urlInputs = form.querySelectorAll('input[type="url"]');
        urlInputs.forEach(input => {
            if (input.value.trim() && !validateUrl(input.value)) {
                showError(input.id, 'Please enter a valid URL (e.g. https://...)');
                isValid = false;
            }
        });

        if (!isValid) {
            const firstError = document.querySelector('.has-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return isValid;
    }

    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const group = input.closest('.form-group');
        group.classList.add('has-error');
        const errorMsg = group.querySelector('.error-msg');
        if (errorMsg) errorMsg.textContent = message;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function validateUrl(url) {
        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    }
});

// Called by the hidden iframe onload event after form submission
function showSuccess() {
    const formCard = document.getElementById('form-card');
    const successCard = document.getElementById('success-card');
    
    formCard.classList.add('hidden');
    successCard.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    const form = document.getElementById('creator-form');
    const formCard = document.getElementById('form-card');
    const successCard = document.getElementById('success-card');
    const submitBtn = document.getElementById('submit-btn');

    form.reset();
    window.submitted = false;
    
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = '<span>Join the ROFIO Network</span>';
    
    successCard.classList.add('hidden');
    formCard.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
