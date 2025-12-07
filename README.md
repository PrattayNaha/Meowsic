# 🎵 **Meowsic – Spotify Clone**

A simple and functional music player built using **HTML, CSS, and JavaScript**.
Meowsic allows users to play audio files, switch songs, search songs, control volume, enable shuffle/repeat, and view song durations—just like a lightweight Spotify clone.

---

live link: https://prattaynaha.github.io/Meowsic/

## 🚀 **Features**

### 🎧 **Core Music Player**

* Play / Pause songs
* Next / Previous track
* Display current time & total duration
* Progress bar seeking

### 🎶 **Song List**

* Automatic song card generation
* Each song displays:

  * Cover image
  * Song name
  * Song duration (loaded dynamically from audio metadata)

### 🔍 **Search**

* Real-time search filtering based on song name

### 🔊 **Volume Controls**

* Adjustable volume slider
* Volume icon indicator

### 🔁 Shuffle & Repeat

* Shuffle mode (random song)
* Repeat mode (current song loops)

### ❤️ Favorites (UI button)

* Favorite button prepared for future functionality

---

## 🛠 **Tech Used**

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**
* **Font Awesome** for icons

---

## 📁 **Project Structure**

```
/project-root
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── covers/
│   └── (song cover images)
├── mp3/
│   └── (audio files)
└── media/
    ├── logo.png
    └── visualizer.gif
```

---

## 📷 **UI Overview**

✔ Song list shown on the left
✔ Currently playing song cover on the right
✔ Full player controls at the bottom
✔ Smooth layout with visualizer gif

---

## ▶️ **How to Use**

1. Clone this repository

   ```bash
   git clone https://github.com/PrattayNaha/Meowsic.git
   ```
2. Open the folder

   ```bash
   cd Meowsic
   ```
3. Make sure your file paths use **forward slashes** ( `/` )
4. Open `index.html` in any browser

---

## ⚠️ Common Issues

### ❗ 404 Not Found

This happens if you use wrong paths like:

```
..\css\style.css
```

Correct HTML uses:

```
../css/style.css
```

### ❗ Search Error (`song.toLowerCase is not a function`)

Fixed by removing unused code:

```js
el.style.display = song.songName.toLowerCase().includes(val) ? "flex" : "none";
```

---

## ✨ Future Improvements

* Playlist support
* Save favorites
* Dark mode
* Backend to store songs

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to fork the project and improve it.

---

## 📜 License

This project is open-source under the **MIT License**.

