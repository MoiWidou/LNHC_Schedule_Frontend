import React, { useState } from 'react';
import { useScheduleStore } from '../types/useScheduleStore';

export const MemberManagement: React.FC = () => {
  const { members, addMember, deleteMember } = useScheduleStore();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMember(name.trim());
    setName('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Worship Ministry Registry</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter volunteer roster name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md text-sm transition-colors"
        >
          + Add Member
        </button>
      </form>

      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm text-xs font-medium text-gray-700"
          >
            <span>{member.name}</span>
            <button
              onClick={() => deleteMember(member.id)}
              className="text-red-400 hover:text-red-600 font-bold transition-colors"
            >
              ×
            </button>
          </div>
        ))}
        {members.length === 0 && (
          <p className="text-gray-400 text-sm italic w-full text-center py-2">No active volunteers listed.</p>
        )}
      </div>
    </div>
  );
};