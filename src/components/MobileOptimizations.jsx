import { useEffect } from 'react';

// Component to handle mobile-specific optimizations
const MobileOptimizations = () => {
  useEffect(() => {
    // Prevent zoom on input focus for iOS
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      const originalContent = viewportMeta.content;
      
      const handleFocus = () => {
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
      };
      
      const handleBlur = () => {
        viewportMeta.content = originalContent;
      };
      
      // Add event listeners to all input elements
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
      });
      
      // Cleanup
      return () => {
        inputs.forEach(input => {
          input.removeEventListener('focus', handleFocus);
          input.removeEventListener('blur', handleBlur);
        });
      };
    }
  }, []);

  useEffect(() => {
    // Add mobile-specific classes based on device
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    if (isMobile) {
      document.body.classList.add('mobile-device');
    }
    
    if (isTouch) {
      document.body.classList.add('touch-device');
    }
    
    // Handle orientation changes
    const handleOrientationChange = () => {
      // Force a small delay to ensure viewport is updated
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }, 100);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Initial call
    handleOrientationChange();
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileOptimizations;
