import React, { Component } from "react"

// self
import File from "../components/file"

export default class Files extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onClick(file) {
    this.setState({ ...file, dir: this.props.dir })
  }

  render() {
    return (
      !this.props.dir || (
        <div>
          <h2>
            Dir: <strong>{this.props.dir}</strong>
          </h2>
          <ul>
            {this.props.files.map((file, i) => (
              <li
                key={`file-${this.props.dir}-${i}`}
                onClick={this.onClick.bind(this, file)}
              >
                {file.name}
              </li>
            ))}
          </ul>
          <File {...this.state} />
        </div>
      )
    )
  }
}
