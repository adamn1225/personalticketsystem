import SupportTicketForm from '@/components/SupportTicketForm';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-emerald-50  to-blue-200 min-h-screen w-screen p-2 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col justify-center items-center gap-12 w-full">
        <h1 className="text-4xl font-bold text-center">Next Support Ticket System</h1>
        <SupportTicketForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
