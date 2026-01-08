// Capacitor App initialization for mobile features
document.addEventListener('DOMContentLoaded', async () => {
  // Check if running in Capacitor
  if (window.Capacitor) {
    const { App } = window.Capacitor;
    const { Browser } = window.Capacitor;

    // Handle hardware back button
    App.addListener('backButton', ({ canGoBack }) => {
      // Check if we're on a content page (not index.html)
      const isHomePage = window.location.pathname.endsWith('index.html') || 
                         window.location.pathname === '/';
      
      if (!isHomePage && canGoBack) {
        // Navigate back in history
        window.history.back();
      } else if (!isHomePage) {
        // If no history, go to home
        window.location.href = 'index.html';
      } else {
        // On home page, minimize app instead of closing
        App.minimizeApp();
      }
    });

    console.log('Capacitor initialized: Back button handler registered');
  }
});
