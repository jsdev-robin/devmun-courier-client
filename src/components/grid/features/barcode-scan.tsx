'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Barcode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { useDataGrid } from '../contexts/data-grid-contexts';
import { Button } from '../../ui/button';

interface FilterByBarcodeProps {
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const FilterByBarcode: React.FC<FilterByBarcodeProps> = ({
  onChange,
  disabled = false,
}) => {
  const [result, setResult] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const beepAudio = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);

  const { setGlobalFilter } = useDataGrid();

  useEffect(() => {
    if (result) {
      setOpen(false);
    }
  }, [result]);

  useEffect(() => {
    if (!open) {
      setResult('');
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      beepAudio.current = new Audio('/sounds/store-scanner.mp3');
      const codeReader = new BrowserMultiFormatReader();

      codeReader
        .listVideoInputDevices()
        .then((videoInputDevices) => {
          const firstDevice = videoInputDevices[0];
          if (firstDevice && videoRef.current) {
            codeReader.decodeFromVideoDevice(
              firstDevice.deviceId,
              videoRef.current,
              (result, err) => {
                if (result) {
                  if (setGlobalFilter) {
                    setGlobalFilter(String(result.getText()));
                  }
                  setResult(result.getText());
                  if (onChange) onChange(result.getText());
                  beepAudio.current?.play().catch(() => {
                    console.error('Error playing beep sound');
                  });
                } else if (err && !(err instanceof NotFoundException)) {
                  console.error(err);
                  setResult('Error: ' + err.message);
                }
              },
            );
          } else {
            console.error('No video input devices found.');
          }
        })
        .catch((err) => {
          console.error('Error listing video input devices:', err);
        });

      return () => {
        codeReader.reset();
      };
    }
  }, [onChange, open, setGlobalFilter]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild className="data-[state=open]:bg-secondary/80">
        <Button size="sm" variant="outline" disabled={disabled}>
          <Barcode />
          Scan
        </Button>
      </DialogTrigger>
      <DialogContent className="shadow-lg w-[90vw] sm:max-w-xs rounded-lg bg-white p-4">
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
        </VisuallyHidden.Root>

        <div className="flex flex-col items-center justify-center">
          <video ref={videoRef} className="w-full" />
          <pre>
            <code>{result}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterByBarcode;
