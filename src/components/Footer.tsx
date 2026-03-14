import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-950 border-t border-white/5 py-6 px-4 text-center">
      <p className="text-yellow-400 font-bold text-lg mb-1">🎬 MyMovies</p>
      <p className="text-sm text-gray-500 mb-1">
            Developed by{" "}
        <Link href="https://github.com/makmashuk" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
          makmashuk
        </Link>
      </p>
      <p className="text-xs text-gray-700">
        © {new Date().getFullYear()} MyMovies · Powered by TMDB
      </p>
    </footer>
  );
}