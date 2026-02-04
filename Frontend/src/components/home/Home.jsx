import React from "react";

const Home = () => {
  const features = [
    {
      title: "Fast Setup",
      desc: "Built with React and Tailwind for rapid development.",
    },
    {
      title: "Responsive",
      desc: "Mobile-first and works perfectly on all devices.",
    },
    {
      title: "Customizable",
      desc: "Easily tweak colors, layout, and spacing.",
    },
  ];
  // gradient-to-b from-slate-950 to-slate-900
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Build Beautiful Landing Pages
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8">
          A clean, modern landing page built only with React and Tailwind CSS.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl border border-slate-600 hover:bg-slate-800 transition">
            Learn More
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-8 md:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to launch?
        </h2>
        <p className="text-slate-300 mb-8">
          Start building your next idea with a polished landing page.
        </p>
        <button className="px-8 py-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-semibold transition">
          Start Now
        </button>
      </section>

      {/* <footer className="border-t border-slate-800 py-6 text-center text-slate-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer> */}
    </div>
  );
};

export default Home;
