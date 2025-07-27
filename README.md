# 🎵 Spotify Clone (Frontend + Basic Player)

A **Spotify‑like music player UI** built with **HTML, CSS, and JavaScript**.  
It features:
- A responsive sidebar & navigation
- A song list dynamically loaded from local folders
- Play, pause, next, previous, and seek functionality
- Volume control with icons for mute/low/high
- Dynamic album cards loaded from metadata

---

## ✨ Features
✅ Spotify‑inspired UI with a left sidebar and main content area  
✅ Dynamic fetching of songs (`.mp3` files) from a local server folder  
✅ Play/Pause/Next/Previous controls  
✅ Seekbar with time updates (`MM:SS / MM:SS`)  
✅ Volume control with dynamic icons (mute, low, high)  
✅ Responsive design and mobile‑friendly layout  
✅ Lightweight, no backend required (runs on local server)

---

## 🖥️ Tech Stack
- **HTML5** – Structure
- **CSS3** – Styling (`style.css` and `utility.css`)
- **JavaScript (Vanilla)** – Dynamic fetching & player controls

---

## 📂 Project Structure
spotify-clone/
├── index.html
├── style.css
├── utility.css
├── script.js
├── img/          # All icons like play.svg, pause.svg, volume.svg, etc.
└── songs/        # Folders with mp3s, each containing cover.jpg and info.json

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
You need to run this on a local server because `fetch()` from file URLs won’t work directly in browsers.

- Install **VS Code** or any editor
- Install **Live Server** extension (or use `http-server` via Node.js)

---

### 2️⃣ Run Locally
Clone the repo and open in your editor:
```bash
git clone https://github.com/<your-username>/spotify-clone.git
cd spotify-clone

3️⃣ Add Your Songs

Inside the songs/ folder:
	•	Create subfolders for albums or playlists
	•	Each subfolder should have:
	•	cover.jpg – album art
	•	info.json – metadata (title, description)
	•	One or more .mp3 files

Example:
songs/
└── ncs/
    ├── cover.jpg
    ├── info.json
    ├── song1.mp3
    ├── song2.mp3

🎧 Usage
	•	Click an album card to load songs
	•	Click on a song in the library to play
	•	Use play/pause/next/previous buttons
	•	Drag on the seekbar to jump
	•	Adjust volume with slider or icon

⸻

🛠️ Customization

You can:
	•	Modify style.css or utility.css to change the theme
	•	Add more SVG icons in img/
	•	Enhance JavaScript for playlists, favorites, etc.
