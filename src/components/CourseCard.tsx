import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  students: number;
  image?: string;
}

const CourseCard = ({ 
  title, 
  description, 
  duration, 
  price, 
  rating, 
  students,
  image 
}: CourseCardProps) => {
  return (
    <div className="group relative">
      <div className="bg-gradient-card rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
        {/* Course Image Placeholder */}
        <div className="w-full h-48 bg-gradient-primary rounded-lg mb-6 flex items-center justify-center overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl font-bold text-primary-foreground/20">
              {title.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Course Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{students.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center justify-between pt-4">
            <div className="text-2xl font-bold text-accent">
              ${price}
            </div>
            <Button variant="glow" size="sm" className="group-hover:shadow-glow">
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;