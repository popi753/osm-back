const mongoose = require("mongoose");

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

const Teams = mongoose.model("myteams", teamsSchema);

  const subSchema = new mongoose.Schema({
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
    },
    ip:{
      type: String,
      required: true
    }
    })

  const rankingSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    rankings:{
        type: [subSchema],
        required  : true
    },

  })
  
  const rankingModel = mongoose.model("rankingTeams", rankingSchema);

  module.exports = {Teams, rankingModel}