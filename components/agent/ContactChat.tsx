"use client";

import { useChat, Chat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const WELCOME_MESSAGE =
  "Bonjour ! Je suis Lucio, l'assistant IA d'Hoptisens.\nJe suis là pour comprendre vos besoins et pré-qualifier votre projet.\n\nPour commencer : quel est le secteur d'activité de votre entreprise et votre rôle ?";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextContent(message: any): string {
  const parts: any[] = message.parts ?? [];
  const textPart = parts.find((p: any) => p.type === 'text');
  if (textPart) return textPart.text;
  if (typeof message.content === 'string') return message.content;
  return '';
}

export function ContactChat() {
  const chat = useMemo(
    () =>
      new Chat({
        transport: new DefaultChatTransport({ api: '/api/chat' }),
      }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({ chat });
  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-xl">
      {/* Header */}
      <div className="bg-[var(--color-bg)] p-4 border-b border-[var(--color-border)] flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="font-medium text-sm text-[var(--color-text-primary)]">Lucio — Agent IA Hoptisens</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[var(--color-surface)]">

        {/* Welcome screen */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm bg-[var(--color-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)] whitespace-pre-line">
              {WELCOME_MESSAGE}
            </div>
          </motion.div>
        )}

        {/* Conversation messages */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {messages.map((message: any) => {
          const content = extractTextContent(message);
          if (!content) return null;
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${
                  message.role === 'user'
                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-text-primary)] rounded-br-sm'
                    : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] rounded-bl-sm border border-[var(--color-border)]'
                }`}
              >
                {content}
              </div>
            </motion.div>
          );
        })}

        {/* Loading dots */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full" />
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2 rounded-xl px-3 py-2 bg-red-500/10 text-red-500 text-xs">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>Une erreur est survenue. Veuillez réessayer ou rafraîchir la page.</span>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre message ici..."
          className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Envoyer"
          className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center disabled:opacity-50 transition-opacity flex-shrink-0"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
