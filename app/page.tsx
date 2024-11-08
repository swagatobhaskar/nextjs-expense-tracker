// import Image from "next/image";
import ExpenseList from "@/ui/ExpenseList";

export default function Home() {  // why is it not async?
  return (
    <div className="relative">
      <main className="">
        <div className="ml-10 mt-10">
          <ExpenseList />
        </div>
      </main>
      <footer className="">
      
      </footer>
    </div>
  );
}
