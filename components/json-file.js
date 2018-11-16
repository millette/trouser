import React, { Component } from "react"

const resort = (keys, primary) => {
  if (!primary) {
    return keys.sort()
  }

  const i = keys.indexOf(primary)
  if (i === -1) {
    return keys.sort()
  }

  delete keys[i]
  const k2 = keys.filter(Boolean).sort()
  k2.unshift(primary)
  return k2
}

const Header = ({ keys, primary }) => {
  const k2 = resort(keys, primary)
  return (
    <thead>
      <tr>
        {k2.map((o, i) => (
          <th key={`header-key-${i}`}>{o}</th>
        ))}
      </tr>
    </thead>
  )
}

/*
  {Object.keys(o)
    .sort()
    .map((k, i2) => (
      <td key={`cell-key-${i2}`}>{JSON.stringify(o[k])}</td>
    ))}
*/

const Row = ({ style, o, i, click, primary = "" }) => {
  const k2 = resort(Object.keys(o), primary)
  return (
    <tr style={style} onClick={click}>
      {k2.map((k, i2) => (
        <td key={`cell-key-${i2}`}>{JSON.stringify(o[k])}</td>
      ))}
    </tr>
  )
}

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
          <Header primary={this.props.primary} keys={Object.keys(json[0])} />
          <tbody>
            {json.map((o, i) => (
              <Row
                primary={this.props.primary}
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
