"use client";

export interface Track {
    id: string;
    title: string | null;
    createdAt: Date;
    instrumental: boolean;
    prompt: string | null;
    lyrics: string | null;
    describedLyrics: string | null;
    fullDescribedSong: string | null;
    thumbnailUrl: string | null;
    playUrl: string | null;
    status: string | null;
    createdByUserName: string | null;
    published: boolean;
}

export function TrackList() {

    return (
        <div className="flex flex-1 flex-col overflow-y-scroll">
            Track List Component
        </div>
    );
}