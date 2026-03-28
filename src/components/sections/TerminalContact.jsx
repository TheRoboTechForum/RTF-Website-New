import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/animations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const PROMPTS = [
  { key: 'name', prompt: 'Enter your name:', type: 'text' },
  { key: 'email', prompt: 'Enter your email:', type: 'email' },
  { key: 'subject', prompt: 'Subject of your message:', type: 'text' },
  { key: 'message', prompt: 'Type your message:', type: 'text' },
];

/**
 * TerminalContact — A contact form styled as an interactive terminal.
 * User is guided through prompts one at a time, like a CLI.
 */
export default function TerminalContact() {
  const [ref, isInView] = useScrollAnimation(0.2);
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

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when visible
  useEffect(() => {
    if (isInView && inputRef.current && !submitted) {
      inputRef.current.focus();
    }
  }, [isInView, step, submitted]);


  const handleSubmitLine = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      const currentPrompt = PROMPTS[step];

      // Basic email validation
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
        // Show user input + next prompt
        setHistory((h) => [
          ...h,
          { type: 'input', text: trimmed },
          { type: 'system', text: '' },
          { type: 'prompt', text: PROMPTS[nextStep].prompt },
        ]);
        setStep(nextStep);
      } else {
        // All prompts answered — submit
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
    <section className="py-24 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
        className="max-w-2xl mx-auto"
      >
        {/* Section label */}
        <div className="text-center mb-10">
          <span className="text-label text-cyan-400 mb-3 block">// REACH OUT</span>
          <h2 className="text-h2 text-text-primary">Send Us a Message</h2>
          <p className="text-body text-text-secondary mt-3 max-w-lg mx-auto">
            Talk to us the way engineers do — through a terminal.
          </p>
        </div>

        {/* Terminal window */}
        <div className="rounded-card border border-border/50 overflow-hidden shadow-card bg-void">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface/80 border-b border-border/40">
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
                className="text-[10px] font-mono text-text-muted hover:text-cyan-400 transition-colors px-2 py-0.5 border border-border/50 rounded"
              >
                NEW SESSION
              </button>
            )}
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="p-5 font-mono text-sm leading-relaxed h-[380px] overflow-y-auto scrollbar-thin"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="min-h-[1.5em]">
                {line.type === 'system' && (
                  <span className="text-text-muted">{line.text}</span>
                )}
                {line.type === 'prompt' && (
                  <span className="text-cyan-400">
                    <span className="text-text-muted">→ </span>
                    {line.text}
                  </span>
                )}
                {line.type === 'input' && (
                  <span>
                    <span className="text-emerald-400">$ </span>
                    <span className="text-text-primary">{line.text}</span>
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
              <form onSubmit={handleSubmitLine} className="flex items-center mt-1">
                <span className="text-emerald-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type={PROMPTS[step]?.type || 'text'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-text-primary outline-none caret-cyan-400 placeholder:text-text-muted/30"
                  placeholder="type here..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="w-[2px] h-4 bg-cyan-400 animate-blink ml-0.5" />
              </form>
            )}
          </div>
        </div>

        {/* Hint below terminal */}
        <p className="text-center text-xs text-text-muted font-mono mt-4">
          Press <kbd className="px-1.5 py-0.5 bg-elevated border border-border rounded text-text-secondary">Enter</kbd> to submit each field
          {' • '}
          <kbd className="px-1.5 py-0.5 bg-elevated border border-border rounded text-text-secondary">Esc</kbd> to skip intro
        </p>
      </motion.div>
    </section>
  );
}
