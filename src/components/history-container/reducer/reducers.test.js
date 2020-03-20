import {
  sortByDates,
  usersRedcuer,
  HISTORY_TYPES,
  projectsRedcuer
} from "./reducers";
import { generateTableData } from "./actions";

const mockApiData = [
  {
    id: "oldest",
    timestamp: 1582230981571, // Feb 20 2020
    diff: [{ field: "name", oldValue: "Nick", newValue: "Michel" }]
  },
  {
    id: "newest",
    timestamp: 1582684581571, // Feb 26 2020
    diff: [{ field: "name", oldValue: "John", newValue: "Bruce" }]
  },
  {
    id: "middle",
    timestamp: 1582490181571, // Feb 23 2020
    diff: [{ field: "name", oldValue: "Bruce", newValue: "Nick" }]
  }
];

const dataRows = generateTableData(mockApiData);

describe("HistoryContainer actions", () => {
  test("sortByDates should sort dates reverse chronological", () => {
    const tableRows = sortByDates(dataRows, true);
    expect(tableRows[0].id).toBe("newest");
    expect(tableRows[1].id).toBe("middle");
    expect(tableRows[2].id).toBe("oldest");
  });
  test("sortByDates should sort dates chronological", () => {
    const tableRows = sortByDates(dataRows, false);
    expect(tableRows[0].id).toBe("oldest");
    expect(tableRows[1].id).toBe("middle");
    expect(tableRows[2].id).toBe("newest");
  });
});

const INITIAL_STATE_STATE = {
  isLoading: false,
  error: false,
  total: null,
  limit: 3,
  tableRows: [],
  reverseChronological: true
};

const userPending = { type: HISTORY_TYPES.GET_USERS_PENDING };
const userCompleted = {
  type: HISTORY_TYPES.GET_USERS_COMPLETED,
  payload: { total: 10, tableRows: dataRows, limit: 2 }
};

const projectsPending = { type: HISTORY_TYPES.GET_PROJECTS_PENDING };
const projectsCompleted = {
  type: HISTORY_TYPES.GET_PROJECTS_COMPLETED,
  payload: { total: 10, tableRows: dataRows, limit: 2 }
};

describe("user reducers", () => {
  test("GET_USERS_PENDING should update state correctly", () => {
    const state = usersRedcuer(INITIAL_STATE_STATE, { type: "default" });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(false);

    const updatedState = usersRedcuer(state, userPending);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBe(false);
  });
  test("GET_USERS_COMPLETED should update state correctly", () => {
    const state = usersRedcuer(INITIAL_STATE_STATE, { type: "default" });

    const updatedState = usersRedcuer(state, userPending);

    expect(updatedState.isLoading).toBe(true);

    const afterCompleted = usersRedcuer(updatedState, userCompleted);

    expect(afterCompleted.isLoading).toBe(false);
    expect(afterCompleted.limit).toBe(2);
    expect(afterCompleted.total).toBe(10);
    expect(afterCompleted.tableRows.length).toBe(3);

    expect(afterCompleted.tableRows[0].id).toBe("newest");
    expect(afterCompleted.tableRows[1].id).toBe("middle");
    expect(afterCompleted.tableRows[2].id).toBe("oldest");
  });
  test("GET_USERS_ERROR should update state correctly", () => {
    const state = usersRedcuer(INITIAL_STATE_STATE, { type: "default" });

    expect(state.error).toBe(false);

    const error = { type: HISTORY_TYPES.GET_USERS_ERROR };
    const updatedState = usersRedcuer(state, error);
    expect(updatedState.error).toBe(true);
    expect(updatedState.isLoading).toBe(false);
  });
  test("SORT_USERS_BY_DATE should toggle sorting", () => {
    const state = usersRedcuer(INITIAL_STATE_STATE, { type: "default" });
    const completedState = usersRedcuer(state, userCompleted);

    expect(completedState.reverseChronological).toBe(true);

    expect(completedState.tableRows[0].id).toBe("newest");
    expect(completedState.tableRows[1].id).toBe("middle");
    expect(completedState.tableRows[2].id).toBe("oldest");

    const toggleState = usersRedcuer(completedState, {
      type: HISTORY_TYPES.SORT_USERS_BY_DATE
    });

    expect(toggleState.reverseChronological).toBe(false);

    expect(toggleState.tableRows[0].id).toBe("oldest");
    expect(toggleState.tableRows[1].id).toBe("middle");
    expect(toggleState.tableRows[2].id).toBe("newest");

    const toggleAgainState = usersRedcuer(toggleState, {
      type: HISTORY_TYPES.SORT_USERS_BY_DATE
    });

    expect(toggleAgainState.reverseChronological).toBe(true);

    expect(toggleAgainState.tableRows[0].id).toBe("newest");
    expect(toggleAgainState.tableRows[1].id).toBe("middle");
    expect(toggleAgainState.tableRows[2].id).toBe("oldest");
  });
});

describe("Projects reducers", () => {
  test("GET_PROJECTS_PENDING should update state correctly", () => {
    const state = projectsRedcuer(INITIAL_STATE_STATE, { type: "default" });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(false);

    const updatedState = projectsRedcuer(state, projectsPending);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBe(false);
  });
  test("GET_PROJECTS_COMPLETED should update state correctly", () => {
    const state = projectsRedcuer(INITIAL_STATE_STATE, { type: "default" });

    const updatedState = projectsRedcuer(state, projectsPending);

    expect(updatedState.isLoading).toBe(true);

    const afterCompleted = projectsRedcuer(updatedState, projectsCompleted);

    expect(afterCompleted.isLoading).toBe(false);
    expect(afterCompleted.limit).toBe(2);
    expect(afterCompleted.total).toBe(10);
    expect(afterCompleted.tableRows.length).toBe(3);

    expect(afterCompleted.tableRows[0].id).toBe("newest");
    expect(afterCompleted.tableRows[1].id).toBe("middle");
    expect(afterCompleted.tableRows[2].id).toBe("oldest");
  });
  test("GET_PROJECTS_ERROR should update state correctly", () => {
    const state = projectsRedcuer(INITIAL_STATE_STATE, { type: "default" });

    expect(state.error).toBe(false);

    const error = { type: HISTORY_TYPES.GET_PROJECTS_ERROR };
    const updatedState = projectsRedcuer(state, error);
    expect(updatedState.error).toBe(true);
    expect(updatedState.isLoading).toBe(false);
  });
  test("SORT_PROJECTS_BY_DATE should toggle sorting", () => {
    const state = projectsRedcuer(INITIAL_STATE_STATE, { type: "default" });
    const completedState = projectsRedcuer(state, projectsCompleted);

    expect(completedState.tableRows[0].id).toBe("newest");
    expect(completedState.tableRows[1].id).toBe("middle");
    expect(completedState.tableRows[2].id).toBe("oldest");

    expect(completedState.reverseChronological).toBe(true);

    const toggleState = projectsRedcuer(completedState, {
      type: HISTORY_TYPES.SORT_PROJECTS_BY_DATE
    });

    expect(toggleState.reverseChronological).toBe(false);

    expect(toggleState.tableRows[0].id).toBe("oldest");
    expect(toggleState.tableRows[1].id).toBe("middle");
    expect(toggleState.tableRows[2].id).toBe("newest");

    const toggleAgainState = projectsRedcuer(toggleState, {
      type: HISTORY_TYPES.SORT_PROJECTS_BY_DATE
    });

    expect(toggleAgainState.reverseChronological).toBe(true);

    expect(toggleAgainState.tableRows[0].id).toBe("newest");
    expect(toggleAgainState.tableRows[1].id).toBe("middle");
    expect(toggleAgainState.tableRows[2].id).toBe("oldest");
  });
});
