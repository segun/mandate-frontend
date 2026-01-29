import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-400',
      buttonBg: 'bg-red-500 hover:bg-red-600',
    },
    warning: {
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400',
      buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
    },
    info: {
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      buttonBg: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-[#141417] border border-[#2a2a2e] rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`h-14 w-14 rounded-full ${styles.iconBg} flex items-center justify-center`}>
            {variant === 'danger' && (
              <svg className={`h-7 w-7 ${styles.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {variant === 'warning' && (
              <svg className={`h-7 w-7 ${styles.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {variant === 'info' && (
              <svg className={`h-7 w-7 ${styles.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        </div>
        {/* Title */}
        <h3 className="text-xl font-semibold text-white text-center mb-2">{title}</h3>
        {/* Message */}
        <div className="text-[#888] text-center mb-6">
          {message}
        </div>
        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-lg text-white font-semibold transition-colors ${styles.buttonBg}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
