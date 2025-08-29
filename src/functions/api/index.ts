import { Hono } from "hono"
import { handle } from "hono/aws-lambda"

const app = new Hono()


app.get("/", async (c) => {
  return c.json({
    message: "Hello World"
  })
})

app.get("/:name", async (c) => {
  const name = c.req.param("name")
  return c.json({
    message: `Hello ${name}`
  })
})


export const handler = handle(app)