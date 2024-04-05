document.addEventListener('DOMContentLoaded', function () {



    
    
        const messages = document.querySelectorAll('.message');
    let delay = 0;

    messages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, delay);
        delay += 500; // Delay in milliseconds
    });
    // Initial setup for accordion
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.style.maxHeight = 0; // Ensure all accordion content areas are closed initially
    });

    // Accordion toggle functionality
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const accordionContent = button.nextElementSibling;

            // Close any open accordion item before toggling
            document.querySelectorAll('.accordion-button').forEach(innerButton => {
                if (innerButton !== button) {
                    innerButton.classList.remove('accordion-button-active');
                    innerButton.nextElementSibling.style.maxHeight = 0;
                }
            });

            // Toggle the clicked accordion item
            button.classList.toggle('accordion-button-active');
            if (button.classList.contains('accordion-button-active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }
        });
    });
    // Page Fade-in effect for body elements
    const bodyElements = document.querySelectorAll('main, .site-footer');

    bodyElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 1s';
        setTimeout(() => el.style.opacity = 1, 10); // Start transition after a short delay
    });
    // Grab the modal and the button that closes the modal
    var modal = document.getElementById("aboutBigDataModal");
    var closeButton = document.getElementsByClassName("close-button")[0];

    // Functions to show and hide the modal
    function showModal() {
        modal.style.display = "block";
    }

    function hideModal() {
        modal.style.display = "none";
    }
    

    document.getElementById('left-icon').addEventListener('click', function () {
        window.location.href = 'index.html'; // Redirects to the main page
    });

    // When the modal source is clicked, show the modal
    document.getElementById('modal-source').addEventListener('click', function (event) {
        event.preventDefault(); // Stop the anchor tag from following the link
        showModal();
    });

    // When the close button is clicked, hide the modal
    closeButton.addEventListener('click', function () {
        hideModal();
    });

    // If the user clicks outside the modal content, hide the modal
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            hideModal();
        }
    });

    // Carousel controls
    const items = document.querySelectorAll('.tip-item');
    let currentItem = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    // Event listeners for carousel buttons
    document.querySelector('.prev-btn').addEventListener('click', function () {
        currentItem = Math.max(currentItem - 1, 0);
        showItem(currentItem);
    });

    document.querySelector('.next-btn').addEventListener('click', function () {
        currentItem = Math.min(currentItem + 1, items.length - 1);
        showItem(currentItem);
    });

    // Initialize the first item to show
    showItem(currentItem);


});
