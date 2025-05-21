// PasswordEntryCard.tsx
import { useState } from "react"
import { PasswordManagerType } from "daddys-personal-manager"

interface Props {
  entry: PasswordManagerType
  onDelete: (id: string) => void
  onUpdate: (id: string, password: string, notes?: string) => Promise<void>
}

export function PasswordEntryCard({ entry, onDelete, onUpdate }: Props) {
  const [showPass, setShowPass] = useState(false)
  const [editing, setEditing] = useState(false)
  const [updatedPassword, setUpdatedPassword] = useState("")
  const [updatedNotes, setUpdatedNotes] = useState(entry.notes || "")
  const [loadingPass, setLoadingPass] = useState(false)
  const [passwordFetched, setPasswordFetched] = useState(false)
  const [copied, setCopied] = useState(false)

  const api = "https://backend.bagririshav01.workers.dev/api/v1/password-manager"

  const handleCopy = () => {
    if (updatedPassword) {
      navigator.clipboard.writeText(updatedPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSave = async () => {
    await onUpdate(entry.id, updatedPassword, updatedNotes)
    setEditing(false)
  }

  const fetchPassword = async () => {
    setLoadingPass(true)
    try {
      const res = await fetch(`${api}/password/${entry.id}`, {
        headers: {
          "content-type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZjJmZTE5LTQ0ZDYtNGMyOS1hZjc3LTA2NGE3MjU5YmNjNiIsInVzZXJOYW1lIjoiam9obmUxMjMifQ.1TOn_Vs5RcRKcoxiP8JKRyAbvT3ofaCtyLYkYqBnhe0",
        },
      })
      const data = await res.json()
      setUpdatedPassword(data.password)
      setPasswordFetched(true)
    } catch (e) {
      console.error("Failed to fetch password", e)
    } finally {
      setLoadingPass(false)
    }
  }

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow border border-pink-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-pink-800">{entry.domain}</h2>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-sm text-red-500 hover:underline"
          >
            delete
          </button>
        </div>

        {editing ? (
          <>
            <input
              className="w-full mt-2 border rounded p-2"
              type="text"
              placeholder="Updated Password"
              value={updatedPassword}
              onChange={e => setUpdatedPassword(e.target.value)}
            />
            <input
              className="w-full mt-2 border rounded p-2"
              type="text"
              placeholder="Updated Notes"
              value={updatedNotes}
              onChange={e => setUpdatedNotes(e.target.value)}
            />
            <button
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              onClick={handleSave}
            >
              save
            </button>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm">
              <span className="font-medium text-pink-700">Password:</span>
              {showPass && updatedPassword ? (
                <span className="ml-2">{updatedPassword}</span>
              ) : (
                <span className="ml-2">••••••</span>
              )}
            </p>

            <div className="mt-2 space-x-2">
              {!passwordFetched ? (
                <button
                  className="text-sm text-yellow-600 hover:underline"
                  onClick={fetchPassword}
                  disabled={loadingPass}
                >
                  {loadingPass ? "loading..." : "get password"}
                </button>
              ) : (
                <>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setShowPass(prev => !prev)}
                    disabled={!updatedPassword}
                  >
                    {showPass ? "hide" : "show"}
                  </button>
                  <button
                    className="text-sm text-purple-500 hover:underline"
                    onClick={handleCopy}
                    disabled={!updatedPassword}
                  >
                    copy
                  </button>
                </>
              )}
              <button
                className="text-sm text-green-600 hover:underline"
                onClick={() => setEditing(true)}
              >
                edit
              </button>
            </div>

            <p className="text-sm mt-3 text-gray-700">
              <span className="font-medium text-pink-700">Notes:</span> {updatedNotes || "none"}
            </p>
          </>
        )}
      </div>

      {copied && (
        <div className="fixed bottom-6 right-6 bg-pink-600 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
          copied to clipboard
        </div>
      )}
    </>
  )
}