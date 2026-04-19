import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useClimateCoach } from '../hooks/useClimateCoach';
import { Send, Bot, User } from 'lucide-react';

export default function ClimateCoachPage() {
  const { messages, sendMessage, isTyping, inputValue, setInputValue } = useClimateCoach();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-8rem)]">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Climate Coach</h2>
        <p className="text-gray-400">Get personalized sustainability advice from your AI assistant</p>
      </div>

      <Card className="glass-card rounded-2xl h-[calc(100%-5rem)] flex flex-col">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#22c55e]" />
            Chat with Climate Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22c55e] to-green-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gradient-to-br from-[#22c55e]/20 to-green-600/20 rounded-2xl px-4 py-3 border border-[#22c55e]/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about electricity, travel, diet, or sustainability..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-black rounded-xl px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
