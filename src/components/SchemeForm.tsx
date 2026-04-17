import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserProfile } from "@/src/types";
import { Search } from "lucide-react";

interface SchemeFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export function SchemeForm({ onSubmit, isLoading }: SchemeFormProps) {
  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    income: 500000,
    occupation: "Student",
    location: "Delhi",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-none bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">Your Profile</CardTitle>
        <CardDescription>Enter your details to find eligible government schemes.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                required
                min={1}
                max={120}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income (₹)</Label>
              <Input
                id="income"
                type="number"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: parseInt(e.target.value) })}
                required
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Select
                value={formData.occupation}
                onValueChange={(value) => setFormData({ ...formData, occupation: value })}
              >
                <SelectTrigger id="occupation">
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Farmer">Farmer</SelectItem>
                  <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                  <SelectItem value="Salaried">Salaried</SelectItem>
                  <SelectItem value="Unemployed">Unemployed</SelectItem>
                  <SelectItem value="Senior Citizen">Senior Citizen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (State/City)</Label>
              <Input
                id="location"
                placeholder="e.g. Maharashtra, Mumbai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Schemes
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
