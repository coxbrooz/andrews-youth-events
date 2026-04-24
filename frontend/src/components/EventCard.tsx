import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Calendar, Clock, MapPin, Users, Tag } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  ministry: string;
  venue: string;
  date: string;
  time: string;
  attendees: number;
}

interface EventCardProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}

const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header with Title and Ministry Badge */}
      <div className="p-5 border-b border-gray-50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <Tag className="w-3 h-3 mr-1" /> {event.ministry}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
      </div>

      {/* Details Grid */}
      <div className="p-5 space-y-3 bg-gray-50/50">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-3 text-blue-500" /> {event.date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-3 text-blue-500" /> {event.time}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-3 text-blue-500" /> {event.venue}
        </div>
        <div className="flex items-center text-sm font-semibold text-gray-700">
          <Users className="w-4 h-4 mr-3 text-blue-500" /> {event.attendees} Registered
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex gap-3 border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit} 
          className="flex-1 hover:bg-blue-50 hover:text-blue-600"
        >
          <Edit2 className="w-4 h-4 mr-2" /> Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDelete} 
          className="flex-1 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default EventCard;