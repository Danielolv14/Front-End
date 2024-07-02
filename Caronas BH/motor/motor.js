
document.addEventListener("DOMContentLoaded", function () {
  const driversContainer = document.querySelector(".drivers");
  const scheduleContainer = document.querySelector(".schedule");

  const driversData = [];
  
  // Função para verificar se uma string é um JSON válido
  function isValidJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  // Obter todos os dados do localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    // Verificar se a chave é um email
    if (key.includes('@')) {
      const userData = localStorage.getItem(key);
      
      if (isValidJSON(userData)) {
        const user = JSON.parse(userData);

        // Verificar se o usuário é um motorista
        if (user && user.type === "Motorista") {
          const driver = {
            name: `${user.nome} ${user.sobrenome}`,
            car: user.carModel,
            plate: user.carPlate,
            phone: user.celular,
            rating: parseFloat(user.rating) || 0,
            time: Math.floor(Math.random() * 10) + 1 // Gerar um tempo aleatório entre 1 e 10 minutos
          };
          driversData.push(driver);
        }
      } else {
        console.warn(`Dados inválidos no localStorage para a chave: ${key}`);
      }
    }
  }

  console.log("Drivers Data:", driversData); // Adicionando log para depuração

  function createDriverCard(driver, showTime, buttonText, isSchedule) {
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
          <p><b>Carro:</b> ${driver.car}</p>
          <p><b>Placa:</b> ${driver.plate}</p>
          <p><b>Telefone:</b> ${driver.phone}</p>
          <p>${getStarRating(driver.rating)}</p>
          ${isSchedule ? `<button onclick="openModal('${driver.name}')">${buttonText}</button>` : `<button onclick="requestRide('${driver.name}')">${buttonText}</button>`}
        </div>
      `;
  
    return driverDiv;
  }  

  driversData.forEach((driver) => {
    const driverCard = createDriverCard(driver, true, "Solicitar", false);
    driversContainer.appendChild(driverCard);
  });
  
  driversData.forEach((driver) => {
    const driverCard = createDriverCard(driver, false, "Marcar", true);
    scheduleContainer.appendChild(driverCard);
  });

  // Modal logic
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const scheduleButton = document.getElementById("scheduleButton");
  const confirmButton = document.getElementById("confirmButton");

  window.openModal = function(driverName) {
    localStorage.setItem('selectedDriver', driverName);
    modal.style.display = "block";
  };

  span.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  scheduleButton.addEventListener("click", function() {
    const rideDate = document.getElementById('rideDate').value;
    const rideTime = document.getElementById('rideTime').value;

    if (rideDate && rideTime) {
      localStorage.setItem('rideDate', rideDate);
      localStorage.setItem('rideTime', rideTime);
      alert('Data e horário selecionados!');
    } else {
      alert('Por favor, selecione a data e horário da corrida.');
    }
  });

  confirmButton.addEventListener("click", function() {
    const rideDate = localStorage.getItem('rideDate');
    const rideTime = localStorage.getItem('rideTime');

    if (rideDate && rideTime) {
      modal.style.display = "none";
      alert('Corrida agendada com sucesso!');
    } else {
      alert('Por favor, selecione a data e horário da corrida.');
    }
  });

  window.requestRide = function(driverName) {
    localStorage.setItem('selectedDriver', driverName);
    window.location.href = 'corrida.html';
  };
});






/* document.addEventListener("DOMContentLoaded", function () {
  const driversContainer = document.querySelector(".drivers");
  const scheduleContainer = document.querySelector(".schedule");

  const driversData = [
    { id: 1, name: "John Doe", time: 2, car: "Toyota Camry", plate: "ABC123", phone: "555-1234", rating: 4.5 },
    { id: 2, name: "Jane Smith", time: 5, car: "Honda Accord", plate: "XYZ789", phone: "555-5678", rating: 3.8 },
    { id: 3, name: "Alice Johnson", time: 3, car: "Ford Fusion", plate: "DEF456", phone: "555-9876", rating: 4.2 },
    { id: 4, name: "Bob Brown", time: 4, car: "Chevrolet Malibu", plate: "GHI789", phone: "555-5432", rating: 4.0 },
    { id: 5, name: "Charlie White", time: 6, car: "Nissan Altima", plate: "JKL012", phone: "555-6789", rating: 3.5 },
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
          <p><b>Carro:</b> ${driver.car}</p>
          <p><b>Placa:</b> ${driver.plate}</p>
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
  
}); */
