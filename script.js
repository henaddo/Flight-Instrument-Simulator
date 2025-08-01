let simulationInterval;

function startSimulation() {
  simulationInterval = setInterval(() => {
    const altitude = Math.floor(Math.random() * 10000);
    const speed = Math.floor(Math.random() * 600);
    const heading = Math.floor(Math.random() * 360);
    const pitch = (Math.random() * 30 - 15).toFixed(2);
    const roll = (Math.random() * 60 - 30).toFixed(2);
    const yaw = (Math.random() * 180 - 90).toFixed(2);

    document.getElementById('altitude').innerText = `${altitude} ft`;
    document.getElementById('speed').innerText = `${speed} kt`;
    document.getElementById('heading').innerText = `${heading}°`;
    document.getElementById('pitch').innerText = `${pitch}°`;
    document.getElementById('roll').innerText = `${roll}°`;
    document.getElementById('yaw').innerText = `${yaw}°`;

    updateCharts(altitude, speed);
  }, 1000);
}

function stopSimulation() {
  clearInterval(simulationInterval);
}

// Placeholder for downloadCSV and generateReport
function downloadCSV() { alert('Downloading CSV...'); }
function generateReport() { alert('Generating report...'); }

// Chart.js setup
let altitudeChart, airspeedChart;

function setupCharts() {
  const ctxAlt = document.getElementById('altitudeChart').getContext('2d');
  const ctxSpeed = document.getElementById('airspeedChart').getContext('2d');

  altitudeChart = new Chart(ctxAlt, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Altitude', data: [], borderColor: 'blue' }] },
    options: { scales: { x: { display: false } } }
  });

  airspeedChart = new Chart(ctxSpeed, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Speed', data: [], borderColor: 'green' }] },
    options: { scales: { x: { display: false } } }
  });
}

function updateCharts(altitude, speed) {
  const time = new Date().toLocaleTimeString();

  altitudeChart.data.labels.push(time);
  altitudeChart.data.datasets[0].data.push(altitude);
  if (altitudeChart.data.labels.length > 10) {
    altitudeChart.data.labels.shift();
    altitudeChart.data.datasets[0].data.shift();
  }
  altitudeChart.update();

  airspeedChart.data.labels.push(time);
  airspeedChart.data.datasets[0].data.push(speed);
  if (airspeedChart.data.labels.length > 10) {
    airspeedChart.data.labels.shift();
    airspeedChart.data.datasets[0].data.shift();
  }
  airspeedChart.update();
}

window.onload = setupCharts;
