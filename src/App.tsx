import React from 'react';
import { Activity, Clock, Gauge, TrendingUp } from 'lucide-react';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import NotificationsPanel from './components/NotificationsPanel';
import InteractiveProcessFlow from './components/InteractiveProcessFlow';
import PartsTable from './components/PartsTable';
import CycleTimeChart from './components/Charts/CycleTimeChart';
import CapacityGauge from './components/Charts/CapacityGauge';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Mold Production Rate"
            value="42/hr"
            trend={5.2}
            icon={Activity}
          />
          <MetricCard
            title="Molten Metal Holding Costs"
            value="$2,450"
            trend={-2.1}
            icon={TrendingUp}
          />
          <MetricCard
            title="Capacity Utilization"
            value="87%"
            trend={3.8}
            icon={Gauge}
          />
          <MetricCard
            title="Avg. Cycle Time"
            value="3.2 hrs"
            trend={-1.5}
            icon={Clock}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <InteractiveProcessFlow />
            <CycleTimeChart />
            <PartsTable />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="card p-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Current Capacity</h2>
              <CapacityGauge value={87} />
            </div>
            <NotificationsPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;