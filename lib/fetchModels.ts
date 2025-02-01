export default async function fetchModels() {
  try {
    const response = await fetch('/api/getModels');
    if (!response.ok)
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching models:', error);
    return { modelOptions: [] }; // Ensure it returns a default structure
  }
}
