document.addEventListener("DOMContentLoaded", () => {
    // Select all images inside the card galleries
    const galleryImages = document.querySelectorAll(".card-gallery img");
    const ctaSection = document.querySelector(".cta-section");

    galleryImages.forEach(image => {
        // Add a pointer cursor so users know it's clickable
        image.style.cursor = "pointer";

        // Add the click event
        image.addEventListener("click", () => {
            // Smoothly scroll to the booking section
            ctaSection.scrollIntoView({ behavior: "smooth" });
            
            // Optional: Add a slight visual pop to the button to draw attention
            const bookBtn = ctaSection.querySelector("button");
            bookBtn.style.transform = "scale(1.1)";
            setTimeout(() => bookBtn.style.transform = "scale(1)", 300);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = document.querySelectorAll(".card-gallery img");

    // Create the lightbox container dynamically
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    // Style the lightbox using JS (so you don't have to touch your CSS file)
    Object.assign(lightbox.style, {
        position: "fixed",
        zIndex: "1000",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
    });

    // Create the image element inside the lightbox
    const lightboxImg = document.createElement("img");
    Object.assign(lightboxImg.style, {
        maxWidth: "80%",
        maxHeight: "80%",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
    });
    lightbox.appendChild(lightboxImg);

    // Loop through images and add click listeners
    galleryImages.forEach(image => {
        image.style.cursor = "pointer";
        
        image.addEventListener("click", () => {
            lightboxImg.src = image.src; // Copy the clicked image source
            lightbox.style.display = "flex"; // Show the modal
        });
    });

    // Close the lightbox when clicking anywhere on it
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Map each banner title to its corresponding image path from your services
    const serviceImages = {
        "Professionals": "images/professionals-service.jpg", 
        "Parents": "images/parents-service.jpg",
        "Elderly Clients": "images/elderly-service.jpg",
        "Small Businesses": "images/business-service.jpg"
    };

    // 2. Grab DOM elements
    const homeCards = document.querySelectorAll('.home-card');
    const modal = document.getElementById('card-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    // 3. Open modal logic
    homeCards.forEach(card => {
        card.addEventListener('click', () => {
            const titleText = card.querySelector('h3').innerText;
            const descText = card.querySelector('p').innerText;
            
            // Set content based on the clicked card
            modalTitle.innerText = titleText;
            modalDesc.innerText = descText;
            
            // Fallback to a placeholder if the image path isn't found in your mapping
            modalImg.src = serviceImages[titleText] || "images/default-service.jpg";
            modalImg.alt = `${titleText} Service Image`;

            // Display modal
            modal.classList.add('active');
        });
    });

    // 4. Close modal logic (clicking the 'X')
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // 5. Close modal logic (clicking outside the modal box)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

/*=============================
      CONTACT FORM
   ===========================*/


(function () {
    // Initialize EmailJS with your Public Key
    emailjs.init("_wuim5ApiLjq4nX5Q");
})();

// Reusable custom Toast trigger function
function showToast(message, isSuccess) {
    const toast = document.getElementById("toastNotification");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    toastMessage.innerText = message;
    toast.className = "toast"; // Reset classes

    if (isSuccess) {
        toast.classList.add("success-toast", "active");
        toastIcon.className = "fas fa-check-circle";
    } else {
        toast.classList.add("error-toast", "active");
        toastIcon.className = "fas fa-exclamation-circle";
    }

    // Auto-dismiss toast notification window after 4 seconds
    setTimeout(() => {
        toast.classList.remove("active");
    }, 4000);
}

// target elements
const contactForm = document.getElementById("contactForm");

// Crucial: Programmatically turn off browser-native validation tooltips via JS
if (contactForm) {
    contactForm.setAttribute("novalidate", true);

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop standard form reload sequence

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");

        let isFormValid = true;

        // Reset display errors and custom styling properties
        [nameInput, emailInput, messageInput].forEach((input) =>
            input.classList.remove("invalid-field")
        );
        [nameError, emailError, messageError].forEach(
            (span) => (span.innerText = "")
        );

        // 1. Evaluate Name Value String
        if (!nameInput.value || nameInput.value.trim() === "") {
            nameInput.classList.add("invalid-field");
            nameError.innerText = "Please enter your name.";
            isFormValid = false;
        }

        // 2. Evaluate Email Structure Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value || emailInput.value.trim() === "") {
            emailInput.classList.add("invalid-field");
            emailError.innerText = "Please enter your email address.";
            isFormValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add("invalid-field");
            emailError.innerText =
                "Please look over your email structure format.";
            isFormValid = false;
        }

        // 3. Evaluate Message Text area
        if (!messageInput.value || messageInput.value.trim() === "") {
            messageInput.classList.add("invalid-field");
            messageError.innerText = "Please fill out a brief message.";
            isFormValid = false;
        }

        // If validation errors exist, halt submission execution completely
        if (!isFormValid) {
            showToast("Please correct the highlighted form errors.", false);
            return;
        }

        // Processing Valid Form Parameters
        const submitBtn = document.querySelector(".submit-btn");
        const originalBtnText = submitBtn.innerText;

        submitBtn.innerText = "Sending Message...";
        submitBtn.disabled = true;

        // Build dynamic template metadata timestamp property logic
        const formattedTime = new Date().toLocaleString();
        const timeInput = document.createElement("input");
        timeInput.type = "hidden";
        timeInput.name = "time";
        timeInput.value = formattedTime;
        this.appendChild(timeInput);

        // Update dashboard configuration values
        const serviceID = "service_pmxr0af";
        const templateID = "template_3veskjq";

        emailjs
            .sendForm(serviceID, templateID, this)
            .then(
                () => {
                    showToast(
                        "Success! ErrandEase received your form request.",
                        true
                    );
                    contactForm.reset();
                },
                (err) => {
                    showToast(
                        "Network error processing transmission. Try again.",
                        false
                    );
                    console.error("EmailJS System Trace Log:", err);
                }
            )
            .finally(() => {
                timeInput.remove(); // Drop structural timestamp payload input node
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

/*==================================
      ENQUIRY FORM
  =================================*/
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enquiryForm');

    form.addEventListener('submit', (event) => {
        // Prevent default form submission behavior
        event.preventDefault();

        // Clear any previous error messages before validating again
        clearErrors();

        let isValid = true;

        // 1. Validate First Name
        const fname = document.getElementById('fname');
        if (fname.value.trim() === '') {
            showError(fname, 'First name is required.');
            isValid = false;
        }

        // 2. Validate Last Name
        const lname = document.getElementById('lname');
        if (lname.value.trim() === '') {
            showError(lname, 'Last name is required.');
            isValid = false;
        }

        // 3. Validate Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'Email address is required.');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        // 4. Validate Service Required
        const service = document.getElementById('service');
        if (service.value.trim() === '') {
            showError(service, 'Please specify the service required.');
            isValid = false;
        }

        // If everything is valid, proceed with submission (e.g., send data to API)
        if (isValid) {
            alert('Form submitted successfully!'); // You can replace this with your actual submission logic
            form.reset(); 
        }
    });

    // Helper function to create and display error messages inline
    function showError(inputElement, message) {
        // Highlight the border of the input field
        inputElement.style.borderColor = '#ff3333';
        inputElement.style.background = '#fff8f8';

        // Create the error message element
        const errorDisplay = document.createElement('div');
        errorDisplay.className = 'error-message';
        errorDisplay.innerText = message;
        
        // Add custom styles directly or via CSS classes
        errorDisplay.style.color = '#ff3333';
        errorDisplay.style.fontSize = '0.8rem';
        errorDisplay.style.marginTop = '5px';
        errorDisplay.style.fontWeight = '500';

        // Append the error message right below the input field
        inputElement.parentElement.appendChild(errorDisplay);
    }

    // Helper function to remove all active errors and reset borders
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '#e0e0e0';
            input.style.background = '#fdfdfd';
        });
    }
});