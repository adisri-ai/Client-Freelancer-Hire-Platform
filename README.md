[Project Live Link](https://client-free-frontend.vercel.app/) can be accessed from here  
(Note: Login page may take time to initialize because of render free tier backend limits)  
# Problem statement selected: TalentStage — Creator & Freelancer Portfolio + Hiring Marketplace   
**The Vision**: Build a marketplace where creative and technical freelancers (designers,   
developers, video editors, content writers) can showcase their work, get discovered by   
clients, bid on projects, and collaborate — with AI helping both sides make better   
decisions.   
# Tech Stack  
1. **Frontend** : React.js
2. **Backend**  : FastAPI
3. **LLM Integration** : Google Gemini API, Hugging Face and GROQ
4. **Database**  : Mongo DB
5. **Deplotyment** : Backend- Render, Frontend- vercel
# Local Deployment Steps:   
1. Download the complete frontend and backend files
2. In backend add Your GOOGLE_GEMINI_API_KEY, GROQ_API_KEY, MONGO_URI and HUGGINGFACEHUB_API_TOKEN as environment variables
3. run the command in backend root directory :
   ```
   pip install -r requirements.txt
4. To host the backend run the command *uvicorn main:app --host 0.0.0.0 --port ${PORT}* where PORT could be any system port for your choice.
   ```
   uvicorn main:app --host 0.0.0.0 --port 8000
5. For the frontend make sure your system already has react js and Node js. Set the backend endpoint using .env
6. To install the other packages run the command *npm run build*
7. To host the frontend now run the command: *npm run dev*
# Project Differentiator: AI Integration to marketplace  
The project has the following AI Integrations which differentiate it from any ordinary marketplace.  
1. **Proposal Review** : Before submitting the proposal to a client the freelancer can run his proposal on our AI review feature and find its qualities.
2. **Client-side Proposal Review** : On receiving propoal the client can review the proposal using our AI feature.
3. **Project Idea Formulation**  : The Client before posting his project publicly can run it on the AI Integration to reshape the project into a realistic idea.
4. **AI-Generated Skilltest**   : To get a skill verified on his profile a freelancer must clear a skilltest the questions for which are generate by our AI
during the runtime and hence the questions are not stati finishing scope of palagrism/copying.
# Sample credentials: 
1. Freelancer: email- free1@talentstage.com password- freelancer1
2. CLient:     email- cli1@talentstage.com  passowrd- cli1cli1
# Limitations  
1. Due to the Free Hosting of Render, the backend may take longer (around 2 mins) to respond to the first request
2. Sandox payment has implemented using virtual coins assigned by our website rather than hosting with a card number, CVV, etc.
3. The Project makes use of FREE LLM Models and hence they have rate limit restrictions. For too many AI request the AI fetch could fail.
