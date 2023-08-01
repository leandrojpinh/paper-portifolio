const { useState, useEffect } = require("react");

const useThemeSwitcher = () => {
  const preferDarkQuery = "(prefer-color-scheme: dark)";
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userPrefernce = window.localStorage.getItem('theme');

    const handleChange = () => {
      if (userPrefernce) {
        const check = userPrefernce === 'dark' ? " dark" : "light";

        if (check === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        setMode(check);
      } else {
        const check = mediaQuery.matches ? "dark" : "light";

        if (check === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        setMode(check);
      }
    }

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (mode === 'dark') {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add('dark')
    }

    if (mode === 'light') {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove('dark')
    }
  }, [mode]);

  return [mode, setMode]
}

export default useThemeSwitcher