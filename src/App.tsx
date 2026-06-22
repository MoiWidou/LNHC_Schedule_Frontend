import { LOCATION_CONFIGS } from './types/types';
import { MemberManagement } from './components/MemberManagement';
import { ScheduleTable } from './components/ScheduleTable';
import { useEffect } from 'react';
import { useScheduleStore } from './types/useScheduleStore';

function App() {
  const fetchMembers = useScheduleStore((s) => s.fetchMembers);
  const fetchSchedules = useScheduleStore((s) => s.fetchSchedules); // Grab fetchSchedules action
  const allLocationConfigs = Object.values(LOCATION_CONFIGS);
  
  useEffect(() => {
    fetchMembers(); //fecth all members for the assigness
    fetchSchedules(); // Fetch all church schedules when app boots up
  }, [fetchMembers, fetchSchedules]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <header className="bg-white border-b border-gray-200 py-6 px-8 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Lipa New Hope Church PnW Scheduling Website
            </h1>
            <p className="text-sm text-gray-500 font-medium">Nathan Pogi</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Complete Sync
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Shared Member Registry Roster */}
        <MemberManagement />

        {/* Dynamic Multi-Location Scheduling Grids */}
        <div className="space-y-6">
          <ScheduleTable config={LOCATION_CONFIGS.LNHC} allLocations={allLocationConfigs}/>
          <ScheduleTable config={LOCATION_CONFIGS.Tangway} allLocations={allLocationConfigs}/>
          <ScheduleTable config={LOCATION_CONFIGS.GarciaRosario} allLocations={allLocationConfigs}/>
        </div>
      </main>
    </div>
  );
}

export default App;