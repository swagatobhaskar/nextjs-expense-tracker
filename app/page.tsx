// import Image from "next/image";
import ExpenseList from "@/ui/ExpenseList";

export default function Home() {  // why is it not async?
  return (
    <div className="">
      <main className="">
        <div className="">
          <ExpenseList />
        </div>
      </main>
      <footer className="">
        
      </footer>
    </div>
  );
}
