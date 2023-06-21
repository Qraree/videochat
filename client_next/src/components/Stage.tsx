"use client"
import React from 'react';
import {
    GridLayout,
    ParticipantName,
    TrackContext,
    TrackMutedIndicator,
    useTracks,
    VideoTrack
} from "@livekit/components-react";
import {Track} from "livekit-client";
import {isTrackReference} from "@livekit/components-core";

const Stage = () => {
    const tracks = useTracks([
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
    ]);

    return (
        <div>
            <GridLayout tracks={tracks} >
                <TrackContext.Consumer>
                    {(track) =>
                        track && (
                            <div className="w-1/6 h-1/6">
                                {/*{isTrackReference(track) ? <VideoTrack {...track} /> : <p>Camera placeholder</p>}*/}
                                <VideoTrack {...track}/>
                                <div>
                                    <div style={{ display: 'flex' }}>
                                        <TrackMutedIndicator source={Track.Source.Microphone}></TrackMutedIndicator>
                                        <TrackMutedIndicator source={track.source}></TrackMutedIndicator>
                                    </div>
                                    <ParticipantName />
                                </div>
                            </div>
                        )
                    }
                </TrackContext.Consumer>
            </GridLayout>

        </div>
    );
};

export default Stage;
