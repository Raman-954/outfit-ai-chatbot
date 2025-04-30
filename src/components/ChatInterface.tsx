'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentWeather } from '@/services/weatherService';
import { getGeminiResponse } from '@/services/geminiService';
import { OutfitRecommendation, WeatherData } from '@/types/outfit';
import { marked } from 'marked';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  recommendations?: OutfitRecommendation[];
  weather?: WeatherData;
};

type Gender = 'male' | 'female' | null;

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [gender, setGender] = useState<Gender>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    "What should I wear today?",
    "Help me plan an outfit for a business meeting"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Change placeholder text every 3 seconds
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Ask for location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setLocationError('Location access denied or unavailable. Using default location (New Delhi).');
          setUserLocation({ lat: 28.6139, lon: 77.2090 });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser. Using default location (New Delhi).');
      setUserLocation({ lat: 28.6139, lon: 77.2090 });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Check if user is asking about the creator
    const creatorRegex = /who (created|made) (you|this|the chatbot)|your creator|who is your creator|who are your creators|who developed (you|this|the chatbot)/i;
    if (creatorRegex.test(input)) {
      const creatorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: `I'm delighted you asked! I was created by Raman Kumar, Ritu Raj, and Tejas V. Krishna. They designed and developed me to help you with personalized outfit recommendations. 😊`,
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, creatorMessage]);
      setIsLoading(false);
      return;
    }

    // Check if user is asking something unrelated to outfits
    const outfitKeywords = /outfit|recommendation|recommend|clothes|dress|wear|attire|fashion|what should i wear|suggest/i;
    if (!outfitKeywords.test(input)) {
      const errorMessage: Message = {
        id: (Date.now() + 3).toString(),
        text: `I'm OutFIT AI, your personal outfit assistant! 🌟 I specialize in helping you choose what to wear based on weather and occasion. Please ask me about outfits, clothing, or fashion recommendations.`,
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
      return;
    }

    try {
      // Use user location if available
      const lat = userLocation ? userLocation.lat : 28.6139;
      const lon = userLocation ? userLocation.lon : 77.2090;
      const weatherData: WeatherData = await getCurrentWeather(lat, lon);
      // Compose context for Gemini
      const context = `Current weather in ${weatherData.city}, ${weatherData.country}:\n- Temperature: ${weatherData.temperature}°C\n- Climate: ${weatherData.description}\n- Humidity: ${weatherData.humidity}%\n- Wind Speed: ${weatherData.windSpeed} m/s\n- Season: ${weatherData.season}\n- Time of Day: ${weatherData.timeOfDay}`;
      // Call Gemini API for response, passing context
      const geminiReply = await getGeminiResponse(input + "\n" + context);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `__WEATHER_BLOCK__\n${geminiReply}`,
        sender: 'assistant',
        weather: weatherData,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while getting a response from Gemini. Please try again.',
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    
    // Add a message about gender selection
    const genderMessage: Message = {
      id: Date.now().toString(),
      text: `Thank you for selecting ${selectedGender}. Now I can provide more personalized outfit recommendations. What would you like to wear today?`,
      sender: 'assistant',
    };
    
    setMessages((prev) => [...prev, genderMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-indigo-50 to-white">
      {locationError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p><strong>Location Notice:</strong> {locationError}</p>
          <p>If the detected location is incorrect, please check your browser settings or try a different browser/device for better accuracy.</p>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Welcome to Outfit Planner</h2>
            <p className="text-gray-600 mb-6">I can help you plan the perfect outfit based on weather and occasion.</p>
            
            {gender === null ? (
              <div className="space-y-4">
                <p className="text-gray-700 font-medium">Please select your gender for personalized recommendations:</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleGenderSelect('male')}
                    className="gender-btn"
                  >
                    Male
                  </button>
                  <button
                    onClick={() => handleGenderSelect('female')}
                    className="gender-btn"
                  >
                    Female
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">Weather-Based</h3>
                  <p className="text-gray-600">Get recommendations based on current weather conditions.</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">Activity-Based</h3>
                  <p className="text-gray-600">Get recommendations for specific occasions or activities.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 shadow-sm text-gray-800'
                }`}
              >
                {/* Render markdown for assistant messages for better formatting */}
                {message.sender === 'assistant' ? (
                  <div className="mb-2">
                    {message.text.startsWith('__WEATHER_BLOCK__') && message.weather ? (
                      <div className="flex items-center bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-2 shadow-sm">
                        <div className="weather-video-glow mr-4">
                          <img src="/weathericon.gif" alt="Weather Icon" className="weather-video" />
                        </div>
                        <div>
                          <div className="weather-title">Weather Details in {message.weather?.city}, {message.weather?.country}</div>
                          <div className="weather-meta">{message.weather?.description?.charAt(0).toUpperCase() + (message.weather?.description?.slice(1) || '')} • {message.weather?.temperature}°C • {(message.weather?.season ? message.weather.season.charAt(0).toUpperCase() + message.weather.season.slice(1) : 'N/A')} • {(message.weather?.timeOfDay ? message.weather.timeOfDay.charAt(0).toUpperCase() + message.weather.timeOfDay.slice(1) : 'N/A')}</div>
                          <div className="weather-submeta">Humidity: {message.weather?.humidity ?? 'N/A'}% | Wind: {message.weather?.windSpeed ?? 'N/A'} m/s</div>
                        </div>
                      </div>
                    ) : null}
                    <div
                      className="prose max-w-none assistant-response"
                      dangerouslySetInnerHTML={{ __html: marked.parse(message.text.replace('__WEATHER_BLOCK__', '')) }}
                    />
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
                
                {message.recommendations && message.recommendations.map((rec, index) => (
                  <div key={index} className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="font-medium text-indigo-700 capitalize">{rec.outfit.occasion} Outfit</p>
                    <p className="text-sm text-gray-600 mt-1">{rec.reasoning}</p>
                    
                    {rec.outfit.items.length > 0 && (
                      <div className="mt-3">
                        <p className="font-medium text-gray-700">Items:</p>
                        <ul className="list-disc list-inside text-gray-600 mt-1">
                          {rec.outfit.items.map((item) => (
                            <li key={item.id}>{item.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Sample Prompts Near Search Bar */}
      <div className="mb-2 flex flex-wrap gap-2 justify-center">
        {[
          "What should I wear today?",
          "Suggest an outfit for the office",
          "What to wear for a winter evening?",
          "Help me pick a party outfit"
        ].map((suggestion, idx) => (
          <button
            key={idx}
            className="bg-indigo-50 hover:bg-indigo-200 text-indigo-700 font-medium px-2 py-1 rounded-full border border-indigo-100 text-xs transition"
            onClick={() => setInput(suggestion)}
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>
      {/* End Sample Prompts Near Search Bar */}
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=""
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 text-gray-800"
            />
            {input === '' && (
              <div className="absolute inset-0 flex items-center pl-3 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400"
                  >
                    {placeholders[placeholderIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || input.trim() === ''}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
