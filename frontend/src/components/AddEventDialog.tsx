import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// 1. Define the shape of your data clearly instead of using 'any'
interface EventData {
  title: string;
  description: string;
  ministry: string;
  venue: string;
  date: string;
  time: string;
}

interface AddEventProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (data: EventData) => void;
  initialData?: EventData | null;
}

const AddEventDialog = ({ isOpen, onClose, onAddEvent, initialData }: AddEventProps) => {
  const [formData, setFormData] = useState<EventData>({
    title: "",
    description: "",
    ministry: "",
    venue: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Event" : "Create New Event"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <input id="title" className="w-full p-2 border rounded" placeholder="Event Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          </div>

          <div>
            <label htmlFor="ministry" className="text-sm font-medium">Ministry Name</label>
            <input id="ministry" className="w-full p-2 border rounded" value={formData.ministry} onChange={(e) => setFormData({...formData, ministry: e.target.value})} placeholder="e.g., Youth" required />
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <input id="date" type="date" className="w-full p-2 border rounded" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div className="w-full">
              <label htmlFor="time" className="text-sm font-medium">Time</label>
              <input id="time" type="time" className="w-full p-2 border rounded" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
            </div>
          </div>

          <Button type="submit" className="w-full">Save Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;