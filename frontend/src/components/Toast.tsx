import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`glass-card rounded-2xl p-4 pr-12 border-2 backdrop-blur-xl shadow-lg min-w-[300px] ${
        type === 'success' 
          ? 'border-[#22c55e]/50 bg-[#22c55e]/10' 
          : 'border-red-500/50 bg-red-500/10'
      }`}>
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-[#22c55e] flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          )}
          <p className={`text-sm font-medium ${
            type === 'success' ? 'text-[#22c55e]' : 'text-red-400'
          }`}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
