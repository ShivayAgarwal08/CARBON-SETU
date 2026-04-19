import { useState } from 'react';

interface Message {
  type: 'user' | 'bot';
  text: string;
}

export function useClimateCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: 'Hello! I\'m your Climate Coach. Ask me about reducing your carbon footprint through electricity savings, sustainable travel, or diet choices.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('electricity')) {
      return '💡 Here are 2 electricity saving tips:\n\n1. Switch to LED bulbs - they use 75% less energy than traditional bulbs.\n2. Unplug devices when not in use - phantom power can account for 10% of your electricity bill.';
    }

    if (lowerMessage.includes('travel')) {
      return '🚌 Consider these sustainable travel options:\n\nUse public transport like buses or metro - they produce 45% less CO2 per passenger than cars. Carpooling and cycling are also excellent alternatives!';
    }

    if (lowerMessage.includes('diet')) {
      return '🌱 Plant-based diet suggestions:\n\nReducing meat consumption by just 2 days per week can cut your carbon footprint by 35%. Try incorporating more legumes, vegetables, and whole grains into your meals.';
    }

    return '🌍 General eco-tip:\n\nSmall changes make a big difference! Start with one sustainable habit like carrying a reusable water bottle, using cloth bags, or composting food waste. Every action counts toward a healthier planet.';
  };

  const sendMessage = (text: string) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return {
    messages,
    sendMessage,
    isTyping,
    inputValue,
    setInputValue,
  };
}
