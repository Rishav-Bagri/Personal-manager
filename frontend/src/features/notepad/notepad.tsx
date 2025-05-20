import React, { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

export default function NotepadVCX() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [history, setHistory] = useState<Note[]>([]);

  const handleAddNote = () => {
    if (title.trim() && content.trim()) {
      const newNote: Note = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        completed: false,
      };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
    }
  };

  const handleComplete = (id: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, completed: true } : note
    );
    const completedNote = updatedNotes.find(note => note.id === id);
    if (completedNote) {
      setHistory([...history, completedNote]);
    }
    setNotes(updatedNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-purple-800">Notepad.vcx</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-4">
        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <textarea
          placeholder="Enter your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          rows={4}
        ></textarea>
        <button
          onClick={handleAddNote}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl w-full hover:bg-purple-700 transition"
        >
          Add Note
        </button>
      </div>

      {notes.length > 0 && (
        <div className="mt-10 w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Current Notes</h2>
          {notes.map((note) => (
            <div key={note.id} className="bg-white p-4 mb-3 rounded-xl shadow-md">
              <h3 className="font-bold text-lg text-purple-700">{note.title}</h3>
              <p className="text-gray-700 mt-1">{note.content}</p>
              <button
                onClick={() => handleComplete(note.id)}
                className="mt-2 text-sm text-green-600 hover:underline"
              >
                Mark as Done
              </button>
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-10 w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Completed Notes</h2>
          {history.map((note) => (
            <div key={note.id} className="bg-green-100 p-4 mb-3 rounded-xl shadow-inner">
              <h3 className="font-bold text-lg text-green-900">{note.title}</h3>
              <p className="text-green-800 mt-1">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
