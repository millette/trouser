// npm
import { withRouter } from "next/router"
import Link from "next/link"
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
    console.log("browser", !xxx.req)
    const res = await fetch("http://localhost:3000/page-3.json")
    return res.json()
  }

  onClick(dir, files) {
    this.setState({ dir, files })
  }

  render() {
    return (
      <div>
        <h1>Welcome to page 3</h1>
        <p>
          <Link prefetch href="/">
            <a>home</a>
          </Link>{" "}
          <Link prefetch href="/page-2">
            <a>Go to page 2</a>
          </Link>
        </p>
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
        <Files {...this.state} />
      </div>
    )
  }
}
