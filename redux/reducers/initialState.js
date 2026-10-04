import { playbackModeTypes } from '../constants/actions';
import { FEATURE_SC_EXPORT } from '../../helpers/constants';

const initialState = {
  mode: playbackModeTypes.LEFT,
  reviewState: {
    actionCounter: 0,
    done: false,
  },
  settings: {
    offlineMode: true,
  },
  featureDiscovery: {
    [FEATURE_SC_EXPORT]: true,
  },
  notifications: {
    list: [],
  },
  songPickers: [{
    side: playbackModeTypes.LEFT,
    searchTerms: '',
    isLoading: false,
    recentQueryList: [],
  },
  {
    side: playbackModeTypes.RIGHT,
    searchTerms: '',
    isLoading: false,
    recentQueryList: [],
  }],
  uploaderProfile: [{
    side: playbackModeTypes.LEFT,
    lastUploaderUrl: null,
  },
  {
    side: playbackModeTypes.RIGHT,
    lastUploaderUrl: null,
  }],
  players: [{
    side: playbackModeTypes.LEFT,
    pan: 0,
    muted: 0,
    inverted: false,
    expanded: false,
  }],
  playlist: [{
    filterTracks: '', // deprecated
    currentPlaylistId: `playbackQueue_${playbackModeTypes.LEFT}`,
    side: playbackModeTypes.LEFT,
  }],
  playlistStore: [
    // saved user playlist
    {
      id: `default_${playbackModeTypes.LEFT}`,
      currentTrackIndex: 0,
      tracks: [],
    },
    // current queue playlist
    {
      id: `playbackQueue_${playbackModeTypes.LEFT}`,
      currentTrackIndex: 0,
      tracks: [],
    },
  ],
};
export default initialState;
