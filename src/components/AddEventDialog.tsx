import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (eventData: any) => void;
  ministries: string[];
  onAddMinistry: (ministry: string) => void;
}

const AddEventDialog = ({ isOpen, onClose, onAddEvent, ministries, onAddMinistry }: AddEventDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    ministry: "",
    date: "",
    time: "",
    venue: "",
    description: ""
  });
  const [isAddingMinistry, setIsAddingMinistry] = useState(false);
  const [newMinistry, setNewMinistry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.ministry || !formData.date || !formData.time || !formData.venue) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onAddEvent(formData);
    setFormData({
      title: "",
      ministry: "",
      date: "",
      time: "",
      venue: "",
      description: ""
    });
    onClose();
  };

  const handleAddMinistry = () => {
    if (!newMinistry.trim()) {
      toast({
        title: "Error",
        description: "Please enter a ministry name",
        variant: "destructive"
      });
      return;
    }

    if (ministries.includes(newMinistry.trim())) {
      toast({
        title: "Error",
        description: "This ministry already exists",
        variant: "destructive"
      });
      return;
    }

    onAddMinistry(newMinistry.trim());
    setFormData({ ...formData, ministry: newMinistry.trim() });
    setNewMinistry("");
    setIsAddingMinistry(false);
    
    toast({
      title: "Success!",
      description: "New ministry has been added",
      className: "bg-green-50 border-green-200"
    });
  };

  // Generate time options (24-hour format with 15-minute intervals)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        times.push({ value: timeString, display: displayTime });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create New Event
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                Event Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
                className="h-11 border-2 border-gray-200 focus:border-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ministry" className="text-sm font-semibold text-gray-700">
                Ministry *
              </Label>
              <div className="flex gap-2">
                <Select value={formData.ministry} onValueChange={(value) => setFormData({ ...formData, ministry: value })}>
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500">
                    <SelectValue placeholder="Select ministry" />
                  </SelectTrigger>
                  <SelectContent>
                    {ministries.map((ministry) => (
                      <SelectItem key={ministry} value={ministry}>
                        {ministry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingMinistry(true)}
                  className="h-11 px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isAddingMinistry && (
            <div className="flex gap-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Input
                value={newMinistry}
                onChange={(e) => setNewMinistry(e.target.value)}
                placeholder="Enter new ministry name"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddMinistry} size="sm">
                Add
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddingMinistry(false);
                  setNewMinistry("");
                }} 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                Event Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-11 border-2 border-gray-200 focus:border-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-semibold text-gray-700">
                Event Time *
              </Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="text-sm font-semibold text-gray-700">
              Venue *
            </Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="Enter event venue"
              className="h-11 border-2 border-gray-200 focus:border-purple-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter event description"
              className="min-h-[100px] border-2 border-gray-200 focus:border-purple-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
            >
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
