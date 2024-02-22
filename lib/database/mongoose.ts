import mongoose, {Mongoose} from "mongoose";

// setup MongoDB
// const MongoDB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/image_editor";
const MongoDB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null,
  promise: Promise<Mongoose> | null,
}

/* In Express App, you might have seen that 
we directy connect to MongoDB within the application Only Once.
But in Next.js, it's the other way around we have to call it
on each and every Server-Action or API-Request that we do.

In Next.js, unlike in traditional server-based applications like those
using Express and Mongodb you connect to the database on every request | 
server action because Next.js runs in a Serverless-Environment.

Serverless-Functions are stateless meaning that they start up to 
handle a request and shut down right after without maintaining a 
continuous connection to databases. This approach ensures that
each request is handled independently. Allowing for better scalability 
and reliability. As there's no need to manage persistent connections
across many instances which works well with scalable and flexible nature of
Next.js applications.

But doing that without any optimization would mean too many Mongodb connections 
open for each and every action will perform on the Server-Side. 
To optimize our process will resort to caching our connections
*/ 

// To properly Implement caching
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  }
}

/* Every time that we try to connect to our database.
First we'll check if we already have a cached connection.
And if we do have it, we'll exit out immediately therefore
optimizing our application. If not we'll try to make a new connection to mongodb 

Server-Full VS Serverless */ 
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn; // optimization making

  if (!MongoDB_URL) throw new Error('Please add your Mongo URI');

  cached.promise = cached.promise || mongoose.connect(MongoDB_URL, {
    dbName: 'Imaginify_App', bufferCommands: false
  });

  cached.conn = await cached.promise;
  return cached.conn;
}