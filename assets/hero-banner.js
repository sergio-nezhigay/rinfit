  document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelectorAll('.hero-swiper .swiper-slide').length > 1) {
      new Swiper(".hero-swiper", {
        loop: true,
        pagination: {
          el: ".swiper-pagination.custom-progress",
          clickable: true,
        },
        // autoplay: {
        //   delay: 4000, 
        //   disableOnInteraction: false,
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  });