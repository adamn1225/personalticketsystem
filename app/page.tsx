import SupportTicketForm from "@/components/SupportTicketForm";
import BoomerToggle from "@/components/BoomerToggle"; // Import BoomerToggle
import BuyMeACoffeeWidget from "@/components/BuyMeACoffeeWidget"; // Import BuyMeACoffeeWidget

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-200 min-h-screen w-screen p-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-4 right-1/2 transform translate-x-1/2">
        <BoomerToggle /> {/* Add the toggle */}
      </div>
      <main className="flex flex-col justify-center items-center gap-6 md:gap-12 w-full mt-16 md:mt-0 ">
        <h1 className="text-4xl font-bold text-center">
          Next Support Ticket System
        </h1>
        <SupportTicketForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div className="fixed bottom-0 left-0 right-8 flex justify-end items-center bg-opacity-50 p-4">
          <h2 style={{ fontFamily: "vscript, sans-serif" }} className="text-2xl pr-12 pt-3">
            Buy me a coffee! ☕️
          </h2>
        </div>
        <BuyMeACoffeeWidget />
      </footer>
    </div>
  );
}