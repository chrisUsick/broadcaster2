navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

class Broadcast {
    video:Element
    parent:Element
    stream:MediaStream
    constructor(parent:Element){
        this.parent = parent
        this.video = document.createElement("video")
        this.parent.appendChild(this.video)
        this.getMedia(() => {
            this.video.setAttribute('src', URL.createObjectURL(this.stream))
        })
        
        
    }
    getMedia(callback:()=>void){
        navigator.getUserMedia({ audio: true, video: true }, 
        (stream:MediaStream) => {
            this.stream = stream
            //console.log("get userMedia success callback");
            //console.log(URL.createObjectURL(stream))
            callback()
        },
        (err) => {console.log(err)}
        )
    }
} 
export = Broadcast