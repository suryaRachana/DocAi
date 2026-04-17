import { useState } from "react";
import React from "react";
interface UserProfile {
  age: number;
  income: number;
  occupation: string;
  location: string;
}

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={formData.age}
        onChange={(e) =>
          setFormData({ ...formData, age: parseInt(e.target.value) })
        }
      />

      <input
        type="number"
        value={formData.income}
        onChange={(e) =>
          setFormData({ ...formData, income: parseInt(e.target.value) })
        }
      />

      <input
        value={formData.location}
        onChange={(e) =>
          setFormData({ ...formData, location: e.target.value })
        }
      />

      <button type="submit">
        {isLoading ? "Searching..." : "Find Schemes"}
      </button>
    </form>
  );
}