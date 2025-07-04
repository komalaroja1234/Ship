import React, { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import ImageUploader from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Radar, Upload, Ship } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(undefined);
  const [isScanning, setIsScanning] = useState(false);
  const [imageKey, setImageKey] = useState(0); // Used to force reload of Map component
  
  const handleImageUploaded = useCallback((imageUrl: string) => {
    // Increment the key to force Map component to remount
    setImageKey(prev => prev + 1);
    setUploadedImageUrl(imageUrl);
    setIsScanning(true);
  }, []);
  
  const handleScanComplete = useCallback(() => {
    setIsScanning(false);
    toast({
      title: "Ship Detection Complete",
      description: "All ships have been identified and classified.",
    });
  }, []);
  
  const handleStartDetecting = useCallback(() => {
    if (!uploadedImageUrl) {
      toast({
        title: "No image uploaded",
        description: "Please upload a satellite image first to start ship detection.",
        variant: "destructive",
      });
      return;
    }
    
    // Force a remount of the Map component to restart detection
    setImageKey(prev => prev + 1);
    setIsScanning(true);
  }, [uploadedImageUrl]);
  
  const handleOpenUploader = useCallback(() => {
    setIsUploaderOpen(true);
  }, []);
  
  const handleCloseUploader = useCallback(() => {
    setIsUploaderOpen(false);
  }, []);
  
  return (
    <div className="h-screen w-full flex flex-col bg-tech-darker text-tech-text">
      {/* Navbar */}
      <Navbar activeTab="dashboard" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Map container */}
        <div className="relative flex-1 rounded-lg overflow-hidden border border-white/10">
          <Map 
            key={imageKey} // Force remount when key changes
            uploadedImageUrl={uploadedImageUrl}
            isScanning={isScanning}
            onScanComplete={handleScanComplete}
          />
          
          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <Button 
              className={`${isScanning 
                ? 'bg-red-700 hover:bg-red-600' 
                : 'bg-purple-800 hover:bg-purple-700'} 
                text-white font-medium px-6 py-5 rounded-full shadow-lg`}
              onClick={handleStartDetecting}
            >
              <Ship className="mr-2 h-5 w-5" />
              {isScanning ? 'Scanning for Ships...' : 'Detect Ships'}
            </Button>
          </div>
          
          {/* Upload button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              className="bg-tech-overlay/80 backdrop-blur-md hover:bg-tech-overlay border border-white/20 text-white"
              onClick={handleOpenUploader}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Satellite Image
            </Button>
          </div>
        </div>
      </div>
      
      {/* Image uploader modal */}
      {isUploaderOpen && (
        <ImageUploader 
          onClose={handleCloseUploader} 
          onImageUploaded={handleImageUploaded}
        />
      )}
    </div>
  );
};

export default Dashboard;
