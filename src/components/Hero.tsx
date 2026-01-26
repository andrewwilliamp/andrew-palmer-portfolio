import { contact } from '../data';

export const Hero = () => {
  return (
    <section className="pt-20 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="section-container text-center">
        <img
          src="src/assets/selfie.png"
          alt="Andrew Palmer"
          className="w-48 h-48 rounded-full border-4 border-primary-300 object-cover mx-auto mb-8 shadow-lg"
        />
        
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          Andrew Palmer
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-600 mb-2 font-semibold">
          Senior Software Engineer
        </p>
        
        <p className="text-gray-600 text-lg mb-8">
          Building secure, scalable applications with Angular, Spring Boot, and modern web technologies
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="mailto:andrewwilliamp3@gmail.com"
            className="btn-primary"
          >
            Get in Touch
          </a>
          <a
            href="#experience"
            className="btn-secondary"
          >
            View My Work
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-600 pt-8 border-t border-gray-300">
          <div>
            <div className="font-semibold text-gray-900">Location</div>
            <div>{contact.location}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Phone</div>
            <div>{contact.phone}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Clearance</div>
            <div>{contact.clearance}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
