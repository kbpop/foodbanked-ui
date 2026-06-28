import express, { Request, Response } from 'express'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the Express backend!' })
})

// Routing to index.html in dist
const distPath = path.join(process.cwd(), 'dist')
app.use(express.static(distPath))

app.get('/{*splat}', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})