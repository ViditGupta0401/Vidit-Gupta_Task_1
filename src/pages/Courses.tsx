import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { fetchCourses } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Courses data from API
  const coursesData = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Master the basics of React including components, hooks, and state management. Perfect for beginners looking to start their React journey.",
      duration: "12 hours",
      price: 199,
      rating: 4.8,
      students: 15420
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      description: "Build scalable backend applications with Node.js, Express, and MongoDB. Learn API development and database integration.",
      duration: "18 hours", 
      price: 249,
      rating: 4.9,
      students: 12380
    },
    {
      id: 3,
      title: "Full-Stack JavaScript",
      description: "Complete full-stack development course covering React, Node.js, Express, and MongoDB. Build real-world applications.",
      duration: "35 hours",
      price: 399,
      rating: 4.7,
      students: 8950
    },
    {
      id: 4,
      title: "TypeScript Mastery",
      description: "Advanced TypeScript concepts, generics, decorators, and best practices for large-scale applications.",
      duration: "15 hours",
      price: 179,
      rating: 4.8,
      students: 6720
    },
    {
      id: 5,
      title: "GraphQL & Apollo",
      description: "Modern API development with GraphQL, Apollo Server, and Apollo Client. Build efficient data-driven applications.",
      duration: "20 hours",
      price: 289,
      rating: 4.6,
      students: 4580
    },
    {
      id: 6,
      title: "DevOps Essentials",
      description: "Learn Docker, Kubernetes, CI/CD, and cloud deployment strategies for modern web applications.",
      duration: "25 hours",
      price: 349,
      rating: 4.9,
      students: 7230
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Explore
              </span>{" "}
              <span className="text-foreground">Our Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover cutting-edge technology courses designed to advance your career
              and keep you ahead in the fast-evolving tech landscape.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 backdrop-blur-sm border-border"
              />
            </div>
            <Button variant="glow" size="default">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                duration={course.duration}
                price={course.price}
                rating={course.rating}
                students={course.students}
              />
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No courses found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;