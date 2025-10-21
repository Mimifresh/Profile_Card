const contactForm = document.querySelector('[data-testid="test-contact-form"]');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const timeStamp = document.querySelector('[data-testid="test-user-time"]');
const emailError = document.getElementById('email-error');
const nameErrorId = document.getElementById('name-error');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const subjectError = document.getElementById('subject-error');
const messageError = document.getElementById('message-error');

function timeUpdate(){
    if (!timeStamp) return
    timeStamp.textContent = Date.now()
}

if (timeStamp){
    timeUpdate()
    setInterval(timeUpdate, 1000)
}

  function showError(inputEl, errorEl, message) {
        if (!inputEl) return;
        if (!errorEl) errorEl = findErrorEl(inputEl);
        inputEl.classList.add('invalid');
        inputEl.setAttribute('aria-invalid', 'true');
        if (errorEl) {
            errorEl.textContent = message || 'Invalid value';
        } else {
            console.warn('No error span found for', inputEl);
        }
    }

   function clearError(inputEl, errorEl) {
    if (!inputEl) return;
    inputEl.classList.remove('invalid');
    inputEl.setAttribute('aria-invalid', 'false');
    if (errorEl) errorEl.textContent = '';
    }

    if(contactForm){
    contactForm.addEventListener('submit', function(event){
        event.preventDefault();
        const fields = [
                {element: nameInput, err: nameErrorId, msg: 'Enter your name (min 3 chars).'},
                {element: emailInput, err: emailError, msg: 'Enter a valid email e.g yourname@mail.com.'},
                {element: subjectInput, err: subjectError, msg: 'Add a subject.'},
                {element: messageInput, err: messageError, msg: 'Write a message.'}
            ];

            let allValid = true;
            fields.forEach(({element, err, msg}) => {
                if (!element) return;
                if(typeof element.checkValidity !== 'function') return;
                if (!element.checkValidity()) {
                    allValid = false;
                    showError(element, err, msg);
                } else {
                    clearError(element, err);
                }
            });

            if (!allValid) {
                const firstInvalid = contactForm.querySelector('.invalid');
                firstInvalid?.focus();
                return;
            }
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        contactForm.reset();
    });
        contactForm.querySelectorAll('input, textarea').forEach(element => {
            const errEl = document.getElementById((element.id || element.name) + '-error');
            element.addEventListener('input', () => clearError(element, errEl));
        });
}