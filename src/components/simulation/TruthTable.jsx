import React from 'react';

const TruthTable = ({ columns = [], rows = [], highlightRow, onRowClick }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900/50">
          <tr>
            {columns.map((col, i) => (
              <th 
                key={col.key || i}
                scope="col"
                className={`px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200 ${col.width || ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
          {rows.map((row, rowIndex) => {
            let isHighlighted = false;
            if (typeof highlightRow === 'function') {
              isHighlighted = highlightRow(row, rowIndex);
            } else {
              isHighlighted = highlightRow === rowIndex;
            }

            return (
              <tr 
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row, rowIndex)}
                className={`transition-colors duration-150 ${isHighlighted ? 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-l-purple-500' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 border-l-4 border-l-transparent'} ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col, colIndex) => {
                  const val = row[col.key];
                  const isBinary = val === 0 || val === 1 || val === '0' || val === '1';
                  
                  let cellClass = "px-4 py-2 text-center font-mono whitespace-nowrap";
                  if (isBinary) {
                    cellClass += (val == 1) ? " text-emerald-600 dark:text-emerald-400 font-bold" : " text-red-600 dark:text-red-400 font-bold";
                  } else {
                    cellClass += " text-slate-600 dark:text-slate-300";
                  }

                  return (
                    <td key={colIndex} className={cellClass}>
                      {val}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TruthTable;
