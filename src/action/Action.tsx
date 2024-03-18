import TodoComponent from "../models/todoItem";

export const TODO_ACTIONS = {
  SET_TODO: "SET_TODO",
  SET_SEARCH: "SET_SEARCH",
  SET_SORT_BY: "SET_SORT_BY",
  SET_SORT_ORDER:"SET_SORT_ORDER",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES"
};

export const setTodoAction = (payload: TodoComponent[]) => ({
  type: TODO_ACTIONS.SET_TODO,
  payload: payload,
});

export const setSearchAction = (text: string) => ({
  type: TODO_ACTIONS.SET_SEARCH,
  payload: text,
});

export const setSortByAction = (criteria: string) => ({
  type: TODO_ACTIONS.SET_SORT_BY,
  payload: criteria,
});

export const setSortOrderAction = (order: string) => ({
  type: TODO_ACTIONS.SET_SORT_ORDER,
  payload: order,
});

export const setTotalPagesAction = (totalPages: number) => ({
  type: TODO_ACTIONS.SET_TOTAL_PAGES,
  payload: totalPages,
});
