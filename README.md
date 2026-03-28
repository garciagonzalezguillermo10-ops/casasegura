# CasaSegura 🏠🛡️
## Your copilot for finding housing without getting scammed

### The Problem
International students and immigrants in Ann Arbor face serious risks when searching for housing: rental scams on Facebook and Craigslist, abusive lease clauses, and landlords who take advantage of tenants who don't know their rights. Language barriers and unfamiliarity with US laws make this population especially vulnerable.

### The Solution
CasaSegura is a web app that uses AI to protect tenants in three ways:

**Module 1 — Scam Detector**
Paste any rental listing and the app analyzes it: compares the price to local averages, detects classic scam red flags (requests money before showing the apartment, "I'm overseas", stolen photos), and gives you a confidence score 0-100 with a green/yellow/red indicator.

**Module 2 — Lease Analyzer**
Upload your rental contract (PDF or photo) and the app analyzes it clause by clause against Michigan law. It flags what's normal, what's abusive, and what's illegal, and generates the exact questions to ask your landlord before signing.

**Module 3 — Your Tenant Rights**
Interactive interface where you select your situation ("my landlord won't fix the heat", "they're trying to evict me", "they kept my deposit") and get a step-by-step action plan with Ann Arbor-specific resources: Michigan Legal Services, UMich Student Legal Services, phone numbers, links, and ready-to-send letter templates.

### How to Run the Project
```bash
# Clone the repository
git clone https://github.com/garciagonzalezguillermo10-ops/casasegura.git
cd casasegura

# Install dependencies
npm install

# Add your Anthropic API key
# Create a .env file and add: VITE_ANTHROPIC_API_KEY=your_key_here

# Start the app
npm run dev
```

### Technology
- React + Vite (frontend)
- Tailwind CSS (design)
- Claude API by Anthropic (AI analysis)

### Ethical Considerations
- Does not replace professional legal advice — all modules include clear disclaimers
- We do not store any personal user data
- Always directs users to real professional resources (Student Legal Services, Michigan Legal Help)
- Transparent about AI limitations
- Specific to Michigan law and Ann Arbor resources

### Resources Referenced in the App
- [UM Student Legal Services](https://studentlegalservices.umich.edu/) — (734) 764-9400
- [Michigan Legal Help](https://michiganlegalhelp.org/)
- [Legal Services of South Central Michigan](https://lsscm.org/) — (888) 783-8190
- Ann Arbor Tenants Union — annarbortenant@gmail.com
- HUD Housing Discrimination Hotline — (800) 669-9777

### Team
- Guillermo Garcia — Technical lead, backend & API
- Jose Lag — Tenant rights section, legal content, documentation
- Mario — Design, presentation & pitch

### Created for CBC Hackathon Spring 2026 @ University of Michigan
