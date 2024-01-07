import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
ChartJS.register(
  Legend,
  LinearScale,
  Tooltip,
  BarElement,
  CategoryScale,
  PointElement,
  LineElement,
);
import React from 'react';
import { Line } from 'react-chartjs-2';

interface LineGraphProps {
  itemName: string;
  xValues: number[];
  yValues: number[];
}

export default function LineGraph({ itemName, xValues, yValues }: LineGraphProps) {
  const data = {
    labels: xValues,
    datasets: [
      {
        label: itemName,
        data: yValues,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  return <Line data={data} options={options} width={500} height={300} />;
}
