import { Routes, Route } from 'react-router-dom'
import { GardenProvider } from './state/garden'
import Layout from './components/Layout'
import Home from './pages/Home'
import LessonList from './pages/LessonList'
import DailyLesson from './pages/DailyLesson'
import Flashcards from './pages/Flashcards'
import Conversation from './pages/Conversation'
import Evaluator from './pages/Evaluator'

export default function App() {
  return (
    <GardenProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<LessonList />} />
          <Route path="/lessons/:id" element={<DailyLesson />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/wilson" element={<Conversation />} />
          <Route path="/evaluator" element={<Evaluator />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </GardenProvider>
  )
}
