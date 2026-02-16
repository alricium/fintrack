import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';
import '../assets/styles/Annual.css';
import type { ChartOptions, FontSpec } from 'chart.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface YearlyReport {
  year: number;
  total_income: number;
  total_expense: number;
}

const ITEMS_PER_PAGE = 10;

const Annual = () => {
  const [data, setData] = useState<YearlyReport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAnnual = async () => {
    const res = await api.get('/reports/annual');
    setData(res.data);
  };

  useEffect(() => {
    fetchAnnual();
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const chartData = {
    labels: data.map((d) => d.year),
    datasets: [
      {
        label: 'Income',
        data: data.map((d) => d.total_income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expense',
        data: data.map((d) => d.total_expense),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Montserrat, sans-serif',
            size: 14,
            weight: 500,
          } as FontSpec,
          color: '#00ADB5',
        },
      },
      title: {
        display: true,
        text: 'Annual Income vs Expense',
        font: {
          family: 'Montserrat, sans-serif',
          size: 18,
          weight: 600,
        } as FontSpec,
        color: '#00ADB5',
      },
      tooltip: {
        bodyFont: {
          family: 'Montserrat, sans-serif',
          size: 13,
        } as FontSpec,
        titleFont: {
          family: 'Montserrat, sans-serif',
          size: 14,
          weight: 600,
        } as FontSpec,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Montserrat, sans-serif',
            size: 12,
          } as FontSpec,
          color: '#EEEEEE',
        },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: {
          font: {
            family: 'Montserrat, sans-serif',
            size: 12,
          } as FontSpec,
          color: '#EEEEEE',
        },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <MainLayout>
      <div className="annual-container">
        <h3 className="annual-title">Annual Financial Report</h3>

        <div className="annual-card">
          <div className="annual-chart-wrapper">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="annual-card">
          <table className="annual-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Income</th>
                <th>Expense</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => {
                const net = row.total_income - row.total_expense;
                return (
                  <tr key={index}>
                    <td>{row.year}</td>
                    <td>{row.total_income}</td>
                    <td>{row.total_expense}</td>
                    <td className={net >= 0 ? 'net-positive' : 'net-negative'}>
                      {net}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Annual;