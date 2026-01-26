export const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary-700">Andrew Palmer</div>
        
        <div className="hidden md:flex gap-8">
          {['about', 'experience', 'education', 'skills'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors capitalize"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="mailto:andrewwilliamp3@gmail.com"
            className="btn-secondary text-sm hidden sm:inline-block"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};
