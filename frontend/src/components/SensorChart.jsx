import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorChart = ({ sensores }) => {
  if (!sensores || sensores.length === 0) return <div>No hay datos de sensores.</div>;

  // Agrupa datos por tipo y ordena por timestamp
  const temperatura = sensores.filter(s => s.tipo === 'temperatura').sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const humedad = sensores.filter(s => s.tipo === 'humedad').sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // El eje X debe ser el tiempo, usando los timestamps de los datos
  // Usamos los timestamps de temperatura si hay, si no los de humedad
  const labels = temperatura.length > 0
    ? temperatura.map(s => new Date(s.timestamp).toLocaleTimeString())
    : humedad.map(s => new Date(s.timestamp).toLocaleTimeString());

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temperatura.map(s => s.valor),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        tension: 0.4,
        spanGaps: true,
      },
      {
        label: 'Humedad (%)',
        data: humedad.map(s => s.valor),
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        tension: 0.4,
        spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sensores en Tiempo Real',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
        },
      },
    },
  };

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SensorChart;
