export default function JoinCommunityGrid() {
  const boxes = Array.from({ length: 9 }, (_, i) => i);
  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {boxes.map((_, i) => {
       return <div
          key={i}
          className={`h-24 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white text-lg font-semibold transition duration-300 ease-in-out transform ${
           i % 2 === 0 && "animate-[pulse_1.2s_infinite] scale-110 shadow-xl" }`}
        >
        </div>

      })}
    </div>
  );
}