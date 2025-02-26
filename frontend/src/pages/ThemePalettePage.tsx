
const ThemePalettePage = () => {
    const colorVariables = [
        { name: 'Primary', bg: 'bg-primary', content: 'bg-primary-content' },
        { name: 'Secondary', bg: 'bg-secondary', content: 'bg-secondary-content' },
        { name: 'Accent', bg: 'bg-accent', content: 'bg-accent-content' },
        { name: 'Neutral', bg: 'bg-neutral', content: 'bg-neutral-content' },
        { name: 'Base 100', bg: 'bg-base-100', content: 'bg-base-content' },
        { name: 'Base 200', bg: 'bg-base-200', content: 'bg-base-content' },
        { name: 'Base 300', bg: 'bg-base-300', content: 'bg-base-content' },
        { name: 'Info', bg: 'bg-info', content: 'bg-info-content' },
        { name: 'Success', bg: 'bg-success', content: 'bg-success-content' },
        { name: 'Warning', bg: 'bg-warning', content: 'bg-warning-content' },
        { name: 'Error', bg: 'bg-error', content: 'bg-error-content' },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-base-content">Theme Color Palette</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colorVariables.map((color, index) => (
                    <div key={index} className={`${color.bg} p-6 rounded-lg shadow-md`}>
                        <h2 className="text-xl font-semibold mb-4 text-base-content">{color.name}</h2>
                        <div className={`${color.content} p-4 rounded-md`}>
                            <p className="text-md text-white">Content on {color.name}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-base-content/80">CSS Variable:</p>
                            <code className="text-sm text-base-content/80">{`oklch(var(--${color.bg.slice(3)}))`}</code>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemePalettePage;