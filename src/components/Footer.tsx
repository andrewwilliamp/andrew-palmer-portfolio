import { contact } from '../data';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Andrew Palmer</h3>
            <p className="text-gray-400">Senior Software Engineer</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-primary-400 transition-colors">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="hover:text-primary-400 transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li>{contact.location}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-primary-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-primary-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-primary-400 transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary-400 transition-colors">
                  Skills
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {currentYear} Andrew Palmer. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};
