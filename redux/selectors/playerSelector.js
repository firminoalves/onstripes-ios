export const getPlayer = state => state.players.find(curr => curr.side === 'L');

export const getPlayerExpandedMode = state => getPlayer(state).expanded;
