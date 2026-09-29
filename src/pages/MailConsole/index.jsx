import { useState, useEffect, useRef } from 'react';
import './MailConsole.css';

const RECIPIENTS = [
  { id: 1, name: 'Anushka Garpawar', email: 'aditi.rao@gmail.com', group: 'AIML' },
  { id: 2, name: 'Radhika Roy', email: 'karan.mehta@gmail.com', group: 'IOT' },
  { id: 3, name: 'sanika Kulkarni', email: 'neha.kulkarni@gmail.com', group: 'Advanced Mechanism' },
  { id: 4, name: 'Rohan Deshmukh', email: 'rohan.iyer@gmail.com', group: 'Robotics' },
  { id: 5, name: 'divya Shah', email: 'priya.shah@gmail.com', group: 'IOT' },
  { id: 6, name: 'Arjun Patil', email: 'arjun.patil@gmail.com', group: 'Advanced Mechanism' },
  { id: 7, name: 'mukta Joshi', email: 'sneha.joshi@gmail.com', group: 'Robotics' },
  { id: 8, name: 'gaurav Desai', email: 'vikram.desai@gmail.com', group: 'IOT' },
];

const SUBJECT_LIMIT = 120;
const MESSAGE_LIMIT = 2000;

/* ---------------- Interactive canvas dot-grid, glows red near cursor ---------------- */
function DotGridBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;
    const spacing = 26;
    const maxDist = 170;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function handleMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', handleMove);

    function handleLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }
    window.addEventListener('mouseout', handleLeave);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my } = mouseRef.current;

      for (let y = 0; y <= height; y += spacing) {
        for (let x = 0; x <= width; x += spacing) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let radius = 1.1;
          let color = 'rgba(255,255,255,0.06)';
          let glow = 0;

          if (dist < maxDist) {
            const t = 1 - dist / maxDist;
            radius = 1.1 + t * 2.2;
            const g = Math.round(255 - t * 215);
            const b = Math.round(255 - t * 212);
            color = `rgba(255,${g},${b},${0.12 + t * 0.85})`;
            glow = t * 12;
          }

          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.shadowColor = 'rgba(255,46,46,0.85)';
          ctx.shadowBlur = glow;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="dotgrid-canvas" />;
}

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function MailConsole() {
  const [activeTab, setActiveTab] = useState('compose'); // 'compose' | 'history'
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('all');
  const [selected, setSelected] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [history, setHistory] = useState([]);

  const domains = ['all', ...new Set(RECIPIENTS.map((r) => r.email.split('@')[1]))];

  const filtered = RECIPIENTS.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = domain === 'all' || r.email.endsWith(`@${domain}`);
    return matchesSearch && matchesDomain;
  });

  const selectedRecipients = RECIPIENTS.filter((r) => selected.includes(r.id));

  const toggleOne = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const removeChip = (id) => setSelected((prev) => prev.filter((x) => x !== id));
  const selectAll = () => setSelected(filtered.map((r) => r.id));
  const clearAll = () => setSelected([]);

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 2800);
  };

  const resetComposeFields = () => {
    setSubject('');
    setMessage('');
    setAttachment(null);
  };

  const handleClear = () => resetComposeFields();

  const handleSaveDraft = () => {
    if (!subject.trim() && !message.trim()) return;
    setDrafts((prev) => [
      { id: Date.now(), subject: subject || '(no subject)', recipients: selected.length },
      ...prev,
    ]);
    showToast('Draft saved');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (selected.length === 0 || !subject.trim()) return;
    setSending(true);

    setTimeout(() => {
      const entry = {
        id: Date.now(),
        recipients: selectedRecipients.map((r) => r.name),
        subject,
        status: 'sent',
        ts: Date.now(),
      };
      setHistory((prev) => [entry, ...prev]);
      setSending(false);
      showToast(`Sent to ${selected.length} recipient${selected.length > 1 ? 's' : ''}`);
      resetComposeFields();
      setSelected([]);
    }, 700);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const totalMembers = RECIPIENTS.length;
  const membersEmailed = new Set(history.flatMap((h) => h.recipients)).size;
  const draftsCount = drafts.length;

  return (
    <div className="mail-console">
      <DotGridBackground />

      {toast && <div className="mail-toast">{toast}</div>}

      <div className="mail-content">
        {/* Page header */}
        <div className="page-header">
          <h1 className="page-title">
            Email <span className="page-title-accent">Console</span>
          </h1>
          <span className="page-date">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Tabs */}
        <div className="mail-tabs">
          <button
            className={`mail-tab ${activeTab === 'compose' ? 'active' : ''}`}
            onClick={() => setActiveTab('compose')}
          >
            ✎ Compose
          </button>
          <button
            className={`mail-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            🕐 Send History <span className="tab-count">{history.length}</span>
          </button>
        </div>

        {/* ---------------- COMPOSE TAB ---------------- */}
        {activeTab === 'compose' && (
          <div className="mail-grid">
            {/* Recipients panel */}
            <div className="mail-card">
              <div className="card-eyebrow">Recipients</div>
              <div className="card-title-row">
                <h2 className="card-title">Choose recipients</h2>
                <span className="pill-badge">{selected.length} selected</span>
              </div>

              <label className="field-label">Domains</label>
              <select
                className="mail-select"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d === 'all' ? 'All Domains' : `@${d}`}
                  </option>
                ))}
              </select>

              <input
                className="mail-input"
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="mail-select-row">
                <button className="mail-link-btn" onClick={selectAll}>
                  Select all
                </button>
                <button className="mail-link-btn mail-link-muted" onClick={clearAll}>
                  Clear
                </button>
              </div>

              <div className="mail-recipient-list">
                {filtered.map((r) => (
                  <label key={r.id} className="recipient-row">
                    <input
                      type="checkbox"
                      checked={selected.includes(r.id)}
                      onChange={() => toggleOne(r.id)}
                    />
                    <span className="avatar">{initials(r.name)}</span>
                    <span className="recipient-info">
                      <span className="recipient-name">{r.name}</span>
                      <span className="recipient-email">{r.email}</span>
                      <span className="recipient-group">{r.group}</span>
                    </span>
                  </label>
                ))}
                {filtered.length === 0 && (
                  <p className="empty-state">No recipients found.</p>
                )}
              </div>
            </div>

            {/* Compose panel */}
            <form className="mail-card compose-card" onSubmit={handleSend}>
              <div className="card-eyebrow">Message</div>
              <div className="card-title-row">
                <h2 className="card-title">Compose email</h2>
                <span className="muted-small">{selected.length} recipients</span>
              </div>

              <label className="field-label">To</label>
              <div className="to-box">
                {selectedRecipients.length === 0 ? (
                  <span className="to-placeholder">Select recipients from the left</span>
                ) : (
                  selectedRecipients.map((r) => (
                    <span key={r.id} className="to-chip">
                      {r.name}
                      <button
                        type="button"
                        className="to-chip-remove"
                        onClick={() => removeChip(r.id)}
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="field-label-row">
                <label className="field-label">Subject</label>
                <span className="char-counter">
                  {subject.length}/{SUBJECT_LIMIT}
                </span>
              </div>
              <input
                className="mail-input"
                type="text"
                placeholder="Enter email subject"
                value={subject}
                maxLength={SUBJECT_LIMIT}
                onChange={(e) => setSubject(e.target.value)}
              />

              <div className="field-label-row">
                <label className="field-label">Message</label>
                <span className="char-counter">
                  {message.length}/{MESSAGE_LIMIT}
                </span>
              </div>
              <textarea
                className="mail-textarea"
                placeholder="Write your message..."
                value={message}
                maxLength={MESSAGE_LIMIT}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="compose-footer">
                <label className="mail-attach-btn">
                  📎 Add attachment
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setAttachment(e.target.files[0])}
                  />
                </label>
                {attachment && (
                  <span className="mail-file-name">
                    {attachment.name}
                    <button
                      type="button"
                      className="file-remove"
                      onClick={() => setAttachment(null)}
                    >
                      ×
                    </button>
                  </span>
                )}

                <div className="footer-actions">
                  <button type="button" className="btn-ghost" onClick={handleClear}>
                    Clear
                  </button>
                  <button type="button" className="btn-outline" onClick={handleSaveDraft}>
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={sending || selected.length === 0 || !subject.trim()}
                  >
                    {sending ? 'Sending…' : '+ Send Email'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ---------------- HISTORY TAB ---------------- */}
        {activeTab === 'history' && (
          <div className="mail-card history-card">
            <div className="card-eyebrow">Activity</div>
            <div className="card-title-row">
              <h2 className="card-title">Email send history</h2>
              <span className="muted-small">{history.length} sends</span>
            </div>

            {history.length === 0 ? (
              <div className="history-empty">
                <div className="history-empty-icon">✉</div>
                <h3>No emails sent yet</h3>
                <p>Emails that you send will appear here with their recipients and delivery status.</p>
              </div>
            ) : (
              <div className="history-list">
                {history.map((h) => (
                  <div key={h.id} className="history-row">
                    <div className="history-row-main">
                      <span className="history-subject">{h.subject}</span>
                      <span className="history-recipients">
                        {h.recipients.join(', ')}
                      </span>
                    </div>
                    <div className="history-row-side">
                      <span className="history-time">{timeAgo(h.ts)}</span>
                      <span className="status-pill">Sent</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats bar — moved to bottom */}
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-icon">◎</span>
            <div>
              <div className="stat-label">Total Members</div>
              <div className="stat-value">{totalMembers}</div>
            </div>
          </div>
          <div className="stat-card stat-card-red">
            <span className="stat-icon">✓</span>
            <div>
              <div className="stat-label">Selected</div>
              <div className="stat-value">{selected.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✉</span>
            <div>
              <div className="stat-label">Members Emailed</div>
              <div className="stat-value">{membersEmailed}</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">▭</span>
            <div>
              <div className="stat-label">Drafts</div>
              <div className="stat-value">{draftsCount}</div>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
        ▲
      </button>
    </div>
  );
}

export default MailConsole;