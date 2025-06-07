import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import { Home } from "./pages/Home"
import { Navbar } from "./components/Navbar"
import {Features} from "./pages/Features"
import { BucketList } from "./features/bucket-list/BucketList"
import { PasswordManager } from "./features/password-manager/PasswordManager"
import { Tasks } from "./features/tasks/Tasks"
import { ReminderManager } from "./features/reminders/Reminders"
import { useState } from "react"
import { BudgetTracker } from "./features/budget-tracker/budgetTracker"
import { Notepad } from "./features/notepad/notepad"
function App() {

    return <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100"
  style={{
    backgroundImage: "url('https://www.transparenttextures.com/patterns/white-wall-3.png')",
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
  }}>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/bucket-list" element={<BucketList />} />
                <Route path="/budget-tracker" element={<BudgetTracker />} />
                <Route path="/notepad" element={<Notepad />} />
                <Route path="/password-manager" element={<PasswordManager />} />
                <Route path="/reminders" element={<ReminderManager />} />
                <Route path="/tasks" element={<Tasks />} />

            </Routes>
        </BrowserRouter>
    </div>
}

export default App
