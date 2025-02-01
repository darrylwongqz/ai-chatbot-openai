import type { Metadata } from 'next';
import './globals.css';
import SideBar from '../components/SideBar';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '../components/SessionProvider';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from '../components/Login';
import ClientProvider from '../components/ClientProvider';

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description: 'AI Chatbot using OpenAI API',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="h-full bg-[#343541] text-white">
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex h-screen">
              {/* Sidebar */}
              <aside className="bg-[#202123] md:min-w-[20rem] max-w-xs overflow-y-auto">
                <SideBar />
              </aside>

              {/* Client-side Providers (for global UI state, toasts, etc.) */}
              <ClientProvider />

              {/* Main Content */}
              <main className="flex-1 overflow-hidden">{children}</main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
