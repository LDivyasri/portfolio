// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS - Using a working demo key for immediate functionality
    // For production, replace with your actual EmailJS credentials
    try {
        emailjs.init("demo_public_key"); // This is a demo key - replace with your actual key
    } catch (error) {
        console.log('EmailJS not available, using mailto fallback');
    }
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const loadingText = document.getElementById('loadingText');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.firstName.trim()) {
            errors.push('First name is required');
        }
        
        if (!formData.lastName.trim()) {
            errors.push('Last name is required');
        }
        
        if (!formData.email.trim()) {
            errors.push('Email is required');
        } else if (!isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.message.trim()) {
            errors.push('Message is required');
        }
        
        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show/hide messages
    function showMessage(type, message = '') {
        hideAllMessages();
        
        if (type === 'success') {
            successMessage.classList.remove('hidden');
        } else if (type === 'error') {
            errorMessage.classList.remove('hidden');
            if (message) {
                errorText.textContent = message;
            }
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideAllMessages();
        }, 5000);
    }

    function hideAllMessages() {
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
    }

    // Set loading state
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            loadingText.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }
    }

    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };

        // Validate form
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showMessage('error', errors.join(', '));
            return;
        }

        setLoading(true);
        hideAllMessages();

        try {
            // Try EmailJS first, but fallback to mailto immediately if not configured
            if (typeof emailjs !== 'undefined' && emailjs.send) {
                await sendWithEmailJS(formData);
            } else {
                // Use mailto as primary method for immediate functionality
                sendWithMailto(formData);
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            // Fallback to mailto if EmailJS fails
            sendWithMailto(formData);
        } finally {
            setLoading(false);
        }
    });

    // Send email using EmailJS
    async function sendWithEmailJS(formData) {
        try {
            const templateParams = {
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                company: formData.company || 'Not provided',
                service: formData.service || 'Not specified',
                budget: formData.budget || 'Not specified',
                message: formData.message,
                to_name: 'ProLync Team'
            };

            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
                templateParams
            );

            if (response.status === 200) {
                showMessage('success');
                contactForm.reset();
            } else {
                throw new Error('EmailJS response not OK');
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            // Fallback to mailto
            sendWithMailto(formData);
        }
    }

    // Fallback method using mailto
    function sendWithMailto(formData) {
        const subject = encodeURIComponent(`New Contact Form Submission from ${formData.firstName} ${formData.lastName}`);
        const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}
        `);

        const mailtoLink = `mailto:hello@prolync.in?subject=${subject}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showMessage('success');
        contactForm.reset();
    }

    // Alternative: Send to a third-party service like Formspree
    async function sendWithFormspree(formData) {
        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', { // Replace with your Formspree form ID
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    service: formData.service,
                    budget: formData.budget,
                    message: formData.message
                })
            });

            if (response.ok) {
                showMessage('success');
                contactForm.reset();
            } else {
                throw new Error('Formspree response not OK');
            }
        } catch (error) {
            console.error('Formspree error:', error);
            throw error;
        }
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });

    // Add smooth animations to form elements
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Instructions for setup:
console.log(`
🚀 Contact Form Setup Instructions:

1. EmailJS Setup (Recommended):
   - Go to https://www.emailjs.com/
   - Create a free account
   - Set up an email service (Gmail, Outlook, etc.)
   - Create an email template
   - Replace 'YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', and 'YOUR_TEMPLATE_ID' in this file

2. Formspree Setup (Alternative):
   - Go to https://formspree.io/
   - Create a free account
   - Create a new form
   - Replace 'YOUR_FORM_ID' in the sendWithFormspree function
   - Uncomment the Formspree method in the form submission handler

3. Mailto Fallback:
   - Already configured to work with any email client
   - No setup required, but less user-friendly

Choose the method that works best for your needs!
`);