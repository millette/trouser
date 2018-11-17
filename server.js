// core
const { createServer } = require("http")
const { parse } = require("url")

// npm
const next = require("next")

// self
const yup = require("./utils")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    // console.log('pathname:', pathname)
    /*
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
    */

    if (pathname === "/page-3.json") {
      try {
        const data = await yup()
        res.end(JSON.stringify(data, null, "  "), "utf-8")
      } catch (e) {
        res.end(e.toString(), "utf-8")
      }
      return
    }
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})
