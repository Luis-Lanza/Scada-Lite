import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Chart.js and canvas for testing in jsdom
global.HTMLCanvasElement.prototype.getContext = () => {};
jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Mocked Line Chart</div>
}));

import SensorChart from './SensorChart';

describe('SensorChart', () => {
  it('muestra mensaje cuando no hay datos de sensores', () => {
    render(<SensorChart sensores={[]} />);
    expect(screen.getByText(/no hay datos de sensores/i)).toBeInTheDocument();
  });

  it('muestra el gráfico cuando hay datos', () => {
    const sensores = [
      { tipo: 'temperatura', valor: 25, timestamp: new Date().toISOString() },
      { tipo: 'humedad', valor: 60, timestamp: new Date().toISOString() }
    ];
    render(<SensorChart sensores={sensores} />);
    expect(screen.getByText(/mocked line chart/i)).toBeInTheDocument();
  });
});
