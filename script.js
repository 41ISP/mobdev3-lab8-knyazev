const statsContainer = document.querySelector(".stats")
const trackContainer = document.querySelector(".tracks-list")
async function trackData() {
    const data = await fetch("https://kitek.ktkv.dev/songs.json")
    const json = await data.json()
    let totalDuration = 0
    let totalTracks = 0
    json.forEach((item, index) => {
        const div = document.createElement("li")
        div.className = "track-item"
        totalDuration += item.track.duration_ms
        totalTracks += 1
        const sec = (Math.floor(item.track.duration_ms / 1000 % 60)).toString().padStart(2, "0")
        const min = Math.floor(item.track.duration_ms / 1000 / 60 % 60)
        div.innerHTML = `
    <div class="track-number">${index + 1}</div>
    <div class="track-main">
        <img
            src="${item.track.album.images[0].url}"
            alt="${item.track.album.name}"
            class="album-art"
            loading="lazy"
        />
        <div class="track-info">
            <div class="track-name">${item.track.name}</div>
            <div class="track-artists">${item.track.album.artists.map((artistname) => artistname.name)}</div>
            <div class="track-album">${item.track.album.name}</div>
        </div>
    </div>
    <div class="track-meta">  
    <div class="duration">${min + ":" + sec}</div>
    <div class="popularity">♪${item.track.popularity}</div>  
    </div>
    </div>
`
        trackContainer.appendChild(div)
    })
    const min = Math.floor(totalDuration / 1000 / 60 % 60).toString().padStart(2, "0")
    const hours = Math.floor(totalDuration / (1000 * 60 * 60) % 24)
    statsContainer.innerHTML = `
    <div class = total-tracks>Всего треков: ${totalTracks}</div>
    <div class = total-duration>Общая длительность: ${hours + " ч " + min + " мин"}</div>
`

}
trackData();