"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  selectedTime?: string;
  onSave?: (sessionData: any) => void;
}

export function SessionDialog({
  open,
  onOpenChange,
  selectedDate,
  selectedTime,
  onSave
}: SessionDialogProps) {
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("scheduled");

  const handleSave = () => {
    const sessionData = {
      clientName,
      serviceType,
      notes,
      status,
      date: selectedDate,
      time: selectedTime,
      createdAt: new Date()
    };
    
    if (onSave) {
      onSave(sessionData);
    }
    
    // Reset form
    setClientName("");
    setServiceType("");
    setNotes("");
    setStatus("scheduled");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Sessão</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="client">Cliente</Label>
            <Input
              id="client"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nome do cliente"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="service">Tipo de Serviço</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="massage">Massagem</SelectItem>
                <SelectItem value="consultation">Consulta</SelectItem>
                <SelectItem value="therapy">Terapia</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Agendada</SelectItem>
                <SelectItem value="completed">Concluída</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas da sessão..."
              rows={3}
            />
          </div>
          {selectedDate && (
            <div className="text-sm text-muted-foreground">
              Data: {selectedDate.toLocaleDateString()} {selectedTime && `às ${selectedTime}`}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
