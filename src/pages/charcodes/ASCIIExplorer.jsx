import React, { useState } from 'react';
import { asciiTable, asciiCategories } from '../../data/asciiData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import BitDisplay from '../../components/charcode/BitDisplay';

export default function ASCIIExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedChar, setSelectedChar] = useState(null);

  const categories = ['All', 'Control', 'Space', 'Symbol', 'Digit', 'Uppercase', 'Lowercase'];

  const filteredTable = asciiTable.filter(item => {
    const matchesSearch = 
      item.char.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dec.toString().includes(searchTerm) ||
      item.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      Control: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
      Digit: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
      Uppercase: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
      Lowercase: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200',
      Symbol: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6 relative">
      <div className={`flex-1 transition-all ${selectedChar ? 'md:w-2/3' : 'w-full'}`}>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">ASCII Table Explorer</h1>
        
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Search character, decimal, hex, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {filteredTable.map((item) => (
            <button
              key={item.dec}
              onClick={() => setSelectedChar(item)}
              className={`p-2 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105 ${getCategoryColor(item.category)} ${selectedChar?.dec === item.dec ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
              title={item.description}
            >
              <span className="text-sm font-mono opacity-70 mb-1">{item.dec}</span>
              <span className="text-lg font-bold font-mono">
                {item.category === 'Control' ? item.abbr || item.char : item.char}
              </span>
            </button>
          ))}
          {filteredTable.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-500">No characters found matching your criteria.</div>
          )}
        </div>
      </div>

      {/* Details Panel */}
      {selectedChar && (
        <aside className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 sticky top-4 h-fit">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Character Details</h2>
            <button onClick={() => setSelectedChar(null)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className={`w-32 h-32 flex items-center justify-center rounded-2xl text-6xl font-serif shadow-inner ${getCategoryColor(selectedChar.category)}`}>
              {selectedChar.category === 'Control' ? selectedChar.abbr || selectedChar.char : selectedChar.char}
            </div>
            <div className="mt-4 text-center">
              <Badge color="blue">{selectedChar.category}</Badge>
              {selectedChar.description && <p className="mt-2 text-slate-600 dark:text-slate-400">{selectedChar.description}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider">Decimal</div>
                <div className="text-xl font-mono font-semibold">{selectedChar.dec}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider">Hex</div>
                <div className="text-xl font-mono font-semibold">{selectedChar.hex}</div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded text-center">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Binary</div>
              <BitDisplay bits={selectedChar.bin.padStart(8, '0')} size="md" />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
