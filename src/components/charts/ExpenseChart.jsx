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
  Legend,
} from 'chart.js';
import './ExpenseChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ExpenseChart({ transactions }) {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = sortedTransactions.map(t => new Date(t.date).toLocaleDateString());
  const data = sortedTransactions.map(t => t.amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Trend'
      }
    }
  };

  return (
    <div className="expense-chart">
      <Line data={chartData} options={options} />
    </div>
  );
}