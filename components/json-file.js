import React, { Component } from "react"

const Header = ({ keys }) => (
  <thead>
    <tr>
      {keys.sort().map((o, i) => (
        <th key={`header-key-${i}`}>{o}</th>
      ))}
    </tr>
  </thead>
)

const Row = ({ style, o, i, click }) => (
  <tr style={style} onClick={click}>
    {Object.keys(o)
      .sort()
      .map((k, i2) => (
        <td key={`cell-key-${i2}`}>{JSON.stringify(o[k])}</td>
      ))}
  </tr>
)

export default class JsonFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idx: {},
    }
    this.clickRow = this.clickRow.bind(this)
    this.submit = this.submit.bind(this)
  }

  submit() {
    this.props.submit(Object.keys(this.state.idx).map(Number))
  }

  clickRow(a) {
    const idx = { ...this.state.idx }
    if (idx[a.currentTarget.rowIndex - 1]) {
      delete idx[a.currentTarget.rowIndex - 1]
    } else {
      idx[a.currentTarget.rowIndex - 1] = true
    }
    this.setState({ idx })
  }

  render() {
    const { json, error } = this.props
    if (error) {
      return error
    }
    if (!json) {
      return null
    }

    const len = Object.keys(this.state.idx).length
    return (
      <div>
        <p>Selected: {len}</p>
        <button onClick={this.submit} disabled={!len}>
          Submit
        </button>
        <table>
          <Header keys={Object.keys(json[0])} />
          <tbody>
            {json.map((o, i) => (
              <Row
                style={{ background: this.state.idx[i] && "yellow" }}
                click={this.clickRow}
                i={i}
                key={`json-file-line-${i}`}
                o={o}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
