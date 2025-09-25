import { Link } from 'react-router-dom'; // <-- CORRECTED IMPORT
import { projects } from '../data/content';

export default function Showroom({ limit, showTitle = true, showViewAllButton = false }) {
  // If a limit is passed, slice the array; otherwise, use the full array.
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="showroom" className="py-20">
      {showTitle && (
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary">The Showroom</h2>
          <p className="text-lg mt-4">An exhibition of our finished work.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {displayProjects.map((project, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-6 border border-border">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-3xl mb-2 text-text-primary">{project.title}</h3>
            <p className="text-text-secondary">{project.desc}</p>
          </div>
        ))}
      </div>

      {showViewAllButton && (
        <div className="text-center mt-20">
          {/* CORRECTED LINK with 'to' instead of 'href' */}
          <Link to="/showroom" className="btn-primary text-xl px-12 py-4 rounded-full">
            Explore All Projects
          </Link>
        </div>
      )}
    </section>
  );
}