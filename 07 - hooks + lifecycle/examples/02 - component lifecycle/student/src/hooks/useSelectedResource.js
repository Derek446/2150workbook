import { useEffect, useState } from 'react';

const STORAGE_KEY = 'selectedResource';


export function useSelectedResource() {
  const [selectedResource, setSelectedResource] = useState(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }

    return null;
  });

  // function updateSelectedResource(resource) {
  //   setSelectedResource(resource);

  //   if (resource === null) {
  //     sessionStorage.removeItem(STORAGE_KEY);
  //   } else {
  //     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resource));
  //   }
  // }

  // Replacing setter with useEffect. Previous version did not let us hook state changes to re-fire
  useEffect(() => {
    if (selectedResource === null) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedResource));
  }, [selectedResource]);

  return [selectedResource, setSelectedResource];
}
