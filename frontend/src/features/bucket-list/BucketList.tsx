import React, { useEffect, useState } from "react";
import {
  BucketListType,
  BucketListCreateType,
  BucketListUpdateType,
  BucketListDeleteType,
} from "daddys-personal-manager";

const BASE_URL = "https://backend.bagririshav01.workers.dev";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZjJmZTE5LTQ0ZDYtNGMyOS1hZjc3LTA2NGE3MjU5YmNjNiIsInVzZXJOYW1lIjoiam9obmUxMjMifQ.1TOn_Vs5RcRKcoxiP8JKRyAbvT3ofaCtyLYkYqBnhe0";

export function BucketList() {
  const [entries, setEntries] = useState<BucketListType[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<BucketListCreateType>({
    title: "",
    plan: "",
    doneBy: undefined,
  });
  const [error, setError] = useState<string | null>(null);

  async function fetchEntries() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bucket-list/bulk`, {
        headers: { Authorization: AUTH_TOKEN },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      setError("Failed to load bucket list");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.plan) {
      setError("Title and plan are required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...form,
        doneBy: form.doneBy ? new Date(form.doneBy).toISOString() : undefined,
      };

      const res = await fetch(`${BASE_URL}/api/v1/bucket-list/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setForm({ title: "", plan: "", doneBy: undefined });
      fetchEntries();
    } catch (err) {
      setError("Failed to add bucket list item");
    } finally {
      setLoading(false);
    }
  }

  async function toggleDone(id: string, current: boolean) {
    setLoading(true);
    setError(null);
    try {
      const payload: BucketListUpdateType = { id, isDone: !current };
      const res = await fetch(`${BASE_URL}/api/v1/bucket-list/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      fetchEntries();
    } catch {
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    setError(null);
    try {
      const payload: BucketListDeleteType = { id };
      const res = await fetch(`${BASE_URL}/api/v1/bucket-list/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      fetchEntries();
    } catch {
      setError("Failed to delete item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0] p-4 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl text-center font-bold mb-6 text-[#3b3b3b]">
        My Bucket List
      </h1>

      <form
        onSubmit={handleAdd}
        className="space-y-4 border border-[#e5d4c0] bg-white p-4 rounded-xl shadow-md"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border border-[#e8d7c6] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <textarea
          name="plan"
          placeholder="Write your plan"
          value={form.plan}
          onChange={handleChange}
          className="w-full p-3 border border-[#e8d7c6] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <input
          type="datetime-local"
          name="doneBy"
          value={form.doneBy || ""}
          onChange={handleChange}
          className="w-full p-3 border border-[#e8d7c6] rounded-md text-gray-700"
        />
        <button
          type="submit"
          className="bg-[#ffb7c5] hover:bg-[#fca7b5] text-white font-semibold py-2 px-4 rounded-md w-full"
        >
          Add to List
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      {loading ? (
        <p className="text-center mt-6 text-[#555]">Loading...</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="p-4 bg-white border border-[#e5d4c0] rounded-xl shadow-sm"
            >
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-[#444]">{entry.title}</h3>
                <p className="text-sm text-[#777] mb-1">{entry.plan}</p>
                {entry.doneBy && (
                  <p className="text-xs text-[#999]">
                    Done By: {new Date(entry.doneBy).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleDone(entry.id, entry.isDone)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    entry.isDone
                      ? "bg-green-400 hover:bg-green-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-white"
                  }`}
                >
                  {entry.isDone ? "Mark Undone" : "Mark Done"}
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="px-3 py-1 text-sm bg-red-400 hover:bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
