"use client";
import SupportTicketForm from "@/components/SupportTicketForm";
import ModeToggle from "@/components/BoomerToggle"; // Import BoomerToggle
import BuyMeACoffeeWidget from "@/components/BuyMeACoffeeWidget"; // Import BuyMeACoffeeWidget
import { useBoomerMode } from "@/components/BoomerModeProvider"; // Import BoomerProvider
import AboutMe from "@/components/AboutMe";

export default function Home() {
  const { boomerMode, advancedMode, simpleMode } = useBoomerMode();

  const backgroundColor = boomerMode
    ? "bg-gradient-to-r from-emerald-50 to-blue-200"
    : advancedMode
      ? "bg-gradient-to-r from-teal-600 to-zinc-900"
      : " bg-gradient-to-r from-emerald-500 to-blue-800";

  const textColor = boomerMode
    ? "text-zinc-900"
    : advancedMode
      ? "text-white"
      : "text-zinc-950";

  return (
    <div className={`${backgroundColor} min-h-screen w-screen p-2 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
      <div className="fixed bg-gray-800 top-0 right-1/2 transform translate-x-1/2 w-full">
        <ModeToggle /> {/* Add the toggle */}
      </div>
      <main className={boomerMode ? "flex flex-col justify-center items-center gap-6 md:gap-12 w-full mt-40 md:mt-20 " : "flex flex-col justify-center items-center gap-6 md:gap-12 w-full mt-20 md:mt-0"}>
        <h1 className={`text-xl md:text-4xl ${textColor} font-bold text-center`}>
          Next Support Ticket System
        </h1>
        <SupportTicketForm />
        <AboutMe />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div className="fixed bottom-0 left-0 right-8 flex justify-end items-center bg-opacity-50 p-4">
          <h2 style={{ fontFamily: "vscript, sans-serif" }} className={`hidden md:block text-2xl ${textColor} pr-12 pt-3`}>
            Buy me a coffee! ☕️
          </h2>
        </div>
        <BuyMeACoffeeWidget />
      </footer>
    </div>
  );
}