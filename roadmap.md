1. TODO for first release

- test on mobile browser
= capture video for thumbnail
- create production deployment
= server sends messages on peer Info updates.
- style a little
= create chat interface : started
    = delegate events from viewer to broadcaster to all other viewers
    = broadcaster saves a copy of all messages so that a new viewers see them upon connecting

= create Abstraction for `peer` object  in BroadcastApp
    PeerHandler is the abstaction class; it needs the following methods
        - manage all connections. Allow doing things like broadcast message to all connections
        - either expose the actual peer object or create wrapper methods (I think expose it)

= refactor ViewApp.getBroadcastList to use server info
 = make Broadcast send Broadcast.metaData to server


2. refactoring

- create MVVM-like persistence class(s)
    class Model<T>
        private modelView: ModelView
        private collection: Collection<T>
        ...
        add(T) {
            this.addToPrivateCollection(T)
            this.modelView.add(T)

        }

