"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useDashboard from '@/hooks/useDashboard';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {}

const TotalRevenueDashboard: React.FC<ApexChartProps> = () => {
  const [isClient, setIsClient] = useState(false);
  const { revenue, loading, error } = useDashboard();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!revenue) return null;

  const series = revenue.events.map(event => event.revenue);
  const labels = revenue.events.map(event => event.name);

  const options: ApexCharts.ApexOptions = {
    chart: {
      width: 380,
      type: 'polarArea'
    },
    labels: labels,
    fill: {
      opacity: 1
    },
    stroke: {
      width: 1,
      colors: undefined
    },
    yaxis: {
      show: false
    },
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0
        },
        spokes: {
          strokeWidth: 0
        },
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 0.6
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {isClient && (
        <Chart options={options} series={series} type="polarArea" width={300} height={300} />
      )}
      <div className="text-2xl text-center font-bold mb-4">
        Total Revenue: Rp{revenue.totalRevenue.toFixed(2)}
      </div>
    </div>
  );
};

export default TotalRevenueDashboard;