// https://developer.mozilla.org/en-US/docs/WebRTC/MediaStream_API
// this is an empty interface for the MediaStream class from mozilla dev
interface MediaStream {

}

interface Navigator {
    getUserMedia(
        options: { video?: boolean; audio?: boolean; }, 
        success: (stream: MediaStream) => void, 
        error: (error: string) => void
        ) : void;
    webkitGetUserMedia(
        options: { video?: boolean; audio?: boolean; }, 
        success: (stream: MediaStream) => void, 
        error: (error: string) => void
        ) : void;
    mozGetUserMedia(
        options: { video?: boolean; audio?: boolean; }, 
        success: (stream: MediaStream) => void, 
        error: (error: string) => void
        ) : void;
} 