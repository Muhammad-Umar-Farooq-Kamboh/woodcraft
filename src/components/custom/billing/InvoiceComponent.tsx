import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

export default function InvoiceComponent() {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="texy-[#3D2514]">Wood craft</DialogTitle>
          <DialogDescription>Customer: Umer Order:Ord001</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
