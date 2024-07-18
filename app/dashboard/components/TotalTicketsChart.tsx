"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useDashboard from '@/hooks/useDashboard';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {}

const TotalTicketsDashboard: React.FC<ApexChartProps> = () => {
  const [isClient, setIsClient] = useState(false);
  const { ticketSale, loading, error } = useDashboard();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!ticketSale) return null;

  const series = ticketSale.saleDetails.map(detail => detail.totalTicketSold);
  const labels = ticketSale.saleDetails.map(detail => detail.eventCategory);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 1400,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    labels: labels,
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-2xl font-bold mb-4">
        Tickets Sold: {ticketSale.soldSeats}
      </div>
      {isClient && (
        <Chart options={options} series={series} type="donut" width="300" height={300} />
      )}
    </div>
  );
};

export default TotalTicketsDashboard;