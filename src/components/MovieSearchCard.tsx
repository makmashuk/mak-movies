import { getMovieImageUrl } from "@/lib/util";
import Image from "next/image";
import Link from "next/link";

type Movie = {
    id: number;
    title: string;
    release_date: string;
    poster_path: string | null;
};

interface MovieSearchCardProps {
    movie: Movie;
}

export default function MovieSearchCard({ movie }: MovieSearchCardProps) {
    return (
        <div className="relative w-full h-110 bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-700 group">
            {movie.poster_path ? (
                <Image
                    src={getMovieImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 border border-gray-600">
                    No Image
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{movie.title}</h3>
                <p className="text-sm text-gray-300 mb-3">
                    {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                </p>
                <div className="flex gap-3">
                    <Link
                        href={`/movie/${movie.id}`}
                        className="flex-1 px-4 py-2 bg-gray-700 bg-opacity-80 text-white rounded-lg hover:bg-opacity-100 transition-all duration-300 text-center text-sm font-medium"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}