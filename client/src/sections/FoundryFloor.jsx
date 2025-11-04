import FoundryPulse from './FoundryPulse'; // <-- 1. Import the new component

export default function FoundryFloor() {
  return (
    // The 'active' class helps with page transitions, as seen in the prototype
    <section id="foundry-floor" className="page-section active"> 
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center text-center -mt-32">
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 text-text-primary">
            Raw Potential, Forged.
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg mb-10">
            Welcome to the Enclop Foundry. We shape the next generation of builders by creating exceptional digital solutions.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="btn-primary text-base px-8 py-3 rounded-full">Start Building</button>
            <button className="btn-primary text-base px-8 py-3 rounded-full">View Blueprints</button>
          </div>
        </div>
      </div>

      {/* 2. Add the FoundryPulse component here */}
      <FoundryPulse />

    </section>
  );
}