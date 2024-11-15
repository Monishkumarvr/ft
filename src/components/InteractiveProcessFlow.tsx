import React, { useState } from 'react';
import { ArrowRight, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Process {
  id: number;
  name: string;
  time: string;
  bottleneck: boolean;
  details: {
    operator: string;
    temperature?: string;
    pressure?: string;
    status: 'optimal' | 'warning' | 'critical';
  };
}

const processes: Process[] = [
  {
    id: 1,
    name: 'Mold Preparation',
    time: '45 min',
    bottleneck: false,
    details: {
      operator: 'John Smith',
      status: 'optimal',
    },
  },
  {
    id: 2,
    name: 'Metal Pouring',
    time: '15 min',
    bottleneck: true,
    details: {
      operator: 'Sarah Johnson',
      temperature: '1450°C',
      pressure: '2.5 bar',
      status: 'critical',
    },
  },
  {
    id: 3,
    name: 'Cooling',
    time: '120 min',
    bottleneck: false,
    details: {
      operator: 'Mike Brown',
      temperature: '150°C',
      status: 'warning',
    },
  },
  {
    id: 4,
    name: 'Knockout',
    time: '30 min',
    bottleneck: false,
    details: {
      operator: 'Lisa Davis',
      status: 'optimal',
    },
  },
];

export default function InteractiveProcessFlow() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Process Flow</h2>
      <div className="flex flex-col space-y-4">
        {processes.map((process, index) => (
          <div key={process.id}>
            <motion.div className="flex flex-col">
              <button
                onClick={() => setExpandedId(expandedId === process.id ? null : process.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl ${
                  process.bottleneck
                    ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
                } hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">{process.name}</span>
                  <span className="text-sm text-gray-500">{process.time}</span>
                  {process.bottleneck && (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Bottleneck</span>
                    </div>
                  )}
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    expandedId === process.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedId === process.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white border-x border-b rounded-b-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Operator</span>
                        <span className="text-sm text-gray-900">{process.details.operator}</span>
                      </div>
                      {process.details.temperature && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Temperature</span>
                          <span className="text-sm text-gray-900">{process.details.temperature}</span>
                        </div>
                      )}
                      {process.details.pressure && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Pressure</span>
                          <span className="text-sm text-gray-900">{process.details.pressure}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Status</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            process.details.status === 'optimal'
                              ? 'bg-green-100 text-green-800'
                              : process.details.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {process.details.status.charAt(0).toUpperCase() + process.details.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {index < processes.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight className="h-6 w-6 text-primary-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}