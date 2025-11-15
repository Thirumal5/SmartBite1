import { useEffect, useState } from "react";
import { foodDataService } from '../services/dataService';

export default function History(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        // Get weekly data and transform it for history table
        const weeklyData = await foodDataService.getWeeklyData();
        
        // Create more detailed history records
        const historyData = weeklyData.flatMap(day => [
          {
            date: day.date,
            mealType: 'Breakfast',
            cooked: Math.round(day.cooked * 0.3),
            eaten: Math.round(day.eaten * 0.3),
            leftover: Math.round(day.leftover * 0.3),
            waste: Math.round((day.waste || 0) * 0.3)
          },
          {
            date: day.date,
            mealType: 'Lunch',
            cooked: Math.round(day.cooked * 0.4),
            eaten: Math.round(day.eaten * 0.4),
            leftover: Math.round(day.leftover * 0.4),
            waste: Math.round((day.waste || 0) * 0.4)
          },
          {
            date: day.date,
            mealType: 'Dinner',
            cooked: Math.round(day.cooked * 0.3),
            eaten: Math.round(day.eaten * 0.3),
            leftover: Math.round(day.leftover * 0.3),
            waste: Math.round((day.waste || 0) * 0.3)
          }
        ]);
        
        setRows(historyData);
      } catch (error) {
        console.error('Error fetching history data:', error);
        // Fallback to dummy data
        setRows(getDummyHistoryData());
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  const getDummyHistoryData = () => [
    { date: '2024-01-15', mealType: 'Breakfast', cooked: 150, eaten: 140, leftover: 10, waste: 8 },
    { date: '2024-01-15', mealType: 'Lunch', cooked: 200, eaten: 180, leftover: 20, waste: 15 },
    { date: '2024-01-15', mealType: 'Dinner', cooked: 180, eaten: 160, leftover: 20, waste: 12 },
    { date: '2024-01-14', mealType: 'Breakfast', cooked: 140, eaten: 130, leftover: 10, waste: 7 },
    { date: '2024-01-14', mealType: 'Lunch', cooked: 210, eaten: 195, leftover: 15, waste: 10 },
    { date: '2024-01-14', mealType: 'Dinner', cooked: 170, eaten: 150, leftover: 20, waste: 15 },
    { date: '2024-01-13', mealType: 'Breakfast', cooked: 160, eaten: 145, leftover: 15, waste: 12 },
    { date: '2024-01-13', mealType: 'Lunch', cooked: 190, eaten: 175, leftover: 15, waste: 8 },
    { date: '2024-01-13', mealType: 'Dinner', cooked: 200, eaten: 170, leftover: 30, waste: 20 }
  ];

  if (loading) {
    return (
      <div className="w-full text-white flex items-center justify-center h-64">
        <div className="text-xl">Loading history data...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">Food History</h1>
      <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)] overflow-x-auto">
        <table className="w-full">
          <thead className="text-[var(--primary-soft)]">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Meal</th>
              <th className="p-2 text-right">Cooked (g)</th>
              <th className="p-2 text-right">Eaten (g)</th>
              <th className="p-2 text-right">Leftover (g)</th>
              <th className="p-2 text-right">Waste (g)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="odd:bg-[#ffffff06] hover:bg-[#ffffff10] transition-colors">
                <td className="p-2">{r.date}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    r.mealType === 'Breakfast' ? 'bg-yellow-500/20 text-yellow-300' :
                    r.mealType === 'Lunch' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {r.mealType}
                  </span>
                </td>
                <td className="p-2 text-right">{r.cooked}</td>
                <td className="p-2 text-right text-green-400">{r.eaten}</td>
                <td className="p-2 text-right text-yellow-400">{r.leftover}</td>
                <td className="p-2 text-right text-red-400">{r.waste || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="text-sm text-gray-400 mb-1">Total Cooked</h3>
          <p className="text-xl font-bold text-blue-400">
            {rows.reduce((sum, r) => sum + r.cooked, 0)}g
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="text-sm text-gray-400 mb-1">Total Eaten</h3>
          <p className="text-xl font-bold text-green-400">
            {rows.reduce((sum, r) => sum + r.eaten, 0)}g
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="text-sm text-gray-400 mb-1">Total Waste</h3>
          <p className="text-xl font-bold text-red-400">
            {rows.reduce((sum, r) => sum + (r.waste || 0), 0)}g
          </p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="text-sm text-gray-400 mb-1">Efficiency</h3>
          <p className="text-xl font-bold text-yellow-400">
            {((rows.reduce((sum, r) => sum + r.eaten, 0) / rows.reduce((sum, r) => sum + r.cooked, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
