const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());

// multer

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("file name checking", req.query);
    const userName = req.query.name;
    const originalExtension = file.originalname.split(".").pop();
    const fileName = `${userName}.${originalExtension}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });
// module.exports = upload;

//
const AdminEmail = "admin@gmail.com";
const AdminPassword = "admin";

mongoose.connect("mongodb://localhost:27017/jwt-copy");

// app.use('/uploads',express.static())

app.post("/api/register", async (req, res) => {
  try {
    console.log(req.body);
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  const isPasswordvalid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordvalid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret@123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.put("/api/edit", upload.single("image"), async (req, res) => {
  console.log("req object files=", req.body.name);
  
    const user = await User.findOne({
      email: req.body.email,
    })
    if (user) {
      await User.updateOne(
        { email: req.body.email },
        {
          name: req.body.name,
          email: req.body.email,
        }).then(()=>{
          console.log('item edited')
          return res.json({status:true})
        }).catch((e)=>{
          console.log('error is',e)
        })
    }
  
  
});

app.put("/api/adminEdit/:id", upload.single("image"),  (req, res) => {
  console.log("req name,id", req.body.name,req.params.id,req.body.email);

  User.findOneAndUpdate({_id:req.params.id},
    {
      name:req.body.name,
      email:req.body.email
    }).then(()=>{
      console.log('userprofile edited by admin')
      res.json({status:true})
    }).catch((e)=>{
      console.log('error while admin editing data',e)
    })
  

  
});



app.post("/api/adminLogin",async (req, res) => {
  console.log('req.body',req.body)
  if((req.body.email === AdminEmail) && (req.body.password === AdminPassword)) {
    return res.json({ status: "ok", admin: true });
  } else {
    return res.json({ status: "error", admin: false });
  }
});

app.get('/api/adminDashboard',async(req,res)=>{
    
    try{
    let users =await User.find({})
    console.log('finding all data from mongoose',users)
    res.status(200).send({ message:'success',data:users})
    }
    catch(e)
    {
        console.log('error is',e)
    }
})

app.get('/api/adminDashboard/:id',async (req,res)=>{
 console.log('req.params=',req.params.id)
 

  let userid = req.params.id
  
  User.deleteOne({ _id: userid })
  .then(()=>{
    console.log('item deleted')
  })
  .catch((e)=>{
    console.log('erroris',e)
  })
  res.status(200).send({message:'item deleted'})

})

// app.put('/api/adminEdit/:id',async (req,res)=>{
//   console.log('req.params.id in admin edit',req.params.id)
//    await User.updateOne({_id:req.params.id},{

//    })
// })

// app.get("/api/quote", async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, "secret@123");
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });
//     return res.json({ status: "ok", quote: user.quote });
//   } catch (error) {
//     console.log("error is", error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

// app.post("/api/quote", async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, "secret@123");
//     const email = decoded.email;
//     const user = await User.updateOne(
//       { email: email },
//       { $set: { quote: req.body.quote } }
//     );
//     return res.json({ status: "ok" });
//   } catch (error) {
//     console.log("error is", error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

app.listen(3001, () => {
  console.log("server started at 1300");
});
