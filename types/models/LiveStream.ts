import type {XmltvProgramme} from "@iptv/xmltv";

export interface LiveStream {
    _id: string;
    num: number;
    name: string;
    stream_id: number;
    stream_icon: string;
    stream_type: string;
    epg_channel_id: string;
    category: {
        _id: string;
        category_id: string;
        category_name: string;
    } | number;
    internal_name?: string;
    epg?: XmltvProgramme[];
    epg_now?: XmltvProgramme;
    liked?: boolean;
};