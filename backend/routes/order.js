const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Orders = require('../models/Orders');
const router = express.Router();

//Add an order of a specific user /addorder  login required
router.post('/addorder', fetchuser, async (req, res) => {
    const data = req.body.orderData;
    const totalPrice = req.body.totalPrice;
 try {
    await Orders.create({

        userId: req.user.id, 
        order_data:[data],
        total_price:totalPrice

    }).then(() => {
           res.json({success:true})
    })
    
 } catch (error) {
    console.log(error.message)
    res.send("Server Errorr",error.message)
 }

    
})


//Delete an order of a specific user /deleteorder  login required
router.delete('/deleteorder/:orderId', fetchuser, async (req, res) => {
 
    try {
        const orderId = req.params.orderId;
        const userId = req.user.id;

        const order = await Orders.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
          }
        
          if(order.userId.toString()!== userId){
            return res.status(400).send("not allowed");
          }

        const deletedOrder = await Orders.findByIdAndRemove(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'could not delete it' });
          }
      
          res.json({ message: 'Order deleted successfully', deletedOrder });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }


})
//fetchorders of a specific user /fetchorders  login required
router.get('/fetchorders', fetchuser, async (req, res)=>{

  try { 

   const orders = await Orders.find({userId:req.user.id});
   res.json(orders);
   
 
          
 
  
         
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}
 
 
})

module.exports = router;
