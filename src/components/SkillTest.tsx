import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { testQuestions } from "@/data/testQuestions";
import { TestResult } from "@/types/test";
import { BookOpen, Award, TrendingUp } from "lucide-react";

interface SkillTestProps {
  onTestComplete: (result: TestResult) => void;
  onClose: () => void;
  topic: string;
}

export const SkillTest = ({ onTestComplete, onClose, topic }: SkillTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  // Filter and randomly select 5 questions based on topic
  const [selectedQuestions] = useState(() => {
    const topicKeywords = topic.toLowerCase().split(' ');
    const relevantQuestions = testQuestions.filter(question => 
      topicKeywords.some(keyword => 
        question.topic.toLowerCase().includes(keyword) ||
        question.question.toLowerCase().includes(keyword)
      )
    );
    
    // If we have relevant questions, use them; otherwise fall back to all questions
    const questionsToUse = relevantQuestions.length >= 3 ? relevantQuestions : testQuestions;
    const shuffled = [...questionsToUse].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  });

  const handleNextQuestion = () => {
    if (selectedAnswer === "") return;
    
    const answers = [...selectedAnswers];
    answers[currentQuestion] = parseInt(selectedAnswer);
    setSelectedAnswers(answers);
    setSelectedAnswer("");

    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(answers);
    }
  };

  const calculateResult = (answers: number[]) => {
    let score = 0;
    const topicCounts: { [key: string]: number } = {};
    
    selectedQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
      topicCounts[question.topic] = (topicCounts[question.topic] || 0) + 1;
    });

    const recommendedTopics = Object.keys(topicCounts).sort(
      (a, b) => topicCounts[b] - topicCounts[a]
    ).slice(0, 3);

    let recommendedLevel: 'beginner' | 'intermediate' | 'expert';
    if (score <= 2) recommendedLevel = 'beginner';
    else if (score <= 4) recommendedLevel = 'intermediate';
    else recommendedLevel = 'expert';

    const result: TestResult = {
      score,
      totalQuestions: selectedQuestions.length,
      recommendedLevel,
      recommendedTopics
    };

    setShowResult(true);
    onTestComplete(result);
  };

  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;

  if (showResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Award className="w-6 h-6 text-primary" />
            Test Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="text-6xl font-bold text-primary">
            {selectedAnswers.filter((answer, index) => answer === selectedQuestions[index].correctAnswer).length}/{selectedQuestions.length}
          </div>
          <p className="text-lg text-muted-foreground">
            Based on your results, we recommend starting with <strong>{selectedAnswers.filter((answer, index) => answer === selectedQuestions[index].correctAnswer).length <= 2 ? 'beginner' : selectedAnswers.filter((answer, index) => answer === selectedQuestions[index].correctAnswer).length <= 4 ? 'intermediate' : 'expert'}</strong> level courses.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onClose} variant="outline">
              Back to Search
            </Button>
            <Button onClick={() => {
              onClose();
              // You can add logic here to auto-fill the search with recommended topics
            }}>
              Find Courses
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Skill Assessment Test
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {selectedQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {selectedQuestions[currentQuestion].question}
          </h3>
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {selectedQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === ""}
          >
            {currentQuestion === selectedQuestions.length - 1 ? "Finish Test" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};