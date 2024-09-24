import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //retrieve sessions from localStorage
  sessions: JSON.parse(localStorage.getItem("chatSessions")) || {},
  activeSessionId: null, //  current active session
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessageToSession: (state, action) => {
      const { sessionId, message } = action.payload;
      
      if (!state.sessions[sessionId]) {
        state.sessions[sessionId] = [];
      }

      // Push message to the active session
      state.sessions[sessionId].push(message);
      //update session in localStorage
      localStorage.setItem("chatSessions", JSON.stringify(state.sessions));
    },
    setSessions: (state, action) => {
      state.sessions = action.payload;
    },
    setActiveSession: (state, action) => {
      state.activeSessionId = action.payload;
    },
  },
});

export const { addMessageToSession, setSessions, setActiveSession } = chatSlice.actions;
export default chatSlice.reducer;


