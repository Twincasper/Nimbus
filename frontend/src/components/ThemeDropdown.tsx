import { useEffect, useState } from 'react';

const ThemeDropdown = () => {
    const themes = [
        'nimbus', 'light', 'dark', 'cupcake', 'valentine',
        'bumblebee', 'emerald', 'corporate', 'synthwave',
        'retro', 'cyberpunk', 'halloween', 'garden',
        'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe',"black",
        "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
        "night", "coffee", "winter", "dim", "nord", "sunset",
    ];

    const [selectedTheme, setSelectedTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'nimbus';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    }, [selectedTheme]);

    return (
        <div className="dropdown dropdown-end dropdown-hover">
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
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-[1] w-48 p-2 shadow-2xl max-h-96 overflow-y-auto" // Added max-h-48 and overflow-y-auto
            >
                {themes.map((theme) => (
                    <li key={theme}>
      <span
          role="button"
          tabIndex={0}
          className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
          data-theme={theme}
          onClick={() => setSelectedTheme(theme)}
          aria-label={`Select ${theme} theme`}
      >
        <span className="grid grid-cols-5 grid-rows-3">
          <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-3 w-3 shrink-0 ${selectedTheme === theme ? '' : 'invisible'}`}
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
            </svg>
            <span className="flex-grow text-sm">
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>
            <span className="flex h-full shrink-0 flex-wrap gap-1">
              <span className="bg-primary rounded-badge w-2"></span>
              <span className="bg-neutral rounded-badge w-2"></span>
              <span className="bg-secondary rounded-badge w-2"></span>
              <span className="bg-accent rounded-badge w-2"></span>
            </span>
          </span>
        </span>
      </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeDropdown;