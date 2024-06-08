const initialState = {
    data: [],
    loading: true,
    error: null
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'DATA_LOADED':
        return {
          ...state,
          data: payload,
          loading: false
        };
      case 'DATA_ERROR':
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  