import React, { useState, ChangeEvent } from 'react';

interface BucketItem {
  text: string;
  done: boolean;
}

interface BucketListType {
  owner: string;
  items: BucketItem[];
}

export function BucketList() {
  const [bucketLists, setBucketLists] = useState<BucketListType[]>([]);
  const [ownerName, setOwnerName] = useState<string>('');
  const [currentItems, setCurrentItems] = useState<BucketItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setCurrentItems([...currentItems, { text: newItem.trim(), done: false }]);
      setNewItem('');
    }
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditedText(currentItems[index].text);
  };

  const saveEdit = () => {
    if (editingIndex === null || editedText.trim() === '') return;

    const updatedItems = [...currentItems];
    updatedItems[editingIndex].text = editedText.trim();
    setCurrentItems(updatedItems);
    setEditingIndex(null);
    setEditedText('');
  };

  const markDone = (index: number) => {
    const updatedItems = [...currentItems];
    updatedItems[index].done = true;
    setCurrentItems(updatedItems);
  };

  const createBucketList = () => {
    if (ownerName.trim() === '' || currentItems.length === 0) return;

    setBucketLists([
      ...bucketLists,
      {
        owner: ownerName.trim(),
        items: currentItems,
      },
    ]);

    setOwnerName('');
    setCurrentItems([]);
    setNewItem('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-pink-100 py-10 px-4 text-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 transition-all">🌟 Multi Bucket List App 🌟</h1>

      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-6 space-y-6 transition-all">
        <input
          type="text"
          value={ownerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setOwnerName(e.target.value)}
          placeholder="Your Name"
          className="w-full border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value)}
            placeholder="Add bucket list item"
            className="flex-1 border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={addItem}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition-all"
          >
            Add
          </button>
        </div>

        <ul className="text-left space-y-2">
          {currentItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedText(e.target.value)}
                    className="flex-1 border p-1 rounded-lg"
                  />
                  <button onClick={saveEdit} className="ml-2 text-blue-500">Save</button>
                </>
              ) : (
                <>
                  <span className={`${item.done ? 'line-through text-gray-500' : ''}`}>{item.text}</span>
                  {!item.done && (
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(index)} className="text-yellow-500">Edit</button>
                      <button onClick={() => markDone(index)} className="text-green-600">Done</button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={createBucketList}
          disabled={!ownerName || currentItems.length === 0}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
        >
          Create Bucket List
        </button>
      </div>

      {/* Display Created Bucket Lists */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-indigo-800 mb-6">All Bucket Lists 🗂️</h2>
        <div className="space-y-6">
          {bucketLists.map((list, idx) => (
            <div
              key={idx}
              className="max-w-xl mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-purple-600">{list.owner}'s Bucket List</h3>
              <ul className="mt-2 text-left space-y-1">
                {list.items.map((item, i) => (
                  <li
                    key={i}
                    className={`pl-2 ${item.done ? 'text-green-600 line-through' : 'text-black'}`}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
