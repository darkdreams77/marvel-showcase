export const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="bg-void-950 h-16 flex items-center justify-center gap-1 border-t border-t-void-500">
      <span className="marvel-title">Ⓒ Marvel Showcase</span>{" "}
      <span>| Marine Barthelemy - {thisYear}</span>
    </footer>
  );
};
