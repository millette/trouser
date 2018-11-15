// core
const { createServer } = require("http")
const { parse } = require("url")
const { readdir } = require("fs")

// npm
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (!pathname.indexOf("/data/")) {
      try {
        const json = require(`./${pathname}`)
        res.end(JSON.stringify(json), "utf-8")
        return
      } catch (e) {
        res.end(e.toString(), "utf-8")
        return
      }
    }

    if (pathname === "/page-3.json") {
      readdir("data", (err, files) => {
        edges = files
          .filter((f) => f.indexOf(".json") !== -1)
          .map((f) => {
            const publicURL = `/data/${f}`
            const [name] = f.split(".")
            return {
              node: {
                absolutePath: `/home/millette/al66/trouser2${publicURL}`,
                publicURL,
                name,
                base: f,
              },
            }
          })
        const data = {
          allFile: {
            group: [
              {
                fieldValue: "",
                totalCount: 2,
                edges,
              },
            ],
          },
        }

        res.end(JSON.stringify({ data }, null, "  "), "utf-8")
      })
      return
    }
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})
