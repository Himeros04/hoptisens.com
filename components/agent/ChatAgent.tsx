"use client";

import { useChat, Chat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UIMessage } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useMemo } from 'react';
import { MessageSquare, X, Send, AlertCircle } from 'lucide-react';

const WELCOME_MESSAGE =
  "Bonjour ! Je suis Lucio, l'assistant IA d'Hoptisens.\nJe suis là pour comprendre vos besoins en automatisation et vous orienter vers la meilleure solution.\n\nPour commencer : quel est le secteur d'activité de votre entreprise et votre rôle ?";

const STORAGE_KEY = 'hoptisens_chat_messages';

function extractTextContent(message: UIMessage): string {
  const textPart = message.parts.find((p) => p.type === 'text');
  if (textPart && 'text' in textPart) return (textPart as { type: 'text'; text: string }).text;
  return '';
}

const STORAGE_TTL = 24 * 60 * 60 * 1000; // 24h

function loadStoredMessages() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const payload = JSON.parse(stored);
    if (payload.expires && Date.now() > payload.expires) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return payload.messages ?? payload;
  } catch {
    return [];
  }
}

export function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  // Stable Chat instance with persisted messages — recreated when sessionKey changes
  const chat = useMemo(
    () =>
      new Chat({
        messages: loadStoredMessages(),
        transport: new DefaultChatTransport({ api: '/api/chat' }),
      }),
    [sessionKey]
  );

  const { messages, sendMessage, status, error } = useChat({ chat });

  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Persist messages to localStorage (max 10, with TTL)
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      const payload = {
        messages: messages.slice(-10),
        expires: Date.now() + STORAGE_TTL,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [messages]);

  // Auto-scroll on new messages or loading state
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleClearSession = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setSessionKey((k) => k + 1);
  };

  const showWelcome = messages.length === 0;

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le chat Lucio"
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
            className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[520px] bg-[var(--color-bg)] rounded-xl shadow-2xl border border-[var(--color-border)] flex flex-col z-[60] overflow-hidden origin-bottom"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Lucio — Hoptisens</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">Agent IA • En ligne</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearSession}
                    title="Nouvelle conversation"
                    className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-2 py-1 rounded transition-colors"
                  >
                    Réinitialiser
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le chat"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

              {/* Static welcome message when no conversation yet */}
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text-secondary)] whitespace-pre-line">
                    {WELCOME_MESSAGE}
                  </div>
                </motion.div>
              )}

              {/* Conversation messages */}
              {messages.map((message) => {
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
                          : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] rounded-bl-sm'
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
                  <div className="bg-[var(--color-surface)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
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
            <form onSubmit={handleSubmit} className="p-3 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                disabled={isLoading}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Envoyer"
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
