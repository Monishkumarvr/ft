import React from 'react';
import { ArrowDown, AlertCircle } from 'lucide-react';

const processes = [
  { id: 1, name: 'Mold Preparation', time: '45 min', bottleneck: false },
  { id: 2, name: 'Metal Pouring', time: '15 min', bottleneck: true },
  { id: 3, name: 'Cooling', time: '120 min', bottleneck: false },
  { id: 4, name: 'Knockout', time: '30 min', bottleneck: false },
];

export default function ProcessFlow() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Process Flow</h2>
      <div className="flex flex-col items-center space-y-4">
        {processes.map((process, index) => (
          <React.Fragment key={process.id}>
            <div
              className={`w-48 rounded-xl flex flex-col items-center justify-center p-4 ${
                process.bottleneck
                  ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100'
              } shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <span className="text-sm font-medium text-gray-900">{process.name}</span>
              <span className="mt-2 text-sm text-gray-500">{process.time}</span>
              {process.bottleneck && (
                <div className="mt-2 flex items-center text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Bottleneck</span>
                </div>
              )}
            </div>
            {index < processes.length - 1 && (
              <ArrowDown className="h-6 w-6 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}