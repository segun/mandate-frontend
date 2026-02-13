import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
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
      login(
        response.data.user,
        response.data.accessToken,
        response.meta?.subscriptionAccessStatus,
        response.meta?.tenant
      );
      navigate('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0f] px-4" style={{ background: 'radial-gradient(ellipse at bottom, rgba(202, 138, 4, 0.1) 0%, #0d0d0f 50%)' }}>
      <div className="relative w-full max-w-md bg-[#141417] px-6 sm:px-8 py-8 rounded-2xl shadow-2xl border border-[#2a2a2e]">
        <div className="text-center mb-8">
          {/* CONTROLHQ Logo */}
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/images/logo.png" 
              alt="ControlHQ" 
              className="h-16 w-auto"
            />
          </div>
          <p className="text-sm text-[#888] mt-1">Political Operations & Governance</p>
        </div>
        
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400 mb-4">
            <span aria-hidden>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-[#eee]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@controlhq.ng"
              className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-3 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent transition-all placeholder:text-[#666]"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-[#eee]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-3 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent transition-all placeholder:text-[#666]"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#ca8a04] py-2.5 text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#141417] focus:ring-[#ca8a04] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              'Signing in…'
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Secure Login
              </>
            )}
          </button>
        </form>
        
        <p className="text-center mt-6 text-[#888] text-sm">
          Need access?{' '}
          <Link to="/register" className="text-[#ca8a04] hover:text-[#d4940a] font-semibold">
            Request account
          </Link>
        </p>
      </div>
    </div>
  );
}
