import { useState } from 'react';

// --- Reusable Input Component (Moved outside) ---
// This is the main fix for the "losing focus" bug.
const Input = ({ name, type, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full bg-surface p-4 rounded-lg border-2 border-border text-text-primary focus:bg-base focus:border-electric-cyan focus:outline-none transition-all duration-200 placeholder:text-text-secondary/50"
    required
  />
);

// --- Form Data ---
const initialFormData = {
  name: '',
  email: '',
  portfolio: '',
  skills: [],
  goal: ''
};

const skillsList = ["React", "Node.js", "MongoDB", "UI/UX Design", "Digital Marketing"];

// --- Main Page Component ---
export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter(skill => skill !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Application Data:', formData);
    setSubmitted(true);
  };

  return (
    <section id="join-us" className="min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-text-primary">Join The Foundry</h2>
        <p className="text-lg mt-4">Start your journey as a builder.</p>
      </div>

      {submitted ? (
        <div className="max-w-xl mx-auto bg-surface border-2 border-electric-cyan p-12 rounded-xl text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-text-primary mb-4">Application Submitted!</h3>
          <p className="text-text-secondary mb-8">Thank you for your application! We'll review it and get back to you soon.</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData(initialFormData);
            }}
            className="btn-primary px-8 py-3 rounded-full bg-electric-cyan text-base border-electric-cyan hover:bg-transparent hover:text-electric-cyan"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-surface border border-border p-8 rounded-xl">
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2.5 mb-8">
            <div className="bg-electric-cyan h-2.5 rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-2xl mb-6">Step 1: Basic Information</h3>
              <div className="space-y-4">
                <Input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
                <Input name="portfolio" type="url" placeholder="Portfolio or GitHub URL" value={formData.portfolio} onChange={handleChange} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-2xl mb-6">Step 2: Your Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skillsList.map(skill => (
                  <label key={skill} className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors ${formData.skills.includes(skill) ? 'bg-border' : 'bg-muted hover:bg-border'}`}>
                    <input type="checkbox" name="skills" value={skill} checked={formData.skills.includes(skill)} onChange={handleChange} className="h-4 w-4 accent-electric-cyan bg-surface border-border" />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-2xl mb-6">Step 3: Your Goals</h3>
              <textarea
                name="goal"
                placeholder="What do you hope to achieve by joining Enclope?"
                value={formData.goal}
                onChange={handleChange}
                className="w-full bg-surface p-4 rounded-lg border-2 border-border text-text-primary focus:bg-base focus:border-electric-cyan focus:outline-none transition-all duration-200 placeholder:text-text-secondary/50 h-32 resize-none"
                required
              ></textarea>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button onClick={handleBack} className="btn-primary px-8 py-2 rounded-full">Back</button>
            ) : <div></div>}

            {step < 3 ? (
              <button onClick={handleNext} className="btn-primary px-8 py-2 rounded-full">Next</button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary px-8 py-2 rounded-full bg-electric-cyan text-base border-electric-cyan hover:bg-transparent hover:text-electric-cyan">Submit Application</button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
