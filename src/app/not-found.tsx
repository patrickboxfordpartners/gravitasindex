import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-panel border border-border max-w-lg w-full p-8 md:p-12 text-center">
        <div className="font-mono text-6xl text-accent mb-6">404</div>

        <h1 className="font-serif text-3xl font-normal mb-4 text-text-main">
          Page Not Found
        </h1>

        <p className="text-text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/">
          <Button variant="accent">
            Back to Homepage
          </Button>
        </Link>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-text-muted text-sm">
            Looking for something specific?{' '}
            <a href="mailto:hello@gravitasindex.com" className="text-accent hover:underline">
              Let us know
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
