var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const axios = require("axios");

const {Teams, rankingModel} = require("../schema");

  const leagueName = "seria-a"

// router.get('/saveteams', (req, res)=> {

//   const league = 140 


//   axios.get(`https://v3.football.api-sports.io/teams?league=${league}&season=2023`,{
//     headers: {
//       "x-rapidapi-key" :   process.env.sportApiKey,
//       "x-rapidapi-host":   "v3.football.api-sports.io"
//     }
//   }
//   )
//   .then(response =>  {
    

//     const result = response.data.response.map(e=>e.team)

//     const finalresult = result.map((team) => {
//       return { 
//         id: team.id,
//         name: team.name,
//         logo: team.logo,
//         manager: ""
//       };
//     });

//     const list = new Teams({
//       name: leagueName,
//       teams: finalresult,
//     })

//     list.save()

//     res.send(finalresult)
//   })
//   .catch(err => {console.error(err)
//         res.send(err).status(500)  
//   })



// });


router.post("/saveteams",(req,res)=>{
  console.log(req.ip)

  const savedRanking = {
          manager: req.body.manager,
          teams: req.body.ranking,
          date : Date(),
          ip : JSON.stringify(req.ip)
        }
  
  rankingModel.findOneAndUpdate({"name":leagueName}, {$addToSet:{rankings: savedRanking}})
  .then(res.send("saved").status(200))
  .catch(err=>console.log(err))
  
})

router.get("/getteams", (req,res)=>{
  Teams
  .find()
  // .then (  (elements) =>  {res.send(elements.map(ele=>ele.name)).status(200)})
  .then (  (elements) =>  {res.send(elements[1].teams).status(200)})
  .catch(  (err)   =>  {res.send(err).status(500)})
})

router.get("/getranking", (req, res)=>{
  console.log(req.headers.person)
  rankingModel.findOne({"name": leagueName})
  .then(docs=>{
    // console.log(docs.rankings.find(element=>element.manager.id == JSON.parse(req.headers.person).id).teams)
    res.json( docs.rankings.find(element=>element.manager.id == JSON.parse(req.headers.person).id).teams ).status(200)
  })
  .catch(err=>{
    res.send(err).status(500)
    console.error("this is error: "+ err);
  })
})

router.get("/check", (req,res)=>{
  rankingModel.findOne({"name": leagueName}).then(
    elements=>{
      elements.rankings.find(element=> element.manager.id == JSON.parse(req.headers.person).id)
      ? res.send(true)
      : res.send(false)

    }
  )


})







module.exports = router;
