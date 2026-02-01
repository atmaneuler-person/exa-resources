import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-between fancy-overlay">
      <Header />

      <div className="w-full flex flex-col items-center my-12">
        <section className="w-full p-6 container-narrow">
          <h1 className="text-4xl font-semibold leading-tight md:leading-tight max-w-xs sm:max-w-none md:text-6xl fancy-heading">
            About EXA Resources
          </h1>

          <p className="mt-6 md:text-xl">EXA Enterprise Plaform Logic & Documents</p>

          <p className="mt-6 md:text-xl"></p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
