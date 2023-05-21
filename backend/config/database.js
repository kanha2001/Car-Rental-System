const mongoose = require("mongoose");
// const kanha = require("../server")

const connectDatabase = () => {
  // main(kanha)
  main();
  async function main(data) {
    await mongoose.connect(process.env.DB_URI).then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
  }
};

module.exports = connectDatabase;

// 'mongodb://127.0.0.1:27017/ecommerce'
// mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true}).then((data)=>{
//     console.log(`Mongodb connected with server: ${data.connection.host}`);
// }).catch((err)=>{
//     console.log(5)
// })

//************************************************************************************** */
// mongodb://127.0.0.1:27017/carrent"
// "mongodb+srv://mekanhamaharana:Kanha@12345@cluster0.3nymj2q.mongodb.net/carrent?retryWrites=true&w=majority"
