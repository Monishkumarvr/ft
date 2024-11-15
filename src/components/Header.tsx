import React from 'react';
import { Activity, Bell, Settings, Home, BarChart2, Droplet, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { name: 'Home', icon: Home },
  { name: 'Molding Insights', icon: BarChart2 },
  { name: 'Melting Insights', icon: Droplet },
  { name: 'Cycle Time Analysis', icon: Clock },
  { name: 'Settings', icon: Settings }
];

export default function Header() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [activeTab, setActiveTab] = React.useState('Home');

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-50 glass-effect"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-shadow">SmartFoundry</h1>
          </div>
          <div className="flex items-center space-x-6">
            <time className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {currentTime.toLocaleString()}
            </time>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white animate-pulse" />
            </motion.button>
          </div>
        </div>
        <nav className="mt-4">
          <ul className="flex space-x-8">
            {tabs.map(({ name, icon: Icon }) => (
              <li key={name}>
                <button
                  onClick={() => setActiveTab(name)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === name
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                  {activeTab === name && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}