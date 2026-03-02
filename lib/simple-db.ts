// Simple content storage that uses API routes to avoid client-side Cloudinary issues
export async function savePageContent(type: string, content: any) {
  try {
    console.log(`Saving content for ${type}:`, content);
    
    const response = await fetch(`/api/content/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save content: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`Successfully saved ${type}:`, result);
    return result;
  } catch (error) {
    console.error(`Failed to save ${type}:`, error);
    throw error;
  }
}

export async function loadPageContent(type: string) {
  try {
    console.log(`Loading content for ${type}`);
    
    const response = await fetch(`/api/content/${type}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`No content found for ${type}`);
        return null;
      }
      throw new Error(`Failed to load content: ${response.statusText}`);
    }
    
    const content = await response.json();
    console.log(`Successfully loaded ${type}:`, content);
    return content;
  } catch (error) {
    console.error(`Failed to load ${type}:`, error);
    return null;
  }
}

// Test function (server-side only)
export async function testCloudinarySave() {
  try {
    const testData = {
      type: 'test',
      id: 'test-123',
      pageTitle: "Test Page",
      pageDescription: "This is a test",
      timestamp: new Date().toISOString()
    };
    
    const result = await savePageContent('test', testData);
    console.log('Test save result:', result);
    
    const loaded = await loadPageContent('test');
    console.log('Test load result:', loaded);
    
    return { success: true, result, loaded };
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error };
  }
}
