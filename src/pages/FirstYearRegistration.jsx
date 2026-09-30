import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Gauge,
  GraduationCap,
  Mail,
  Phone,
  RotateCcw,
  Send,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { submitRecruitmentApplication } from '../services/recruitmentService';

const DOMAINS = [
  { value: 'software', label: 'Software' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'aero', label: 'Aeronautics' },
  { value: 'mech', label: 'Mechanical' },
];

const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Instrumentation Engineering',
];

const createEmptyForm = () => ({
  name: '',
  personalEmail: '',
  branch: '',
  yearOfPassing: 2030,
  phone: '',
  domain: '',
  tenthScore: '',
  twelfthScore: '',
  cetScore: '',
  jeeMainScore: '',
  diplomaScore: '',
});

const inputClass =
  'w-full rounded-button border border-border bg-elevated px-4 py-3 text-base text-text-primary placeholder:text-text-muted/50 outline-none transition focus:border-red-500/70 focus:ring-1 focus:ring-red-500/20 sm:text-sm';
const labelClass = 'mb-2 block text-label text-text-muted';

function Field({ label, name, value, onChange, type = 'text', placeholder, required = true, icon: Icon, pattern }) {
  return (
    <div>
      <label htmlFor={`recruitment-${name}`} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />}
        <input
          id={`recruitment-${name}`}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          min={type === 'number' ? 0 : undefined}
          max={type === 'number' ? 100 : undefined}
          step={type === 'number' ? '0.01' : undefined}
          className={`${inputClass} ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
}

export default function FirstYearRegistration() {
  const navigate = useNavigate();
  const [studentType, setStudentType] = useState('first');
  const [form, setForm] = useState(createEmptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState('');

  const isFirstYear = studentType === 'first';

  const handleTypeChange = (nextType) => {
    setStudentType(nextType);
    setForm((current) => ({
      ...current,
      yearOfPassing: nextType === 'first' ? 2030 : 2029,
      twelfthScore: '',
      cetScore: '',
      jeeMainScore: '',
      diplomaScore: '',
    }));
    setError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      ...form,
      yearOfPassing: Number(form.yearOfPassing),
      tenthScore: Number(form.tenthScore),
      ...(isFirstYear
        ? {
            twelfthScore: Number(form.twelfthScore),
            cetScore: Number(form.cetScore),
            ...(form.jeeMainScore ? { jeeMainScore: Number(form.jeeMainScore) } : {}),
          }
        : { diplomaScore: Number(form.diplomaScore) }),
    };

    try {
      const result = await submitRecruitmentApplication(payload);
      const referenceId = result.data?.rtfId || 'submitted';
      toast.success(`Application submitted successfully. Reference ID: ${referenceId}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
      });
      setSubmitted(referenceId);
    } catch (submissionError) {
      const fieldMessages = Object.values(submissionError.fieldErrors || {}).flat();
      const message = fieldMessages[0] || submissionError.message || 'Unable to submit your application.';
      toast.error(message, {
        position: 'top-center',
        autoClose: 6000,
        theme: 'dark',
      });
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 pb-16 pt-32 text-text-primary">
        <section className="w-full max-w-lg border border-emerald-400/30 bg-black/60 p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.12)] backdrop-blur-md sm:rounded-panel">
          <CheckCircle2 size={44} className="mx-auto mb-5 text-emerald-400" />
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">Application received</p>
          <h1 className="mb-3 text-3xl font-display font-bold">Welcome to the intake node.</h1>
          <p className="mb-7 text-sm leading-6 text-text-secondary">
  Your recruitment application has been recorded.{' '}
  <br />
  <strong className="font-semibold text-text-primary">
    Please take a screenshot of this page and keep it for future communication.
  </strong>
</p>

          <p className="mb-7 font-mono text-lg text-text-primary">{submitted}</p>
          <button type="button" onClick={() => navigate('/')} className="text-sm text-cyan-400 transition hover:text-cyan-300">
            Return to home
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-3 pb-16 pt-24 text-text-primary sm:px-4 sm:pt-32">
      <div className="mx-auto mb-8 max-w-5xl">
        <button type="button" onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition hover:text-text-primary">
          <ArrowLeft size={16} /> Back to home
        </button>
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-red-400">Recruitment / 2026</p>
          <h1 className="text-3xl font-display font-bold tracking-tight sm:text-6xl">Build what comes next.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
            Choose your student category, complete both sections, and send your application to The Robo-Tech Forum.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl [perspective:1600px]">
        <div className="mb-6 grid max-w-md grid-cols-2 gap-2 rounded-button border border-border bg-black/40 p-1">
          <button type="button" onClick={() => handleTypeChange('first')} className={`rounded-button px-3 py-3 text-sm font-semibold transition ${isFirstYear ? 'bg-red-600 text-white shadow-lg shadow-red-950/30' : 'text-text-muted hover:text-text-primary'}`}>
            1st Year · 2030
          </button>
          <button type="button" onClick={() => handleTypeChange('dsy')} className={`rounded-button px-3 py-3 text-sm font-semibold transition ${!isFirstYear ? 'bg-red-600 text-white shadow-lg shadow-red-950/30' : 'text-text-muted hover:text-text-primary'}`}>
            DSY · 2029
          </button>
        </div>

        <div className={`relative min-h-[1040px] transition-transform duration-700 [transform-style:preserve-3d] sm:min-h-[760px] ${isFirstYear ? '' : '[transform:rotateY(180deg)]'}`}>
          <ApplicationForm isFirstYear={isFirstYear} form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} submitting={submitting} />
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <ApplicationForm isFirstYear={false} form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} submitting={submitting} flipped />
          </div>
        </div>
      </div>
    </main>
  );
}

function ApplicationForm({ isFirstYear, form, onChange, onSubmit, error, submitting, flipped = false }) {
  return (
    <form onSubmit={onSubmit} className={`absolute inset-0 border ${flipped ? 'border-cyan-400/30 shadow-[0_0_70px_rgba(34,211,238,0.08)]' : 'border-red-500/30 shadow-[0_0_70px_rgba(255,32,32,0.1)]'} bg-black/65 p-4 backdrop-blur-md [backface-visibility:hidden] sm:rounded-panel sm:p-8`}>
      <FormHeader isFirstYear={isFirstYear} />
      <div className="grid gap-8 lg:grid-cols-2">
        <PersonalSection form={form} onChange={onChange} />
        <AcademicSection form={form} onChange={onChange} isFirstYear={isFirstYear} />
      </div>
      <SubmitArea error={error} submitting={submitting} />
    </form>
  );
}

function FormHeader({ isFirstYear }) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4 border-b border-border pb-5">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">{isFirstYear ? 'First year intake' : 'Direct second year intake'}</p>
        <h2 className="text-2xl font-display font-bold sm:text-3xl">{isFirstYear ? 'Class of 2030' : 'DSY · Class of 2029'}</h2>
      </div>
      <GraduationCap className="text-red-500" size={28} />
    </div>
  );
}

function PersonalSection({ form, onChange }) {
  return (
    <section>
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-red-400">01 / Personal information</h3>
      <div className="space-y-5">
        <Field label="Full name" name="name" value={form.name} onChange={onChange} placeholder="Your full name" icon={UserRound} />
        <Field label="Personal email" name="personalEmail" type="email" value={form.personalEmail} onChange={onChange} placeholder="you@example.com" icon={Mail} />
        <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="10-digit mobile number" pattern="[6-9][0-9]{9}" icon={Phone} />
        <SelectField label="Branch" name="branch" value={form.branch} onChange={onChange} options={BRANCHES} placeholder="Select your branch" />
        <SelectField label="Domain applying for" name="domain" value={form.domain} onChange={onChange} options={DOMAINS} placeholder="Select a domain" />
      </div>
    </section>
  );
}

function SelectField({ label, name, value, onChange, options, placeholder }) {
  return (
    <div>
      <label htmlFor={`recruitment-${name}`} className={labelClass}>{label}</label>
      <select id={`recruitment-${name}`} name={name} value={value} onChange={onChange} required className={inputClass}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          return <option key={optionValue} value={optionValue}>{optionLabel}</option>;
        })}
      </select>
    </div>
  );
}

function AcademicSection({ form, onChange, isFirstYear }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-400">02 / Academic information</h3>
      <p className="mb-5 text-sm leading-5 text-text-muted">Mark wisely. The team may ask to see your marksheet for verification purposes.</p>
      <div className="space-y-5">
        <Field label="10th score (%)" name="tenthScore" type="number" value={form.tenthScore} onChange={onChange} placeholder="e.g. 94.5" icon={Gauge} />
        {isFirstYear ? (
          <>
            <Field label="12th score (%)" name="twelfthScore" type="number" value={form.twelfthScore} onChange={onChange} placeholder="e.g. 85" />
            <Field label="CET score (%)" name="cetScore" type="number" value={form.cetScore} onChange={onChange} placeholder="e.g. 92.4" />
            <Field label="JEE Main score (%) · optional" name="jeeMainScore" type="number" value={form.jeeMainScore} onChange={onChange} placeholder="Leave blank if not applicable" required={false} />
          </>
        ) : (
          <Field label="Diploma percentage (%)" name="diplomaScore" type="number" value={form.diplomaScore} onChange={onChange} placeholder="e.g. 82.3" />
        )}
      </div>
    </section>
  );
}

function SubmitArea({ error, submitting }) {
  return (
    <div className="mt-8 border-t border-border pt-5">
      {error && <p className="mb-4 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-text-muted">All fields are required unless marked optional.</p>
        <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-button bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-60">
          {submitting ? 'Sending application...' : 'Submit application'}
          {submitting ? <RotateCcw size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </div>
    </div>
  );
}
