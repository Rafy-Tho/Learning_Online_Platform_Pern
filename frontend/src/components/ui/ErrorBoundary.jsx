import { Component } from "react";
import ErrorMessage from "./ErrorMessage";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage message={this.state.error?.message || "Something went wrong"} />;
    }
    return this.props.children;
  }
}
