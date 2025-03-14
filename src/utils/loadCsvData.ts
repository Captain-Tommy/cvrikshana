export interface CoreTeamMember {
  name: string;
  designation: string;
  image: string;
}

export async function loadCoreTeamData(): Promise<CoreTeamMember[]> {
  try {
    const response = await fetch('/api/core-team');
    if (!response.ok) {
      throw new Error('Failed to fetch core team data');
    }
    return response.json();
  } catch (error) {
    console.error('Error loading core team data:', error);
    return [];
  }
}