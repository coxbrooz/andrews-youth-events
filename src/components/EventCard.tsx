
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Bell, Sparkles, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Event {
  id: number;
  title: string;
  ministry: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  attendees: number;
  status: string;
}

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
  isHappeningTomorrow?: boolean;
}

const EventCard = ({ event, onEdit, onDelete, isHappeningTomorrow = false }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getMinistryColor = (ministry: string) => {
    const colors = {
      'Daybreak': 'from-orange-400 via-yellow-400 to-amber-500',
      'Prayers': 'from-purple-500 via-violet-500 to-indigo-600',
      'Debater\'s': 'from-red-500 via-pink-500 to-rose-600',
      'Kaka': 'from-green-500 via-emerald-500 to-teal-600',
      'Waridi Dada': 'from-pink-500 via-rose-500 to-purple-600',
      'Missions': 'from-blue-500 via-cyan-500 to-sky-600',
      'SFC': 'from-indigo-500 via-purple-500 to-violet-600',
      'Fisher\'s': 'from-cyan-500 via-blue-500 to-indigo-600',
      'Crossroads': 'from-yellow-500 via-orange-500 to-red-600',
      'Transition Team': 'from-teal-500 via-green-500 to-emerald-600',
      'YAM': 'from-violet-500 via-purple-500 to-pink-600',
      'SAFE': 'from-emerald-500 via-teal-500 to-cyan-600',
      'Hospitality': 'from-rose-500 via-pink-500 to-purple-600',
      'Joyful Sounds': 'from-amber-500 via-orange-500 to-yellow-600',
      'Youth Worship Team': 'from-blue-600 via-purple-600 to-violet-700'
    };
    return colors[ministry as keyof typeof colors] || 'from-gray-500 via-gray-600 to-gray-700';
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/95 backdrop-blur-lg border-0 shadow-xl overflow-hidden relative transform hover:-translate-y-2">
      <div className={`h-3 bg-gradient-to-r ${getMinistryColor(event.ministry)} animate-gradient`} />
      
      {/* Notification bell for events happening tomorrow */}
      {isHappeningTomorrow && (
        <div className="absolute top-6 right-6 z-20">
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full p-2 shadow-lg animate-bounce">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
            </div>
          </div>
        </div>
      )}
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-orange-300/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-300/10 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <Badge 
            variant="secondary" 
            className={`bg-gradient-to-r ${getMinistryColor(event.ministry)} text-white font-bold px-4 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            {event.ministry}
          </Badge>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-700 border-2 border-green-500 bg-green-50 font-semibold px-3 py-1 shadow-md">
              ✅ {event.status}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 flex items-center">
          <Heart className="mr-2 h-5 w-5 text-red-500" />
          {event.title}
          <Sparkles className="ml-2 h-4 w-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-5 relative z-10">
        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50/80 rounded-lg p-3 backdrop-blur-sm">
          {event.description}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center text-gray-700 bg-white/60 rounded-lg p-3 backdrop-blur-sm shadow-sm">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full p-2 mr-3">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-700 bg-white/60 rounded-lg p-3 backdrop-blur-sm shadow-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2 mr-3">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">{formatTime(event.time)}</span>
          </div>
          
          <div className="flex items-center text-gray-700 bg-white/60 rounded-lg p-3 backdrop-blur-sm shadow-sm">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-2 mr-3">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">{event.venue}</span>
          </div>
          
          <div className="flex items-center text-gray-700 bg-white/60 rounded-lg p-3 backdrop-blur-sm shadow-sm">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-2 mr-3">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">{event.attendees} blessed attendees 🙏</span>
          </div>
        </div>

        {/* Enhanced Action buttons */}
        <div className="flex justify-between pt-6 border-t-2 border-gradient-to-r from-purple-200 to-blue-200">
          <Button
            onClick={() => onEdit(event)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 hover:bg-blue-50 border-2 border-blue-300 text-blue-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-red-50 border-2 border-red-300 text-red-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Trash2 className="mr-2 h-5 w-5 text-red-500" />
                  Delete Event
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600 text-lg">
                  Are you sure you want to delete "{event.title}"? This action cannot be undone and will remove this blessed event from our records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl font-semibold">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(event.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-bold"
                >
                  Delete Event
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
