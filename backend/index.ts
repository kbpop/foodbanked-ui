import express, { Request, Response } from 'express'
import path from 'path'
import axios from 'axios'

const flaskUrl = "http://localhost:8080/user/"

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

async function getUserFromFlask(userId) {
    try {
        const response = await axios.get(`${flaskUrl}${userId}`);
        console.log("Success! Data from Flask:", response.data);
        return response.data;

    } catch (error) {
        console.error("Failed to reach Flask:", error.message);
    }
}

app.get('/api/user', (req: Request, res: Response) => {
  const userInfo = getUserFromFlask(1);
  res.json({ message: userInfo })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

