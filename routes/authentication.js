const User=require('../models/user');

module.exports=(router)=>{

    router.post('/register',(req,res)=>{
        // req.body.email  body parser is required to change email , username and password into correct format
        // req.body.username
        // req.body.password
        if (!req.body.email){
            res.json({success: false, message: 'You must provide an email'});
        }else{
            if (!req.body.username) {
                res.json({success: false, message: 'You must provide a username'});
            }else {
                if (!req.body.password) {
                res.json({success: false, message: 'You must provide a password'});
                } else{
                    //console.log(req.body);
                    //res.send('hello world');  //for testing purpose
                    let user=new User({
                      email: req.body.email.toLowerCase(),
                      username:req.body.username.toLowerCase(),
                      password:req.body.password
                    });
                    user.save((err)=>{
                      if (err){
                        res.json({success:false, message: 'Could not save user.Error: ', err})
                      }else {
                        res.json({success:true, message: 'User saved!'})
                      }
                    });
                }
            }
        }
    });

    return router;
}
