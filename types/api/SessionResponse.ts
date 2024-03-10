import type { LiveStream } from "../models/LiveStream";

export interface SessionResponse {
  liveStream: LiveStream;
  users: {
    _id: string;
    name: string;
  }[];
};