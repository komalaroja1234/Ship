import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Download, ArrowUp, ArrowDown } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Separator } from '@/components/ui/separator';

// Mock data for the charts
const activeRuleData = [
  { value: 3 }, { value: 2 }, { value: 2 }, { value: 3 }, 
  { value: 2 }, { value: 4 }, { value: 3 }, { value: 2 }
];

const stoppedRuleData = [
  { value: 2 }, { value: 3 }, { value: 4 }, { value: 2 }, 
  { value: 3 }, { value: 5 }, { value: 4 }, { value: 3 }
];

const totalRuleData = [
  { value: 5 }, { value: 6 }, { value: 5 }, { value: 7 }, 
  { value: 6 }, { value: 5 }, { value: 6 }, { value: 5 }
];

const deletedRuleData = [
  { value: 5 }, { value: 6 }, { value: 7 }, { value: 6 }, 
  { value: 5 }, { value: 4 }, { value: 5 }, { value: 4 }
];

// Mock data for the rules table
const rulesData = [
  {
    id: 1,
    ruleName: 'AIS Off Alert',
    ruleId: '#34352',
    type: 'Standard',
    status: 'active',
    description: 'AIS is off for more than 2 hours',
    version: '1.2',
    action: 'active'
  },
  {
    id: 2,
    ruleName: 'Restricted Zone Violation',
    ruleId: '#34352',
    type: 'Custom',
    status: 'hold',
    description: 'Vessel enters a restricted zone',
    version: '1.6',
    action: 'hold'
  },
  {
    id: 3,
    ruleName: 'Loitering Alert',
    ruleId: '#34352',
    type: 'Custom',
    status: 'inactive',
    description: 'Vessel remains in a location for...',
    version: '1.7',
    action: 'active'
  },
  {
    id: 4,
    ruleName: 'Suspicious Loitering in Restricted Zone',
    ruleId: '#34352',
    type: 'Standard',
    status: 'active',
    description: 'Vessel speed exceeds 15 knots ...',
    version: '1.8',
    action: 'hold'
  },
  {
    id: 5,
    ruleName: 'Drifting Near Shore',
    ruleId: '#34352',
    type: 'Custom',
    status: 'hold',
    description: 'Vessel remains in a location for...',
    version: '1.3',
    action: 'active'
  }
];

const RuleEngine = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to render status indicator
  const renderStatusIndicator = (status: string) => {
    switch(status) {
      case 'active':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Active</span>
          </div>
        );
      case 'hold':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>In hold</span>
          </div>
        );
      case 'inactive':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span>Inactive</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Function to render action button
  const renderActionButton = (action: string) => {
    switch(action) {
      case 'active':
        return (
          <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-full">
            Active
          </button>
        );
      case 'hold':
        return (
          <button className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full">
            Hold
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-tech-darker text-tech-text">
      {/* Navbar */}
      <Navbar activeTab="engine" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Rules Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-gray-400">Rules Active currently</p>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-bold">2</h2>
                  <div className="flex items-center text-xs text-red-500">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>1.3% than last year</span>
                  </div>
                </div>
                <div className="h-16 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activeRuleData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#22c55e" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stopped Rules Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-gray-400">Rules Stopped</p>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-bold">3</h2>
                  <div className="flex items-center text-xs text-red-500">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>1.2% than last year</span>
                  </div>
                </div>
                <div className="h-16 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stoppedRuleData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#eab308" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Rules Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-gray-400">Total Rules</p>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-bold">5</h2>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>2.3% than last year</span>
                  </div>
                </div>
                <div className="h-16 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={totalRuleData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Deleted Rules Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-gray-400">Deleted Rules</p>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl font-bold">5</h2>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>2.3% than last year</span>
                  </div>
                </div>
                <div className="h-16 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={deletedRuleData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Rules Table Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              {/* Table Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Rules Engine</h2>
                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="pl-9 pr-4 py-2 bg-gray-800 rounded-full border-0 text-sm text-gray-300 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {/* Download Button */}
                  <button className="p-2 bg-gray-800 rounded-full">
                    <Download className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {/* Rules Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-800">
                      <TableHead className="text-gray-400">Rule No.</TableHead>
                      <TableHead className="text-gray-400">Rules Name</TableHead>
                      <TableHead className="text-gray-400">ID</TableHead>
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Description</TableHead>
                      <TableHead className="text-gray-400">Version</TableHead>
                      <TableHead className="text-gray-400">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rulesData.map((rule) => (
                      <TableRow 
                        key={rule.id} 
                        className="border-b border-gray-800 hover:bg-gray-800/50"
                      >
                        <TableCell>{rule.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            <span>{rule.ruleName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{rule.ruleId}</TableCell>
                        <TableCell>{rule.type}</TableCell>
                        <TableCell>{renderStatusIndicator(rule.status)}</TableCell>
                        <TableCell className="max-w-xs truncate">{rule.description}</TableCell>
                        <TableCell>{rule.version}</TableCell>
                        <TableCell>
                          <div className="w-28">
                            {renderActionButton(rule.action)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RuleEngine;