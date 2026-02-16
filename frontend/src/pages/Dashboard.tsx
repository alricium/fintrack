import { useEffect, useRef, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import '../assets/styles/Dashboard.css';
import Chart from 'chart.js/auto';
import { api } from '../api';

interface ChartData {
  labels: string[];
  income: number[];
  expense: number[];
}

const Dashboard = () => {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);

  const lineChartInstance = useRef<Chart | null>(null);
  const pieChartInstance = useRef<Chart | null>(null);

  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await api.get<ChartData>('/earnings/chart');
        data.labels = Array.isArray(data.labels)
          ? data.labels
          : Object.values(data.labels);
        setChartData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    if (!chartData || loading) return;

    const totalIncome = chartData.income.reduce((a, b) => a + b, 0);
    const totalExpense = chartData.expense.reduce((a, b) => a + b, 0);

    if (lineChartRef.current) {
      if (lineChartInstance.current) lineChartInstance.current.destroy();

      const ctx = lineChartRef.current.getContext('2d');
      if (!ctx) return;

      const gradientIncome = ctx.createLinearGradient(0, 0, 0, 400);
      gradientIncome.addColorStop(0, 'rgba(54,162,235,0.5)');
      gradientIncome.addColorStop(1, 'rgba(54,162,235,0)');

      const gradientExpense = ctx.createLinearGradient(0, 0, 0, 400);
      gradientExpense.addColorStop(0, 'rgba(255,99,132,0.5)');
      gradientExpense.addColorStop(1, 'rgba(255,99,132,0)');

      lineChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Income',
              data: chartData.income,
              borderColor: '#36A2EB',
              backgroundColor: gradientIncome,
              tension: 0.4,
              fill: true,
            },
            {
              label: 'Expense',
              data: chartData.expense,
              borderColor: '#FF6384',
              backgroundColor: gradientExpense,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    if (pieChartRef.current) {
      if (pieChartInstance.current) pieChartInstance.current.destroy();

      pieChartInstance.current = new Chart(pieChartRef.current, {
        type: 'pie',
        data: {
          labels: ['Total Income', 'Total Expense'],
          datasets: [
            {
              data: [totalIncome, totalExpense],
              backgroundColor: ['#36A2EB', '#FF6384'],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }, [chartData, loading]);

  const totalIncome = chartData?.income.reduce((a, b) => a + b, 0) ?? 0;
  const totalExpense = chartData?.expense.reduce((a, b) => a + b, 0) ?? 0;
  const netProfit = totalIncome - totalExpense;

  return (
    <MainLayout>
      <div className="dashboard-container">
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card dashboard-card income-card">
              <div className="card-body">
                <h6>Total Income</h6>
                <h4>
                  {loading ? 'Loading...' : `₺ ${totalIncome.toLocaleString()}`}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dashboard-card expense-card">
              <div className="card-body">
                <h6>Total Expense</h6>
                <h4>
                  {loading ? 'Loading...' : `₺ ${totalExpense.toLocaleString()}`}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dashboard-card profit-card">
              <div className="card-body">
                <h6>Net Profit</h6>
                <h4>
                  {loading ? 'Loading...' : `₺ ${netProfit.toLocaleString()}`}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dashboard-card date-card">
              <div className="card-body">
                <h6>Today's Date</h6>
                <h4>{new Date().toLocaleDateString('en-US')}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card chart-card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="mb-3">Income / Expense Trend</h5>
                <div style={{ height: '220px', flex: 1 }}>
                  {loading ? (
                    <div className="text-center mt-5">Loading...</div>
                  ) : (
                    <canvas ref={lineChartRef}></canvas>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card chart-card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="mb-3">Distribution</h5>

                {loading ? (
                  <div className="text-center mt-5">Loading...</div>
                ) : (
                  <div className="distribution-container" style={{ flex: 1 }}>
                    <div className="pie-area">
                      <canvas ref={pieChartRef}></canvas>
                    </div>

                    <div className="distribution-stats">
                      <div className="stat-item income">
                        <span className="dot"></span>
                        <div>
                          <p>Total Income</p>
                          <h6>₺ {totalIncome.toLocaleString()}</h6>
                        </div>
                      </div>

                      <div className="stat-item expense">
                        <span className="dot"></span>
                        <div>
                          <p>Total Expense</p>
                          <h6>₺ {totalExpense.toLocaleString()}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;