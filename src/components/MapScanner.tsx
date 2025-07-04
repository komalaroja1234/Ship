import React, { useState, useEffect, useRef } from 'react';
import { ScanLine, Ship, MapPin, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ShipData {
  id: number;
  name: string;
  length: number;
  position: { x: number; y: number };
  coordinates: {
    x1_pct: number;
    y1_pct: number;
    x2_pct: number;
    y2_pct: number;
  };
  bbox: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;
    height: number;
  };
}

interface MapScannerProps {
  imageUrl: string;
  onScanComplete?: () => void;
}

const MapScanner: React.FC<MapScannerProps> = ({ imageUrl, onScanComplete }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [ships, setShips] = useState<ShipData[]>([]);
  const [selectedShip, setSelectedShip] = useState<ShipData | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    originalWidth: number;
    originalHeight: number;
    displayWidth: number;
    displayHeight: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const previousImageUrlRef = useRef<string>('');

  // Handle image loading to calculate dimensions
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const container = mapContainerRef.current;
    
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      // Calculate aspect ratios
      const imgAspectRatio = img.naturalWidth / img.naturalHeight;
      const containerAspectRatio = containerWidth / containerHeight;
      
      // Calculate display dimensions and offsets
      let displayWidth = 0;
      let displayHeight = 0;
      let offsetX = 0;
      let offsetY = 0;
      
      if (imgAspectRatio > containerAspectRatio) {
        // Image is wider than container (relative to height)
        displayWidth = containerWidth;
        displayHeight = containerWidth / imgAspectRatio;
        offsetY = (containerHeight - displayHeight) / 2;
      } else {
        // Image is taller than container (relative to width)
        displayHeight = containerHeight;
        displayWidth = containerHeight * imgAspectRatio;
        offsetX = (containerWidth - displayWidth) / 2;
      }
      
      setImageDimensions({
        originalWidth: img.naturalWidth,
        originalHeight: img.naturalHeight,
        displayWidth,
        displayHeight,
        offsetX,
        offsetY
      });
    }
  };

  // Recalculate dimensions when sidebar is toggled
  useEffect(() => {
    if (imageRef.current) {
      setTimeout(() => {
        handleImageLoad({ currentTarget: imageRef.current } as React.SyntheticEvent<HTMLImageElement>);
      }, 10);
    }
  }, [showSidebar]);

  useEffect(() => {
    // Check if the image URL has changed
    if (imageUrl && imageUrl !== previousImageUrlRef.current) {
      // Reset detection state
      setShips([]);
      setScanProgress(0);
      setImageDimensions(null);
      setSelectedShip(null);
      setShowSidebar(false);
      setCroppedImageUrl(null);
      
      // Update previous image URL reference
      previousImageUrlRef.current = imageUrl;
      
      // Start scanning with the new image
      startScan();
    }
  }, [imageUrl]);

  // Handle window resize to recalculate dimensions
  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        handleImageLoad({ currentTarget: imageRef.current } as React.SyntheticEvent<HTMLImageElement>);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to generate a cropped image from the original
  const generateCroppedImage = async (ship: ShipData) => {
    if (!imageUrl || !imageDimensions) return null;
    
    try {
      // Load the original image into a canvas
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Create a canvas to hold the cropped image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return null;
      
      // Calculate original image coordinates based on percentages
      const { originalWidth, originalHeight } = imageDimensions;
      const x1 = Math.floor((ship.coordinates.x1_pct / 100) * originalWidth);
      const y1 = Math.floor((ship.coordinates.y1_pct / 100) * originalHeight);
      const x2 = Math.floor((ship.coordinates.x2_pct / 100) * originalWidth);
      const y2 = Math.floor((ship.coordinates.y2_pct / 100) * originalHeight);
      const width = x2 - x1;
      const height = y2 - y1;
      
      // Add padding to the crop area (10% of the bounding box dimensions)
      const paddingX = width * 0.1;
      const paddingY = height * 0.1;
      
      // Calculate crop dimensions with padding
      const cropX = Math.max(0, x1 - paddingX);
      const cropY = Math.max(0, y1 - paddingY);
      const cropWidth = Math.min(img.width - cropX, width + paddingX * 2);
      const cropHeight = Math.min(img.height - cropY, height + paddingY * 2);
      
      // Set canvas dimensions to the cropped size
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      
      // Draw the cropped portion of the image onto the canvas
      ctx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
      );
      
      // Convert canvas to data URL
      return canvas.toDataURL('image/jpeg');
    } catch (error) {
      console.error('Error generating cropped image:', error);
      return null;
    }
  };

  const handleShipClick = async (ship: ShipData) => {
    setSelectedShip(ship);
    setShowSidebar(true);
    
    // Generate cropped image
    const croppedImage = await generateCroppedImage(ship);
    setCroppedImageUrl(croppedImage);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setSelectedShip(null);
    setCroppedImageUrl(null);
  };

  const startScan = async () => {
    if (isScanning) return; // Prevent multiple simultaneous scans
    
    setIsScanning(true);
    setScanProgress(0);
    setShips([]);
    
    // Animate progress for visual feedback
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 0.5;
        if (newProgress >= 90) {
          clearInterval(progressInterval);
          return 90; // Cap at 90% until real results come in
        }
        return newProgress;
      });
    }, 30);

    try {
      // Convert the data URL to a Blob for uploading
      if (imageUrl.startsWith('blob:') || imageUrl.startsWith('data:')) {
        // For data URLs or blob URLs, we need to fetch and convert
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        // Create FormData and append the image
        const formData = new FormData();
        formData.append('image', blob, 'uploaded_image.jpg');
        
        // Send to backend API
        const apiResponse = await fetch('http://localhost:5000/api/detect', {
          method: 'POST',
          body: formData,
        });
        
        if (!apiResponse.ok) {
          throw new Error(`Server returned ${apiResponse.status}`);
        }
        
        const data = await apiResponse.json();
        
        if (data.success) {
          // We're only using the ship data now, not the processed image
          setShips(data.ships);
          setScanProgress(100);
          
          if (onScanComplete) {
            onScanComplete();
          }
        } else {
          throw new Error(data.error || 'Unknown error occurred');
        }
      } else {
        throw new Error('Unsupported image URL format');
      }
    } catch (error) {
      console.error('Error during ship detection:', error);
      toast({
        title: 'Detection Failed',
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      clearInterval(progressInterval);
      setIsScanning(false);
      if (scanProgress < 100) {
        setScanProgress(100);
      }
    }
  };

  // Function to classify ships
  const getShipColor = (length: number) => {
    if (length < 20) return "bg-blue-500";
    if (length < 50) return "bg-green-500";
    if (length < 100) return "bg-yellow-500";
    if (length < 200) return "bg-orange-500";
    if (length < 400) return "bg-red-500";
    if (length < 500) return "bg-purple-500";
    return "bg-indigo-500";
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden flex">
      {/* Map container with dynamic resizing */}
      <div ref={mapContainerRef} className="relative flex-1 overflow-hidden">
        {/* Display the original uploaded image */}
        <img 
          ref={imageRef}
          src={imageUrl} 
          alt="Satellite image" 
          className="w-full h-full object-contain"
          onLoad={handleImageLoad}
        />
        
        {/* Yellow scan overlay */}
        {isScanning && (
          <div 
            className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/30 backdrop-blur-sm"
            style={{ 
              transform: `translateX(${(scanProgress - 100) * 3}%)`,
              transition: 'transform 0.3s linear'
            }}
          >
            <div className="h-full w-1 bg-yellow-400/70 absolute left-0"></div>
          </div>
        )}

        {/* Create an overlay div that exactly matches the image dimensions for proper coordinate mapping */}
        {imageDimensions && (
          <div 
            className="absolute pointer-events-none"
            style={{
              left: `${imageDimensions.offsetX}px`,
              top: `${imageDimensions.offsetY}px`,
              width: `${imageDimensions.displayWidth}px`,
              height: `${imageDimensions.displayHeight}px`,
            }}
          >
            {/* Display detected ships */}
            {ships.map((ship) => {
              // Calculate position based on actual percentage within the image
              const posX = (ship.position.x / 100) * imageDimensions.displayWidth;
              const posY = (ship.position.y / 100) * imageDimensions.displayHeight;
              
              // Removed the ship icon display
              return null;
            })}

            {/* Draw bounding boxes around ships */}
            {ships.map((ship) => {
              // Calculate coordinates within the image display area
              const x1 = (ship.coordinates.x1_pct / 100) * imageDimensions.displayWidth;
              const y1 = (ship.coordinates.y1_pct / 100) * imageDimensions.displayHeight;
              const width = ((ship.coordinates.x2_pct - ship.coordinates.x1_pct) / 100) * imageDimensions.displayWidth;
              const height = ((ship.coordinates.y2_pct - ship.coordinates.y1_pct) / 100) * imageDimensions.displayHeight;
              
              const isSelected = selectedShip?.id === ship.id;
              
              return (
                <div 
                  key={`box-${ship.id}`}
                  className={`absolute border-2 
                    ${isSelected ? 'border-blue-400 shadow-glow animate-pulse' : 'border-yellow-400'} 
                    rounded-sm cursor-pointer ${isSelected ? 'z-10' : ''} 
                    transition-all duration-150 hover:border-white hover:shadow-glow`}
                  style={{ 
                    left: `${x1}px`, 
                    top: `${y1}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    pointerEvents: 'auto'
                  }}
                  onClick={() => handleShipClick(ship)}
                >
                  {/* Ship name label at the top of the bounding box */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
                    <span className={`text-xs font-medium px-3 py-1 rounded shadow-md whitespace-nowrap ${getShipColor(ship.length).replace('bg-', 'bg-opacity-95 bg-')} text-white`}>
                      {ship.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Scan progress indicator */}
        {isScanning && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
            Ship Detection: {Math.floor(scanProgress)}%
          </div>
        )}
      </div>
      
      {/* Ship information sidebar */}
      {showSidebar && selectedShip && (
        <div className="w-80 bg-tech-navy border-l border-white/10 flex flex-col h-full animate-slide-in-right">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Ship Details</h3>
            <button 
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              onClick={closeSidebar}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Cropped ship image */}
            {croppedImageUrl ? (
              <div className="rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={croppedImageUrl} 
                  alt={`${selectedShip.name} image`} 
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="h-40 rounded-lg bg-tech-darker flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-tech-accent border-t-transparent rounded-full"></div>
              </div>
            )}
            
            {/* Ship classification badge */}
            <div className={`${getShipColor(selectedShip.length)} text-white px-3 py-1.5 rounded-md font-medium text-center`}>
              {selectedShip.name}
            </div>
            
            {/* Ship information */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-medium">Measurements</h4>
              
              <div className="bg-tech-darker rounded-lg p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ship ID:</span>
                  <span className="text-white font-mono">{selectedShip.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Length:</span>
                  <span className="text-white font-mono">{selectedShip.length.toFixed(1)}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Width:</span>
                  <span className="text-white font-mono">
                    {selectedShip.bbox && imageDimensions
                      ? ((selectedShip.bbox.width / imageDimensions.originalWidth) * selectedShip.length).toFixed(1) + 'm'
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Height:</span>
                  <span className="text-white font-mono">
                    {selectedShip.bbox && imageDimensions
                      ? ((selectedShip.bbox.height / imageDimensions.originalHeight) * selectedShip.length).toFixed(1) + 'm'
                      : 'N/A'}
                  </span>
                </div>
              </div>
              
              <h4 className="text-white text-sm font-medium">Position</h4>
              <div className="bg-tech-darker rounded-lg p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Latitude:</span>
                  <span className="text-white font-mono">{selectedShip.position.y.toFixed(3)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Longitude:</span>
                  <span className="text-white font-mono">{selectedShip.position.x.toFixed(3)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Coordinates:</span>
                  <span className="text-white font-mono">
                    {selectedShip.position.x.toFixed(1)}%, {selectedShip.position.y.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScanner;