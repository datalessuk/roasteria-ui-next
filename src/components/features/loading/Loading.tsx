interface LoadingProps {
  message: string;
}

export default function Loading({ message }: LoadingProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <svg
        className="w-16 h-16 animate-bounce text-green-800"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 21h8a4 4 0 004-4V8a4 4 0 00-4-4H8a4 4 0 00-4 4v9a4 4 0 004 4zM16 3v2M12 3v2M8 3v2"
        />
      </svg>
      <span className="text-green-800 font-semibold text-lg">{message}</span>
    </div>
  );
}
