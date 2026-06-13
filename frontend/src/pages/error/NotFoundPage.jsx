import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="text-center">
        <AlertTriangle size={64} className="mx-auto text-white mb-6" />
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <p className="text-2xl text-blue-100 mb-8">Page Not Found</p>
        <p className="text-blue-200 mb-8 max-w-md">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
