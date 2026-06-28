/**
 * Generation Context — manages AI generation state, progress, and results.
 */

import { createContext, useContext, useReducer, useCallback } from 'react';
import { WORKFLOW_STATUS, GENERATION_STEPS } from '../constants/workflowConstants';

const GenerationContext = createContext(null);

const initialState = {
  status: WORKFLOW_STATUS.IDLE,
  prompt: '',
  currentStep: 0,
  totalSteps: GENERATION_STEPS.length,
  error: null,
  result: null,
};

function generationReducer(state, action) {
  switch (action.type) {
    case 'SET_PROMPT':
      return { ...state, prompt: action.payload };

    case 'START_GENERATION':
      return {
        ...state,
        status: WORKFLOW_STATUS.GENERATING,
        prompt: action.payload,
        currentStep: 0,
        error: null,
        result: null,
      };

    case 'ADVANCE_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, GENERATION_STEPS.length - 1),
      };

    case 'GENERATION_SUCCESS':
      return {
        ...state,
        status: WORKFLOW_STATUS.GENERATED,
        result: action.payload,
        currentStep: GENERATION_STEPS.length - 1,
      };

    case 'GENERATION_ERROR':
      return {
        ...state,
        status: WORKFLOW_STATUS.ERROR,
        error: action.payload,
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

export function GenerationProvider({ children }) {
  const [state, dispatch] = useReducer(generationReducer, initialState);

  const startGeneration = useCallback((prompt) => {
    dispatch({ type: 'START_GENERATION', payload: prompt });
  }, []);

  const advanceStep = useCallback(() => {
    dispatch({ type: 'ADVANCE_STEP' });
  }, []);

  const completeGeneration = useCallback((result) => {
    dispatch({ type: 'GENERATION_SUCCESS', payload: result });
  }, []);

  const failGeneration = useCallback((error) => {
    dispatch({ type: 'GENERATION_ERROR', payload: error });
  }, []);

  const resetGeneration = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = {
    ...state,
    dispatch,
    startGeneration,
    advanceStep,
    completeGeneration,
    failGeneration,
    resetGeneration,
    currentStepData: GENERATION_STEPS[state.currentStep] || GENERATION_STEPS[0],
    progress: ((state.currentStep + 1) / GENERATION_STEPS.length) * 100,
  };

  return (
    <GenerationContext.Provider value={value}>
      {children}
    </GenerationContext.Provider>
  );
}

export function useGenerationContext() {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error('useGenerationContext must be used within a GenerationProvider');
  }
  return context;
}

export default GenerationContext;
