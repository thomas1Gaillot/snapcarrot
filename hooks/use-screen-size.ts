import { useState, useEffect } from 'react';

// Créer un hook personnalisé pour obtenir la taille de l'écran
function useScreenSize() {
    const [screenSize, setScreenSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // Vérifier si le code s'exécute côté client
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setScreenSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            // Définir la taille de l'écran au montage
            handleResize();

            window.addEventListener('resize', handleResize);

            // Nettoyer le listener lors du démontage du composant
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return screenSize;
}

export default useScreenSize;
