import express, { Request, Response } from 'express'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the Express backend!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})