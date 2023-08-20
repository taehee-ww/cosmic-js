import app from './app'

app.listen(3000)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}/docs`)
