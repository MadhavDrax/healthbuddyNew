import { useState, useEffect } from 'react';
import { Stethoscope, Heart, Activity, Brain, Moon, Info, RefreshCw, Utensils, Dumbbell } from 'lucide-react';
import { getHealthTip } from '../services/api';

const categories = [
  { id: 'nutrition', label: 'Nutrition', icon: Utensils, color: 'from-orange-500 to-red-500' },
  { id: 'exercise', label: 'Exercise', icon: Dumbbell, color: 'from-blue-500 to-cyan-500' },
  { id: 'mental-health', label: 'Mental Health', icon: Brain, color: 'from-purple-500 to-pink-500' },
  { id: 'sleep', label: 'Sleep', icon: Moon, color: 'from-indigo-500 to-blue-500' },
  { id: 'general', label: 'General', icon: Heart, color: 'from-green-500 to-emerald-500' },
];

function HealthTips() {
  const [currentTip, setCurrentTip] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchTip = async (category = null) => {
    setIsLoading(true);
    try {
      const tip = await getHealthTip(category);
      setCurrentTip(tip);
      setHistory((prev) => [tip, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Error fetching health tip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTip(selectedCategory);
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    fetchTip(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Stethoscope className="w-4 h-4" />
          Daily Wellness Tips
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Health & Wellness Tips
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Discover personalized health tips covering nutrition, exercise, mental wellness, and sleep habits.
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isSelected
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tip Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {currentTip?.category ? categories.find(c => c.id === currentTip.category)?.label : 'Health Tip'}
                </h2>
                <p className="text-green-100 text-sm">
                  {currentTip?.source === 'groq' ? 'AI Generated' : 'From Library'}
                </p>
              </div>
            </div>
            <button
              onClick={() => fetchTip(selectedCategory)}
              disabled={isLoading}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-white ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : currentTip ? (
            <div className="space-y-4">
              <p className="text-lg text-slate-700 leading-relaxed">
                {currentTip.tip}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">
                  Category: {currentTip.category}
                </span>
                <span className="text-sm text-slate-500">
                  {new Date(currentTip.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Info className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Click a category above to get a health tip</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Tips History */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Tips</h3>
          <div className="space-y-3">
            {history.slice(1).map((tip, index) => {
              const category = categories.find(c => c.id === tip.category);
              const Icon = category?.icon || Info;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category?.color || 'from-green-500 to-emerald-500'} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 line-clamp-2">{tip.tip}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {tip.category} • {new Date(tip.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Nutrition</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Learn about balanced diets, healthy eating habits, and nutritional tips for a better lifestyle.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Exercise</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Discover workout routines, fitness tips, and ways to stay active throughout your day.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Mental Health</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Find tips for stress management, mindfulness, and maintaining good mental wellness.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Sleep</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Get advice on improving sleep quality, establishing routines, and rest better.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HealthTips;
