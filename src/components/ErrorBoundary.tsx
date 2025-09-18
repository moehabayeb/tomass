// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-500/20 rounded-full p-4">
                <AlertCircle className="h-12 w-12 text-red-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            
            <p className="text-white/80 mb-6">
              The Lessons page encountered an error. Please try refreshing the page.
            </p>

            {this.state.error && (
              <details className="mb-4 text-left">
                <summary className="text-white/70 text-sm cursor-pointer mb-2">
                  Error Details (for debugging)
                </summary>
                <pre className="text-xs bg-black/20 p-3 rounded text-white/60 overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl px-4 py-3 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;