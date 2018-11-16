// npm
import { withRouter } from "next/router"
import fetch from "isomorphic-unfetch"

// self
import Files from "../components/files"

export default class P3 extends React.Component {
  constructor(props) {
    super(props)
    this.group =
      (props.data && props.data.allFile && props.data.allFile.group) || []
    this.state = {}
  }

  static async getInitialProps(xxx) {
    // console.log("server", Boolean(xxx.req))
    // FIXME: use relative url and/or local function
    const res = await fetch("http://localhost:3000/page-3.json")
    return res.json()
  }

  onClick(dir, files) {
    this.setState({ dir, files })
  }

  render() {
    return (
      <div>
        <h1>Welcome to trouser (built with next.js)</h1>
        <ul>
          {this.group.map(({ fieldValue, totalCount, edges }, i) => (
            <li
              key={`dir-${fieldValue}-${i}`}
              onClick={this.onClick.bind(
                this,
                fieldValue || ".",
                edges.map(({ node }) => node),
              )}
            >
              {fieldValue || "."} <small>({totalCount})</small>
            </li>
          ))}
        </ul>
        <Files primary="use" {...this.state} />
      </div>
    )
  }
}
