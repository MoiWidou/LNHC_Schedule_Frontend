import React from 'react';
import { useScheduleStore } from '../types/useScheduleStore';
import type { LocationConfig } from '../types/types';
import { ConflictDropdown } from './ConflictDropdown';

interface ScheduleTableProps {
  config: LocationConfig;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ config }) => {
  const { schedules, addScheduleRow, updateRowDate, updateAssignment, deleteScheduleRow } = useScheduleStore();
  const rows = schedules[config.id] || [];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden mb-8">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
        <h3 className="text-lg font-bold text-gray-800">{config.name} Deployment Schedule</h3>
        <button
          onClick={() => addScheduleRow(config.id, '')}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          + Add Date Row
        </button>
      </div>

      <div className="overflow-x-auto max-h-[450px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="p-3 min-w-[150px]">Serving Date</th>
              {config.roles.map((role) => (
                <th key={role.key} className="p-3 min-w-[160px]">{role.label}</th>
              ))}
              <th className="p-3 text-center w-16">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={config.roles.length + 2} className="p-8 text-center text-gray-400 italic">
                  No tracking dates assigned yet. Click "+ Add Date Row" to schedule teams.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-3">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => updateRowDate(config.id, row.id, e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  {config.roles.map((role) => (
                    <td key={role.key} className="p-3">
                      <ConflictDropdown
                        locationId={config.id}
                        rowId={row.id}
                        date={row.date}
                        roleKey={role.key}
                        value={row.assignments[role.key] || ''}
                        onChange={(memberId) => updateAssignment(config.id, row.id, role.key, memberId)}
                      />
                    </td>
                  ))}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteScheduleRow(config.id, row.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                      title="Delete Row"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};