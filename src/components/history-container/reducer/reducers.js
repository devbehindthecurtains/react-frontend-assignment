export const HISTORY_TYPES = {
  GET_PROJECTS_PENDING: "GET_PROJECTS_PENDING",
  GET_PROJECTS_COMPLETED: "GET_PROJECTS_COMPLETED",
  GET_PROJECTS_ERROR: "GET_PROJECTS_ERROR",
  GET_USERS_PENDING: "GET_USERS_PENDING",
  GET_USERS_COMPLETED: "GET_USERS_COMPLETED",
  GET_USERS_ERROR: "GET_USERS_ERROR",
  SORT_USERS_BY_DATE: "SORT_USERS_BY_DATE",
  SORT_PROJECTS_BY_DATE: "SORT_PROJECTS_BY_DATE"
};

/**
 * Not sure if I like storing this function here.
 * We could have generic util that would take responsibility
 * for generic sorts etc...
 */
export const sortByDates = (rows, reverseChronological = true) => {
  if (reverseChronological) {
    return rows.sort((rowA, rowB) => {
      const a = new Date(rowA.date);
      const b = new Date(rowB.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  } else {
    return rows.sort((rowA, rowB) => {
      const a = new Date(rowA.date);
      const b = new Date(rowB.date);
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }
};

/**
 * usersReducer and projectReducer are pretty much code duplication.
 * This is rarely a good thing and one could argue this is not a exception.
 * However, it is very, I mean very rare that these two reducers would be
 * duplications for a long in real life project.
 * And after they differ, you easily end up doing if conditions
 * so much that the code is harder and harder to maintain.
 */
export const usersRedcuer = (state, action) => {
  switch (action.type) {
    case HISTORY_TYPES.GET_USERS_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: false
      };
    }
    case HISTORY_TYPES.GET_USERS_COMPLETED: {
      const newState = { ...state };
      const { total, limit, tableRows } = action.payload;
      newState.tableRows = sortByDates(
        [...newState?.tableRows, ...tableRows],
        newState.reverseChronological
      );
      return {
        ...newState,
        isLoading: false,
        error: false,
        total,
        limit
      };
    }
    case HISTORY_TYPES.SORT_USERS_BY_DATE: {
      const newState = { ...state };
      const toggledReverse = !newState.reverseChronological;
      const tableRows = sortByDates(newState.tableRows, toggledReverse);
      return {
        ...state,
        tableRows,
        reverseChronological: toggledReverse
      };
    }
    case HISTORY_TYPES.GET_USERS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true
      };
    }
    default: {
      return state;
    }
  }
};

export const projectsRedcuer = (state, action) => {
  switch (action.type) {
    case HISTORY_TYPES.GET_PROJECTS_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: false
      };
    }
    case HISTORY_TYPES.GET_PROJECTS_COMPLETED: {
      const newState = { ...state };
      const { total, limit, tableRows } = action.payload;
      newState.tableRows = sortByDates(
        [...newState?.tableRows, ...tableRows],
        newState.reverseChronological
      );
      return {
        ...newState,
        isLoading: false,
        error: false,
        total,
        limit
      };
    }
    case HISTORY_TYPES.SORT_PROJECTS_BY_DATE: {
      const newState = { ...state };
      const toggledReverse = !newState.reverseChronological;
      const tableRows = sortByDates(newState.tableRows, toggledReverse);
      return {
        ...state,
        tableRows,
        reverseChronological: toggledReverse
      };
    }
    case HISTORY_TYPES.GET_PROJECTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true
      };
    }
    default: {
      return state;
    }
  }
};
