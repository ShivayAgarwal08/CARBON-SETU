import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSolarSchemes } from '../hooks/useSolarSchemes';
import { Bot, User, Zap, Sun, DollarSign } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function SolarSchemesPage() {
  const { messages, stage, handleQuickAction, handleUserResponse, userInput, setUserInput } = useSolarSchemes();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleUserResponse(userInput);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Solar & Government Schemes</h2>
        <p className="text-gray-400">Discover solar solutions and government subsidies</p>
      </div>

      {/* Quick Action Buttons */}
      {stage === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleQuickAction('electricity')}
            className="glass-card glass-card-hover h-24 rounded-2xl flex flex-col items-center justify-center gap-2 text-white hover:text-black"
          >
            <Zap className="h-8 w-8 text-[#22c55e]" />
            <span className="font-semibold">Save on Electricity bill</span>
          </Button>
          <Button
            onClick={() => handleQuickAction('solar')}
            className="glass-card glass-card-hover h-24 rounded-2xl flex flex-col items-center justify-center gap-2 text-white hover:text-black"
          >
            <Sun className="h-8 w-8 text-[#22c55e]" />
            <span className="font-semibold">Save on Fuels</span>
          </Button>
          <Button
            onClick={() => handleQuickAction('subsidy')}
            className="glass-card glass-card-hover h-24 rounded-2xl flex flex-col items-center justify-center gap-2 text-white hover:text-black"
          >
            <DollarSign className="h-8 w-8 text-[#22c55e]" />
            <span className="font-semibold">Save on household work</span>
          </Button>
        </div>
      )}

      {/* Chat Interface */}
      <Card className="glass-card rounded-2xl">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white flex items-center gap-2">
            <Sun className="h-5 w-5 text-[#22c55e]" />
            Solar Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-fade-in ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22c55e] to-green-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.type === 'bot'
                      ? 'bg-gradient-to-br from-[#22c55e]/20 to-green-600/20 text-white border border-[#22c55e]/30'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {stage !== 'idle' && stage !== 'complete' && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl"
              />
              <Button
                type="submit"
                disabled={!userInput.trim()}
                className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-black rounded-xl px-6"
              >
                Send
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
