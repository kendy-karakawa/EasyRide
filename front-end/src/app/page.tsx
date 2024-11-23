import Alert from "@/components/alert/alert";
import DriverCard from "@/components/cards/driverCard";
import EstimateForm from "@/components/forms/estimateForm";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <div className="">
      <Header />
      
      <EstimateForm />
      {/* <DriverCard {driver}/> */}
    </div>
  );
}
