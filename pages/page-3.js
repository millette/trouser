// npm
import Link from "next/link"

// self
import Files from "../components/files"

export default class P3 extends React.Component {
  constructor(props) {
    super(props)
    this.group =
      (props.data && props.data.allFile && props.data.allFile.group) || []
    this.state = {}
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
            <a>Go back to the homepage</a>
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

/*
export const query = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "le-f2" }, extension: { eq: "json" } }
    ) {
      group(field: relativeDirectory) {
        fieldValue
        totalCount
        edges {
          node {
            absolutePath
            publicURL
            name
            base
          }
        }
      }
    }
  }
`
*/
