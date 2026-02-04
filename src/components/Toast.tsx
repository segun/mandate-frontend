import { useToastStore, type Toast } from '../stores/toast.store';

const toastStyles = {
  success: {
    bg: 'bg-green-600',
    border: 'border-green-700',
    text: 'text-white font-semibold',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-red-600',
    border: 'border-red-700',
    text: 'text-white font-semibold',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-600',
    text: 'text-black font-semibold',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  info: {
    bg: 'bg-blue-600',
    border: 'border-blue-700',
    text: 'text-white font-semibold',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useToastStore((state) => state.removeToast);
  const styles = toastStyles[toast.type];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${styles.bg} ${styles.border} shadow-lg backdrop-blur-sm animate-slide-in`}
    >
      <div className={styles.text}>{styles.icon}</div>
      <p className={`flex-1 text-sm font-medium ${styles.text}`}>{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className={`${styles.text} hover:opacity-70 transition-opacity`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
