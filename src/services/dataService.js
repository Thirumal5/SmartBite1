import { supabase } from '../config/supabase'

export const foodDataService = {
  async getWeeklyData() {
    try {
      const { data, error } = await supabase
        .from('weekly_food_data')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error('Error fetching weekly data:', error)
        return this.getDummyWeeklyData()
      }
      
      return data || this.getDummyWeeklyData()
    } catch (error) {
      console.error('Error in getWeeklyData:', error)
      return this.getDummyWeeklyData()
    }
  },

  getDummyWeeklyData() {
    return [
      { id: 1, date: 'Mon', cooked: 200, eaten: 180, leftover: 20, waste: 15 },
      { id: 2, date: 'Tue', cooked: 210, eaten: 190, leftover: 20, waste: 18 },
      { id: 3, date: 'Wed', cooked: 220, eaten: 195, leftover: 25, waste: 22 },
      { id: 4, date: 'Thu', cooked: 180, eaten: 160, leftover: 20, waste: 12 },
      { id: 5, date: 'Fri', cooked: 260, eaten: 230, leftover: 30, waste: 28 },
      { id: 6, date: 'Sat', cooked: 180, eaten: 160, leftover: 20, waste: 15 },
      { id: 7, date: 'Sun', cooked: 230, eaten: 165, leftover: 65, waste: 35 }
    ]
  },

  async getMonthlyStats() {
    try {
      const { data, error } = await supabase
        .from('monthly_stats')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching monthly stats:', error)
        return this.getDummyMonthlyStats()
      }
      
      return data || this.getDummyMonthlyStats()
    } catch (error) {
      console.error('Error in getMonthlyStats:', error)
      return this.getDummyMonthlyStats()
    }
  },

  getDummyMonthlyStats() {
    return {
      total_cooked: 1480,
      total_eaten: 1280,
      total_leftover: 200,
      total_waste: 145,
      efficiency: 86.5,
      most_wasted_day: 'Sunday',
      least_wasted_day: 'Thursday'
    }
  },

  async getFoodCategories() {
    try {
      const { data, error } = await supabase
        .from('food_categories')
        .select('*')

      if (error) {
        console.error('Error fetching food categories:', error)
        return this.getDummyFoodCategories()
      }
      
      return data || this.getDummyFoodCategories()
    } catch (error) {
      console.error('Error in getFoodCategories:', error)
      return this.getDummyFoodCategories()
    }
  },

  getDummyFoodCategories() {
    return [
      { category: 'Vegetables', amount: 450, color: '#00d676' },
      { category: 'Fruits', amount: 320, color: '#ff6b6b' },
      { category: 'Grains', amount: 380, color: '#4ecdc4' },
      { category: 'Proteins', amount: 280, color: '#45b7d1' },
      { category: 'Dairy', amount: 150, color: '#f7dc6f' },
      { category: 'Others', amount: 100, color: '#bb8fce' }
    ]
  },

  async insertWeeklyData(data) {
    try {
      const { error } = await supabase
        .from('weekly_food_data')
        .insert(data)

      if (error) {
        console.error('Error inserting weekly data:', error)
        return false
      }
      
      return true
    } catch (error) {
      console.error('Error in insertWeeklyData:', error)
      return false
    }
  }
}
