import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'ML Prediction App',
  description: 'Make predictions easily with ML models.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
        <Navbar />
        <main className="px-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}