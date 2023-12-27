import { useState } from 'react'
import styles from './App.module.css'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

function App() {
  const [message, setMessage] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangeMessage = (e: any) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!message || loading) return
    setLoading(true)
    try {
      const messages = [message]
      const res = await axios.post(`${API_URL}/openai/answer`, messages)
      setContent(res.data.answers[0])
    } catch (error) {
      setContent('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ChatGPT Demo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Message ChatGPT..." className="input input-bordered w-full" value={message} onChange={handleChangeMessage} />
      </form>
      {loading && <div>Loading...</div>}
      {!loading && <div className={styles['ai-answer']}>{content}</div>}
    </div>
  )
}

export default App
