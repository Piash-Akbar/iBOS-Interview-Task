"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, XCircle } from "lucide-react";

interface TimeoutModalProps {
  open: boolean;
  userName: string;
}

export function TimeoutModal({ open, userName }: TimeoutModalProps) {
  const router = useRouter();

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="size-8 text-destructive" />
            <XCircle className="size-8 text-destructive" />
          </div>
          <DialogTitle className="text-lg font-bold">Timeout!</DialogTitle>
          <DialogDescription className="text-center">
            Dear {userName}, Your exam time has been finished. Thank you for
            participating.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-2">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
