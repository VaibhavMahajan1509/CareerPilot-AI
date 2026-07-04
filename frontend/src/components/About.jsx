const About = () => {
  return (
    <section id="about" className="bg-softBg py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-semibold uppercase tracking-wider text-primary">
            About
          </p>

          <h2 className="mt-3 text-4xl font-bold leading-tight text-dark">
            A Career Platform Designed For Modern Job Seekers
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted">
            CareerPilot AI helps users manage their job search from one place.
            Instead of using separate notes, spreadsheets, resume tools, and AI
            chats, everything is organized inside one clean dashboard.
          </p>

          <p className="mt-4 text-lg leading-8 text-muted">
            It is built with the MERN stack and includes authentication,
            protected routes, CRUD operations, profile management, dashboard
            analytics, and Gemini-powered AI features.
          </p>
        </div>

        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-xl">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-softBg p-6">
              <h3 className="text-3xl font-bold text-primary">MERN</h3>
              <p className="mt-2 text-muted">Full-stack architecture</p>
            </div>

            <div className="rounded-2xl bg-softBg p-6">
              <h3 className="text-3xl font-bold text-primary">JWT</h3>
              <p className="mt-2 text-muted">Secure authentication</p>
            </div>

            <div className="rounded-2xl bg-softBg p-6">
              <h3 className="text-3xl font-bold text-primary">AI</h3>
              <p className="mt-2 text-muted">Gemini-powered tools</p>
            </div>

            <div className="rounded-2xl bg-softBg p-6">
              <h3 className="text-3xl font-bold text-primary">CRUD</h3>
              <p className="mt-2 text-muted">Real dashboard features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;