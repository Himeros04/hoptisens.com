"use client";

import { useChat } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';

export function ContactChat() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-surface border-border overflow-hidden rounded-xl">
      <div className="bg-bg p-4 border-b border-border flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-success"></div>
        <span className="font-medium text-sm">Agent Hoptisens en ligne</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-surface-hover/30">
        {messages.length === 0 && (
          <div className="flex-1 p-8 flex items-center justify-center flex-col text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">H</div>
            </div>
            <p className="text-text-muted mb-2 font-mono text-sm max-w-xs">
              Bonjour ! Je suis l'assistant IA d'Hoptisens. Comment puis-je vous aider à pré-qualifier votre projet ou automatiser vos processus aujourd'hui ?
            </p>
          </div>
        )}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {messages.map((message: any) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${message.role === 'user' ? 'bg-[var(--color-accent)]/10 text-[var(--color-text-primary)] rounded-br-sm' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] rounded-bl-sm border border-[var(--color-border)]'}`}>
              {message.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg)]/50 flex gap-2">
        <input
          value={input || ''}
          onChange={handleInputChange}
          placeholder="Écrivez votre message ici..."
          className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input?.trim()}
          className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center disabled:opacity-50 transition-opacity flex-shrink-0"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
