import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { time: '08:00', actual: 3.2, predicted: 3.0 },
  { time: '09:00', actual: 3.5, predicted: 3.0 },
  { time: '10:00', actual: 3.1, predicted: 3.0 },
  { time: '11:00', actual: 3.3, predicted: 3.0 },
  { time: '12:00', actual: 3.0, predicted: 3.0 },
  { time: '13:00', actual: 3.4, predicted: 3.0 },
  { time: '14:00', actual: 3.2, predicted: 3.0 },
];

export default function CycleTimeChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Cycle Time Analysis</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ fill: '#0ea5e9' }}
              name="Actual Cycle Time"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#6b7280' }}
              name="Target Cycle Time"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}