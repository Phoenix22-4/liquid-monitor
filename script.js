const correctPassword = "your_password";

function validatePassword() {
    const inputPassword = document.getElementById("password").value;
    if (inputPassword === correctPassword) {
        document.getElementById("container").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

async function fetchData() {
    const sensorDataResponse = await fetch('https://api.thinger.io/v1/users/mwamboa/devices/liquid-monitar/sensorData?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJsaXF1aWQtbW9uaXRvciIsImlhdCI6MTczNjk3NTkwMSwianRpIjoiNjc4ODI2MWRkN2QyM2E2ODY4MDVmZDE2Iiwic3ZyIjoiZXUtY2VudHJhbC5hd3MudGhpbmdlci5pbyIsInVzciI6Im13YW1ib2EifQ.0gYbEHXJIHBakpxIy9SUvTPsLsVCKDtcsKqJplxjFn4');
    const sensorData = await sensorDataResponse.json();

    const warningResponse = await fetch('https://api.thinger.io/v1/users/mwamboa/devices/liquid-monitar/warningMessage?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJsaXF1aWQtbW9uaXRvciIsImlhdCI6MTczNjk3NTkwMSwianRpIjoiNjc4ODI2MWRkN2QyM2E2ODY4MDVmZDE2Iiwic3ZyIjoiZXUtY2VudHJhbC5hd3MudGhpbmdlci5pbyIsInVzciI6Im13YW1ib2EifQ.0gYbEHXJIHBakpxIy9SUvTPsLsVCKDtcsKqJplxjFn4');
    const warningData = await warningResponse.json();

    document.getElementById('level').textContent = sensorData.level;
    document.getElementById('temp').textContent = sensorData.temp;
    document.getElementById('pressure').textContent = sensorData.pressure;

    if (warningData && warningData.toString().includes("Critical")) {
        document.getElementById('warning').textContent = warningData;
    } else {
        document.getElementById('warning').textContent = "";
    }

    // Update tank level visualization
    const tankLevel = document.getElementById("tankLevel");
    const height = Math.max(10, Math.min(100, sensorData.level)); // Limit the height for visualization
    tankLevel.style.height = height + "%";
}

function openThinger() {
    window.open('https://thinger.io/console/dashboards/liquid_dashboard', '_blank');
}

setInterval(fetchData, 2000);
