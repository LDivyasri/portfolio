// Script to remove social media links from footer
document.addEventListener('DOMContentLoaded', function() {
    // Function to remove social media links
    function removeSocialLinks() {
        console.log('Removing social media links...');
        
        // Remove only GitHub and Twitter links by href patterns
        const socialLinks = document.querySelectorAll('footer a[href*="github"], footer a[href*="twitter"]');
        console.log('Found GitHub/Twitter links by href:', socialLinks.length);
        socialLinks.forEach(link => {
            console.log('Removing link:', link.href);
            link.remove();
        });
        
        // Remove links by sr-only text content
        const allFooterLinks = document.querySelectorAll('footer a');
        console.log('Total footer links:', allFooterLinks.length);
        allFooterLinks.forEach(link => {
            const srOnlySpan = link.querySelector('span.sr-only');
            if (srOnlySpan) {
                const text = srOnlySpan.textContent.toLowerCase();
                console.log('Checking sr-only text:', text);
                if (text.includes('github') || text.includes('twitter')) {
                    console.log('Removing social link with sr-only:', text);
                    link.remove();
                }
            }
        });
        
        // Remove any remaining social icon links (those with href="#")
        const hashLinks = document.querySelectorAll('footer a[href="#"]');
        console.log('Hash links found:', hashLinks.length);
        hashLinks.forEach(link => {
            // Check if it contains social media icons
            const hasIcon = link.querySelector('svg') || link.querySelector('.h-5.w-5') || link.querySelector('[class*="h-5"]');
            if (hasIcon) {
                console.log('Removing hash link with icon');
                link.remove();
            }
        });
        
        // Remove all links that are not copyright, company, LinkedIn, or email related
        const remainingLinks = document.querySelectorAll('footer a');
        remainingLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const text = link.textContent.toLowerCase();
            const srOnlySpan = link.querySelector('span.sr-only');
            const srOnlyText = srOnlySpan ? srOnlySpan.textContent.toLowerCase() : '';
            
            // Keep ProLync, LinkedIn, and email links
            const isKeepableLink = href.includes('prolync') || 
                                 href.includes('linkedin.com/company/prolync') || 
                                 href.includes('linkedin') || 
                                 href.includes('mailto') ||
                                 text.includes('prolync') || 
                                 text.includes('copyright') ||
                                 srOnlyText.includes('linkedin') ||
                                 srOnlyText.includes('email') ||
                                 href === '';
            
            if (!isKeepableLink) {
                console.log('Removing non-allowed link:', href, text);
                link.remove();
            }
        });
        
        // Clean up empty containers
        const emptyContainers = document.querySelectorAll('footer .flex, footer div');
        emptyContainers.forEach(container => {
            if (container.children.length === 0 || (container.textContent.trim() === '' && !container.querySelector('p'))) {
                console.log('Removing empty container');
                container.remove();
            }
        });
    }
    
    // Run immediately
    removeSocialLinks();
    
    // Also run after delays to catch dynamically loaded content
    setTimeout(removeSocialLinks, 100);
    setTimeout(removeSocialLinks, 500);
    setTimeout(removeSocialLinks, 1000);
    setTimeout(removeSocialLinks, 2000);
    
    // Set up a mutation observer to catch any dynamically added social links
    const observer = new MutationObserver(function(mutations) {
        let shouldRemove = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRemove = true;
            }
        });
        if (shouldRemove) {
            setTimeout(removeSocialLinks, 100);
        }
    });
    
    // Start observing the entire document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});