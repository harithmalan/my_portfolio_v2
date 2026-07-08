import { Component } from 'react'

export default class AssetErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('Decorative asset failed to load, hiding it gracefully:', error?.message)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
