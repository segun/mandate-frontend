import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { WebsiteLayout } from './components';
import { paymentsService } from '../../services/payments.service.ts';
import { toast } from '../../stores/toast.store';

const GOLD = '#ca8a04';

export function RegisterCompletePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference');
  const initialFlow = useMemo<'subscription' | 'licence'>(() => (searchParams.get('flow') === 'licence' ? 'licence' : 'subscription'), [searchParams]);
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('Verifying your payment...');
  const [flow, setFlow] = useState<'subscription' | 'licence'>(initialFlow);

  useEffect(() => {
    let mounted = true;
    const verifyPayment = async () => {
      if (!reference) {
        setStatus('failed');
        setMessage('Missing payment reference. Please retry your registration.');
        toast.error('Missing payment reference. Please retry your registration.');
        return;
      }

      try {
        const response = await paymentsService.verify(reference);
        const resolvedFlow = response.purpose === 'licence' ? 'licence' : response.purpose === 'subscription' ? 'subscription' : initialFlow;
        setFlow(resolvedFlow);
        if (!mounted) {
          return;
        }

        if (response.status === 'success') {
          setStatus('success');
          if (resolvedFlow === 'licence') {
            setMessage('Payment verified successfully. Your licences are now active.');
          } else {
            setMessage('Payment verified successfully. Your tenant is now active.');
          }
          toast.success('Payment verified successfully.');
          return;
        }

        setStatus('failed');
        setMessage('Payment verification failed or is still pending. Please retry.');
        toast.error('Payment verification failed or is still pending.');
      } catch {
        if (mounted) {
          setStatus('failed');
          setMessage('Unable to verify payment. Please retry or contact support.');
          toast.error('Unable to verify payment. Please retry or contact support.');
        }
      }
    };

    verifyPayment();
    return () => {
      mounted = false;
    };
  }, [reference, initialFlow]);

  useEffect(() => {
    if (status === 'success' && flow === 'licence') {
      const timer = setTimeout(() => navigate('/user/settings?tab=billing', { replace: true }), 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [status, flow, navigate]);

  return (
    <WebsiteLayout>
      <section className="py-24 lg:py-32 hero-gradient">
        <div className="section-container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              {status === 'loading' && <Loader2 className="w-10 h-10 animate-spin" style={{ color: GOLD }} />}
              {status === 'success' && <CheckCircle2 className="w-10 h-10" style={{ color: GOLD }} />}
              {status === 'failed' && <XCircle className="w-10 h-10" style={{ color: '#fca5a5' }} />}
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              {status === 'loading' && (flow === 'licence' ? 'Finalizing your purchase' : 'Finalizing your registration')}
              {status === 'success' && (flow === 'licence' ? 'Purchase complete' : 'Registration complete')}
              {status === 'failed' && (flow === 'licence' ? 'Purchase pending' : 'Registration pending')}
            </h1>
            <p className="text-lg" style={{ color: '#ccc' }}>
              {message}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {status !== 'loading' && (
                flow === 'licence' ? (
                  <Link
                    to="/user/settings?tab=billing"
                    className="px-8 py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: GOLD, color: '#000000' }}
                  >
                    Go to Billing
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="px-8 py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: GOLD, color: '#000000' }}
                  >
                    Go to Login
                  </Link>
                )
              )}
              {status === 'failed' && reference && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 rounded-lg font-semibold"
                  style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
                >
                  Retry Verification
                </button>
              )}
              {status === 'failed' && !reference && (
                <Link
                  to="/register"
                  className="px-8 py-3 rounded-lg font-semibold"
                  style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
                >
                  Back to Register
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
