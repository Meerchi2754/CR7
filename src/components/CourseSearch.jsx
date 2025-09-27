import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export function CourseSearch({ filters, onFiltersChange, onSearch }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="text-sm font-medium text-foreground mb-2 block">
              What do you want to learn?
            </label>
            <Input
              id="topic"
              placeholder="e.g., React, Python, Machine Learning, JavaScript..."
              value={filters.topic}
              onChange={(e) => onFiltersChange({ ...filters, topic: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="level" className="text-sm font-medium text-foreground mb-2 block">
              Your skill level
            </label>
            <Select
              value={filters.level}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, level: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={onSearch} 
            className="w-full" 
            size="lg"
            disabled={!filters.topic.trim()}
          >
            <Search className="w-4 h-4 mr-2" />
            Find Courses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}