import React from 'react';
import MapScanner from './MapScanner';

interface MapProps {
  uploadedImageUrl?: string;
  isScanning?: boolean;
  onScanComplete?: () => void;
}

const Map: React.FC<MapProps> = ({ 
  uploadedImageUrl, 
  isScanning = false,
  onScanComplete 
}) => {
  return (
    <div className="relative w-full h-full bg-gray-900">
      {uploadedImageUrl ? (
        <MapScanner 
          imageUrl={uploadedImageUrl} 
          onScanComplete={onScanComplete}
        />
      ) : (
        <>
          {/* Default Map background image */}
          <img 
            src="/lovable-uploads/ship_logo.png"
            alt="Map view"
            className="w-full h-full object-cover opacity-100"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-tech-darker/50 to-transparent pointer-events-none"></div>
          
          {/* Map title */}
          <div className="absolute top-4 left-4 text-white/80 text-sm md:text-base font-medium">
            Ship Detection Results: Upload satellite image to begin
          </div>
          
          {/* Dark overlay for better visibility */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </>
      )}
    </div>
  );
};

export default Map;
