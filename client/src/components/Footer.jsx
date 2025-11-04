import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="container mx-auto px-6 py-8 mt-20 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h3 className="text-2xl font-heading text-text-primary">Enclop</h3>
          <p className="text-sm text-text-secondary mt-2">Forging the future of digital products.</p>
          <div className="text-sm text-text-secondary mt-4 space-y-1">
            <p>Phone: 7415618704</p>
            <p>Email: krishna191105@gmail.com</p>
            <p>
              LinkedIn: <a href="https://www.linkedin.com/in/krishna-soni-834284304/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors underline">Krishna Soni</a>
            </p>
          </div>
        </div>
        <div className="flex gap-8 mt-8 md:mt-0">
          <Link to="/forge" className="hover:text-text-primary transition-colors">Services</Link>
          <Link to="/showroom" className="hover:text-text-primary transition-colors">Work</Link>
          <Link to="/crucible" className="hover:text-text-primary transition-colors">Incubator</Link>
        </div>
      </div>
      <div className="text-center text-xs text-text-secondary mt-8 pt-8 border-t border-border">
        &copy; {new Date().getFullYear()} Enclop. All Rights Reserved.
      </div>
    </footer>
  );
}