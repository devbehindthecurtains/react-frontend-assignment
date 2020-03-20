import api from "../../../lib/api";
import { formatter } from "./../../../utils/formatter";
import { HISTORY_TYPES } from "./reducers";

/**
 * I don't like this a one bit. I would love to have discussion with backend developers
 * about the response data, so that we would not need to do this row.diff[0] thing at all
 * If the API is generic and needs to serve many clients, then I would
 * have discussion with my frontend team, if we like to do some kind of proxy to handle these situations
 *
 * Of course, it is possible that I didn't understood the reason why diff was array in the first place.
 * If that is the case, I'm sorry.
 */
export const generateTableData = rows => {
  return (rows || []).map(row => {
    const diff = (row?.diff || [])[0];
    return {
      date: formatter.toLocalizedDate(row?.timestamp),
      id: row?.id,
      oldValue: diff?.oldValue,
      newValue: diff?.newValue
    };
  });
};

export const fetchUsersDifference = async dispatch => {
  try {
    dispatch({
      type: HISTORY_TYPES.GET_USERS_PENDING
    });

    const response = await api.getUsersDiff();

    dispatch({
      type: HISTORY_TYPES.GET_USERS_COMPLETED,
      payload: {
        ...response,
        tableRows: generateTableData(response?.data)
      }
    });

    return response;
  } catch (error) {
    dispatch({
      type: HISTORY_TYPES.GET_USERS_ERROR
    });
    return Promise.reject(error);
  }
};

export const sortUsersByDate = dispatch => {
  dispatch({
    type: HISTORY_TYPES.SORT_USERS_BY_DATE
  });
};

export const sortProjectsByDate = dispatch => {
  dispatch({
    type: HISTORY_TYPES.SORT_PROJECTS_BY_DATE
  });
};

export const fetchProjectsDifference = async dispatch => {
  try {
    dispatch({
      type: HISTORY_TYPES.GET_PROJECTS_PENDING
    });

    const response = await api.getProjectsDiff();

    dispatch({
      type: HISTORY_TYPES.GET_PROJECTS_COMPLETED,
      payload: {
        ...response,
        tableRows: generateTableData(response?.data)
      }
    });

    return response;
  } catch (error) {
    dispatch({
      type: HISTORY_TYPES.GET_PROJECTS_ERROR
    });

    return Promise.reject(error);
  }
};
