// Script to add contact functionality to the main site
document.addEventListener('DOMContentLoaded', function() {
    function addContactFunctionality() {
        console.log('Adding contact functionality to main site...');
        
        // Add Contact link to navigation
        addContactNavigation();
        
        // Add Contact section to main page
        addContactSection();
        
        // Add floating contact button
        addFloatingContactButton();
    }
    
    function addContactNavigation() {
        // Find the header navigation
        const nav = document.querySelector('header nav, header .flex');
        if (nav) {
            // Check if contact link already exists
            const existingContact = nav.querySelector('a[href*="contact"]');
            if (!existingContact) {
                // Create contact link
                const contactLink = document.createElement('a');
                contactLink.href = 'contact.html';
                contactLink.className = 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors';
                contactLink.textContent = 'Contact';
                
                // Add to navigation
                nav.appendChild(contactLink);
                console.log('Contact navigation link added');
            }
        }
    }
    
    function addContactSection() {
        // Find the main content area
        const main = document.querySelector('main');
        if (!main) return;
        
        // Check if contact section already exists
        const existingContact = document.getElementById('contact-section');
        if (existingContact) return;
        
        // Create contact section
        const contactSection = document.createElement('section');
        contactSection.id = 'contact-section';
        contactSection.className = 'py-20 px-4 sm:px-6 lg:px-8';
        contactSection.innerHTML = `
            <div class="max-w-7xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold gradient-text mb-6">
                    Ready to Start Your Project?
                </h2>
                <p class="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
                    Let's discuss your ideas and bring your digital vision to life. Get in touch with our team today.
                </p>
                
                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <!-- Email Contact -->
                    <div class="glass-card-enhanced p-6 rounded-xl text-center">
                        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Email Us</h3>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">Send us a message anytime</p>
                        <a href="mailto:hello@prolync.in" class="btn-rainbow text-white px-6 py-2 rounded-lg inline-block transition-all duration-300 hover:shadow-lg">
                            hello@prolync.in
                        </a>
                    </div>
                    
                    <!-- Phone Contact -->
                    <div class="glass-card-enhanced p-6 rounded-xl text-center">
                        <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Call Us</h3>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">Speak with our team</p>
                        <a href="tel:+1234567890" class="btn-rainbow text-white px-6 py-2 rounded-lg inline-block transition-all duration-300 hover:shadow-lg">
                            +1 (234) 567-890
                        </a>
                    </div>
                    
                    <!-- Contact Form -->
                    <div class="glass-card-enhanced p-6 rounded-xl text-center">
                        <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Contact Form</h3>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">Fill out our detailed form</p>
                        <a href="contact.html" class="btn-rainbow text-white px-6 py-2 rounded-lg inline-block transition-all duration-300 hover:shadow-lg">
                            Get Started
                        </a>
                    </div>
                </div>
                
                <!-- Quick Contact Form -->
                <div class="glass-card-enhanced p-8 rounded-2xl max-w-2xl mx-auto">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Quick Contact</h3>
                    <form id="quickContactForm" class="space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                id="quickName" 
                                name="name" 
                                placeholder="Your Name *" 
                                required
                                class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                            <input 
                                type="email" 
                                id="quickEmail" 
                                name="email" 
                                placeholder="Your Email *" 
                                required
                                class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                        </div>
                        <textarea 
                            id="quickMessage" 
                            name="message" 
                            rows="4" 
                            placeholder="Tell us about your project *" 
                            required
                            class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-vertical"
                        ></textarea>
                        <button 
                            type="submit" 
                            class="w-full btn-rainbow text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                        >
                            Send Quick Message
                        </button>
                    </form>
                    
                    <!-- Quick form messages -->
                    <div id="quickSuccessMessage" class="hidden mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Thank you! Your message has been sent successfully.
                        </div>
                    </div>
                    
                    <div id="quickErrorMessage" class="hidden mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                            </svg>
                            <span id="quickErrorText">Something went wrong. Please try again.</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to main content
        main.appendChild(contactSection);
        
        // Add quick form functionality
        addQuickFormFunctionality();
        
        console.log('Contact section added to main page');
    }
    
    function addFloatingContactButton() {
        // Check if floating button already exists
        const existingButton = document.getElementById('floating-contact-btn');
        if (existingButton) return;
        
        // Create floating contact button
        const floatingBtn = document.createElement('div');
        floatingBtn.id = 'floating-contact-btn';
        floatingBtn.className = 'fixed bottom-6 right-6 z-50';
        floatingBtn.innerHTML = `
            <a href="contact.html" class="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Contact Us</span>
            </a>
        `;
        
        document.body.appendChild(floatingBtn);
        console.log('Floating contact button added');
    }
    
    function addQuickFormFunctionality() {
        const quickForm = document.getElementById('quickContactForm');
        if (!quickForm) return;
        
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('quickName').value,
                email: document.getElementById('quickEmail').value,
                message: document.getElementById('quickMessage').value
            };
            
            // Validate
            if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                showQuickMessage('error', 'Please fill in all required fields.');
                return;
            }
            
            // Send via mailto (simple fallback)
            const subject = encodeURIComponent(`Quick Contact from ${formData.name}`);
            const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
            `);
            
            const mailtoLink = `mailto:hello@prolync.in?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            
            // Show success message
            showQuickMessage('success');
            quickForm.reset();
        });
    }
    
    function showQuickMessage(type, message = '') {
        const successMsg = document.getElementById('quickSuccessMessage');
        const errorMsg = document.getElementById('quickErrorMessage');
        const errorText = document.getElementById('quickErrorText');
        
        // Hide all messages first
        successMsg.classList.add('hidden');
        errorMsg.classList.add('hidden');
        
        if (type === 'success') {
            successMsg.classList.remove('hidden');
        } else if (type === 'error') {
            errorMsg.classList.remove('hidden');
            if (message) {
                errorText.textContent = message;
            }
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMsg.classList.add('hidden');
            errorMsg.classList.add('hidden');
        }, 5000);
    }
    
    // Run immediately
    addContactFunctionality();
    
    // Also run after delays to catch dynamically loaded content
    setTimeout(addContactFunctionality, 500);
    setTimeout(addContactFunctionality, 1000);
    
    // Set up a mutation observer
    const observer = new MutationObserver(function(mutations) {
        let shouldAdd = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldAdd = true;
            }
        });
        if (shouldAdd) {
            setTimeout(addContactFunctionality, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});