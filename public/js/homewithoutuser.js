// Add this function to your existing script section
async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) return;

    try {
        const response = await fetch(`/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        if (data.artists?.items?.length) {
            displaySearchResults(data.artists.items);
        } else {
            searchResults.innerHTML = `
      <div class="text-center text-gray-400 py-8">
        No results found for "${searchTerm}"
      </div>
    `;
        }
    } catch (error) {
        console.error('Search error:', error);
        searchResults.innerHTML = `
    <div class="text-center text-red-500 py-8">
      An error occurred while searching. Please try again.
    </div>
  `;
    }
}

function displaySearchResults(artists) {
    const searchResults = document.getElementById('searchResults');

    const resultsHTML = artists.map(item => {
        const artist = item.data;
        const avatarUrl = artist.visuals?.avatarImage?.sources?.[0]?.url || '/api/placeholder/640/640';

        return `
    <div class="group bg-gradient-to-r from-black/80 to-black/60 p-6 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div class="flex items-center space-x-6 relative">
        <div class="relative">
          <div class="w-16 h-16 rounded-xl bg-green-500/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            <img src="${avatarUrl}" alt="${artist.profile.name} avatar" class="w-full h-full object-cover">
          </div>
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors duration-300">
            ${artist.profile.name}
          </h3>
          <div class="flex items-center space-x-3">
            <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">Artist</span>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-700/50">
        <div class="flex items-center justify-between">
          <button onclick="window.location.href='${artist.uri}'" 
                  class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm">
            View Profile
          </button>
          <button onclick="showLoginPrompt()" class="p-3 rounded-full hover:bg-green-500/10 transition-all duration-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 group-hover:text-green-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
    }).join('');

    searchResults.innerHTML = `
  <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    ${resultsHTML}
  </div>
`;
}

// Sample tracks data
const tracks = [{
    id: 0,
    playing: false
},
{
    id: 1,
    playing: false
},
{
    id: 2,
    playing: false
}
];

function togglePlay(trackId) {
    tracks.forEach((track, index) => {
        if (index === trackId) {
            track.playing = !track.playing;
            updatePlayButton(trackId);
        } else {
            track.playing = false;
            updatePlayButton(index);
        }
    });
}

function updatePlayButton(trackId) {
    const button = document.querySelectorAll('.play-btn')[trackId];
    const icon = button.querySelector('.play-icon');

    if (tracks[trackId].playing) {
        icon.innerHTML = `
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              `;
    } else {
        icon.innerHTML = `
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              `;
    }
}

function showLoginPrompt() {
    const modal = document.getElementById('loginPrompt');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeLoginPrompt() {
    const modal = document.getElementById('loginPrompt');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Add enter key event listener
document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});


document.querySelector('button[onclick="handleSearch()"]').addEventListener('click', handleSearch);