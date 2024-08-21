const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export default function Login() {
  return (
    <section className="min-h-screen">
      <nav className="flex py-6 px-3 justify-between mb-32">
        <div className="flex-1">
          <a
            href="/"
            className="text-green-300 text-xl font-semibold hover:opacity-80"
          >
            NewMusic
          </a>
        </div>
        <a href={AUTH_URL}>
          <button className="rounded-full font-semibold bg-green-600 py-2 px-4 transition ease-in-out duration-300 hover:scale-110">
            Login
          </button>
        </a>
      </nav>
      <div className="text-center animate-fadeInUp">
        <h1 className="text-3xl py-2 md:text-5xl">Welcome!</h1>
        <h2 className="text-xl py-2 md:text-3xl">
          Please login to your Spotify account
        </h2>
      </div>
    </section>
  );
}
