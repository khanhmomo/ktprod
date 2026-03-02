'use client';

import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TinyMCEEditor({ 
  content, 
  onChange, 
  placeholder = "Start writing..."
}: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null);

  // Handle editor content changes
  const handleEditorChange = (content: string, editor: any) => {
    onChange(content);
  };

  // TinyMCE configuration for Word-like experience
  const initConfig = {
    height: 600, // Increased from 400 to 600
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
      'autosave'
    ],
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor removeformat | code fullscreen help',
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    font_formats: 'Arial=arial,helvetica,sans-serif; Times New Roman=times new roman,times; Courier New=courier new,courier; Georgia=georgia,palatino; Verdana=verdana,geneva; Tahoma=tahoma,arial,helvetica,sans-serif',
    content_style: 'body { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; padding: 20px; } img { max-width: 100%; height: auto; }',
    image_advtab: true,
    image_uploadtab: true,
    images_upload_handler: async (blobInfo: any, progress: any) => {
      // Convert blob to data URL (fallback if cloud upload fails)
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          resolve(dataUrl);
        };
        reader.onerror = () => {
          reject('Image upload failed');
        };
        reader.readAsDataURL(blobInfo.blob());
      });
    },
    paste_data_images: true, // Allow pasting images
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: (callback: any, value: any, meta: any) => {
      if (meta.filetype === 'image') {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        
        input.onchange = () => {
          const file = input.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result as string;
              callback(dataUrl, { alt: file.name });
            };
            reader.readAsDataURL(file);
          }
        };
        
        input.click();
      }
    },
    placeholder: placeholder,
    branding: false,
    statusbar: false,
    toolbar_mode: 'wrap',
    resize: true
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        value={content}
        onEditorChange={handleEditorChange}
        init={initConfig}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "h6qwqnt5eitadjhkqg7f0qaplj0nav40q34usptnz3t0o2kr"}
      />
    </div>
  );
}
