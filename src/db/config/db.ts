import {MongoClient} from 'mongodb'


const uri = process.env.MONGO_URL as string

export const connectToDatabase = async () => {
    const client = await MongoClient.connect(uri)
    return client.db('HalloButterDB')
}

