import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="container mx-auto px-6 py-8 mt-20 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h3 className="text-2xl font-heading text-text-primary">Enclope</h3>
          <p className="text-sm text-text-secondary mt-2">Forging the future of digital products.</p>
        </div>
        <div className="flex gap-8 mt-8 md:mt-0">
          <Link to="/forge" className="hover:text-text-primary transition-colors">Services</Link>
          <Link to="/showroom" className="hover:text-text-primary transition-colors">Work</Link>
          <Link to="/crucible" className="hover:text-text-primary transition-colors">Incubator</Link>
        </div>
      </div>
      <div className="text-center text-xs text-text-secondary mt-8 pt-8 border-t border-border">
        &copy; {new Date().getFullYear()} Enclope. All Rights Reserved.
      </div>
    </footer>
  );
}