"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
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
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[var(--color-accent)] text-white shadow-lg z-50 transition-transform hover:scale-105 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 20, scaleY: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[500px] bg-[var(--color-bg)] rounded-xl shadow-2xl border border-[var(--color-border)] flex flex-col z-[60] overflow-hidden origin-bottom"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  H
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Agent Hoptisens</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">En ligne</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-[var(--color-text-secondary)] my-auto">
                  Bonjour ! Je suis l'assistant IA d'Hoptisens. Comment puis-je vous aider à automatiser vos processus aujourd'hui ?
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
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${message.role === 'user' ? 'bg-[var(--color-accent)]/10 text-[var(--color-text-primary)] rounded-br-sm' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] rounded-bl-sm'}`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--color-surface)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-3 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex gap-2">
              <input
                value={input || ''}
                onChange={handleInputChange}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input?.trim()}
                className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center disabled:opacity-50 transition-opacity"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
