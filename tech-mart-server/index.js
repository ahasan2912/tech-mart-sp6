require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//midleware 
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.jqnby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("productDB");
    const dataCollection = database.collection("product");

    app.post('/product', async (req, res) => {
      const prodcut = req.body;
      const result = await dataCollection.insertOne(prodcut);
      res.send(result);
    })

    app.get('/product', async (req, res) => {
      const cursor = dataCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const result = await dataCollection.deleteOne(quary);
      res.send(result);
    })

    app.get('/product/:id', async(req, res) => {
      const id = req.params.id;
      const quary = {_id: new ObjectId(id)};
      const result = await dataCollection.findOne(quary);
      res.send(result);
    })

    app.patch('/product/:id', async(req, res) => {
      const id = req.params.id;
      const data = req.body;
      const {photo, product, category, price} = data;
      const query = {_id: new ObjectId(id)};
      const update = {
        $set:{
          photo: photo,
          product: product,
          category: category,
          price: price
        }
      };
      const result = await dataCollection.updateOne(query, update)
      res.send(result);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
  res.send(`Server running`);
})

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
})
