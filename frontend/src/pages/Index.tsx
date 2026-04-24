import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import EventCard from "../components/EventCard";
import AddEventDialog from "../components/AddEventDialog";

// 1. Rename to EventItem to avoid conflict with browser 'Event'
interface EventItem {
  id: number;
  title: string;
  description: string;
  ministry: string;
  venue: string;
  date: string;
  time: string;
  attendees: number;
  status: "upcoming" | "completed";
}

// 2. Clearly define EventData
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
  // Use EventItem here
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<(EventItem & EventData) | null>(null);
  const [ministries, setMinistries] = useState<string[]>(["Youth", "Bible Study"]);

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
    if (editingEvent) {
      await fetch(`${API_URL}/${editingEvent.id}`, { 
        method: 'PUT', 
        headers, 
        body: JSON.stringify(data) 
      });
      toast({ title: "Updated!", description: "Event saved." });
    } else {
      await fetch(API_URL, { 
        method: 'POST', 
        headers, 
        body: JSON.stringify(data) 
      });
      toast({ title: "Success!", description: "Event created." });
    }
    fetchEvents();
    setIsAddDialogOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers });
    fetchEvents();
    toast({ title: "Deleted!", description: "Event removed." });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Youth Events</h1>
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
        ministries={ministries}
        onAddMinistry={(m) => setMinistries([...ministries, m])}
        initialData={editingEvent}
      />
    </div>
  );
};

export default Index;