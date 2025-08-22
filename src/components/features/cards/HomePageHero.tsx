import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";

interface HomePageHeroProps {
  title?: string;
  text?: string;
  url?: string;
}

export default function HomePageHero({ title, text, url }: HomePageHeroProps) {
  const router = useRouter();

  const openCoffee = (): void => {
    router.push(`/search?${url}`);
  };

  return (
    <div
      onClick={openCoffee}
      className="w-full bg-card/50 rounded-xl p-6 border cursor-pointer hover:scale-[1.02] transition-transform"
    >
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <span className="text-xl">
          <Coffee className="text-amber-400" />
        </span>
      </div>
      <h4 className="text-xl font-semibold mb-2 text-[var(--dark-heading-text)]">
        {title}
      </h4>
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}
