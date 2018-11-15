import React, { Component } from "react"

// self
import JsonFile from "../components/json-file"

const normalize = (x) => {
  if (!x.length || x.find((o) => typeof o !== "object" || Array.isArray(o))) {
    throw new Error("Invalid file")
  }

  const keys = x.map((o) => Object.keys(o)).reduce((a, b) => [...a, ...b], [])

  const z = Array.from(new Set(keys)).sort()
  return x.map((b) => {
    const ret = {}
    z.forEach((a) => {
      ret[a] = b[a]
    })
    return ret
  })
}

export default class File extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
  }

  submit(a) {
    // this.setState({ a })
    // console.log(a, this.props, this.state.json)
    const blob = new Blob(
      // this.state.json
      [JSON.stringify(a)],
      {
        type: "application/json",
      },
    )
    if (this.state.a) {
      URL.revokeObjectURL(this.state.a)
    }
    this.setState({ a: URL.createObjectURL(blob) })
  }

  componentWillUnmount() {
    if (this.state.a) {
      URL.revokeObjectURL(this.state.a)
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.publicURL === this.props.publicURL) {
      return
    }

    try {
      this.setState({ json: false, error: "read..." })
      const res = await fetch(this.props.publicURL)
      this.setState({ error: "json..." })
      const json2 = await res.json()
      this.setState({ error: "norm..." })
      const json = normalize(json2)
      this.setState({ json, error: false })
    } catch (e) {
      this.setState({ json: false, error: e.toString() })
    }
  }

  render() {
    return (
      !this.props.absolutePath || (
        <div>
          <h3>
            {this.props.dir} / {this.props.name}
          </h3>
          <h4>{this.props.absolutePath}</h4>
          <p>
            {this.state.a && (
              <a download={this.props.base} href={this.state.a}>
                dl
              </a>
            )}
          </p>
          <JsonFile
            submit={this.submit}
            error={this.state.error}
            json={this.state.json}
          />
        </div>
      )
    )
  }
}
