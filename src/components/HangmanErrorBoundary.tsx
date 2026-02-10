import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class HangmanErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Apple Store Compliance: Silent operation
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-300/50">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-red-500/20 rounded-full p-4">
                  <AlertTriangle className="h-12 w-12 text-red-400" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white">
                Oops! Something went wrong
              </h2>

              <p className="text-white/80">
                The Hangman game encountered an unexpected error. Don't worry, your progress is safe.
              </p>

              {this.state.error && (
                <details className="text-left bg-black/20 rounded-lg p-3">
                  <summary className="text-red-300 text-sm cursor-pointer hover:text-red-200">
                    Technical Details
                  </summary>
                  <p className="text-white/70 text-xs mt-2 font-mono">
                    {this.state.error.toString()}
                  </p>
                </details>
              )}

              <Button
                onClick={this.handleReset}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Restart Game
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
