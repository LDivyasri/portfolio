// Script to add LinkedIn link to footer
document.addEventListener('DOMContentLoaded', function() {
    function addLinkedInLink() {
        console.log('Adding LinkedIn link to footer...');
        
        // Find the footer element
        const footer = document.querySelector('footer');
        if (!footer) {
            console.log('Footer not found');
            return;
        }
        
        // Check if LinkedIn link already exists
        const existingLinkedIn = footer.querySelector('a[href*="linkedin"]');
        if (existingLinkedIn) {
            console.log('LinkedIn link already exists, updating URL');
            existingLinkedIn.href = 'https://www.linkedin.com/company/prolync/posts/?feedView=all';
            existingLinkedIn.target = '_blank';
            existingLinkedIn.rel = 'noopener noreferrer';
            return;
        }
        
        // Create LinkedIn icon SVG
        const linkedInIcon = `
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
            </svg>
        `;
        
        // Create LinkedIn link element
        const linkedInLink = document.createElement('a');
        linkedInLink.href = 'https://www.linkedin.com/company/prolync/posts/?feedView=all';
        linkedInLink.target = '_blank';
        linkedInLink.rel = 'noopener noreferrer';
        linkedInLink.className = 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors';
        linkedInLink.innerHTML = `
            <span class="sr-only">LinkedIn</span>
            ${linkedInIcon}
        `;
        
        // Find the best place to insert the LinkedIn link
        // Look for existing social links container
        let socialContainer = footer.querySelector('.flex.gap-4, .flex.space-x-4, .flex.items-center');
        
        if (!socialContainer) {
            // Create a new social container
            socialContainer = document.createElement('div');
            socialContainer.className = 'flex items-center justify-center gap-4 mt-4';
            
            // Find copyright text and insert before it
            const copyrightText = footer.querySelector('p');
            if (copyrightText) {
                footer.insertBefore(socialContainer, copyrightText);
            } else {
                footer.appendChild(socialContainer);
            }
        }
        
        // Add LinkedIn link to the container
        socialContainer.appendChild(linkedInLink);
        
        console.log('LinkedIn link added successfully');
    }
    
    // Run immediately
    addLinkedInLink();
    
    // Also run after delays to catch dynamically loaded content
    setTimeout(addLinkedInLink, 500);
    setTimeout(addLinkedInLink, 1000);
    setTimeout(addLinkedInLink, 2000);
    
    // Set up a mutation observer to add LinkedIn link when footer is updated
    const observer = new MutationObserver(function(mutations) {
        let shouldAdd = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if footer was updated
                const hasFooterUpdate = Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && (node.tagName === 'FOOTER' || node.querySelector('footer'))
                );
                if (hasFooterUpdate) {
                    shouldAdd = true;
                }
            }
        });
        if (shouldAdd) {
            setTimeout(addLinkedInLink, 100);
        }
    });
    
    // Start observing the entire document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});