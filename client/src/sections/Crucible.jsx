import { ideas } from '../data/content';

export default function Crucible() {
  // Sort ideas by votes to show the most popular first
  const sortedIdeas = ideas.sort((a, b) => b.votes - a.votes);

  return (
    <section id="crucible" className="py-20 min-h-screen">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-bold text-text-primary">The Crucible</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Where Raw Ideas Are Forged. Fan the flames of innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {sortedIdeas.map((idea, index) => (
          <div key={index} className="minimal-card p-6 rounded-lg flex justify-between items-center">
            <h4 className="text-xl text-text-primary">{idea.title}</h4>
            <div className="flex items-center gap-2 text-lg text-molten-orange font-bold font-heading">
              <span>{idea.votes}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}