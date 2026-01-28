import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { wardsService } from '../../services/wards.service';

interface FormState {
  name: string;
  code: string;
  description: string;
}

export function CreateWardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState<FormState>({
    name: '',
    code: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user?.tenantId) {
      setError('Missing tenant ID on the current user. Please re-login or contact an administrator.');
      setLoading(false);
      return;
    }

    try {
      await wardsService.create({
        name: form.name,
        code: form.code,
        description: form.description || undefined,
        tenantId: user.tenantId,
      });
      navigate('/wards');
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create ward';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">New Ward</h1>
          <p className="text-sm text-slate-600 mt-1">Create a ward record for your tenant</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 p-6 sm:p-8">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Ward Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ikeja Ward 2"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="code" className="text-sm font-medium text-slate-700">
                Code
              </label>
              <input
                id="code"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                placeholder="IKJ-002"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium text-slate-700">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Ikeja local government ward 2"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-800 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating…' : 'Create Ward'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/wards')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
