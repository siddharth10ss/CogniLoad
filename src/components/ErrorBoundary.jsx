import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('CogniLoad Error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="glass-panel p-8 max-w-md w-full text-center">
                        <div className="text-6xl mb-4">😔</div>
                        <h2 className="text-2xl font-bold text-text mb-3">
                            Something went wrong
                        </h2>
                        <p className="text-muted mb-6">
                            Don't worry — your data is safe. Please refresh the page to continue.
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="btn-primary w-full"
                        >
                            Refresh Page
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="text-sm text-muted cursor-pointer">
                                    Error details (dev only)
                                </summary>
                                <pre className="mt-2 text-xs bg-surface p-3 rounded overflow-auto">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
