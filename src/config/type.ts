import { toast } from "sonner";

export type PaymentStatus = "Completed" | "Pending";
type TStatus = "Pending" | "Reviewed" | "Removed"


type TSerevity = "HIGH" | "LOW" | "MEDIUM"

export interface Listing {
  id: number;
  title: string;
  user: string;
  reason: string;
  serevity: TSerevity;
  status: TStatus;
  paymentStatus: PaymentStatus;
  amount: string;
  views: string;
  reasobBy: string;
}



export const WarningToast = ()=>{

  toast.warning("Hey Joseph! Don't worry we are working continuously 😊")

}