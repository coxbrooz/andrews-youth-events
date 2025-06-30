
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  description: string;
}

const StatsCard = ({ title, value, icon: Icon, color, description }: StatsCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-110 bg-white/95 backdrop-blur-lg border-0 shadow-xl overflow-hidden relative transform hover:-translate-y-3">
      <div className={`h-2 bg-gradient-to-r ${color} animate-gradient`} />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/20 to-orange-300/10 rounded-full blur-xl transform translate-x-10 -translate-y-10"></div>
      
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-600 mb-2 flex items-center">
              {title}
              <Sparkles className="ml-1 h-3 w-3 text-yellow-500" />
            </p>
            <p className="text-4xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-xs text-gray-500 font-medium">{description} ✨</p>
          </div>
          <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${color} group-hover:scale-125 transition-transform duration-500 shadow-lg`}>
            <Icon className="h-10 w-10 text-white" />
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
