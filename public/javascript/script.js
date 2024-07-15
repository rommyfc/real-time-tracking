const socket = io();

let myId = null;
let customLocationMode = false;

// Initialize map
const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

const markers = {};

// Geolocation setup
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      sendLocation(latitude, longitude);
    },
    (error) => {
      console.log("Geolocation error:", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}

// Map click event
map.on("click", function (e) {
  if (customLocationMode) {
    const { lat, lng } = e.latlng;
    sendLocation(lat, lng);
  }
});

// Socket events
socket.on("connect", () => {
  myId = socket.id;
  console.log("Connected with ID:", myId);
});

socket.on("receive-location", (data) => {
  console.log("Received location:", data);
  const { id, latitude, longitude } = data;
  updateMarker(id, latitude, longitude);
});

socket.on("user-disconnected", (data) => {
  const { id } = data;
  removeMarker(id);
});

// Helper functions
function sendLocation(latitude, longitude) {
  socket.emit("send-location", { latitude, longitude });
  console.log("Emitting location:", latitude, longitude);
}

function updateMarker(id, latitude, longitude) {
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
    markers[id].bindPopup(id === myId ? "You" : "User " + id.substr(0, 4));
  }

  if (id === myId) {
    map.setView([latitude, longitude], 13);
  }
}

function removeMarker(id) {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
}

// Custom location functions
function enableCustomLocation() {
  customLocationMode = true;
  alert("Click on the map to set a custom location");
}

function disableCustomLocation() {
  customLocationMode = false;
  alert("Custom location mode disabled. Reverting to actual location.");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      sendLocation(latitude, longitude);
    });
  }
}

function setCustomCoordinates() {
  const lat = parseFloat(prompt("Enter latitude:"));
  const lng = parseFloat(prompt("Enter longitude:"));
  if (!isNaN(lat) && !isNaN(lng)) {
    sendLocation(lat, lng);
  } else {
    alert("Invalid coordinates");
  }
}
