var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const axios = require("axios");

const teamsSchema = new mongoose.Schema({
  name:{
      type: String,
      required: true
  },
  teams:{
      type: Array,
      required  : true
  }
})

const Teams = mongoose.model("PLteams", teamsSchema);

// router.get('/saveteams', (req, res)=> {
//   axios.get("https://v3.football.api-sports.io/teams?league=39&season=2023",{
//     headers: {
//       "x-rapidapi-key" :   process.env.sportApiKey,
//       "x-rapidapi-host":   "v3.football.api-sports.io"
//     }
//   }
//   )
//   .then(response =>  {
    

//     const result = response.data.response.map(e=>e.team)

//     const result2 = result.map((team) => {
//       return { 
//         id: team.id,
//         name: team.name,
//         logo: team.logo,
//       };
//     });
//     const list = new teams({
//       name: "Premier League",
//       teams: result2,
//     })

//     list.save()

//     res.send(result2)
//   })
//   .catch(err => {console.error(err)
//         res.send(err).status(500)  
//   })



// });





const rankingSchema = new mongoose.Schema({
  manager :{
      type: Object,
      required: true
      
  },
  teams:{
      type: Array,
      required : true
  },
  date : {
    type: Date,
    required: true
  }
})

const rankingModel = mongoose.model("rankingTeams", rankingSchema);

router.post("/saveteams",(req,res)=>{
  

  const savedRanking = new rankingModel({
          manager: req.body.manager,
          teams: req.body.ranking,
          date : Date(),
        })
  
  savedRanking.save().then(res.send("saved").status(200))
  
    
})


router.get("/getteams", (req,res)=>{
  Teams
  .find()
  .then (  (ele) =>  {res.send(ele[0].teams).status(200)})
  .catch(  (err)   =>  {res.send(err).status(500)})
})

router.get("/getranking", (req, res)=>{
  rankingModel.findOne({"manager.id" : JSON.parse(req.headers.person).id})
  .then((docs)=>{
  res.json(docs?.teams).status(200)
  

}).catch((err)=>{
  res.send(err).status(500)
  console.error("this is error: "+ err);
});
})

router.get("/check", (req,res)=>{
  rankingModel.findOne({"manager.id" : JSON.parse(req.headers.person).id})
  .then((docs)=>{
    if (docs) {
        res.json(true)   
    }else{
        res.json(false)
    }
  

}).catch((err)=>{
  res.errored()
  console.err("this is error: "+ err);
});
})







module.exports = router;
