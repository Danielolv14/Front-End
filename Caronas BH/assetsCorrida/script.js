function initMap() {
    const driverName = localStorage.getItem('selectedDriver');
    const startAddress = localStorage.getItem('startAddress');
    const endAddress = localStorage.getItem('endAddress');
    document.getElementById('driverName').innerText = driverName;

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: -34.397, lng: 150.644 }
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
      origin: startAddress,
      destination: endAddress,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });

    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    messageForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const message = messageInput.value;
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messagesDiv.appendChild(messageElement);
      messageInput.value = '';
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      });
  }