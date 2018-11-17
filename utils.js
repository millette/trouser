// use strict

// core
const { readdir } = require("fs")

const yup = () =>
  new Promise((resolve, reject) => {
    readdir("static/data", (err, files) => {
      if (err) {
        return reject(err)
      }
      edges = files
        .filter((f) => f.indexOf(".json") !== -1)
        .map((f) => {
          const publicURL = `/static/data/${f}`
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
              totalCount: edges.length,
              edges,
            },
          ],
        },
      }

      resolve({ data })
    })
  })

module.exports = yup
