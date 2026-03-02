// Simple content storage that uses API routes to avoid client-side issues
export async function savePageContent(type: string, content: any) {
  try {
    console.log(`Saving content for ${type}:`, content);
    
    const response = await fetch('/api/content/' + type, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save content');
    }
    
    console.log(`Successfully saved content for ${type}`);
  } catch (error) {
    console.error('Failed to save page content:', error);
    throw new Error('Failed to save page content');
  }
}

export async function loadPageContent(type: string) {
  try {
    console.log(`Loading content for ${type}`);
    
    const response = await fetch('/api/content/' + type);
    
    if (!response.ok) {
      console.log(`No content found for ${type}`);
      return null;
    }
    
    const content = await response.json();
    console.log(`Successfully loaded content for ${type}`);
    return content;
  } catch (error) {
    console.error('Failed to load page content:', error);
    return null;
  }
}

// Test function (server-side only)
export async function testAppwriteSave() {
  try {
    const testData = {
      type: 'test',
      title: 'Test Content',
      description: 'This is a test',
      content: { message: 'Hello from Appwrite!' },
    };
    
    await savePageContent('test', testData);
    console.log('Test save successful');
    
    const loaded = await loadPageContent('test');
    console.log('Test load result:', loaded);
  } catch (error) {
    console.error('Test failed:', error);
  }
}
