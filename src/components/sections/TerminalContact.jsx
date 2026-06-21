import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const PROMPTS = [
  { key: 'name', prompt: 'Enter your name:', type: 'text' },
  { key: 'email', prompt: 'Enter your email:', type: 'email' },
  { key: 'subject', prompt: 'Subject of your message:', type: 'text' },
  { key: 'message', prompt: 'Type your message:', type: 'text' },
];

export default function TerminalContact() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'RTF Contact Terminal v1.0' },
    { type: 'system', text: '─────────────────────────────' },
    { type: 'system', text: 'Type your response after each prompt and press Enter.' },
    { type: 'system', text: '' },
    { type: 'prompt', text: PROMPTS[0].prompt },
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmitLine = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      const currentPrompt = PROMPTS[step];

      if (currentPrompt.key === 'email' && !/\S+@\S+\.\S+/.test(trimmed)) {
        setHistory((h) => [
          ...h,
          { type: 'input', text: trimmed },
          { type: 'error', text: '✗ Invalid email address. Try again.' },
          { type: 'prompt', text: currentPrompt.prompt },
        ]);
        setInput('');
        return;
      }

      const updatedData = { ...formData, [currentPrompt.key]: trimmed };
      setFormData(updatedData);

      const nextStep = step + 1;

      if (nextStep < PROMPTS.length) {
        setHistory((h) => [
          ...h,
          { type: 'input', text: trimmed },
          { type: 'system', text: '' },
          { type: 'prompt', text: PROMPTS[nextStep].prompt },
        ]);
        setStep(nextStep);
      } else {
        setHistory((h) => [
          ...h,
          { type: 'input', text: trimmed },
          { type: 'system', text: '' },
          { type: 'system', text: '─────────────────────────────' },
          { type: 'success', text: '✓ Message transmitted successfully.' },
          { type: 'system', text: `  Name:    ${updatedData.name}` },
          { type: 'system', text: `  Email:   ${updatedData.email}` },
          { type: 'system', text: `  Subject: ${updatedData.subject}` },
          { type: 'system', text: `  Message: ${updatedData.message}` },
          { type: 'system', text: '' },
          { type: 'success', text: 'We\'ll get back to you within 24-48 hours.' },
          { type: 'system', text: 'Connection closed.' },
        ]);
        setSubmitted(true);
      }

      setInput('');
    },
    [input, step, formData]
  );

  const handleReset = () => {
    setStep(0);
    setInput('');
    setFormData({});
    setSubmitted(false);
    setHistory([
      { type: 'system', text: 'RTF Contact Terminal v1.0' },
      { type: 'system', text: '─────────────────────────────' },
      { type: 'system', text: 'Type your response after each prompt and press Enter.' },
      { type: 'system', text: '' },
      { type: 'prompt', text: PROMPTS[0].prompt },
    ]);
  };

  return (
    <div className="w-full">
      <div className="rounded-card border border-border/50 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.1)] bg-[#0a0a0a]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-border/40">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs font-mono text-text-muted ml-2">
            rtf@gcoea:~/contact
          </span>
          <div className="flex-1" />
          {submitted && (
            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-text-muted hover:text-red-400 transition-colors px-2 py-0.5 border border-border/50 rounded"
            >
              NEW SESSION
            </button>
          )}
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-5 font-mono text-sm leading-relaxed h-[420px] overflow-y-auto scrollbar-thin"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="min-h-[1.5em] mb-1">
              {line.type === 'system' && (
                <span className="text-text-muted">{line.text}</span>
              )}
              {line.type === 'prompt' && (
                <span className="text-red-500">
                  <span className="text-text-muted">→ </span>
                  {line.text}
                </span>
              )}
              {line.type === 'input' && (
                <span>
                  <span className="text-emerald-400">$ </span>
                  <span className="text-gray-100">{line.text}</span>
                </span>
              )}
              {line.type === 'error' && (
                <span className="text-red-400">{line.text}</span>
              )}
              {line.type === 'success' && (
                <span className="text-emerald-400">{line.text}</span>
              )}
            </div>
          ))}

          {/* Active input line */}
          {!submitted && (
            <form onSubmit={handleSubmitLine} className="flex items-center mt-2">
              <span className="text-emerald-400 mr-2">$</span>
              <input
                ref={inputRef}
                type={PROMPTS[step]?.type || 'text'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-gray-100 outline-none caret-red-500 placeholder:text-text-muted/30"
                placeholder="type here..."
                autoComplete="off"
                spellCheck={false}
              />
              <span className="w-[2px] h-4 bg-red-500 animate-blink ml-0.5" />
            </form>
          )}
        </div>
      </div>

      {/* Hint below terminal */}
      <p className="text-center text-xs text-text-muted font-mono mt-4">
        Press <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-text-secondary">Enter</kbd> to submit each field
        {' • '}
        <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-text-secondary">Esc</kbd> to skip intro
      </p>
    </div>
  );
}
