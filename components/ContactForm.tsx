'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectSummary: '',
    timeline: '',
    budget: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          projectSummary: '',
          timeline: '',
          budget: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-navy-700 mb-2">
          {t('company')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div>
        <label htmlFor="projectSummary" className="block text-sm font-medium text-navy-700 mb-2">
          {t('projectSummary')}
        </label>
        <textarea
          id="projectSummary"
          name="projectSummary"
          required
          rows={4}
          value={formData.projectSummary}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-navy-700 mb-2">
          {t('timeline')}
        </label>
        <input
          type="text"
          id="timeline"
          name="timeline"
          required
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-navy-700 mb-2">
          {t('budget')}
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {t('success')}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {t('error')}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
