
// Set up API endpoint
const url = 'https://de1.api.radio-browser.info/json/stations/bycountry/canada';

// Keep track of currently playing audio and current station
let currentAudio = null;
let currentStationIndex = -1;
let stations = [];

// Make an AJAX request to fetch the stations
$.ajax({
  contentType: 'application/json',
  method: 'POST',
  url: url,
  data: {
    countrycode: 'CA'
  },
  success: function (data) {
    stations = data;
    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      const name = station.name;
      const url = station.url;
      const stationElement = createStationElement(name, url);
      $('#radioContainer').append(stationElement);
    }
  }
});

// Function to create station element
function createStationElement(name, url) {
  const element = $(`
    <div class="radioDiv">
        <audio src="${url}"></audio>
    </div>
  `);
  return element;
}

function togglePlayPause() {
  const currentAudioElement = getCurrentAudioElement();
  const playPauseButton = $('#playPauseButton');

  if (currentAudioElement.paused) {
    playStation(currentStationIndex);
    playPauseButton.html('<span class="material-symbols-outlined">pause_circle</span>');
  } else {
    pauseStation();
    playPauseButton.html('<span class="material-symbols-outlined">play_circle</span>');
  }
}


// Function to play a station by index
function playStation(index) {
  if (index < 0 || index >= stations.length) {
    return;
  }
  
  const currentAudioElement = getCurrentAudioElement();
  if (currentAudioElement) {
    currentAudioElement.pause();
    $('#playButton').show();
    $('#pauseButton').hide();
  }
  
  const stationElement = $('.radioDiv').eq(index);
  const audioElement = stationElement.find('audio')[0];  
  
  audioElement.play();
  currentStationIndex = index;
  
  // Update the currently playing station name
  const currentStationName = stations[index].name;
  $('#currentStationName').text(currentStationName);

  // Toggle visibility of play/pause buttons
  stationElement.find('#playButton').hide();
  stationElement.find('#pauseButton').show();
}

// Function to pause the currently playing station
function pauseStation() {
  const currentAudioElement = getCurrentAudioElement();
  if (currentAudioElement) {
    currentAudioElement.pause();
    $('#playButton').show();
    $('#pauseButton').hide();
  }
  
  // Toggle visibility of play/pause buttons
  const stationElement = $('.radioDiv').eq(currentStationIndex);
  stationElement.find('#playButton').show();
  stationElement.find('#pauseButton').hide();
}

// Function to play the previous station
function playPrevious() {
  playStation(currentStationIndex - 1);
}

// Function to play the next station
function playNext() {
  playStation(currentStationIndex + 1);
}

// Function to get the current audio element
function getCurrentAudioElement() {
  const currentStationElement = $('.radioDiv').eq(currentStationIndex);
  if (currentStationElement.length) {
    return currentStationElement.find('audio')[0];
  }
  return null;
}

// END Radio Div
