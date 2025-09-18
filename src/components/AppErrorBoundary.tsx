import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log different types of errors with appropriate levels
    if (error.message.includes('Loading chunk') || error.message.includes('NetworkError')) {
      console.warn('Network/Chunk loading error:', error.message);
    } else if (error.message.includes('AudioWorklet') || error.message.includes('AudioContext')) {
      if (process.env.NODE_ENV === 'development') {
        console.debug('Audio system error (recoverable):', error.message);
      }
    } else {
      console.error('Application error:', error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isChunkError = this.state.error?.message.includes('Loading chunk');
      const isNetworkError = this.state.error?.message.includes('NetworkError') ||
                            this.state.error?.message.includes('fetch');

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md w-full text-center">
            <div className="mb-4">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h1 className="text-xl font-bold text-white mb-2">
                {isChunkError || isNetworkError ? 'Connection Issue' : 'Something went wrong'}
              </h1>
              <p className="text-white/70 text-sm mb-4">
                {isChunkError
                  ? 'Failed to load application resources. This usually happens due to network issues or cached files.'
                  : isNetworkError
                  ? 'Network connection failed. Please check your internet connection.'
                  : 'An unexpected error occurred. The application will try to recover.'}
              </p>

              {process.env.NODE_ENV === 'development' && (
                <details className="text-left text-xs text-red-300 bg-red-900/20 rounded p-2 mb-4">
                  <summary className="cursor-pointer font-medium">Error Details</summary>
                  <div className="mt-2 font-mono">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error?.message}
                    </div>
                    <div>
                      <strong>Stack:</strong>
                      <pre className="text-xs mt-1 whitespace-pre-wrap">
                        {this.state.error?.stack}
                      </pre>
                    </div>
                  </div>
                </details>
              )}
            </div>

            <div className="space-y-2">
              <Button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Try Again
              </Button>

              {(isChunkError || isNetworkError) && (
                <Button
                  onClick={this.handleRefresh}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Refresh Page
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;