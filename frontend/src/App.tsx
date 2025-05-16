import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import { Home } from "./pages/Home"
import { Navbar } from "./components/Navbar"
import {Features} from "./pages/Features"
import { BucketList } from "./features/bucket-list/BucketList"
import { Notepad } from "./features/budget-tracker/Notepad"
import { ExpenseTracker } from "./features/notepad/ExpenseTracker"
import { PasswordManager } from "./features/password-manager/PasswordManager"
import { Tasks } from "./features/tasks/Tasks"
import { Reminders } from "./features/reminders/Reminders"
import { useState } from "react"
function App() {

    return <div className="">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/bucket-list" element={<BucketList />} />
                <Route path="/budget-tracker" element={<Notepad />} />
                <Route path="/notepad" element={<ExpenseTracker />} />
                <Route path="/password-manager" element={<PasswordManager />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/tasks" element={<Tasks />} />

            </Routes>
        </BrowserRouter>
    </div>
}

export default App
