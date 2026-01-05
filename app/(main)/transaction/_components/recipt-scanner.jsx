"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
    setData: setScannedData,
  } = useFetch(scanReceipt);

  const fileToBase64 = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    // More efficient and safer Base64 encoding using Buffer
    return Buffer.from(arrayBuffer).toString("base64");
  };

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      await scanReceiptFn({ base64, mimeType: file.type });
    } catch (e) {
      toast.error("Failed to read file");
    }
  };

  // Trigger once per successful scan; avoid infinite loops due to changing callback identity
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      try {
        onScanComplete(scannedData);
        toast.success("Receipt scanned successfully");
      } finally {
        setScannedData(undefined);
      }
    }
  }, [scannedData, scanReceiptLoading]);

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
}
