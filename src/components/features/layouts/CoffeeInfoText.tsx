interface CoffeeInfoTextProps {
  title?: string;
  coffee?: string;
}

export default function CoffeeInfoTextComponent({
  title,
  coffee,
}: CoffeeInfoTextProps) {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-colors capitalize">
      <h1>{title}</h1>
      <p>{coffee}</p>
    </div>
  );
}
