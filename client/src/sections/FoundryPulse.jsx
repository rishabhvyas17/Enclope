import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

// This is a helper component for the count-up animation
function AnimatedCounter({ to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    
    // Animate from 0 to the target value
    const controls = animate(0, to, {
      duration: 2, // Animation duration of 2 seconds
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      }
    });
    
    // Cleanup function to stop the animation if the component unmounts
    return () => controls.stop();
  }, [to]);

  return <h3 ref={nodeRef} className="text-4xl md:text-5xl font-bold text-text-primary mb-2" />;
}


// The metrics from your creative brief
const metrics = [
  { value: 47, label: 'Active Contributors' },
  { value: 12403, label: 'Lines of Code Today' },
  { value: 15, label: 'Ideas in The Crucible' },
  { value: 8, label: 'Projects in The Forge' },
];

export default function FoundryPulse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-text-primary">
          The Foundry Pulse
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="minimal-card p-6 md:p-8 rounded-xl text-center">
            {isInView && <AnimatedCounter to={metric.value} />}
            <p className="text-text-secondary">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}