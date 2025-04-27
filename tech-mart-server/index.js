require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require('cors');
const app = express();
const SSLCommerzPayment = require('sslcommerz-lts')
const port = process.env.PORT || 5000;

//ssl credencial collect from email
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox

//midleware 
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.w0iow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
    const orderCollection = client.db("productDB").collection("order");

    app.post('/product', async (req, res) => {
      const prodcut = req.body;
      const result = await dataCollection.insertOne(prodcut);
      res.send(result);
    })

    //order
    app.post('/order', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    })

    app.get('/product', async (req, res) => {
      const cursor = dataCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await dataCollection.findOne(query);
      res.send(result);
    })

    //order 
    app.get('/order', async (req, res) => {
      const cursor = orderCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const result = await dataCollection.deleteOne(quary);
      res.send(result);
    })

    // delete order
    app.delete('/order/:id', async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(quary);
      res.send(result);
    })

    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const result = await dataCollection.findOne(quary);
      res.send(result);
    })

    app.patch('/product/:id', async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const { photo, product, category, price } = data;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          photo: photo,
          product: product,
          category: category,
          price: price
        }
      };
      const result = await dataCollection.updateOne(query, update)
      res.send(result);
    })

    //SSLCOMMERZ Payment Gateway
    app.post("/ssl-order", async (req, res) => {
      const query = { _id: new ObjectId(req.body.productId) }
      const product = await dataCollection.findOne(query);
      const order = req.body;
      const tran_id = new ObjectId().toString();

      const data = {
        total_amount: product?.price,
        currency: order?.currency,
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:5000/payment/success/${tran_id}`,
        fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: order?.product_name,
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: order?.name,
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
      sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({ url: GatewayPageURL })
        
        const finalOrder = {
          product, 
          paidStatus:false, 
          tranjectionId: tran_id,
        };
        const result = orderCollection.insertOne(finalOrder);
      });

      app.post('/payment/success/:tranId', async (req, res) => {
        const result = await orderCollection.updateOne({tranjectionId: req.params.tranId}, {
          $set: {
            paidStatus: true,
          }
        });
        if(result.modifiedCount > 0){
          res.redirect(`http://localhost:5173/payment/success/${req.params.tranId}`)
        }
      });

      app.post('/payment/fail/:tranId', async(req, res) => {
        const result = await orderCollection.deleteOne({tranjectionId: req.params.tranId})
        if(result.deletedCount){
          res.redirect(`http://localhost:5173/payment/fail/${req.params.tranId}`)
        }
      })

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

