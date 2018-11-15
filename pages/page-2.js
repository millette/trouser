// npm
import { withRouter } from "next/router"
import Link from "next/link"

class Page2 extends React.Component {
  render() {
    return (
      <div>
        <p>
          Welcome to next.js!{" "}
          <Link prefetch href="/">
            <a>home</a>
          </Link>{" "}
          <Link prefetch href="/page-3">
            <a>page-3</a>
          </Link>
        </p>
        <pre>{JSON.stringify(this.props.router, null, "  ")}</pre>
      </div>
    )
  }
}

export default withRouter(Page2)
