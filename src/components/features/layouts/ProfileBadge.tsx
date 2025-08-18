interface CoffeeProfileBadgeProps {
  count?: number;
  text?: string;
}

export default function ProfileBadge({ count, text }: CoffeeProfileBadgeProps) {
  return (
    <div>
      <h1>{count}</h1>
      <h1>{text}</h1>
    </div>
  );
}
