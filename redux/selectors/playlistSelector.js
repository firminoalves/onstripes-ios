export const getCurrentPlaylistBySide = (state, side) => {
  const currPlaylist = state.playlist.find(curr => curr.side === side);
  const currPlaylistStore = state.playlistStore
    .find(playlistData => playlistData.id === currPlaylist.currentPlaylistId);
  return currPlaylistStore;
};

export const getCurrentTrackBySide = (state, side) => {
  const playlist = getCurrentPlaylistBySide(state, side);
  return playlist.tracks[playlist.currentTrackIndex];
};

export const getCurrentPlayingTrack = state => getCurrentTrackBySide(state, 'L');

