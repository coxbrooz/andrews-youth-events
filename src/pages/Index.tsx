import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Plus, Search, Filter, Bell, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import EventCard from "../components/EventCard";
import AddEventDialog from "../components/AddEventDialog";
import EditEventDialog from "../components/EditEventDialog";
import StatsCard from "../components/StatsCard";

// Sample data for events
const sampleEvents = [
  {
    id: 1,
    title: "Youth Prayer Night",
    ministry: "Prayers",
    date: "2024-07-15",
    time: "18:00",
    venue: "Main Sanctuary",
    description: "Join us for an evening of powerful prayer and worship",
    attendees: 45,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Debate Competition",
    ministry: "Debater's",
    date: "2024-07-20",
    time: "14:00",
    venue: "Fellowship Hall",
    description: "Annual inter-ministry debate competition",
    attendees: 28,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Morning Devotion",
    ministry: "Daybreak",
    date: "2024-07-18",
    time: "06:00",
    venue: "Prayer Garden",
    description: "Start your day with God's word and fellowship",
    attendees: 32,
    status: "upcoming"
  },
  {
    id: 4,
    title: "Worship Practice",
    ministry: "Youth Worship Team",
    date: "2024-07-22",
    time: "16:00",
    venue: "Music Room",
    description: "Preparing for Sunday worship service",
    attendees: 15,
    status: "upcoming"
  },
  {
    id: 5,
    title: "Community Outreach",
    ministry: "Missions",
    date: "2024-07-25",
    time: "09:00",
    venue: "Kibera Slums",
    description: "Feeding program and gospel sharing",
    attendees: 38,
    status: "upcoming"
  }
];

const defaultMinistries = [
  "Daybreak", "Prayers", "Debater's", "Kaka", "Waridi Dada", 
  "Missions", "SFC", "Fisher's", "Crossroads", "Transition Team",
  "YAM", "SAFE", "Hospitality", "Joyful Sounds", "Youth Worship Team"
];

const Index = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState(sampleEvents);
  const [ministries, setMinistries] = useState(defaultMinistries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isAddMinistryDialogOpen, setIsAddMinistryDialogOpen] = useState(false);
  const [newMinistryName, setNewMinistryName] = useState("");

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const filteredEvents = sortedEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinistry = selectedMinistry === "All" || event.ministry === selectedMinistry;
    return matchesSearch && matchesMinistry;
  });

  // Check for events happening tomorrow
  const getEventsHappeningTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    return events.filter(event => event.date === tomorrowStr);
  };

  // Show notifications for events happening tomorrow
  useEffect(() => {
    const eventsHappeningTomorrow = getEventsHappeningTomorrow();
    if (eventsHappeningTomorrow.length > 0) {
      eventsHappeningTomorrow.forEach(event => {
        toast({
          title: "Event Reminder! 🔔",
          description: `${event.title} is happening tomorrow at ${event.time}`,
          className: "bg-blue-50 border-blue-200"
        });
      });
    }
  }, [events, toast]);

  const handleAddEvent = (eventData: any) => {
    const newEvent = {
      id: Date.now(), // Use timestamp for unique ID
      ...eventData,
      attendees: 0,
      status: "upcoming"
    };
    setEvents([...events, newEvent]);
    toast({
      title: "Success!",
      description: "Event has been created successfully",
      className: "bg-green-50 border-green-200"
    });
  };

  const handleEditEvent = (eventData: any) => {
    setEvents(events.map(event => 
      event.id === editingEvent.id 
        ? { ...event, ...eventData }
        : event
    ));
    setEditingEvent(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Success!",
      description: "Event has been updated successfully",
      className: "bg-green-50 border-green-200"
    });
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed successfully",
      className: "bg-red-50 border-red-200"
    });
  };

  const handleOpenEditDialog = (event: any) => {
    setEditingEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleAddMinistry = (newMinistry: string) => {
    setMinistries([...ministries, newMinistry]);
  };

  const handleAddMinistryFromButton = () => {
    if (!newMinistryName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a ministry name",
        variant: "destructive"
      });
      return;
    }

    if (ministries.includes(newMinistryName.trim())) {
      toast({
        title: "Error",
        description: "This ministry already exists",
        variant: "destructive"
      });
      return;
    }

    setMinistries([...ministries, newMinistryName.trim()]);
    setNewMinistryName("");
    setIsAddMinistryDialogOpen(false);
    
    toast({
      title: "Success!",
      description: "New ministry has been added",
      className: "bg-green-50 border-green-200"
    });
  };

  const upcomingEvents = events.filter(e => e.status === "upcoming").length;
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);
  const activeMinistries = [...new Set(events.map(e => e.ministry))].length;
  const eventsHappeningTomorrow = getEventsHappeningTomorrow();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header with enhanced styling */}
      <header className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-2xl border-b-4 border-gradient-to-r from-yellow-400 to-orange-500">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 py-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg animate-pulse">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-6 w-6 text-yellow-300 animate-bounce" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  PCEA St. Andrew's Youth
                </h1>
                <p className="text-blue-100 font-medium text-lg flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Event Management System - Spreading God's Love
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {eventsHappeningTomorrow.length > 0 && (
                <div className="relative">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Bell className="h-8 w-8 text-yellow-300 animate-pulse" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
                      {eventsHappeningTomorrow.length}
                    </div>
                  </div>
                </div>
              )}
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-4 rounded-full"
                size="lg"
              >
                <Plus className="mr-3 h-6 w-6" />
                Create New Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 relative z-10">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <StatsCard
            title="Upcoming Events"
            value={upcomingEvents}
            icon={Calendar}
            color="from-emerald-500 via-green-500 to-teal-500"
            description="Events scheduled"
          />
          <StatsCard
            title="Total Attendees"
            value={totalAttendees}
            icon={Users}
            color="from-blue-500 via-cyan-500 to-sky-500"
            description="Registered participants"
          />
          <StatsCard
            title="Active Ministries"
            value={activeMinistries}
            icon={Heart}
            color="from-purple-500 via-pink-500 to-rose-500"
            description="Ministries with events"
          />
          <StatsCard
            title="Tomorrow's Events"
            value={eventsHappeningTomorrow.length}
            icon={Bell}
            color="from-orange-500 via-red-500 to-pink-500"
            description="Events happening tomorrow"
          />
        </div>

        {/* Enhanced Search and Filter */}
        <Card className="mb-12 shadow-2xl border-0 bg-white/90 backdrop-blur-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-blue-50/50"></div>
          <CardHeader className="relative z-10 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
            <CardTitle className="text-2xl text-gray-800 flex items-center">
              <Search className="mr-3 h-6 w-6 text-purple-600" />
              Discover Events
              <Sparkles className="ml-2 h-5 w-5 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Input
                  placeholder="Search events, ministries, or venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 text-lg border-3 border-purple-200 focus:border-purple-500 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
                />
              </div>
              <div className="md:w-72">
                <select
                  value={selectedMinistry}
                  onChange={(e) => setSelectedMinistry(e.target.value)}
                  className="w-full h-14 px-6 text-lg rounded-xl border-3 border-purple-200 focus:border-purple-500 focus:outline-none bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-lg"
                >
                  <option value="All">All Ministries ✨</option>
                  {ministries.map(ministry => (
                    <option key={ministry} value={ministry}>{ministry}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredEvents.map((event) => (
            <div key={event.id} className="animate-fade-in">
              <EventCard 
                event={event} 
                onEdit={handleOpenEditDialog}
                onDelete={handleDeleteEvent}
                isHappeningTomorrow={eventsHappeningTomorrow.some(e => e.id === event.id)}
              />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-16 shadow-2xl max-w-md mx-auto">
              <div className="relative">
                <Calendar className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <Sparkles className="absolute top-0 right-1/2 transform translate-x-6 h-6 w-6 text-yellow-400 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No events found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search terms or create a new event!</p>
            </div>
          </div>
        )}

        {/* Enhanced Ministry Overview */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50"></div>
          <CardHeader className="relative z-10 bg-gradient-to-r from-green-600/10 to-emerald-600/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl text-gray-800 flex items-center">
                <Heart className="mr-3 h-8 w-8 text-red-500" />
                Our Ministries
                <Sparkles className="ml-2 h-6 w-6 text-yellow-500" />
              </CardTitle>
              <Button
                onClick={() => setIsAddMinistryDialogOpen(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-full px-6 py-3"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Ministry
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {ministries.map((ministry, index) => (
                <Badge
                  key={ministry}
                  variant="secondary"
                  className="p-4 text-center text-sm font-bold bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 hover:from-purple-200 hover:via-blue-200 hover:to-indigo-200 text-purple-800 border-2 border-purple-200 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl rounded-xl animate-fade-in"
                  onClick={() => setSelectedMinistry(ministry)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {ministry}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddEventDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddEvent={handleAddEvent}
        ministries={ministries}
        onAddMinistry={handleAddMinistry}
      />

      <EditEventDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingEvent(null);
        }}
        onEditEvent={handleEditEvent}
        event={editingEvent}
        ministries={ministries}
        onAddMinistry={handleAddMinistry}
      />

      {/* Enhanced Add New Ministry Dialog */}
      <Dialog open={isAddMinistryDialogOpen} onOpenChange={setIsAddMinistryDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center">
              <Heart className="mr-2 h-6 w-6 text-red-500" />
              Add New Ministry
              <Sparkles className="ml-2 h-5 w-5 text-yellow-500" />
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label htmlFor="ministryName" className="text-lg font-bold text-gray-700">
                Ministry Name *
              </Label>
              <Input
                id="ministryName"
                value={newMinistryName}
                onChange={(e) => setNewMinistryName(e.target.value)}
                placeholder="Enter ministry name"
                className="h-12 border-3 border-green-200 focus:border-green-500 rounded-xl text-lg"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddMinistryDialogOpen(false);
                  setNewMinistryName("");
                }}
                className="flex-1 h-12 border-3 border-gray-300 hover:bg-gray-100 rounded-xl text-lg font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMinistryFromButton}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl text-lg font-bold"
              >
                <Heart className="mr-2 h-5 w-5" />
                Add Ministry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
