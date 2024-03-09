export interface LiveStream {
  _id: string;
  num: number;
  name: string;
  stream_id: number;
  stream_icon: string;
  category: {
    _id: string;
    category_id: string;
    category_name: string;
  } | number;
};