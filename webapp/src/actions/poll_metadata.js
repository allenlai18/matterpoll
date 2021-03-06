import {id as pluginId} from 'manifest';
import ActionTypes from 'action_types';

export const websocketHasVoted = (data) => async (dispatch) => {
    return dispatch({
        type: ActionTypes.FETCH_POLL_METADATA,
        data: {
            user_id: data.user_id,
            poll_id: data.poll_id,
            admin_permission: data.admin_permission,
            voted_answers: data.voted_answers,
        },
    });
};

export const fetchPollMetadata = (siteUrl, pollId) => async (dispatch) => {
    if (!pollId) {
        return;
    }

    let url = siteUrl.replace(/\/?$/, '');
    url = `${url}/plugins/${pluginId}/api/v1/polls/${pollId}/metadata`;

    fetch(url).then((r) => r.json()).then((r) => {
        dispatch({
            type: ActionTypes.FETCH_POLL_METADATA,
            data: r,
        });
    });
};
