import { useEffect, useState } from "react";
import { foodDataService } from '../services/dataService';
import { aiService } from '../services/aiService';

export default function Signals(){
  const [suggestions, setSuggestions] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const loadSignalsData = async () => {
      try {
        setLoading(true);
        const weeklyData = await foodDataService.getWeeklyData();
        
        // Generate AI predictions
        const aiPredictions = aiService.predictFoodWaste(weeklyData);
        setPredictions(aiPredictions);
        
        // Generate AI suggestions
        const aiSuggestions = aiService.generateSuggestions(weeklyData);
        setSuggestions(aiSuggestions);
        
        // Add welcome message to chat
        setChatMessages([{
          type: 'bot',
          text: "Hello! I'm your AI food waste assistant. I can help you reduce waste and improve efficiency. Ask me anything!",
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Error loading signals data:', error);
        setSuggestions(aiService.getDefaultSuggestions());
        setPredictions(aiService.getDefaultPredictions());
      } finally {
        setLoading(false);
      }
    };

    loadSignalsData();
  }, []);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      type: 'user',
      text: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    
    try {
      const botResponse = await aiService.getChatResponse(chatInput, {
        historicalData: await foodDataService.getWeeklyData()
      });
      
      const botMessage = {
        type: 'bot',
        text: botResponse.text,
        suggestions: botResponse.suggestions,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getSuggestionIcon = (type) => {
    switch(type) {
      case 'warning': return '⚠️';
      case 'insight': return '💡';
      case 'tip': return '✨';
      case 'recommendation': return '🎯';
      default: return '📊';
    }
  };

  const getSuggestionColor = (type) => {
    switch(type) {
      case 'warning': return 'border-red-500/50 bg-red-500/10';
      case 'insight': return 'border-blue-500/50 bg-blue-500/10';
      case 'tip': return 'border-green-500/50 bg-green-500/10';
      case 'recommendation': return 'border-purple-500/50 bg-purple-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  if (loading) {
    return (
      <div className="w-full text-white flex items-center justify-center h-64">
        <div className="text-xl">Loading AI signals...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-6">AI Signals & Insights</h1>
      
      {/* Predictions Card */}
      {predictions && (
        <div className="p-6 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)] mb-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--primary)]">🔮 AI Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Tomorrow's Waste</p>
              <p className="text-2xl font-bold text-red-400">{predictions.tomorrowWaste}g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Weekly Waste</p>
              <p className="text-2xl font-bold text-orange-400">{predictions.weeklyWaste}g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Trend</p>
              <p className={`text-2xl font-bold ${
                predictions.wasteTrend === 'increasing' ? 'text-red-400' :
                predictions.wasteTrend === 'decreasing' ? 'text-green-400' :
                'text-yellow-400'
              }`}>
                {predictions.wasteTrend}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Efficiency</p>
              <p className="text-2xl font-bold text-green-400">{predictions.efficiency}%</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[var(--primary)]">🤖 AI Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className={`p-4 rounded-xl border ${getSuggestionColor(suggestion.type)}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getSuggestionIcon(suggestion.type)}</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{suggestion.title}</h3>
                  <p className="text-sm text-gray-300">{suggestion.message}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                    suggestion.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                    suggestion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {suggestion.priority} priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traditional Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="font-semibold mb-3">🌤️ Weather Impact</h3>
          <p className="opacity-70">Rain chance: 10% — Temp: 29°C — Humidity: 70%</p>
          <p className="text-sm text-green-400 mt-2">Good conditions for food storage</p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h3 className="font-semibold mb-3">📅 Events</h3>
          <p className="opacity-70">No major events detected.</p>
          <p className="text-sm text-blue-400 mt-2">Regular meal schedule expected</p>
        </div>
      </div>

      {/* AI Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-[var(--primary)] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          💬
        </button>
        
        {showChat && (
          <div className="absolute bottom-16 right-0 w-96 h-96 bg-[var(--glass)] border border-[var(--glass-border)] rounded-xl shadow-xl flex flex-col">
            <div className="p-4 border-b border-[var(--glass-border)]">
              <h3 className="font-semibold text-white">AI Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-[#ffffff10] text-white'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    {msg.suggestions && (
                      <div className="mt-2 space-y-1">
                        {msg.suggestions.map((suggestion, i) => (
                          <button key={i} className="text-xs bg-[#ffffff20] px-2 py-1 rounded hover:bg-[#ffffff30] transition-colors">
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#ffffff10] text-white p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[var(--glass-border)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about reducing waste..."
                  className="flex-1 bg-[#ffffff10] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isTyping}
                  className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-80 disabled:opacity-50 transition-opacity"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
