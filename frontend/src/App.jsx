import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';


const App = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

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
      if (editingId) {
        // Update existing card via PUT request
        axios.put(`http://localhost:3000/api/card/${editingId}`, formData).then((res) => {
          // Manually update the state with the new data since backend returns the old object
          setCards(prev => prev.map(c => (c._id || c.id) === editingId ? { ...c, title: formData.title, description: formData.description } : c));
          setEditingId(null);
          setFormData({ title: '', description: '' });
        }).catch(err => console.error(err));
      } else {
        // Create new card
        axios.post("http://localhost:3000/api/card", formData).then((res) => {
          // Prepend the new card so it shows up first
          setCards(prev => [res.data.newCard, ...prev]);
          setFormData({ title: '', description: '' });
        }).catch(err => console.error(err));
      }
    }
  };

  const handleEditClick = (card) => {
    setEditingId(card._id || card.id);
    setFormData({ title: card.title || '', description: card.description || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/card/${id}`).then((res) => {
      // Remove the deleted card from the state
      setCards(prev => prev.filter(card => (card._id || card.id) !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({ title: '', description: '' });
      }
    }).catch(err => console.error(err));
  };

  const theme = {
    bg: isDarkMode ? "bg-neutral-950" : "bg-neutral-200",
    text: isDarkMode ? "text-white" : "text-neutral-900",
    cardBg: isDarkMode ? "bg-neutral-900" : "bg-neutral-50",
    border: isDarkMode ? "border-neutral-800" : "border-neutral-300",
    inputBg: isDarkMode ? "bg-neutral-950" : "bg-neutral-100",
    inputText: isDarkMode ? "text-neutral-200" : "text-neutral-900",
    inputPlaceholder: isDarkMode ? "placeholder-neutral-600" : "placeholder-neutral-500",
    buttonBg: isDarkMode ? "bg-white" : "bg-neutral-900",
    buttonText: isDarkMode ? "text-neutral-950" : "text-white",
    buttonHover: isDarkMode ? "hover:bg-neutral-200" : "hover:bg-neutral-800",
    cancelBg: isDarkMode ? "bg-neutral-800" : "bg-neutral-200",
    cancelText: isDarkMode ? "text-white" : "text-neutral-700",
    cancelHover: isDarkMode ? "hover:bg-neutral-700" : "hover:bg-neutral-300",
    gradientText: isDarkMode ? "from-white to-neutral-400" : "from-neutral-900 to-neutral-600",
    descText: isDarkMode ? "text-neutral-400" : "text-neutral-600",
    shadow: isDarkMode ? "shadow-2xl" : "shadow-xl shadow-neutral-300/50",
    label: isDarkMode ? "text-neutral-400" : "text-neutral-700",
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col items-center p-6 pt-20 font-sans antialiased transition-colors duration-300 relative`}>

      {/* Theme Toggle Slider */}
      <div className="absolute top-6 right-6 flex items-center space-x-3 z-50">
        <span className={`text-sm font-medium ${isDarkMode ? 'text-neutral-500' : 'text-neutral-900'}`}>Light</span>
        <button 
          onClick={toggleTheme}
          className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-300'}`}
          title="Toggle Theme"
        >
          <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
        </button>
        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-400'}`}>Dark</span>
      </div>

      {/* Form Section (Top) */}
      <div className={`w-full max-w-xl rounded-2xl ${theme.cardBg} border ${theme.border} p-8 ${theme.shadow} mb-12 transition-all duration-300`}>
        <h2 className={`text-xl font-bold mb-6 bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent`}>
          {editingId ? "Edit Card" : "Create New Card"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme.label} mb-1`} htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full ${theme.inputBg} border ${theme.border} rounded-lg px-4 py-2 ${theme.inputText} focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all ${theme.inputPlaceholder}`}
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme.label} mb-1`} htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full ${theme.inputBg} border ${theme.border} rounded-lg px-4 py-2 ${theme.inputText} focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all ${theme.inputPlaceholder} resize-none`}
              placeholder="Enter description"
            />
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              className={`flex-1 px-5 py-2.5 rounded-xl ${theme.buttonBg} text-sm font-semibold ${theme.buttonText} ${theme.buttonHover} transition-colors duration-200 shadow-lg ${isDarkMode ? 'shadow-white/10' : 'shadow-black/10'} active:scale-95 cursor-pointer`}
            >
              {editingId ? "Update Card" : "Add Card"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ title: '', description: '' }); }}
                className={`flex-1 px-5 py-2.5 rounded-xl ${theme.cancelBg} text-sm font-semibold ${theme.cancelText} ${theme.cancelHover} transition-colors duration-200 border ${theme.border} active:scale-95 cursor-pointer`}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Cards Grid Section (Below Form) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards?.map((card) => (
          <div key={card._id || card.id} className={`group relative w-full rounded-2xl ${theme.cardBg} border ${(card._id || card.id) === editingId ? 'border-cyan-500/50 shadow-cyan-500/20' : theme.border} p-8 ${theme.shadow} transition-all duration-500 hover:-translate-y-2 hover:shadow-cyan-500/20 hover:border-cyan-500/50 h-full flex flex-col`}>

            {/* Decorative background glow */}
            <div className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 ${(card._id || card.id) === editingId ? 'opacity-100' : ''}`}></div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                onClick={() => handleEditClick(card)}
                className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 focus:outline-none"
                title="Edit Card"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={() => handleDelete(card._id || card.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 focus:outline-none"
                title="Delete Card"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Card Header / Title */}
            <div className="mb-4 pr-16">
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent break-words`}>
                {card.title}
              </h2>
            </div>

            {/* Card Body / Description */}
            <div className="flex-grow">
              <p className={`${theme.descText} leading-relaxed whitespace-pre-wrap break-words`}>
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
