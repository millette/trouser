// npm
import Link from "next/link"

export default class Page2 extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to page 2</h1>
        <p>
          <Link prefetch href="/">
            <a>home</a>
          </Link>{" "}
          <Link prefetch href="/page-3">
            <a>page-3</a>
          </Link>
        </p>
      </div>
    )
  }
}
