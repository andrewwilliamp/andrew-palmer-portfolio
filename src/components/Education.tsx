import { education } from '../data';

export const Education = () => {
  return (
    <section id="education" className="section-container">
      <h2 className="section-title">Education</h2>
      
      <div className="space-y-8">
        {education.map((edu, idx) => (
          <div key={idx} className="card">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-primary-600 font-semibold">{edu.field}</p>
                <p className="text-gray-600">{edu.school}</p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p className="text-gray-600 font-medium">{edu.graduationDate}</p>
                <p className="text-gray-500 text-sm">{edu.location}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-gray-900 mb-3">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
