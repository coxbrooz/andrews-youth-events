import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import EventCard from "../components/EventCard";
import AddEventDialog from "../components/AddEventDialog";

interface EventItem {
  id: number;
  title: string;
  description: string;
  ministry: string;
  venue: string;
  date: string;
  time: string;
  attendees: number;
  registrations_count: number;
  status: "upcoming" | "completed";
}

interface EventData {
  title: string;
  description: string;
  ministry: string;
  venue: string;
  date: string;
  time: string;
}

const Index = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<(EventItem & EventData) | null>(null);

  const API_URL = 'http://127.0.0.1:8000/api/events';
  const headers = useMemo(() => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }), []);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(API_URL, { method: 'GET', headers });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [headers]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const handleSaveEvent = async (data: EventData) => {
    try {
      const response = await fetch(editingEvent ? `${API_URL}/${editingEvent.id}` : API_URL, { 
        method: editingEvent ? 'PUT' : 'POST', 
        headers, 
        body: JSON.stringify(data) 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save event");
      }

      toast({ title: editingEvent ? "Updated!" : "Success!", description: "Event saved successfully." });
      await fetchEvents(); 
      setIsAddDialogOpen(false);
      setEditingEvent(null);
    } catch (error) {
      toast({ title: "Error", description: "Could not save the event.", variant: "destructive" });
    }
  };

  const handleDeleteEvent = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers });
    await fetchEvents();
    toast({ title: "Deleted!", description: "Event removed." });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-red-800">Youth Events</h1>
          <Button onClick={() => { setEditingEvent(null); setIsAddDialogOpen(true); }}>+ Add Event</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onEdit={() => setEditingEvent(event as EventItem & EventData)} 
              onDelete={() => handleDeleteEvent(event.id)}
            />
          ))}
        </div>
      </div>
      
      <AddEventDialog 
        isOpen={isAddDialogOpen || !!editingEvent} 
        onClose={() => { setIsAddDialogOpen(false); setEditingEvent(null); }} 
        onAddEvent={handleSaveEvent}
        initialData={editingEvent}
      />
    </div>
  );
};

export default Index;