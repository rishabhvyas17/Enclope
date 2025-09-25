import Header from '../components/Header';
import Footer from '../components/Footer';
import Showroom from '../sections/Showroom';

export default function ShowroomPage() {
  return (
    <>
      <main>
        {/* This page's only job is to show the full Showroom section */}
        <Showroom />
      </main>
    </>
  );
}