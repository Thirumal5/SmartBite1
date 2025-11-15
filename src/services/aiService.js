// AI Service for food waste predictions and recommendations

export const aiService = {
  // Predict food waste based on historical data
  predictFoodWaste(historicalData) {
    try {
      // Simple AI prediction algorithm based on patterns
      const avgWaste = historicalData.reduce((sum, day) => sum + (day.waste || 0), 0) / historicalData.length;
      const avgCooked = historicalData.reduce((sum, day) => sum + day.cooked, 0) / historicalData.length;
      const avgEaten = historicalData.reduce((sum, day) => sum + day.eaten, 0) / historicalData.length;
      
      const wasteRatio = avgWaste / avgCooked;
      
      // Generate predictions
      const predictions = {
        tomorrowWaste: Math.round(avgWaste * (0.8 + Math.random() * 0.4)),
        weeklyWaste: Math.round(avgWaste * 7 * (0.9 + Math.random() * 0.2)),
        wasteTrend: wasteRatio > 0.15 ? 'increasing' : wasteRatio < 0.08 ? 'decreasing' : 'stable',
        efficiency: ((avgEaten / avgCooked) * 100).toFixed(1)
      };
      
      return predictions;
    } catch (error) {
      console.error('Error in AI prediction:', error);
      return this.getDefaultPredictions();
    }
  },

  getDefaultPredictions() {
    return {
      tomorrowWaste: 25,
      weeklyWaste: 180,
      wasteTrend: 'stable',
      efficiency: '85.5'
    };
  },

  // Generate AI suggestions based on data
  generateSuggestions(data) {
    const suggestions = [];
    
    try {
      const avgWaste = data.reduce((sum, day) => sum + (day.waste || 0), 0) / data.length;
      const maxWasteDay = data.reduce((max, day) => (day.waste || 0) > (max.waste || 0) ? day : max);
      
      if (avgWaste > 30) {
        suggestions.push({
          type: 'warning',
          title: 'High Waste Detected',
          message: 'Your average waste is above recommended levels. Consider reducing portion sizes.',
          priority: 'high'
        });
      }
      
      if (maxWasteDay.waste > 50) {
        suggestions.push({
          type: 'insight',
          title: `${maxWasteDay.date} Peak Waste`,
          message: `${maxWasteDay.date} shows highest waste. Review meal planning for this day.`,
          priority: 'medium'
        });
      }
      
      suggestions.push({
        type: 'tip',
        title: 'Smart Planning',
        message: 'Based on your patterns, try cooking 10% less on weekends to reduce waste.',
        priority: 'low'
      });
      
      suggestions.push({
        type: 'recommendation',
        title: 'Storage Optimization',
        message: 'Proper storage could reduce waste by up to 20%. Consider airtight containers.',
        priority: 'medium'
      });
      
    } catch (error) {
      console.error('Error generating suggestions:', error);
      suggestions.push(...this.getDefaultSuggestions());
    }
    
    return suggestions;
  },

  getDefaultSuggestions() {
    return [
      {
        type: 'tip',
        title: 'Meal Prep',
        message: 'Plan meals for the week to reduce impulse buying and waste.',
        priority: 'low'
      },
      {
        type: 'recommendation',
        title: 'Leftover Recipes',
        message: 'Transform leftovers into new meals to maximize food usage.',
        priority: 'medium'
      }
    ];
  },

  // Simulate AI chatbot responses
  async getChatResponse(message, context = {}) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('waste') || lowerMessage.includes('reduce')) {
      return {
        text: "Based on your data, you can reduce waste by: 1) Cooking 10% less portions, 2) Storing food properly, 3) Using leftovers creatively. Would you like specific recipes for your common leftovers?",
        suggestions: ['Portion control tips', 'Storage methods', 'Leftover recipes']
      };
    }
    
    if (lowerMessage.includes('predict') || lowerMessage.includes('forecast')) {
      const prediction = this.predictFoodWaste(context.historicalData || []);
      return {
        text: `I predict you'll waste about ${prediction.tomorrowWaste}g tomorrow. Your weekly efficiency is ${prediction.efficiency}%. Would you like tips to improve this?`,
        suggestions: ['Improve efficiency', 'Reduce waste', 'Meal planning']
      };
    }
    
    if (lowerMessage.includes('meal') || lowerMessage.includes('recipe')) {
      return {
        text: "I can suggest meals based on your eating patterns! You seem to prefer balanced meals with moderate portions. Try batch cooking on Sundays to save time during the week.",
        suggestions: ['Weekly meal plan', 'Batch recipes', 'Shopping list']
      };
    }
    
    return {
      text: "I'm here to help you reduce food waste! I can analyze your patterns, predict waste, and suggest personalized tips. What would you like to know?",
      suggestions: ['Waste prediction', 'Efficiency tips', 'Meal planning']
    };
  }
};
