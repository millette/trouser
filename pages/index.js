// npm
import { withRouter } from "next/router"
import Link from "next/link"

class Page extends React.Component {
  render() {
    return (
      <div>
        <p>
          Welcome to next.js!{" "}
          <Link prefetch href="/page-2">
            <a>page 2</a>
          </Link>
        </p>
        <pre>{JSON.stringify(this.props.router, null, "  ")}</pre>
      </div>
    )
  }
}

export default withRouter(Page)
