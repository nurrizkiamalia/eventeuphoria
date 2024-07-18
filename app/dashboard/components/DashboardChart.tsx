"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useDashboard from '@/hooks/useDashboard';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {}

const DashboardChart: React.FC<ApexChartProps> = () => {
  const [isClient, setIsClient] = useState(false);
  const { comprehensiveRevenue, loading, error } = useDashboard();
  const [activeTab, setActiveTab] = useState<'yearly' | 'monthly' | 'daily'>('monthly');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!comprehensiveRevenue) return null;

  const yearlyData = {
    series: [{
      name: 'Yearly Revenue',
      data: comprehensiveRevenue.yearlyRevenue.map(item => item.revenue)
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        foreColor: '#888888',
      },
      xaxis: {
        categories: comprehensiveRevenue.yearlyRevenue.map(item => item.year.toString())
      },
      title: {
        text: 'Yearly Revenue'
      }
    }
  };

  const monthlyData = {
    series: [{
      name: 'Monthly Revenue',
      data: comprehensiveRevenue.monthlyRevenue.map(item => item.revenue)
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#888888',
      },
      xaxis: {
        categories: comprehensiveRevenue.monthlyRevenue.map(item => item.month)
      },
      title: {
        text: 'Monthly Revenue (This Year)'
      }
    }
  };

  const dailyData = {
    series: [{
      name: 'Daily Revenue',
      data: comprehensiveRevenue.dailyRevenue.map(item => item.revenue)
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#888888',
      },
      xaxis: {
        type: 'datetime',
        categories: comprehensiveRevenue.dailyRevenue.map(item => item.date)
      },
      title: {
        text: 'Daily Revenue (This Month)'
      }
    }
  };

  const activeData = activeTab === 'yearly' ? yearlyData : activeTab === 'monthly' ? monthlyData : dailyData;

  return (
    <div className="w-full">
      <div className="mb-4">
        <button 
          className={`mr-2 px-4 py-2 ${activeTab === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('yearly')}
        >
          Yearly
        </button>
        <button 
          className={`mr-2 px-4 py-2 ${activeTab === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily
        </button>
      </div>
      {isClient && (
        <Chart 
          options={activeData.options as ApexCharts.ApexOptions} 
          series={activeData.series} 
          type={activeTab === 'yearly' ? 'bar' : 'line'} 
          width="100%" 
          height={350} 
        />
      )}
    </div>
  );
};

export default DashboardChart;