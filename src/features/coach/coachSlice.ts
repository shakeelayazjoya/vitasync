import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockCoachMessages } from "@/utils/mockData";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: string;
}

interface CoachState {
  messages: Message[];
  isTyping: boolean;
  messagesUsed: number;
  dailyLimit: number;
}

const initialState: CoachState = {
  messages: mockCoachMessages,
  isTyping: false,
  messagesUsed: 2,
  dailyLimit: 3,
};

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    incrementUsage: (state) => {
      state.messagesUsed += 1;
    },
  },
});

export const { addMessage, setTyping, incrementUsage } = coachSlice.actions;
export default coachSlice.reducer;
