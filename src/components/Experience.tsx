import { experiences } from '../data';

export const Experience = () => {
  return (
    <section id="experience" className="section-container bg-gray-50">
      <h2 className="section-title">Work Experience</h2>
      
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="card">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                <p className="text-primary-600 font-semibold">{exp.company}</p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p className="text-gray-600 font-medium">{exp.period}</p>
                <p className="text-gray-500 text-sm">{exp.location}</p>
              </div>
            </div>
            
            <ul className="space-y-2 mt-4">
              {exp.description.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-primary-600 font-bold mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
