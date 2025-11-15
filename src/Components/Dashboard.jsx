import { useEffect, useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { foodDataService } from '../services/dataService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard(){
  const [weekly, setWeekly] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [weeklyData, statsData, categoriesData] = await Promise.all([
          foodDataService.getWeeklyData(),
          foodDataService.getMonthlyStats(),
          foodDataService.getFoodCategories()
        ]);
        
        setWeekly(weeklyData);
        setMonthlyStats(statsData);
        setFoodCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const labels = weekly.map(r => r.date);
  
  const lineData = {
    labels,
    datasets: [
      {
        label: "Cooked",
        data: weekly.map(r => r.cooked),
        borderColor: "rgba(0,214,118,0.95)",
        backgroundColor: "rgba(0,214,118,0.08)",
        tension: 0.3,
        fill: true
      },
      {
        label: "Eaten",
        data: weekly.map(r => r.eaten),
        borderColor: "rgba(69,183,209,0.95)",
        backgroundColor: "rgba(69,183,209,0.08)",
        tension: 0.3,
        fill: true
      },
      {
        label: "Leftover",
        data: weekly.map(r => r.leftover),
        borderColor: "rgba(255,107,107,0.95)",
        backgroundColor: "rgba(255,107,107,0.08)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Food Waste",
        data: weekly.map(r => r.waste || 0),
        backgroundColor: "rgba(255,107,107,0.7)",
        borderColor: "rgba(255,107,107,1)",
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: foodCategories.map(cat => cat.category),
    datasets: [
      {
        data: foodCategories.map(cat => cat.amount),
        backgroundColor: foodCategories.map(cat => cat.color),
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const doughnutData = {
    labels: ['Eaten', 'Leftover', 'Waste'],
    datasets: [
      {
        data: monthlyStats ? [
          monthlyStats.total_eaten,
          monthlyStats.total_leftover,
          monthlyStats.total_waste
        ] : [1280, 200, 145],
        backgroundColor: [
          'rgba(0,214,118,0.8)',
          'rgba(255,193,7,0.8)',
          'rgba(255,107,107,0.8)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };
  if (loading) {
    return (
      <div className="w-full text-white flex items-center justify-center h-64">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="w-full text-white">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-6">Food Waste Dashboard</h1>
      
      {/* Stats Cards */}
      {monthlyStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
            <h3 className="text-sm text-gray-400 mb-1">Total Cooked</h3>
            <p className="text-2xl font-bold text-green-400">{monthlyStats.total_cooked}g</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
            <h3 className="text-sm text-gray-400 mb-1">Efficiency</h3>
            <p className="text-2xl font-bold text-blue-400">{monthlyStats.efficiency}%</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
            <h3 className="text-sm text-gray-400 mb-1">Total Waste</h3>
            <p className="text-2xl font-bold text-red-400">{monthlyStats.total_waste}g</p>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="p-6 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="font-semibold mb-4">Weekly Food Trends</h3>
          <Line data={lineData} />
        </div>

        {/* Bar Chart */}
        <div className="p-6 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="font-semibold mb-4">Daily Food Waste</h3>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="p-6 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="font-semibold mb-4">Food Categories</h3>
          <Pie data={pieData} />
        </div>

        {/* Doughnut Chart */}
        <div className="p-6 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="font-semibold mb-4">Food Distribution</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}
