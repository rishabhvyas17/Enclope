import { builders } from '../data/content';

export default function MeetTheBuilders() {
  return (
    <section id="builders" className="py-20 bg-base">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-text-primary">Meet the Builders</h2>
        <p className="text-lg mt-4">The students at the heart of the foundry.</p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {builders.map((builder, index) => (
          <div key={index} className="minimal-card p-8 rounded-lg text-center">
            <img src={builder.avatar} alt={builder.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-border" />
            <h3 className="text-2xl text-accent">{builder.name}</h3>
            <p className="text-molten-orange font-body font-semibold mb-4">{builder.role}</p>
            <p className="text-text-secondary italic">"{builder.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}