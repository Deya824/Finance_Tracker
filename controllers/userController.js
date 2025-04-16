const userSchema = require("../models/userModel");

// Authentication functions
const authHandler = {
  userLogin: async (request, response) => {
    try {
      const { userEmail, userPassword } = request.body;
      const account = await userSchema.findOne({ 
        email: userEmail, 
        password: userPassword 
      });
      
      if (!account) {
        return response.status(404).json({
          status: false,
          message: "Account not found"
        });
      }
      
      response.status(200).json({
        status: true,
        accountData: account
      });
      
    } catch (err) {
      response.status(400).json({
        status: false,
        error: err
      });
    }
  },

  userSignup: async (request, response) => {
    try {
      const newAccount = new userSchema(request.body);
      await newAccount.save();
      
      response.status(201).json({
        status: true,
        createdAccount: newAccount
      });
      
    } catch (err) {
      response.status(400).json({
        status: false,
        error: err
      });
    }
  }
};

module.exports = authHandler;
