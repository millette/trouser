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

const Header = ({ onClick, keys, primary }) => {
  const k2 = resort(keys, primary)
  return (
    <thead>
      <tr>
        {k2.map((o, i) => (
          <th onClick={onClick.bind(this, o)} key={`header-key-${i}`}>
            {o}
          </th>
        ))}
      </tr>
    </thead>
  )
}

const Row = ({ style, o, i, click, primary }) => {
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
    this.submitIndexes = this.submitIndexes.bind(this)
    this.submitSubset = this.submitSubset.bind(this)
    this.clickHeader = this.clickHeader.bind(this)
  }

  clickHeader(primary) {
    this.setState({ primary })
  }

  submitSubset() {
    this.props.submit(Object.keys(this.state.idx).map(Number), true)
  }

  submitIndexes() {
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
        <button onClick={this.submitIndexes} disabled={!len}>
          Submit indexes
        </button>{" "}
        <button onClick={this.submitSubset} disabled={!len}>
          Submit json subset
        </button>
        <table>
          <Header
            onClick={this.clickHeader}
            primary={this.state.primary}
            keys={Object.keys(json[0])}
          />
          <tbody>
            {json.map((o, i) => (
              <Row
                primary={this.state.primary}
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
