'use client';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'REST APIs'],
    },
    {
      category: 'Testing & QA',
      skills: ['Selenium', 'Cypress', 'Jest', 'Playwright', 'Manual Testing'],
    },
    {
      category: 'DevOps',
      skills: ['Docker', 'AWS', 'CI/CD', 'Jenkins', 'GitHub Actions'],
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB'],
    },
    {
      category: 'Gaming',
      skills: ['Game Testing', 'QA Processes', 'Bug Tracking', 'Platform Cert'],
    },
  ];

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Technologien & Skills</h2>
      <p className="section-subtitle">
        Breites Spektrum an Technologien und Tools für moderne Softwareentwicklung
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, index) => (
          <div key={index} className="card">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">{cat.category}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
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

export default Skills;
