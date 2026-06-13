export const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="bg-void-950 h-16 flex flex-col md:flex-row py-4 items-center justify-center gap-1 md:gap-4 border-t border-t-void-500">
      <span className="marvel-title">Ⓒ Marvel Showcase</span>{" "}
      <span>Marine Barthelemy - {thisYear}</span>
    </footer>
  );
};
