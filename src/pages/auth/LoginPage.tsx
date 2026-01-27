import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../stores/auth.store';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      login(response.data.user, response.data.accessToken);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/80 px-4">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(circle at center, white, transparent)',
          WebkitMaskImage: 'radial-gradient(circle at center, white, transparent)',
          opacity: 0.28,
        }}
      />
      <div className="relative w-full max-w-md bg-surface/95 backdrop-blur px-6 sm:px-8 py-8 rounded-2xl shadow-card border border-slate-100/80">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-blue-800 text-white flex items-center justify-center shadow-sm">
            <span className="text-lg font-semibold">M</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">MANDATE</h1>
          <p className="text-sm text-slate-600 mt-1">Calm, credible field operations</p>
        </div>
        
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-danger/20 bg-red-50 px-3 py-2 text-sm text-danger mb-4">
            <span aria-hidden>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@mandate.ng"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 py-2.5 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-slate-500 text-sm">
          Need access?{' '}
          <Link to="/register" className="text-secondary hover:underline font-semibold">
            Request account
          </Link>
        </p>
      </div>
    </div>
  );
}
