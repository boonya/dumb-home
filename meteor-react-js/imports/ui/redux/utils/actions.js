export function createErrorAction(action) {
  return (error) => {
    if (error === null || typeof error !== 'object') {
      return {
        type: action,
        error: new Error('Invalid error instance passed'),
      };
    }
    return {
      type: action,
      error,
    };
  };
}

export function createSuccessAction(action) {
  return (payload) => ({
    type: action,
    payload,
  });
}
