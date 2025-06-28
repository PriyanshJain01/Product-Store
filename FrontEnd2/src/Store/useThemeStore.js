import {create} from 'zustand';

export const useThemeStore = create((set) => ({
    theme:localStorage.getItem('preffered-theme') || 'forest', // Default theme
    setTheme: (theme) => {
        localStorage.setItem('preffered-theme', theme); // Save to local storage
        set({theme});
    }
}))