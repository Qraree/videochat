"use client"
import React from 'react';
import {
    GridLayout,
    ParticipantName,
    TrackContext,
    TrackMutedIndicator, useParticipants,
    useTracks,
    VideoTrack
} from "@livekit/components-react";
import {Track} from "livekit-client";
import {isTrackReference} from "@livekit/components-core";
import classNames from "classnames";

const Stage = () => {
    const tracks = useTracks([
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
    ]);

    const participants = useParticipants();

    return (
        <div className="h-full flex justify-center items-center">
            <GridLayout
                tracks={tracks}
                // className="grid grid-cols-2 grid-rows-2 p-3"
                className={classNames({
                    "flex justify-center items-center p-3": participants.length === 1,
                    "flex justify-around items-center p-3": participants.length === 2,
                    "grid grid-cols-2 grid-rows-2 p-2": participants.length === 4 || participants.length === 3,
                })}
            >
                <TrackContext.Consumer>
                    {(track) =>
                        track && (
                            <div
                                className="w-5/6 h-5/6"
                            >
                                {/*{isTrackReference(track) ? <VideoTrack {...track} /> : <p>Camera placeholder</p>}*/}
                                <VideoTrack {...track}/>
                                <div className="flex w-full justify-between p-2">
                                    <ParticipantName className="text-xl"/>
                                    <div className="flex w-2/12 justify-between">
                                        <TrackMutedIndicator source={Track.Source.Microphone}></TrackMutedIndicator>
                                        <TrackMutedIndicator source={track.source}></TrackMutedIndicator>
                                    </div>
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
