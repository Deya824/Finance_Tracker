const transectionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, userid, type } = req.body;

    let query = {
      userid: userid,  // Add userid to filter
    };

    // Check frequency, apply the logic accordingly
    if (frequency !== 'custom') {
      query.date = {
        $gt: moment().subtract(Number(frequency), 'd').toDate(),
      };
    } else if (selectedDate && selectedDate.length === 2) {
      // Make sure selectedDate is in the correct format and valid
      query.date = {
        $gte: moment(selectedDate[0]).startOf('day').toDate(),  // Set to start of day
        $lte: moment(selectedDate[1]).endOf('day').toDate(),    // Set to end of day
      };
    }

    // Add type filter if it's not 'all'
    if (type && type !== 'all') {
      query.type = type;
    }

    const transections = await transectionModel.find(query);
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteTransection=async(req,res)=>{
  try {
    await transectionModel.findOneAndDelete(
      {_id:req.body.transactionId});
      res.status(200).send('Transaction Deleted!');

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const editTransection=async (req,res)=>{
  try {
    await transectionModel.findOneAndUpdate(
      {_id:req.body.transactionId},
      req.body.payload);
      res.status(200).send('Edit Successfully');

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
};

const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send('Transaction Created');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { getAllTransection, addTransection,editTransection,deleteTransection };
