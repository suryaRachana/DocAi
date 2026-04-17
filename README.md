---

title: DocuAid AI
emoji: 🤖
colorFrom: blue
colorTo: green
sdk: static
pinned: false
---

# DocuAid AI – Government Scheme Navigator

An OpenEnv-compatible AI environment designed to simulate real-world scenarios where an AI agent assists users in navigating government schemes.

## Project Overview
DocuAid AI provides a structured environment for testing the ability of LLMs to:
1. Identify eligible schemes based on complex user profiles.
2. Explain complex policy benefits in simple, accessible language.
3. Provide actionable, step-by-step application guidance.

## Tasks

### Task 1: Suggest Eligible Schemes (Easy)
The agent is given a user profile (age, income, occupation, location) and must return a list of schemes the user qualifies for.
- **Success Criteria:** Correct schemes (e.g., PM-KISAN for farmers) are mentioned.

### Task 2: Explain Scheme (Medium)
The agent must explain the benefits of a specific scheme.
- **Success Criteria:** The explanation is accurate and uses simple, non-technical language.

### Task 3: Application Guidance (Hard)
The agent provides a step-by-step guide and a list of required documents for a specific scheme and user profile.
- **Success Criteria:** All mandatory documents and key application steps are included.

## Setup Instructions

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Set your API Key:**
   ```bash
   export HF_TOKEN="your_openai_api_key"
   ```

## Running Inference
Run the baseline inference script to see the agent in action:
```bash
python scripts/inference.py
```

## Docker Support
Build and run using Docker:
```bash
docker build -t docuaid-ai .
docker run -e HF_TOKEN="your_api_key" docuaid-ai
```

## Example Output
```text
Task 1: easy
Description: Suggest eligible schemes for the given profile.
User Profile: {"age": 45, "income": 200000, "occupation": "Farmer", "location": "Maharashtra"}
Agent Response: Based on your profile as a farmer with an income of 2L, you are eligible for PM-KISAN...
Grade Score: 1.00
Reward: 0.4
```

## Baseline Score
The current baseline using GPT-3.5-Turbo achieves an average score of **~0.85**.
