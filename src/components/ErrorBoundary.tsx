import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Sentry } from '@/lib/sentry';

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
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // 🔧 CRITICAL FIX: Report errors to Sentry in production
    // Sentry will only send errors in production (filtered in beforeSend)
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        }
      },
      level: 'error',
      tags: {
        errorBoundary: true,
      }
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'hsl(238, 63%, 25%)' }}>
          <div className="max-w-md w-full text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                Something went wrong
              </h1>
              <p className="text-white/70">
                We apologize for the inconvenience. An unexpected error occurred.
              </p>
            </div>

            {/* 🔧 FIX #21: Only show error details in development mode */}
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left bg-white/10 p-4 rounded-lg">
                <summary className="cursor-pointer font-medium text-white/80 mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-sm text-white/60 space-y-2">
                  <div>
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div>
                      <strong>Stack trace:</strong>
                      <pre className="text-xs mt-1 overflow-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <Button onClick={this.handleReset} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Try Again
              </Button>
              <Button onClick={this.handleReload} className="gap-2 bg-white/20 text-white hover:bg-white/30">
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Convenience wrapper for functional components
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};