import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';


const App = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  function getData() {
    axios.get("http://localhost:3000/api/card").then((res) => {
      console.log(res.data)
      setCards(res.data.card || [])  
    }).catch(err => console.error(err));
  }
  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title || formData.description) {
      axios.post("http://localhost:3000/api/card", formData).then((res) => {
        // Prepend the new card so it shows up first
        setCards(prev => [res.data.newCard, ...prev]);
        setFormData({ title: '', description: '' });
      }).catch(err => console.error(err));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center p-6 pt-12 font-sans antialiased text-white">

      {/* Form Section (Top) */}
      <div className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 p-8 shadow-2xl mb-12">
        <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          Create New Card
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-neutral-600"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-neutral-600 resize-none"
              placeholder="Enter description"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 px-5 py-2.5 rounded-xl bg-white text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition-colors duration-200 shadow-lg shadow-white/10 active:scale-95 cursor-pointer"
          >
            Add Card
          </button>
        </form>
      </div>

      {/* Cards Grid Section (Below Form) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards?.map((card) => (
          <div key={card._id || card.id} className="group relative w-full rounded-2xl bg-neutral-900 border border-neutral-800 p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-cyan-500/20 hover:border-neutral-700 h-full flex flex-col">

            {/* Decorative background glow */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Card Header / Title */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent break-words">
                {card.title}
              </h2>
            </div>

            {/* Card Body / Description */}
            <div className="flex-grow">
              <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap break-words">
                {card.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default App
