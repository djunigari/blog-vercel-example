import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ""
const dbName = process.env.MONGODB_DB
const options = {}

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

let cachedDb:any = null

export async function connectToDatabase() {
  if (cachedDb) {
    return { db: cachedDb, isConnected: true }
  }
  
  let isConnected;
  let clientPromise
  let db

  const client = new MongoClient(uri, options)
  try {
    clientPromise  = await client.connect()
    db = await client.db(dbName)
    isConnected = true
  }catch(err){
    console.log(err)
    isConnected = false
  }
  cachedDb = db

  return { db, isConnected }
}