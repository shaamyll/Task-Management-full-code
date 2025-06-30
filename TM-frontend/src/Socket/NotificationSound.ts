export const playNotificationSound = () => {
  const audio = new Audio('/pingg.mp3');
  audio.volume = 0.5; 
  audio.play().catch((err) => {
    console.warn('Notification sound failed to play:', err);
  });
};