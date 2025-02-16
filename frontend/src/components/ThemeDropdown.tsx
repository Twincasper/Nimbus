import { useEffect, useState } from 'react';

const ThemeDropdown = () => {
    const themes = [
        'nimbus', 'light', 'dark', 'cupcake', 'valentine',
        'bumblebee', 'emerald', 'corporate', 'synthwave',
        'retro', 'cyberpunk', 'halloween', 'garden',
        'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe'
    ];

    // Initialize state with the saved theme or default to 'nimbus'
    const [selectedTheme, setSelectedTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'nimbus';
    });

    // Apply the selected theme and save it to localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    }, [selectedTheme]);

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
                {themes.map((theme) => (
                    <li key={theme}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
                            value={theme}
                            checked={selectedTheme === theme}
                            onChange={() => setSelectedTheme(theme)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeDropdown;