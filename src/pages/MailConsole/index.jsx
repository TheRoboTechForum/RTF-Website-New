import React, { useMemo, useState } from "react";
import "./MailConsole.css";

const MEMBERS = [
  { id: 1, name: "Sanika Ingole", email: "aditi.rao@gmail.com", domain: "AIMLRobotics" },
  { id: 2, name: "Raghav Mehta", email: "karan.mehta@gmail.com", domain: "I.O.T" },
  { id: 3, name: "Nidhi Kulkarni", email: "neha.kulkarni@gmail.com", domain: "Advanced Mechanism" },
  { id: 4, name: "Rohan Iyer", email: "rohan.iyer@gmail.com", domain: "AIML Robotics" },
  { id: 5, name: "Priya Deshpande", email: "priya.shah@gmail.com", domain: "I.O.T" },
  { id: 6, name: "Arjun Patil", email: "arjun.patil@gmail.com", domain: "Advanced Mechanism" },
  { id: 7, name: "Radhika Joshi", email: "sneha.joshi@gmail.com", domain: "AIML Robotics" },
  { id: 8, name: "Vedant Deshmukh", email: "vivek.deshmukh@gmail.com", domain: "Advanced Mechanism" },
];

const DOMAINS = [
  "All Domains",
  "AIML Robotics",
  "I.O.T",
  "Advanced Mechanism",
];

// "Aditi Rao" -> "AR"
const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

function MailConsole() {
  const [activeTab, setActiveTab] = useState("compose");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [domain, setDomain] = useState("All Domains");
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [sentHistory, setSentHistory] = useState([]);
  const [drafts, setDrafts] = useState([]);

  const filteredMembers = useMemo(() => {
    const term = search.toLowerCase().trim();

    return MEMBERS.filter((member) => {
      const matchesDomain =
        domain === "All Domains" || member.domain === domain;

      const matchesSearch =
        !term ||
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term);

      return matchesDomain && matchesSearch;
    });
  }, [domain, search]);

  const selectedMemberObjects = MEMBERS.filter((member) =>
    selectedMembers.includes(member.id)
  );

  const emailedMemberIds = [
    ...new Set(sentHistory.flatMap((item) => item.memberIds)),
  ];

  const toggleMember = (id) => {
    setSelectedMembers((current) =>
      current.includes(id)
        ? current.filter((memberId) => memberId !== id)
        : [...current, id]
    );
  };

  const selectAllVisible = () => {
    const visibleIds = filteredMembers.map((member) => member.id);

    setSelectedMembers((current) =>
      [...new Set([...current, ...visibleIds])]
    );
  };

  const clearSelection = () => setSelectedMembers([]);

  const removeSelectedMember = (id) => {
    setSelectedMembers((current) =>
      current.filter((memberId) => memberId !== id)
    );
  };

  const clearComposer = () => {
    setSubject("");
    setMessage("");
    setAttachment(null);
    setSelectedMembers([]);
  };

  const saveDraft = () => {
    if (!subject.trim() && !message.trim()) {
      alert("Please enter a subject or message before saving a draft.");
      return;
    }

    const draft = {
      id: Date.now(),
      subject: subject.trim() || "Untitled draft",
      message,
      memberIds: [...selectedMembers],
      attachmentName: attachment?.name || null,
      recipients: selectedMemberObjects.length,
      savedAt: new Date().toLocaleString(),
    };

    setDrafts((current) => [draft, ...current]);
    alert("Draft saved successfully.");
  };

  const openDraft = (draft) => {
    setSubject(draft.subject === "Untitled draft" ? "" : draft.subject);
    setMessage(draft.message);
    setSelectedMembers(draft.memberIds);
    setActiveTab("compose");
    // Browser file inputs cannot be repopulated programmatically.
    setAttachment(null);
  };

  const deleteDraft = (id) => {
    setDrafts((current) => current.filter((draft) => draft.id !== id));
  };

  const sendEmail = () => {
    if (selectedMembers.length === 0) {
      alert("Please select at least one recipient.");
      return;
    }

    if (!subject.trim()) {
      alert("Please enter an email subject.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    const historyItem = {
      id: Date.now(),
      memberIds: [...selectedMembers],
      recipients: selectedMemberObjects,
      subject: subject.trim(),
      message,
      attachment: attachment?.name || null,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Demo recorded",
    };

    setSentHistory((current) => [historyItem, ...current]);
    clearComposer();

    alert(
      "Your email has been recorded in the demo history. Actual email delivery requires an email backend."
    );
  };

  return (
    <main className="mail-console-page">
      <div className="mail-console-wrapper">

        {/* PAGE HEADING */}
        <header className="mail-console-title-row">
          <h1 className="mail-console-title">
            Email <span>Console</span>
          </h1>

          
        </header>

        {/* NAVIGATION TABS */}
        <nav className="mail-console-tabs" aria-label="Email console sections">
          <button
            className={activeTab === "compose" ? "active" : ""}
            onClick={() => setActiveTab("compose")}
          >
            <span className="tab-icon">✎</span>
            Compose
          </button>

          <button
            className={activeTab === "history" ? "active" : ""}
            onClick={() => setActiveTab("history")}
          >
            <span className="tab-icon">◷</span>
            Send History
            <span className="tab-count">{sentHistory.length}</span>
          </button>

          <button
            className={activeTab === "drafts" ? "active" : ""}
            onClick={() => setActiveTab("drafts")}
          >
            <span className="tab-icon">▤</span>
            Drafts
            <span className="tab-count">{drafts.length}</span>
          </button>
        </nav>

        {/* MAIN PANELS */}
        {activeTab === "compose" && (
          <section className="mail-console-grid">

            {/* RECIPIENTS */}
            <aside className="recipient-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">RECIPIENTS</span>
                  <h2>Choose recipients</h2>
                </div>

                <span className="selected-badge">
                  {selectedMembers.length} selected
                </span>
              </div>

              <div className="recipient-controls">
                <label className="field-label" htmlFor="member-domain">
                  DOMAINS
                </label>

                <select
                  id="member-domain"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                >
                  {DOMAINS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <label className="search-box">
                  <input
                    type="search"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Search members"
                  />
                </label>

                <div className="selection-row">
                  <button onClick={selectAllVisible}>Select all</button>
                  <button className="muted" onClick={clearSelection}>
                    Clear
                  </button>
                </div>
              </div>

              <div className="recipient-list">
                {filteredMembers.length === 0 ? (
                  <div className="empty-members">
                    <span>⌕</span>
                    <p>No members found</p>
                    <small>Try another name or domain.</small>
                  </div>
                ) : (
                  filteredMembers.map((member) => {
                    const selected = selectedMembers.includes(member.id);

                    return (
                      <label
                        className={`recipient-item ${selected ? "selected" : ""}`}
                        key={member.id}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleMember(member.id)}
                        />

                        <span className="custom-checkbox">
                          {selected ? "✓" : ""}
                        </span>

                        <span className="member-avatar">
                          {getInitials(member.name)}
                        </span>

                        <span className="member-information">
                          <strong>{member.name}</strong>
                          <small>{member.email}</small>
                          <em>{member.domain}</em>
                        </span>
                      </label>
                    );
                  })
                )}
              </div>

              <div className="recipient-panel-footer">
                <span className="footer-status-dot" />
                {selectedMembers.length} of {MEMBERS.length} members selected
              </div>
            </aside>

            {/* COMPOSE EMAIL */}
            <section className="composer-panel">
              <div className="composer-header">
                <div>
                  <span className="panel-kicker">MESSAGE</span>
                  <h2>Compose email</h2>
                </div>

                <span className="recipient-count">
                  {selectedMembers.length} recipient
                  {selectedMembers.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="composer-body">
                <div className="form-group">
                  <label className="field-label">TO</label>

                  <div className="selected-recipients-box">
                    {selectedMemberObjects.length === 0 ? (
                      <span className="placeholder-text">
                        Select recipients from the left
                      </span>
                    ) : (
                      selectedMemberObjects.map((member) => (
                        <span className="recipient-chip" key={member.id}>
                          {member.name}
                          <button
                            type="button"
                            aria-label={`Remove ${member.name}`}
                            onClick={() => removeSelectedMember(member.id)}
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label className="field-label" htmlFor="email-subject">
                      SUBJECT
                    </label>
                    <span>{subject.length}/120</span>
                  </div>

                  <input
                    id="email-subject"
                    className="subject-input"
                    maxLength={120}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Enter email subject"
                  />
                </div>

                <div className="form-group message-group">
                  <div className="label-row">
                    <label className="field-label" htmlFor="email-message">
                      MESSAGE
                    </label>
                    <span>{message.length}/2000</span>
                  </div>

                  <textarea
                    id="email-message"
                    maxLength={2000}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write your message..."
                  />
                </div>

                <div className="attachment-row">
                  <label className="attachment-button">
                    <span className="attachment-icon">↥</span>
                    <span>
                      {attachment ? attachment.name : "Add attachment"}
                    </span>
                    <input
                      type="file"
                      onChange={(event) =>
                        setAttachment(event.target.files?.[0] || null)
                      }
                    />
                  </label>

                  {attachment && (
                    <button
                      className="remove-attachment"
                      onClick={() => setAttachment(null)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="composer-actions">
                <button className="clear-button" onClick={clearComposer}>
                  Clear
                </button>

                <button className="draft-button" onClick={saveDraft}>
                  <span>▤</span> Save Draft
                </button>

                <button className="send-button" onClick={sendEmail}>
                  Send Email <span>↗</span>
                </button>
              </div>
            </section>
          </section>
        )}

        {/* SEND HISTORY */}
        {activeTab === "history" && (
          <section className="history-panel">
            <div className="panel-heading history-heading">
              <div>
                <span className="panel-kicker">ACTIVITY</span>
                <h2>Email send history</h2>
              </div>
              <span className="recipient-count">
                {sentHistory.length} sends
              </span>
            </div>

            {sentHistory.length === 0 ? (
              <div className="empty-history">
                <span className="empty-history-icon">✉</span>
                <h3>No emails sent yet</h3>
                <p>
                  Emails that you send will appear here with their recipients
                  and delivery status.
                </p>
                <button onClick={() => setActiveTab("compose")}>
                  Compose an email
                </button>
              </div>
            ) : (
              <div className="history-table-wrapper">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>RECIPIENTS</th>
                      <th>SUBJECT</th>
                      <th>ATTACHMENT</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sentHistory.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="history-recipients">
                            {item.recipients.map((member) => (
                              <div key={member.id}>
                                <strong>{member.name}</strong>
                                <small>{member.email}</small>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>{item.subject}</td>
                        <td>{item.attachment || "—"}</td>
                        <td>
                          {item.date}
                          <small>{item.time}</small>
                        </td>
                        <td>
                          <span className="sent-status">
                            ● {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* DRAFTS */}
        {activeTab === "drafts" && (
          <section className="history-panel">
            <div className="panel-heading history-heading">
              <div>
                <span className="panel-kicker">SAVED MESSAGES</span>
                <h2>Your drafts</h2>
              </div>
              <span className="recipient-count">{drafts.length} drafts</span>
            </div>

            {drafts.length === 0 ? (
              <div className="empty-history">
                <span className="empty-history-icon">▤</span>
                <h3>No drafts saved</h3>
                <p>Your saved messages will appear here.</p>
                <button onClick={() => setActiveTab("compose")}>
                  Compose a message
                </button>
              </div>
            ) : (
              <div className="draft-list">
                {drafts.map((draft) => (
                  <article className="draft-item" key={draft.id}>
                    <div className="draft-information">
                      <strong>{draft.subject}</strong>
                      <span>
                        {draft.recipients} recipients · Saved {draft.savedAt}
                      </span>
                      {draft.attachmentName && (
                        <small>Attachment: {draft.attachmentName}</small>
                      )}
                    </div>

                    <div className="draft-actions">
                      <button onClick={() => openDraft(draft)}>Edit draft</button>
                      <button
                        className="draft-delete"
                        onClick={() => deleteDraft(draft.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* STATISTICS — SHOWN ON EVERY TAB, BELOW THE PANELS */}
        <section className="mail-stats-grid" aria-label="Email statistics">
          <div className="mail-stat-card">
            <span className="stat-icon">◎</span>
            <div>
              <span className="stat-label">Total Members</span>
              <strong>{MEMBERS.length}</strong>
            </div>
          </div>

          <div
            className={`mail-stat-card ${
              selectedMembers.length > 0 ? "highlight" : ""
            }`}
          >
            <span className="stat-icon">✓</span>
            <div>
              <span className="stat-label">Selected</span>
              <strong>{selectedMembers.length}</strong>
            </div>
          </div>

          <div className="mail-stat-card">
            <span className="stat-icon">✉</span>
            <div>
              <span className="stat-label">Members Emailed</span>
              <strong>{emailedMemberIds.length}</strong>
            </div>
          </div>

          <div className="mail-stat-card">
            <span className="stat-icon">▤</span>
            <div>
              <span className="stat-label">Drafts</span>
              <strong>{drafts.length}</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MailConsole;