const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f7dfe6e6cd314d8c83dbf81b737932b4&response_type=code&redirect_uri=http://localhost:3000/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20user-top-read";

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
        <h1 className="text-5xl py-2">Welcome!</h1>
        <h2 className="text-3xl py-2">Please login to your Spotify account</h2>
      </div>
    </section>
  );
}
