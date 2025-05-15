(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // // Spinner
    // var spinner = function () {
    //     setTimeout(function () {
    //         if ($('#spinner').length > 0) {
    //             $('#spinner').removeClass('show');
    //         }
    //     }, 1);
    // };
    // spinner();


    // Fixed Navbar
   
    let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    document.addEventListener("DOMContentLoaded", () => {
        const counters = document.querySelectorAll(".counter-value");
      
        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          const speed = 200; // Adjust speed for the counting effect
      
          const updateCount = () => {
            const current = +counter.innerText;
            const increment = Math.ceil(target / speed);
      
            if (current < target) {
              counter.innerText = current + increment;
              setTimeout(updateCount, 25); // Update every 10ms
            } else {
              counter.innerText = target; // Ensure it reaches the target
            }
          };
      
          updateCount();
        });
      });
      


// JavaScript to close the popup when the close button is clicked
document.querySelectorAll('.popup-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const popup = closeBtn.closest('.popup');
        popup.style.display = 'none';
        window.location.hash = ''; // Clear URL hash
    });
});

// Open popup when clicking on gallery links
document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const popupId = link.getAttribute('href').substring(1);
        const popup = document.getElementById(popupId);
        popup.style.display = 'flex';
    });
});



    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);



// ABOUT JS
// Smooth scrolling to the section
document.querySelector('a[href="#headmistress-message"]').addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const offsetTop = targetElement.offsetTop;
  
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  });


//   ADMISSIONS JS
  $(document).ready(function() {
    $(".table-hover tbody tr").hover(
        function() {
            $(this).css("transform", "scale(1.02)");
        }, 
        function() {
            $(this).css("transform", "scale(1)");
        }
    );
});


// MEDIA CENTRE JS
 // Improved voting system with persistent storage
 class VotingSystem {
    constructor() {
        this.initializeGalleryItems();
    }

    initializeGalleryItems() {
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            // Assign unique IDs to gallery items
            const itemId = `gallery-item-${index}`;
            item.setAttribute('data-item-id', itemId);

            // Initialize vote counts and state
            this.initializeItem(item, itemId);
            this.attachEventListeners(item, itemId);
        });
    }

    initializeItem(item, itemId) {
        const voteData = this.getVoteData(itemId);
        const interactionBar = item.querySelector('.interaction-bar');
        const likeBtn = item.querySelector('.like-btn');
        const dislikeBtn = item.querySelector('.dislike-btn');
        const likeCount = likeBtn.querySelector('.like-count');
        const dislikeCount = dislikeBtn.querySelector('.dislike-count');

        // Create vote message if it doesn't exist
        if (!interactionBar.querySelector('.vote-message')) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'vote-message';
            messageDiv.textContent = 'You have already voted on this item';
            interactionBar.appendChild(messageDiv);
        }

        // Restore previous vote state
        if (voteData) {
            interactionBar.classList.add('voted');
            if (voteData.type === 'like') {
                likeBtn.classList.add('active', 'voted');
                likeCount.textContent = voteData.likes;
                dislikeCount.textContent = voteData.dislikes;
            } else if (voteData.type === 'dislike') {
                dislikeBtn.classList.add('active', 'voted');
                likeCount.textContent = voteData.likes;
                dislikeCount.textContent = voteData.dislikes;
            }
        }
    }

    attachEventListeners(item, itemId) {
        const likeBtn = item.querySelector('.like-btn');
        const dislikeBtn = item.querySelector('.dislike-btn');

        likeBtn.addEventListener('click', () => this.handleVote(item, itemId, 'like'));
        dislikeBtn.addEventListener('click', () => this.handleVote(item, itemId, 'dislike'));
    }

    handleVote(item, itemId, voteType) {
        // Check if user has already voted
        if (this.hasVoted(itemId)) {
            return;
        }

        const interactionBar = item.querySelector('.interaction-bar');
        const likeBtn = item.querySelector('.like-btn');
        const dislikeBtn = item.querySelector('.dislike-btn');
        const likeCount = likeBtn.querySelector('.like-count');
        const dislikeCount = dislikeBtn.querySelector('.dislike-count');

        // Update counts
        const currentLikes = parseInt(likeCount.textContent);
        const currentDislikes = parseInt(dislikeCount.textContent);

        const newVoteData = {
            type: voteType,
            likes: voteType === 'like' ? currentLikes + 1 : currentLikes,
            dislikes: voteType === 'dislike' ? currentDislikes + 1 : currentDislikes,
            timestamp: Date.now()
        };

        // Save vote
        this.saveVote(itemId, newVoteData);

        // Update UI
        interactionBar.classList.add('voted');
        if (voteType === 'like') {
            likeBtn.classList.add('active', 'voted');
            likeCount.textContent = newVoteData.likes;
        } else {
            dislikeBtn.classList.add('active', 'voted');
            dislikeCount.textContent = newVoteData.dislikes;
        }

        // Show toast notification
        this.showToast(`Thank you for your vote!`);
    }

    hasVoted(itemId) {
        return localStorage.getItem(`vote_${itemId}`) !== null;
    }

    getVoteData(itemId) {
        const data = localStorage.getItem(`vote_${itemId}`);
        return data ? JSON.parse(data) : null;
    }

    saveVote(itemId, voteData) {
        localStorage.setItem(`vote_${itemId}`, JSON.stringify(voteData));
    }

    showToast(message) {
        const toast = document.querySelector('.toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// Initialize voting system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VotingSystem();
});
// Lightbox functionality
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = document.querySelector('.close-lightbox');

// Open lightbox on club image click
document.querySelectorAll('.club-image').forEach(img => {
    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';
    });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});



// SHOOOL HUB
