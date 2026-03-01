import React, { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: State) {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#0f172a] text-white text-center p-5 font-sans">
          <div className="text-[4rem] mb-4">⚠️</div>
          <h2 className="text-[1.8rem] font-bold mb-4">Unexpected Error</h2>
          <p className="text-[#94a3b8] mb-8 leading-relaxed">
            {this.state.error?.message || 'An unknown error occurred while rendering this page.'}
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 text-base font-semibold bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors duration-200"
          >
            Try to Recover
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
