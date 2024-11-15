import React from 'react';
import { ArrowDown, ArrowUp, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface Part {
  id: string;
  name: string;
  predictedMolds: number;
  actualMolds: number;
  status: 'success' | 'warning' | 'danger';
}

const parts: Part[] = [
  { id: '1', name: 'Engine Block A123', predictedMolds: 100, actualMolds: 95, status: 'success' },
  { id: '2', name: 'Cylinder Head B456', predictedMolds: 80, actualMolds: 60, status: 'warning' },
  { id: '3', name: 'Transmission Case C789', predictedMolds: 50, actualMolds: 20, status: 'danger' },
  { id: '4', name: 'Brake Drum D012', predictedMolds: 120, actualMolds: 115, status: 'success' },
  { id: '5', name: 'Flywheel E345', predictedMolds: 90, actualMolds: 45, status: 'danger' },
];

export default function PartsTable() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Parts Availability</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button className="btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Part Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Predicted Molds
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actual Molds
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parts
              .filter((part) =>
                part.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((part, index) => (
                <motion.tr
                  key={part.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-primary-700">
                          {part.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{part.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {part.predictedMolds}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      {part.actualMolds}
                      {part.actualMolds < part.predictedMolds ? (
                        <ArrowDown className="ml-1 h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowUp className="ml-1 h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        part.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : part.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {part.status === 'success'
                        ? 'On Target'
                        : part.status === 'warning'
                        ? 'At Risk'
                        : 'Below Target'}
                    </span>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}