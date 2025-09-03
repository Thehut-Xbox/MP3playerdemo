const songs = [
  { name: "Don't Stop Me Now", file: "songs/Soundloaders.app - Don_t Stop Me Now - Remastered 2011 - Queen.mp3", artist: "Queen" },
  { name: "Enter Sandman", file: "songs/Soundloaders.app - Enter Sandman _Remastered_ - Metallica.mp3", artist: "Metallica" },
  { name: "I Was Made For Lovin' You", file: "songs/Soundloaders.app - I Was Made For Lovin_ You - KISS.mp3", artist: "KISS" },
  { name: "Iron Man", file: "songs/Soundloaders.app - Iron Man - 2012 - Remaster - Black Sabbath.mp3", artist: "Black Sabbath" },
  { name: "NEW MAGIC WAND", file: "songs/Soundloaders.app - NEW MAGIC WAND - Tyler_ The Creator.mp3", artist: "Tyler, The Creator" },
  { name: "Paranoid", file: "songs/Soundloaders.app - Paranoid - Black Sabbath.mp3", artist: "Black Sabbath" },
  { name: "See You Again", file: "songs/Soundloaders.app - See You Again _feat. Kali Uchis_ - Tyler_ The Creator_ Kali Uchis.mp3", artist: "Tyler, The Creator feat. Kali Uchis" },
  { name: "Smells Like Teen Spirit", file: "songs/Soundloaders.app - Smells Like Teen Spirit - Nirvana.mp3", artist: "Nirvana" },
  { name: "St. Chroma", file: "songs/Soundloaders.app - St. Chroma _feat. Daniel Caesar_ - Tyler_ The Creator_ Daniel Caesar.mp3", artist: "Tyler, The Creator feat. Daniel Caesar" }
];

let currentSong = 0;
let isPlaying = false;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const cover = document.getElementById('cover');

function loadSong(index) {
  if (index < 0 || index >= songs.length) return;
  
  currentSong = index;
  audio.src = songs[index].file;
  
  // Update UI
  updatePlaylistUI();
  updateSongInfo();
  
  // Try to play, but handle errors gracefully
  audio.play().then(() => {
    isPlaying = true;
    playBtn.textContent = "⏸ Pause";
  }).catch(error => {
    console.log('Could not play audio:', error);
    isPlaying = false;
    playBtn.textContent = "▶️ Play";
  });
}

function updateSongInfo() {
  // Update any song info display if needed
  const songTitle = document.querySelector('.song-title');
  const songArtist = document.querySelector('.song-artist');
  
  if (songTitle) songTitle.textContent = songs[currentSong].name;
  if (songArtist) songArtist.textContent = songs[currentSong].artist;
}

function togglePlay() {
  if (audio.paused) {
    audio.play().then(() => {
      isPlaying = true;
      playBtn.textContent = "⏸ Pause";
    }).catch(error => {
      console.log('Could not play audio:', error);
    });
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶️ Play";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

// Add function to update playlist UI highlighting
function updatePlaylistUI() {
  const playlistItems = playlist.querySelectorAll('li');
  playlistItems.forEach((item, index) => {
    if (index === currentSong) {
      item.classList.add('current-song');
    } else {
      item.classList.remove('current-song');
    }
  });
}

// Audio event listeners
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

audio.addEventListener('ended', () => {
  // Auto-play next song when current song ends
  nextSong();
});

audio.addEventListener('loadstart', () => {
  // Show loading state
  playBtn.textContent = "⏳ Loading...";
});

audio.addEventListener('canplay', () => {
  // Ready to play
  if (isPlaying) {
    playBtn.textContent = "⏸ Pause";
  } else {
    playBtn.textContent = "▶️ Play";
  }
});

// Control event listeners
progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Keyboard controls
document.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'Space':
      e.preventDefault();
      togglePlay();
      break;
    case 'ArrowRight':
      nextSong();
      break;
    case 'ArrowLeft':
      prevSong();
      break;
  }
});

// Initialize playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.name} - ${song.artist}`;
  li.onclick = () => loadSong(index);
  playlist.appendChild(li);
});

// Initialize the player
loadSong(currentSong);
