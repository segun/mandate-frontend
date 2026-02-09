import { type ReactNode } from 'react';
import { WebsiteNavbar } from './WebsiteNavbar';
import { ToastContainer } from '../../../components/Toast';
import { WebsiteFooter } from './WebsiteFooter';

export function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0f] text-[#f2f2f2]">
      <ToastContainer />
      <WebsiteNavbar />
      <main className="flex-1">
        {children}
      </main>
      <WebsiteFooter />
    </div>
  );
}
