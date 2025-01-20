const correctPassword = "water200";

function validatePassword() {
    const inputPassword = document.getElementById("password").value;
    if (inputPassword === correctPassword) {
        document.getElementById("container").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

async function fetchData() {
    const sensorDataResponse = await fetch('https://backend.thinger.io/v3/users/mwamboa/devices/liquid-monitor/resources/sensor_data', {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczNTM2MTgsImlhdCI6MTczNzM0NjQxOCwicm9sZSI6InVzZXIiLCJ1c3IiOiJtd2FtYm9hIn0.bF6AdaRZWuFLwsgvWKjVwCKp98A27IDOF97KopCr47U"
        }
    });
    const sensorData = await sensorDataResponse.json();

    const warningResponse = await fetch('https://backend.thinger.io/v3/users/mwamboa/devices/liquid-monitor/resources/warning_message', {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczNTM2MTgsImlhdCI6MTczNzM0NjQxOCwicm9sZSI6InVzZXIiLCJ1c3IiOiJtd2FtYm9hIn0.bF6AdaRZWuFLwsgvWKjVwCKp98A27IDOF97KopCr47U"
        }
    });
    const warningData = await warningResponse.json();

    document.getElementById('level').textContent = sensorData.level;
    document.getElementById('temp').textContent = sensorData.temperature;
    document.getElementById('pressure').textContent = sensorData.pressure;
    document.getElementById('warning').textContent = warningData.includes("Critical") ? warningData : "";

    // Update tank level visualization
    const tankLevel = document.getElementById("waterLevel");
    const height = Math.max(10, Math.min(100, sensorData.level)); // Limit the height for visualization
    tankLevel.style.height = height + "%";
}

function openThinger() {
    window.open('https://console.thinger.io/console/dashboards/liquid_dashboard', '_blank');
}

setInterval(fetchData, 60000);  // Update every minute (60000 milliseconds)

}

function openThinger() {
    window.open('https://console.thinger.io/console/dashboards/liquid_dashboard', '_blank');
}

setInterval(fetchData, 2000);
