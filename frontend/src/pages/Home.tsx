import { Link } from "react-router-dom"

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold text-pink-600 mb-6 leading-tight">
          Your Personal Manager, Reimagined
        </h1>
        <p className="text-lg text-pink-500 mb-10">
          Stay organized with elegance — passwords, notes, budgets, and dreams in one place
        </p>
        <Link
          to="/features"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
        >
          Explore Features
        </Link>
      </div>

      <div className="mt-20 text-sm text-pink-400">
        Made with 💖 to simplify your digital life
      </div>
    </div>
  )
}
