import { skills } from '../data';

export const Skills = () => {
  return (
    <section id="skills" className="section-container bg-gray-50">
      <h2 className="section-title">Skills & Technologies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((category, idx) => (
          <div key={idx} className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium text-sm hover:bg-primary-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
