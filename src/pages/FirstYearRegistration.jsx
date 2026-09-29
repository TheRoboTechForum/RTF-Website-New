import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const SHEET_URL = 'PASTE_BACKEND_URL_HERE';

const DOMAINS = ['Software', 'Electrical', 'Aeronautics', 'Mechanical'];
const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
];

const generateTempRtfId = () => `RTF-${Math.floor(100000 + Math.random() * 900000)}`;

const emptyForm = {
  name: '',
  email: '',
  branch: '',
  yop: '2030',
  phone: '',
  domain: '',
  rtfId: generateTempRtfId(),
  tenth: '',
  twelfth: '',
  cet: '',
  jee: '',
  diploma: '',
};


const inputClass =
  'w-full bg-black/50 border border-zinc-700/80 rounded-lg px-4 py-2.5 text-white ' +
  'placeholder-gray-500 focus:outline-none focus:border-red-600 transition backdrop-blur-xs';

const labelClass = 'block text-sm font-medium text-gray-300 mb-1';

export default function FirstYearRegistration() {
  const navigate = useNavigate();
  const [type, setType] = useState('first'); // 'first' or 'dsy'
  const [form, setForm] = useState(emptyForm);
  const [step, setStep] = useState('form'); // 'form' -> 'review' -> 'done'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleType = (t) => {
    setType(t);
    setForm((prev) => ({ ...prev, yop: t === 'first' ? '2030' : '2029' }));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Step 1: Check details, then show the review screen
  const handleReview = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setStep('review');
    window.scrollTo(0, 0);
  };

  
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const payload = {
      type,
      ...form,
      createdAt: Date.now(),
    };

    try {
      if (SHEET_URL.includes('PASTE_BACKEND_URL_HERE')) {
        console.log('Form data payload:', payload);
      } else {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      }
      setStep('done');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const tabClass = (active) =>
    'flex-1 py-2.5 rounded-lg font-semibold text-sm transition ' +
    (active
      ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
      : 'bg-black/40 border border-zinc-700/80 text-gray-300 hover:border-red-600 hover:text-white');

  
  if (step === 'done') {
    return (
      <div className="min-h-screen pt-28 pb-12 px-4 flex items-center justify-center bg-transparent">
        <div className="text-center space-y-3 bg-black/40 border border-red-600/50 rounded-2xl p-8 max-w-md w-full backdrop-blur-md shadow-2xl">
          <h2 className="text-3xl font-bold text-red-600">Registration Successful!</h2>
          <p className="text-gray-300 text-sm">
            Thank you for registering with <strong className="text-white">The Robo-Tech Forum</strong>.
          </p>
        </div>
      </div>
    );
  }

  // ---------- Review screen ----------
  if (step === 'review') {
    const rows = [
      ['Student Type', type === 'first' ? 'First Year ' : 'DSY '],
      ['Name', form.name],
      ['Personal Email', form.email],
      ['Branch', form.branch],
      ['Year of Passing', form.yop],
      ['Phone', form.phone],
      ['Domain', form.domain],
      ['RTF ID (Temp)', form.rtfId],
      ['10th Score (%)', `${form.tenth}%`],
      ...(type === 'first'
        ? [
            ['12th Score (%)', `${form.twelfth}%`],
            ['CET Score (%)', `${form.cet}%`],
            ['JEE Main Score (%)', form.jee ? `${form.jee}%` : 'N/A (Optional)'],
          ]
        : [['Diploma Percentage (%)', `${form.diploma}%`]]),
    ];

    return (
      <div className="min-h-screen pt-28 pb-12 px-4 text-white flex items-center justify-center bg-transparent">
        <div className="relative w-full max-w-lg bg-black/40 border border-red-600/40 rounded-2xl p-6 md:p-8 space-y-5 backdrop-blur-md shadow-2xl">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Back to home"
            title="Back to home"
            className="absolute top-4 left-4 p-2 text-gray-400 hover:text-red-500 transition"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-center">
            Verify Your <span className="text-red-600">Details</span>
          </h1>
          <p className="text-center text-gray-400 text-sm">
            Please check everything carefully before submitting.
          </p>

          <div className="divide-y divide-zinc-800/80">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5 text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-medium text-right break-all">{value}</span>
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep('form')}
              className="flex-1 py-3 rounded-lg border border-zinc-700 text-gray-300 hover:border-red-600 hover:text-white transition"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-red-950/40"
            >
              {loading ? 'Submitting...' : 'Confirm & Submit'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Form screen ----------
  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-16 px-4 text-white flex items-center justify-center bg-transparent">
      <form
        onSubmit={handleReview}
        className="relative w-full max-w-xl bg-black/40 border border-red-600/40 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-md shadow-2xl"
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Back to home"
          title="Back to home"
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-red-500 transition"
        >
          <FaArrowLeft />
        </button>
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">
            RTF <span className="text-red-600">Registration</span>
          </h1>
          <p className="text-gray-400 text-sm">Select your admission type and enter your details</p>
        </div>

        {/* Admission Mode Switcher */}
        <div className="flex gap-3">
          <button type="button" onClick={() => handleType('first')} className={tabClass(type === 'first')}>
            First Year
          </button>
          <button type="button" onClick={() => handleType('dsy')} className={tabClass(type === 'dsy')}>
            DSY / Diploma
          </button>
        </div>

        {/* SECTION 1: COMMON DETAILS */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-red-500 tracking-wider uppercase border-b border-zinc-800/80 pb-2">
            1. Basic Information
          </h2>

          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Steve Doe"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Personal Email ID *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="xyz@gmail.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                name="phone"
                type="tel"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Branch *</label>
              <select name="branch" value={form.branch} onChange={handleChange} className={inputClass} required>
                <option value="" disabled className="bg-zinc-950">Select Branch</option>
                {BRANCHES.map((b) => (
                  <option key={b} value={b} className="bg-zinc-950 text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Domain *</label>
              <select name="domain" value={form.domain} onChange={handleChange} className={inputClass} required>
                <option value="" disabled className="bg-zinc-950">Select Domain</option>
                {DOMAINS.map((d) => (
                  <option key={d} value={d} className="bg-zinc-950 text-white">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Year of Passing</label>
              <input name="yop" value={form.yop} readOnly className={`${inputClass} opacity-60 cursor-not-allowed`} />
            </div>

            <div>
              <label className={labelClass}>RTF ID (Temp)</label>
              <input name="rtfId" value={form.rtfId} readOnly className={`${inputClass} opacity-60 cursor-not-allowed`} />
            </div>
          </div>

          <div>
            <label className={labelClass}>10th Score (%) *</label>
            <input
              name="tenth"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={form.tenth}
              onChange={handleChange}
              placeholder="e.g. 88.5"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* SECTION 2: CONDITIONAL ACADEMIC DETAILS */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-semibold text-red-500 tracking-wider uppercase border-b border-zinc-800/80 pb-2">
            2. {type === 'first' ? 'First Year Academic Scores' : 'DSY Academic Scores'}
          </h2>

          {type === 'first' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>12th Score (%) *</label>
                <input
                  name="twelfth"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.twelfth}
                  onChange={handleChange}
                  placeholder="e.g. 85.0"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>CET Score (%) *</label>
                <input
                  name="cet"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.cet}
                  onChange={handleChange}
                  placeholder="e.g. 92.4"
                  className={inputClass}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  JEE Main Score (%) <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <input
                  name="jee"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.jee}
                  onChange={handleChange}
                  placeholder="e.g. 89.1"
                  className={inputClass}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className={labelClass}>Diploma Percentage (%) *</label>
              <input
                name="diploma"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={form.diploma}
                onChange={handleChange}
                placeholder="e.g. 82.3"
                className={inputClass}
                required
              />
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg transition shadow-lg shadow-red-950/40"
        >
          Review & Submit
        </button>
      </form>
    </div>
  );
}