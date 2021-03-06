//--------------------------------------------------------------------------------------------------------
//  Import Dependencies
//--------------------------------------------------------------------------------------------------------
const router = require('express').Router();



//--------------------------------------------------------------------------------------------------------
//  Catch Invalid Routes
//--------------------------------------------------------------------------------------------------------


//  Any other Route (that is not defined)
router.get('*', (req, res) => {
    console.log("Wrong Route Called");
    res.end();
})


//--------------------------------------------------------------------------------------------------------
//  Export Router
//--------------------------------------------------------------------------------------------------------
module.exports = router;