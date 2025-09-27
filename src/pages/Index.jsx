import { useState } from "react";
import { CourseSearch } from "@/components/CourseSearch";
import { CourseCard } from "@/components/CourseCard";
import { SkillTest } from "@/components/SkillTest";
import { courses } from "@/data/courses";
import { BookOpen, GraduationCap, Brain, Award } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState({
    topic: '',
    level: 'all'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSearch = () => {
    const filteredCourses = courses.filter(course => {
      const topicMatch = course.topic.toLowerCase().includes(filters.topic.toLowerCase()) ||
                        course.title.toLowerCase().includes(filters.topic.toLowerCase()) ||
                        course.skills.some(skill => skill.toLowerCase().includes(filters.topic.toLowerCase()));
      
      const levelMatch = filters.level === 'all' || course.level === filters.level;
      
      return topicMatch && levelMatch;
    });
    
    setSearchResults(filteredCourses);
    setHasSearched(true);
  };

  const handleTestComplete = (result) => {
    setTestResult(result);
    const newFilters = {
      topic: result.recommendedTopics[0] || '',
      level: result.recommendedLevel
    };
    setFilters(newFilters);
    
    // Automatically search for courses with the recommended filters
    const filteredCourses = courses.filter(course => {
      const topicMatch = course.topic.toLowerCase().includes(newFilters.topic.toLowerCase()) ||
                        course.title.toLowerCase().includes(newFilters.topic.toLowerCase()) ||
                        course.skills.some(skill => skill.toLowerCase().includes(newFilters.topic.toLowerCase()));
      
      const levelMatch = course.level === newFilters.level;
      
      return topicMatch && levelMatch;
    });
    
    setSearchResults(filteredCourses);
    setHasSearched(true);
  };

  const handleTestClose = () => {
    setShowTest(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-blue-600">
                <GraduationCap className="w-6 h-6" />
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">LearnHub</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-900 hover:text-blue-600 transition-colors font-medium">
                Home
              </a>
              <a href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                Browse Courses
              </a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-4">
            <GraduationCap className="w-8 h-8" />
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Course Recommendation System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect courses for your learning journey. Enter your topic and skill level to get personalized recommendations.
          </p>
        </div>
      </div>

      {/* Test Modal */}
      {showTest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <SkillTest 
            onTestComplete={handleTestComplete}
            onClose={handleTestClose}
            topic={filters.topic}
          />
        </div>
      )}

      {/* Search Section */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {testResult && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Test Results Applied</span>
              </div>
              <p className="text-sm text-gray-600">
                Based on your test score ({testResult.score}/{testResult.totalQuestions}), we've set your level to <strong>{testResult.recommendedLevel}</strong> and suggested <strong>{testResult.recommendedTopics[0]}</strong> as your topic.
              </p>
            </div>
          )}
          <CourseSearch 
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
          
          {/* Take a Test Section - Show after topic is entered */}
          {filters.topic && (
            <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-3">
                <Brain className="w-6 h-6" />
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3 text-center">Test your knowledge in {filters.topic}</h2>
              <p className="text-gray-600 mb-4 text-center">
                Take a quick assessment test to evaluate your current skill level in {filters.topic} and get better course recommendations.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowTest(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  Take {filters.topic} Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {searchResults.length > 0 
                  ? `Found ${searchResults.length} course${searchResults.length === 1 ? '' : 's'} for "${filters.topic}"`
                  : `No courses found for "${filters.topic}"`
                }
              </h2>
              {searchResults.length === 0 && (
                <p className="text-gray-600">
                  Try searching for: React, Python, JavaScript, Machine Learning, or Data Science
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
