import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import SuspectAlertChart from '@/components/analytics/SuspectAlertChart';
import AlertTypePieChart from '@/components/analytics/AlertTypePieChart';
import DashboardMetric from '@/components/analytics/DashboardMetric';
import RegionMap from '@/components/analytics/RegionMap';

const Analytics = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#121218] text-white">
      {/* Navbar */}
      <Navbar activeTab="analytics" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Suspect vs Alert Ratio Chart */}
          <Card className="bg-[#1A1A24] border-0 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6">Suspect Vs Alert Ratio</h2>
              <SuspectAlertChart />
            </CardContent>
          </Card>
          
          {/* Alerts By Type */}
          <Card className="bg-[#1A1A24] border-0 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6">Alerts By Type</h2>
              <AlertTypePieChart />
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts Analytics */}
          <Card className="bg-[#1A1A24] border-0 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-medium">Alerts Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Avg Response Time */}
                <DashboardMetric 
                  title="Avg. Response Time" 
                  description="Time taken to address the response made by the team." 
                  value="12 min" 
                />
                
                {/* Resolution Rate */}
                <DashboardMetric 
                  title="Resolution Rate" 
                  description="Possible resolution rate of the alerts made on Portal." 
                  value="92.34%" 
                />
                
                {/* Frequent Violations by Vessel */}
                <div className="bg-[#202030] rounded-lg p-4 relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-400">Last 6 months</span>
                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium mb-1">Frequent Violations by Vessel</h3>
                  <div className="mt-2 h-16">
                    <img 
                      src="/lovable-uploads/fdc55883-bad0-4db9-8aa1-be78f4a78951.png" 
                      alt="Vessel"
                      className="object-contain h-full opacity-50 mx-auto"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm">Sea Hawk</div>
                        <div className="text-xs text-gray-400">4 out of 6</div>
                      </div>
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                        !
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Pending Alerts */}
                <DashboardMetric 
                  title="Pending Alerts" 
                  description="Number of alerts to be Pending in the portal." 
                  value="20 Alerts" 
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Most Alerts Received By regions */}
          <Card className="bg-[#1A1A24] border-0 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6">Most Alerts Received By regions</h2>
              <RegionMap />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
