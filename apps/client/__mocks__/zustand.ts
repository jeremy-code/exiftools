// Taken from zustand doc: https://zustand.docs.pmnd.rs/guides/testing#jest
import { act } from "react";

import { afterEach, vi } from "vitest";
import type { StateCreator, StoreApi, UseBoundStore } from "zustand";

const {
  create: actualCreate,
  createStore: actualCreateStore,
  useStore,
} = await vi.importActual<typeof import("zustand")>("zustand");

const STORE_RESET_FUNCTIONS = new Set<() => void>();

const createUncurried = <T>(stateCreator: StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getInitialState();
  STORE_RESET_FUNCTIONS.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

const create = <T>(stateCreator: StateCreator<T>) => {
  return typeof stateCreator === "function" ?
      createUncurried(stateCreator)
    : (createUncurried as UseBoundStore<StoreApi<T>>);
};

const createStoreUncurried = <T>(stateCreator: StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getInitialState();
  STORE_RESET_FUNCTIONS.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

const createStore = <T>(stateCreator: StateCreator<T>) => {
  return typeof stateCreator === "function" ?
      createStoreUncurried(stateCreator)
    : (createStoreUncurried as UseBoundStore<StoreApi<T>>);
};

afterEach(() => {
  act(() => {
    STORE_RESET_FUNCTIONS.forEach((resetFn) => {
      resetFn();
    });
  });
});

export { useStore, create, createStore };
