import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not found, or it's not working!");
}

let cached = global.mongoose;
// global is a Node.js object that holds global variables.
// This allows for caching the database connection across multiple requests.

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}
/**
If cached doesn't exist yet, it initializes it as an object with two
properties: conn (to store the connection) and promise (to store the connection promise).
This prevents multiple connections from being opened unnecessarily.
*/


async function dbConnect() {
    if (cached.conn) {
        // The function checks if there is an existing connection (cached.conn).
        // If it exists, it returns that connection immediately, avoiding the need to connect again.
        return cached.conn;
    }

    if (!cached.promise) {
        // If there isn’t a cached connection, the function checks if a connection promise already exists.
        const opts = {
            bufferCommands: false,
            /*
            This creates an options object to configure the connection.
            The bufferCommands: false option tells Mongoose not to buffer commands when the connection is not yet established.
            */
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            /*
            If there's no existing connection promise, it attempts to connect to MongoDB
            using the connection string and options. Once the connection is established,
            the promise resolves, and the connected mongoose instance is stored in cached.promise.
            */
            console.log("db connected!");
            return mongoose;
        });
    }
        
    try {
        cached.conn = await cached.promise;
        // After the connection promise resolves, it assigns the connection to cached.conn, caching it for future use.
    } catch (e) {
        cached.promise = null;
        throw e
    }

    // Finally, the function returns the cached connection.
    return cached.conn;

}

export default dbConnect;
