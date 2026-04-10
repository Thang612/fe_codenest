import { Sun, Moon } from 'lucide-react'; // Sử dụng thư viện icon lucide-react
import useThemeStore from '../stores/theme.store';
import { useEffect } from 'react';

const ThemeToggle = () => {
    const { isDark, toggle } = useThemeStore();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);
    return (
        <div
            onClick={toggle}
            className="relative flex items-center w-20 h-8 p-1 bg-bg rounded-full cursor-pointer transition-colors duration-300 border border-gray-300 dark:border-gray-600"
        >
            {/* Nút tròn trượt (Pill) */}
            <div
                className={`absolute w-10 h-6 bg-linear-to-r from-primary to-primary/10 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
          ${isDark ? 'translate-x-8' : 'translate-x-0'}`}
            >
                {/* Icon bên trong nút đang active */}
                {isDark ? (
                    <Moon size={16} className="text-white fill-current" />
                ) : (
                    <Sun size={18} className="text-white" />
                )}
            </div>

            {/* Icon nền khi không active */}
            <div className="flex justify-between w-full px-2 items-center">
                {!isDark && <div className="w-8"></div>} {/* Placeholder */}
                <Sun size={18} className={`text-gray-400 ${!isDark ? 'invisible' : 'visible'}`} />
                <Moon size={16} className={`text-gray-400 ${isDark ? 'invisible' : 'visible'}`} />
                {isDark && <div className="w-8"></div>} {/* Placeholder */}
            </div>
        </div>
    );
};

export default ThemeToggle;