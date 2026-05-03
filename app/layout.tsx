import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <header className="border-b border-border bg-surface px-6 py-3">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <h1 className="text-xl font-bold text-cyber">CyberPath</h1>
              <nav className="space-x-4 text-sm">
                <Link href="/">Roadmap</Link>
                <Link href="/path/foundations">Foundations</Link>
                <Link href="/settings">Settings</Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl p-6">{children}</main>
        </ProgressProvider>
        <header className="border-b border-border bg-surface px-6 py-3">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <h1 className="text-xl font-bold text-cyber">CyberPath</h1>
            <nav className="space-x-4 text-sm">
              <Link href="/">Roadmap</Link>
              <Link href="/path/path-a-soc">SOC Path</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
