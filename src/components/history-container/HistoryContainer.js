import React, { useReducer, useCallback, useEffect } from "react";
import { HistoryTable } from "./history-table/HistoryTable";
import combineReducers from "react-combine-reducers";
import {
  fetchUsersDifference,
  fetchProjectsDifference,
  sortUsersByDate,
  sortProjectsByDate
} from "./reducer/actions";

import { usersRedcuer, projectsRedcuer } from "./reducer/reducers";

const INITIAL_STATE_STATE = {
  isLoading: false,
  error: false,
  total: null,
  limit: 3,
  tableRows: [],
  reverseChronological: true
};

/**
 * it wouldn't be the end of the world if
 * createTableHeader and reachedEnd would be inside
 * the "dummy / presentational" HistoryTable component
 * This might be over engineering / respecting
 * container/presentational pattern too much
 */
export const createTableHeader = (base, total, rows) => {
  if (!base) {
    return "";
  }
  if (total === null || !rows) {
    return base;
  }
  return `${base} (${rows}/${total})`;
};

export const reachedEnd = (total, rows) => {
  if (!total || !rows) {
    return false;
  }
  if (isNaN(Number(total) || isNaN(Number(rows)))) {
    return false;
  }
  return Number(total) === Number(rows);
};

/**
 * I made assumption, that these two tables are connected to each other
 * and user need to see them at the same time.
 * This is why I decide, that HistoryContainer is responsible for
 * fetching both users and projects history.
 * You could argue against, and I probably would agree,
 * depending the relationship between these two.
 * However, for this exercise I think this is sufficient enough solution
 */
export const HistoryContainer = () => {
  const [rootReducerCombined, initialStateCombined] = combineReducers({
    users: [usersRedcuer, INITIAL_STATE_STATE],
    projects: [projectsRedcuer, INITIAL_STATE_STATE]
  });

  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );

  const fetchUsers = useCallback(() => {
    fetchUsersDifference(dispatch);
  }, []);

  const fetchProjects = useCallback(() => {
    fetchProjectsDifference(dispatch);
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, [fetchUsers, fetchProjects]);

  const sortUsers = useCallback(() => {
    sortUsersByDate(dispatch);
  }, []);

  const sortProjects = useCallback(() => {
    sortProjectsByDate(dispatch);
  }, []);

  const { users, projects } = state;

  return (
    <>
      <HistoryTable
        data-testid="history-table-users"
        header={createTableHeader(
          "Users history",
          users.total,
          users.tableRows.length
        )}
        state={state.users}
        loadMore={fetchUsers}
        reachedEnd={reachedEnd(users.total, users.tableRows.length)}
        sortRows={sortUsers}
      />
      <HistoryTable
        data-testid="history-table-projects"
        header={createTableHeader(
          "Projects history",
          projects.total,
          projects.tableRows.length
        )}
        state={state.projects}
        loadMore={fetchProjects}
        reachedEnd={reachedEnd(projects.total, projects.tableRows.length)}
        sortRows={sortProjects}
      />
    </>
  );
};
