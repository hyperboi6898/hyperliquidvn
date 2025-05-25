import { Button } from "@/components/ui/button";
import Link from 'next/link';

const REFERRAL_LINK = "https://app.hyperliquid.xyz/join/VN84";

export const RefButton = () => {
  return (
    <Button asChild size="lg" className="bg-success hover:opacity-90 text-bg font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <Link href={REFERRAL_LINK} target="_blank" rel="noopener noreferrer">
        Bắt đầu giao dịch
      </Link>
    </Button>
  );
};

export default RefButton;
