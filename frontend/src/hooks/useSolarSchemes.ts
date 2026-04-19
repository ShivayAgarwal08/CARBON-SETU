import { useState } from 'react';

interface Message {
  type: 'user' | 'bot';
  text: string;
}

type Stage = 'idle' | 'asking_expense' | 'asking_budget' | 'asking_city' | 'providing_recommendations' | 'complete';
type FlowType = 'electricity' | 'solar' | 'subsidy';

export function useSolarSchemes() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: 'Welcome! I can help you with solar solutions and government schemes. Choose an option above to get started.',
    },
  ]);
  const [stage, setStage] = useState<Stage>('idle');
  const [flowType, setFlowType] = useState<FlowType | null>(null);
  const [userInput, setUserInput] = useState('');
  const [collectedData, setCollectedData] = useState({
    expense: '',
    budget: '',
    city: '',
  });

  const handleQuickAction = (type: FlowType) => {
    setFlowType(type);
    setStage('asking_expense');
    
    let message = '';
    if (type === 'electricity') {
      message = 'Great! Let\'s help you save on electricity bills. What is your monthly electricity expense? (in ₹)';
    } else if (type === 'solar') {
      message = 'Excellent choice! Let\'s explore solar installation options. What is your monthly electricity expense? (in ₹)';
    } else {
      message = 'Perfect! Let me guide you through government subsidy options. What is your monthly electricity expense? (in ₹)';
    }
    
    setMessages(prev => [...prev, { type: 'bot', text: message }]);
  };

  const handleUserResponse = (response: string) => {
    setMessages(prev => [...prev, { type: 'user', text: response }]);
    setUserInput('');

    if (stage === 'asking_expense') {
      setCollectedData(prev => ({ ...prev, expense: response }));
      setStage('asking_budget');
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'What is your budget for solar installation? (in ₹)',
      }]);
    } else if (stage === 'asking_budget') {
      setCollectedData(prev => ({ ...prev, budget: response }));
      setStage('asking_city');
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Which city are you located in?',
      }]);
    } else if (stage === 'asking_city') {
      setCollectedData(prev => ({ ...prev, city: response }));
      setStage('providing_recommendations');
      
      // Generate recommendations
      const expense = parseFloat(collectedData.expense) || 5000;
      const budget = parseFloat(collectedData.budget) || 100000;
      const annualSavings = expense * 12 * 0.7; // 70% savings
      const paybackYears = (budget / annualSavings).toFixed(1);
      
      const recommendation = `Based on your information:
📍 Location: ${response}
💰 Monthly Expense: ₹${collectedData.expense}
💵 Budget: ₹${collectedData.budget}

🎯 Recommendations:

1️⃣ PM Surya Ghar Scheme
You're eligible for government subsidy up to ₹78,000 for rooftop solar installation!

2️⃣ Rooftop Solar Installation
Recommended capacity: 3-5 kW system
Estimated cost after subsidy: ₹${(budget * 0.6).toFixed(0)}

3️⃣ ROI Estimate
Annual savings: ₹${annualSavings.toFixed(0)}
Payback period: ${paybackYears} years
25-year savings: ₹${(annualSavings * 25).toFixed(0)}

4️⃣ Private Installers
• Tata Power Solar
• Vikram Solar
• Waaree Energies

Next steps: Apply online at pmsuryaghar.gov.in or contact local installers for site assessment.`;

      setMessages(prev => [...prev, {
        type: 'bot',
        text: recommendation,
      }]);
      setStage('complete');
    }
  };

  return {
    messages,
    stage,
    flowType,
    handleQuickAction,
    handleUserResponse,
    userInput,
    setUserInput,
  };
}
