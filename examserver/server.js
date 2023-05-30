const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 8080;
const MongooseConnect =
  "mongodb+srv://AytacRzayeva:Aytac123@cluster0.xz3ku7i.mongodb.net/";
const mongoose = require("mongoose");
app.use(express.json());

const furnishSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  color:{
    type:String,
    required:true
  }
});

const Furnish = mongoose.model("Furnish", furnishSchema);

app.post("/furnish", async (req, res) => {
  const newFurnish = new Furnish({
    ...req.body,
  });

  await newFurnish.save();

  res.send(newFurnish);
});

app.get("/furnish", async (req, res) => {
  const data = await Furnish.find();

  res.send(data);
});

app.get("/furnish/:id",async(req,res)=>{
    const {id}=req.params
    const target= await Furnish.findById(id)
    res.send(target)
})
app.delete("/furnish/:id", async (req, res) => {
  const { id } = req.params;

  await Furnish.findByIdAndDelete(id);

  res.send("product has been deleted");
});

mongoose.connect(MongooseConnect).then((res) => {
  console.log("DB CONNECTED");
});

app.listen(PORT, () => {
  console.log("App running");
});
