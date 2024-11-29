document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      const dataId = card.dataset.id;
  
      // Content for each card (can be fetched dynamically if needed)
      const cardContent = {
        zain: {
          image: "assets/stories4.png",
          title: "Your Zakat was a Lifeline for Zain",
          description:
            "Zain's life took a difficult turn when he became bedbound with kidney disease and severe gout pain...",
        },
        // Add content for other cards here
      };
  
      // Populate the pop-up with specific content
      const popupContent = cardContent[dataId];
      document.getElementById('popup-image').src = popupContent.image;
      document.getElementById('popup-title').textContent = popupContent.title;
      document.getElementById('popup-description').textContent = popupContent.description;
  
      // Show the pop-up
      const popupContainer = document.getElementById('popup-container');
      popupContainer.classList.add('active');
    });
  });
  
  // Close the pop-up
  document.querySelector('.popup-close').addEventListener('click', () => {
    document.getElementById('popup-container').classList.remove('active');
  });
  