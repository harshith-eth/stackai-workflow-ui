import { useTheme } from "next-themes";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { theme } = useTheme();
  
  return (
    <div className={className}>
      <Image
        src="/stack-ai.svg"
        alt="Stack AI"
        width={100}
        height={24}
        className={theme === "dark" ? "brightness-0 invert" : ""}
        style={{ height: "auto" }}
      />
    </div>
  );
} 