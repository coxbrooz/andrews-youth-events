import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Tag } from "lucide-react";

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
  registrations_count: number;
}

interface EventCardProps {
  event: EventItem;
  onEdit: () => void;
  onDelete: () => void;
}

const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
            {event.ministry}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Status Badge */}
        <div className="flex items-center text-sm">
          <Tag className="w-4 h-4 mr-2 text-gray-500" />
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
          }`}>
            {event.status.toUpperCase()}
          </span>
        </div>

        {/* Description - Added conditional check */}
        <p className="text-sm text-gray-600 italic min-h-[1.5rem]">
          {event.description || <span className="text-gray-400">No description provided.</span>}
        </p>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" /> {event.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" /> {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" /> {event.venue}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" /> {event.registrations_count} / {event.attendees} Registered
          </div>
        </div>

        <div className="flex pt-4 gap-2 border-t mt-4">
          <Button variant="ghost" size="sm" onClick={onEdit} className="w-full">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-red-600 hover:bg-red-50" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;