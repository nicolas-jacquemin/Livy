import type { LiveStream } from "./LiveStream";

export interface User {
  _id: string;
  createdAt: string;
  name: string;
  email: string;
  role: string;
  likedLiveStreams: LiveStream[];
}
