/**
 * UI Context — global UI state for panels, theme, and modal management.
 */

import { createContext, useContext, useReducer } from 'react';
import { PANEL_DEFAULT_WIDTH, OUTPUT_PANEL_DEFAULT_HEIGHT } from '../constants/workflowConstants';

const UIContext = createContext(null);

const initialState = {
  sidebarOpen: true,
  sidebarWidth: PANEL_DEFAULT_WIDTH,
  propertiesPanelOpen: false,
  propertiesPanelWidth: PANEL_DEFAULT_WIDTH,
  outputPanelOpen: false,
  outputPanelHeight: OUTPUT_PANEL_DEFAULT_HEIGHT,
  activeOutputTab: 'logs',
  modalOpen: null,
  toasts: [],
};

function uiReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_SIDEBAR_WIDTH':
      return { ...state, sidebarWidth: action.payload };

    case 'TOGGLE_PROPERTIES':
      return { ...state, propertiesPanelOpen: !state.propertiesPanelOpen };

    case 'OPEN_PROPERTIES':
      return { ...state, propertiesPanelOpen: true };

    case 'CLOSE_PROPERTIES':
      return { ...state, propertiesPanelOpen: false };

    case 'SET_PROPERTIES_WIDTH':
      return { ...state, propertiesPanelWidth: action.payload };

    case 'TOGGLE_OUTPUT':
      return { ...state, outputPanelOpen: !state.outputPanelOpen };

    case 'SET_OUTPUT_HEIGHT':
      return { ...state, outputPanelHeight: action.payload };

    case 'SET_OUTPUT_TAB':
      return { ...state, activeOutputTab: action.payload };

    case 'OPEN_MODAL':
      return { ...state, modalOpen: action.payload };

    case 'CLOSE_MODAL':
      return { ...state, modalOpen: null };

    case 'ADD_TOAST': {
      const toast = {
        id: `toast_${Date.now()}`,
        ...action.payload,
      };
      return { ...state, toasts: [...state.toasts, toast] };
    }

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function UIProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UIContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
}

export default UIContext;
