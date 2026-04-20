'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/** Test: e-posta alanına tam olarak error@test.com yazıldığında hata senaryosu üretilir. */
const ERROR_TRIGGER_EMAIL = 'error@test.com';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const resetFeedback = () => {
    if (status === 'success' || status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');

    const simulateError =
      formData.email.trim().toLowerCase() === ERROR_TRIGGER_EMAIL;

    window.setTimeout(() => {
      if (simulateError) {
        setStatus('error');
        return;
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    resetFeedback();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    'w-full px-4 py-3 border border-navy-200/90 rounded-md bg-white text-navy-900 placeholder:text-navy-400 transition-shadow focus:ring-2 focus:ring-cyan-500/35 focus:border-cyan-500 outline-none text-[15px] disabled:opacity-60 disabled:cursor-not-allowed';

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'success' && (
        <div
          role="status"
          className="p-4 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-900 text-sm leading-relaxed"
        >
          {t('success')}
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="p-4 rounded-md border border-red-200 bg-red-50 text-red-900 text-sm leading-relaxed"
        >
          {t('error')}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-2">
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-800 mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={8}
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
          className={`${inputClass} resize-y min-h-[200px]`}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3.5 bg-navy-800 text-white text-[15px] font-medium rounded-md border border-navy-700 hover:bg-navy-700 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-navy-800"
      >
        {isLoading ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
