import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface EventData {
  title: string;
  ministry: string;
  date: string;
  time: string;
  venue: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (data: EventData) => void;
  ministries: string[];
  onAddMinistry: (m: string) => void;
  initialData?: EventData | null;
}

const AddEventDialog = ({ isOpen, onClose, onAddEvent, ministries, onAddMinistry, initialData }: Props) => {
  const [formData, setFormData] = useState<EventData>({ 
    title: "", ministry: "", date: "", time: "", venue: "", description: "" 
  });

  // When initialData changes (like when clicking Edit), fill the form
  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ title: "", ministry: "", date: "", time: "", venue: "", description: "" });
  }, [initialData]);

  const [isAddingMinistry, setIsAddingMinistry] = useState(false);
  const [newMinistry, setNewMinistry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader><DialogTitle>{initialData ? "Edit Event" : "Create New Event"}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          
          <div className="flex gap-2">
            <Select value={formData.ministry} onValueChange={(v) => setFormData({...formData, ministry: v})}>
              <SelectTrigger><SelectValue placeholder="Ministry" /></SelectTrigger>
              <SelectContent>
                {ministries.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button type="button" variant="outline" onClick={() => setIsAddingMinistry(true)}><Plus className="w-4 h-4"/></Button>
          </div>

          {isAddingMinistry && (
            <div className="flex gap-2">
              <Input placeholder="New Ministry" value={newMinistry} onChange={(e) => setNewMinistry(e.target.value)} />
              <Button type="button" onClick={() => { onAddMinistry(newMinistry); setIsAddingMinistry(false); }}>Save</Button>
            </div>
          )}

          <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <Input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
          <Input placeholder="Venue" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} />
          <Textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          
          <Button type="submit" className="w-full">{initialData ? "Save Changes" : "Create Event"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;