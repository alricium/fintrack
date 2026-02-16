import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';
import '../assets/styles/AIInsights.css';

const AIInsights = () => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/ai/insights');
      setInsight(data.message);
    } catch (error) {
      setInsight('AI analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <MainLayout>
      <div className="ai-container">
        <div className="ai-card">
          <h4 className="ai-title">
            <i className="bi bi-robot"></i>
            AI Financial Advisor
          </h4>
  
          {loading && (
            <p className="ai-loading">
              Analyzing your financial data...
            </p>
          )}
  
          {!loading && insight && (
            <div className="ai-insight-box">
              {insight}
            </div>
          )}
  
          <button
            className="ai-btn"
            onClick={fetchInsights}
            disabled={loading}
          >
            Reanalyze
          </button>
        </div>
      </div>
    </MainLayout>
  );  
};

export default AIInsights;