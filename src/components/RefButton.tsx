import { Button } from "@/components/ui/button";
import Link from 'next/link';

// TODO: Replace with your actual referral code and link structure
const YOUR_REFERRAL_CODE = "YOUR_REF_CODE";
const REFERRAL_LINK = `https://app.hyperliquid.xyz/join/${YOUR_REFERRAL_CODE}`;

export const RefButton = () => {
  return (
    <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <Link href={REFERRAL_LINK} target="_blank" rel="noopener noreferrer">
        Bắt đầu giao dịch
      </Link>
    </Button>
  );
};

export default RefButton;
