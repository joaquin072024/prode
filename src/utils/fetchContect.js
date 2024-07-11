const API_BASE = "http://bootcamp-2024-2d43236510d5.herokuapp.com/prode/"

export const fetchContent = async (url) => {
    try {
      const response = await fetch(`${API_BASE}${url}
        
        `);
      if (!response.ok) {
        throw `status: ${response.statusText}`;
      }
      const { data } = await response.json();
   
      return data;
    } catch (error) {
      console.error(`${url} error: ${error}`);
      throw error;
    }
  };
