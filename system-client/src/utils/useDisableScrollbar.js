import { useEffect } from 'react'

export default function useDisableScrollbar(disable=true) {
    useEffect(() => {
        // disable scrollbars for this page
        if (disable) {
            document.documentElement.style.overflow = 'hidden'; 
        } else {
            document.documentElement.style.overflow = 'auto'; 
            window.scrollTo(0, 0);
        }

        // re-enable scrollbars when leaving the page.
        return () => {
            document.documentElement.style.overflow = 'auto';
            window.scrollTo(0, 0);
        };
    }, [disable]);
};
