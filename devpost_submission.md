# Project Story

## 💡 Inspiration
**"I have 5 assignments due, but I can't even open my laptop."**

We've all been there. It’s not that we are lazy; it’s that we are **cognitively overloaded**.
Traditional to-do lists are dangerous for students because they are **infinite**. They don't care if you're tired, stressed, or burning out. They just relentlessly ask for *more*.

We realized that productivity isn't about time management; it's about **energy management**.
We asked: *"What if a task manager acted like a weather forecast for your brain?"*
That’s how **CogniLoad** was born.

## 🧠 What it does
CogniLoad is a wellness-first workspace that visualizes your **Mental Bandwidth**.
Instead of just listing tasks, it calculates a **Cognitive Load Score** based on difficulty, duration, and emotional weight.

- **Green (<100)**: Unburdened. You are safe.
- **Yellow (100-250)**: Balanced. You are focused.
- **Red (>300)**: Overload Risk. The app gently warns you to stop.

It helps students break the cycle of "Cram -> Burnout -> Crash."

## ⚙️ How we built it
We built CogniLoad with a focus on **Atmosphere over Interface**. We didn't want it to feel like a tool; we wanted it to feel like a sanctuary.

### The Tech Stack
- **Frontend**: React + Vite for snappy performance.
- **Styling**: Tailwind CSS for a custom "Wellness Design System" (Teal/Coral/Lavender palette).
- **Audio**: **Web Audio API** to synthesize Brown Noise in real-time (no looped MP3s!) for our Zen Mode.
- **Persistence**: LocalStorage for a privacy-first experience. No data leaves your device.
- **Math**: A weighted algorithm that calculates `Load = (Duration * Effort * Urgency)`.

### The "Awwwards" Polish
We spent 40% of our time on **Micro-Interactions**:
- **Breathing Background**: A 3-layer CSS animation that mimics a calm respiratory rhythm (4s in, 4s out).
- **Glassmorphism**: Using `backdrop-filter` to create depth without clutter.
- **Staggered Reveals**: Elements fade in sequentially (50ms delay) to prevent visual overwhelm.

## 😤 Challenges we ran into
1.  **The Timezone Trap**: Our calendar was drifting tasks by one day because `Date.toISOString()` uses UTC, while our users live in local time. We had to rewrite our date helpers to strictly respect "Wall Clock Time."
2.  **State Synchronization**: We used a custom hook `usePersistence` to autosave data. Initially, the Zen Mode timer didn't know when a task was deleted in the Dashboard. We implemented a lightweight **Pub/Sub event system** within the hook to keep all components in perfect sync without Redux/Context complexity.
3.  **Brown Noise Synthesis**: Generating smooth audio in the browser without clicking/popping during volume changes required deep diving into the `AudioContext` gain nodes and linear ramp automation.

## 🏆 Accomplishments that we're proud of
- **Zen Mode**: It’s not just a timer. It’s a full sensory deprivation tank for your browser. The combination of Brown Noise + Visual Pulse actually lowers your heart rate (anecdotal, but we felt it!).
- **Cognitive Offload**: The "Journal" feature at the bottom. It deletes your entry after you write it. It sounds counter-intuitive, but the psychological relief of "letting it go" is powerful.
- **The "Unburdened" State**: The empty state isn't just blank; it’s a celebration. We fought the urge to clutter it.

## 📖 What we learned
- **Less is More**: We cut 50% of the features we planned (Gamification, Social Sharing) because they added *cognitive load*. Irony avoided.
- **Wellness is Tech**: You can write code that feels "kind." Transitions, colors, and copy ("You don't need to carry this") matter as much as the algorithm.

## 🚀 What's next for CogniLoad
- **Biometric Integration**: Syncing with Apple Watch/Fitbit to auto-detect stress and lock the app if you're too burnt out.
- **AI Breakdown**: Using Gemini to auto-break large tasks ("Write Essay") into smaller, less scary chunks.
- **Public Launch**: We want this in the hands of every student before finals week.

---

## Built With
- **React**
- **Vite**
- **Tailwind CSS**
- **Web Audio API**
- **LocalStorage**
- **Lucide Icons**
