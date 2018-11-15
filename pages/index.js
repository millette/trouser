// npm

import Link from "next/link"

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to next.js!</h1>
        <p>
          <Link prefetch href="/page-2">
            <a>page 2</a>
          </Link>
        </p>
      </div>
    )
  }
}
