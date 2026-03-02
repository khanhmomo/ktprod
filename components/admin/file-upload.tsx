'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  accept?: string;
  maxSize?: number; // in MB
  placeholder?: string;
  label?: string;
}

export function FileUpload({ 
  value, 
  onChange, 
  accept = "image/*", 
  maxSize = 5, 
  placeholder = "Upload file or enter URL",
  label = "File Upload"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (accept && !file.type.match(accept.replace('*', '.*'))) {
      alert('Invalid file type');
      return;
    }

    setIsUploading(true);

    try {
      // Create a simple upload endpoint that returns a mock URL
      // In production, this would upload to a real service
      const formData = new FormData();
      formData.append('file', file);

      // For now, we'll create a mock URL
      // In production, you'd upload to Cloudinary or another service
      setTimeout(() => {
        const mockUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
        onChange(mockUrl);
        setIsUploading(false);
      }, 1000);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {value ? (
        <div className="relative">
          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground truncate">
                  {value}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange(undefined)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            
            <div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Choose File'}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {placeholder}
            </p>
            
            <p className="text-xs text-muted-foreground">
              Max file size: {maxSize}MB
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="url-input">Or enter URL directly:</Label>
        <Input
          id="url-input"
          value={value || ''}
          onChange={(e) => onChange(e.target.value || undefined)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>
  );
}
