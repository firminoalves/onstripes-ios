/**
 * @flow
 */
import axios from 'axios';
import PlaylistContainer from './playlistContainer';
import withPlaylistProvider from './withPlaylistProvider';
import config from '../helpers/config';
import SoundCloudApi from '../modules/SoundcloudApi';

const scApi = new SoundCloudApi({ clientId: config.SC_CLIENT_ID });

function transformApiPayload(t) {
  return scApi.resolvePlayableTrackItem({
    id: t.id,
    label: t.displayName,
    username: t.user.title,
    streamUrl: scApi.resolveStreamUrlFromTrackId(t.id),
    artwork: t.image.url,
    scUploaderLink: t.user.url,
    duration: t.duration,
  });
}
export default withPlaylistProvider((props, offset, limit) => {
  console.log('fetch playlist offset', offset, 'limit', limit, 'page', offset / limit);
  return axios({
    url: 'http://onstripes.com/api/music/filternew',
    timeout: 5000,
    method: 'POST',
    data: {
      pagination: {
        page: offset / limit,
        limit,
      },
      sorters: {},
      filters: [
        {
          name: 'type',
          op: 'in',
          value: [
            'soundcloud',
          ],
        },
      ],
    },
  }).then((resp) => {
    console.log('offset', offset, 'limit', limit, 'pls api resp ', resp);
    const payload = resp.data
      .map(transformApiPayload);
    return { tracks: payload };
  }).catch((err) => { 
    console.log('onstripes recent fetch fail', err.toString());
    return Promise.reject(err);
  });
}, { infiniteScroll: true })(PlaylistContainer);
