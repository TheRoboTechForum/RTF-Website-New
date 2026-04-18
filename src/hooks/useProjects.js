import { useState, useEffect } from 'react';
import { projects as fallbackProjects } from '../data/projects';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Xfkn0g41BRKiutGca0_0Xb23k4_D9S_oq8czXLt4EX8/export?format=csv&gid=1394685927';
const CACHE_KEY = 'rtf_projects_cache';
const CACHE_TTL = 300000; // 5 minutes

const parseCSV = (text) => {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    // Handle commas inside quoted fields properly:
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuotes = !inQuotes; }
      else if (line[i] === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else { current += line[i]; }
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    return obj;
  });
};

const transformRow = (row) => ({
  id: parseInt(row.id) || 0,
  title: row.title || '',
  category: row.category?.toUpperCase() || 'OTHER',
  description: row.description || '',
  techStack: row.techStack ? row.techStack.split(',').map(t => t.trim()).filter(Boolean) : [],
  teamSize: parseInt(row.teamSize) || 1,
  year: parseInt(row.year) || new Date().getFullYear(),
  status: row.status?.toUpperCase() || 'COMPLETED',
  images: [row.image1, row.image2, row.image3].filter(Boolean),
  github: row.github || null,
  demo: row.demo || null,
  achievements: row.achievements ? row.achievements.split(',').map(a => a.trim()).filter(Boolean) : [],
  featured: row.featured?.toLowerCase() === 'true',
});

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const startTime = Date.now();
      const MIN_LOADING_TIME = 800; // ms for aesthetic skeleton animation

      // Check session storage cache
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          await new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME));
          setProjects(data);
          setLoading(false);
          return;
        }
      }

      const response = await fetch(SHEET_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch projects data');
      }

      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      const transformedData = parsedData.map(transformRow);

      // Ensure minimum loading time for animation
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME - elapsed));
      }

      setProjects(transformedData);

      // Save to cache
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        data: transformedData,
        timestamp: Date.now()
      }));

    } catch (err) {
      setError(err.message);
      // Fallback to offline static data
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
}
