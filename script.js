document.addEventListener("DOMContentLoaded", function () {
  const driversContainer = document.querySelector(".drivers");
  const scheduleContainer = document.querySelector(".schedule");

  const driversData = [
    { id: 1, name: "John Doe", time: 2, inicio: "R. Dom José Gaspar, 500 - Coração Eucarístico ", final: "Rua Walter Ianni, 255 - São Gabriel", phone: "555-1234", rating: 4.5 },
    { id: 2, name: "Jane Smith", time: 5, inicio: "R. Dom José Gaspar, 500 - Coração Eucarístico ", final: "Rua Walter Ianni, 255 - São Gabriel", phone: "555-5678", rating: 3.8 },
    { id: 3, name: "Alice Johnson", time: 3, inicio: "R. Dom José Gaspar, 500 - Coração Eucarístico ", final: "Rua Walter Ianni, 255 - São Gabriel", phone: "555-9876", rating: 4.2 },
    { id: 4, name: "Bob Brown", time: 4, inicio: "R. Dom José Gaspar, 500 - Coração Eucarístico ", final: "Rua Walter Ianni, 255 - São Gabriel", phone: "555-5432", rating: 4.0 },
    { id: 5, name: "Charlie White", time: 6, inicio: "R. Dom José Gaspar, 500 - Coração Eucarístico ", final: "Rua Walter Ianni, 255 - São Gabriel", phone: "555-6789", rating: 3.5 },
  ];
  

  function createDriverCard(driver, showTime, buttonText) {
    const driverDiv = document.createElement("div");
    driverDiv.classList.add("driver");
  
    function getStarRating(rating) {
      const roundedRating = Math.round(rating * 2) / 2;
      const fullStars = Math.floor(roundedRating); 
      const halfStar = roundedRating % 1 !== 0;
  
      let starsHTML = '';
      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="material-icons-outlined">star</i>';
      }
      if (halfStar) {
        starsHTML += '<i class="material-icons-outlined">star_half</i>';
      }
  
      return starsHTML;
    }
  
    driverDiv.innerHTML = `
        <i class="material-symbols-outlined">account_circle</i>
        <div class="info">
          <h2>${driver.name}</h2>
          ${showTime ? `<p><b>${driver.time}</b> Minutos</p>` : ""}
          <p><b>Endereço Inicial:</b> ${driver.inicio}</p>
          <p><b>Endereço Final:</b> ${driver.final}</p>
          <p><b>Telefone:</b> ${driver.phone}</p>
          <p>${getStarRating(driver.rating)}</p>
          <button>${buttonText}</button>
        </div>
      `;
  
    return driverDiv;
  }  

  driversData.forEach((driver) => {
    const driverCard = createDriverCard(driver, true, "Solicitar");
    driversContainer.appendChild(driverCard);
  });
  
  driversData.forEach((driver) => {
    const driverCard = createDriverCard(driver, false, "Marcar");
    scheduleContainer.appendChild(driverCard);
  });
  
});
