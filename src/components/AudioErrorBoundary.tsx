import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AudioErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log critical audio errors, not expected issues
    if (error.message.includes('AudioWorklet') || error.message.includes('AudioContext')) {
      // Expected audio issues - don't spam console
      if (process.env.NODE_ENV === 'development') {
        console.debug('Audio error caught (using fallback):', error.message);
      }
    } else {
      console.error('Audio error boundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="text-center">
            <div className="text-red-400 text-sm mb-2">Audio system unavailable</div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs text-red-300 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AudioErrorBoundary;