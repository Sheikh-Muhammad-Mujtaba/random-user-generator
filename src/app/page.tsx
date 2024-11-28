import { ModeToggle } from "@/components/DarkToggle";
import RandomUserComponent from "@/components/random-user";


export default function Home() {
  return (
    <div>
      <div className="absolute right-5 top-5 ">
      <ModeToggle />
      </div>
      <RandomUserComponent />
    </div>
  );
}