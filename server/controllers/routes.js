// TODO: Password reset, password change, login error handling and routing, sign up error handling.
var objectId        = require('mongodb').ObjectId,
    bcrypt          = require('bcrypt-nodejs'),
    nodemailer      = require('nodemailer'),
    // xoath2          = require('xoauth2'),
    randomString    = require('randomstring'),
    aws             = require('aws-sdk'),
    fileUpload      = require('express-fileupload');

module.exports = function(app, passport) {

    // normal routes ===============================================================

        // show the home page (will also have our login links)
        // We will eventually need to convert all res.render() commands to res.send(), since this will be an API as a back-end.
        app.get('/', function(req, res) {
            res.render('index.ejs');
        });

        // PROFILE SECTION =========================
        app.get('/profile-page', isLoggedIn, function(req, res) {
            res.render('profile.ejs');
            }
        );
        app.get('/profile', isLoggedIn, function(req, res) {
          //discover.createLocation('boulder')

            //console.log(req.user.id, 'look')
            User.findOne({_id : objectId(req.user.id)}, function(err, user) {
                if (err)
                    return done(err);

                else {
                    // console.log(user);

                    let userData = {
                        id : req.user.id,
                        name: user.profile.name,
                        location: user.profile.location,
                        gender: user.profile.gender,
                        sexualPreference: user.profile.sexualPreference,
                        isPopulated: user.profile.isPopulated,
                        videoURL: user.profile.videoURL,
                        playerID: user.profile.playerID,
                        suitor: user.profile.suitor,
                    }
                    res.send(userData)
                  }
                }
            );
            }
        );

        //update user profile route ========================
        app.post('/profile', function(req, res) {
          //need body parsing ==========
          //console.log(req.user, 'user')

          let userData = req.body;
          let userEmail = req.user.local.email

        //   console.log('=====================================================')
        //   console.log("USER DATA:  ", userData);

          User.findOneAndUpdate({ 'local.email' : req.user.local.email }, {
            'profile.name' : req.body.name,
            'profile.location' : req.body.location.toLowerCase(),
            'profile.gender' : req.body.gender,
            'profile.sexualPreference' : req.body.sexualPreference,
            'profile.isPopulated' : true,
            'profile.playerID' : req.body.playerID,

          }, function(err, data) {
            if(err){
              console.log(err)
            } else {
                discover.addUrlsProfile(userData, userEmail)
                res.redirect('/profile')
            }
            
          })

        }) // end post =====================================

        //=============================================================
        //save video file to object storage, with link saved in mongo
        //=============================================================

        aws.config.update({
           accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
           secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY
        });



        const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');

        const s3 = new aws.S3({
            endpoint: spacesEndpoint
        });

        app.use(fileUpload());

        var newUrl = '';

        let sampleFile = '';

        app.post('/upload', function (request, response, next) {

            // console.log("ACCESS KEY: ", process.env.SPACES_ACCESS_KEY_ID);

            sampleFile = request.files.upload;

              var params = {
                Bucket: 'wan2date-videos',
                Key: sampleFile.name,
                Body: sampleFile.data
            };

            let getParams = {
                Bucket: 'wan2date-videos',
                Key: sampleFile.name,
                Expires: 9007199254740990
            };

            var putObject = function() {

                s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        let url = s3.getSignedUrl('getObject', getParams)

                        //set variable to access later
                        newUrl = url;

                        User.findOneAndUpdate({ 'local.email' : request.user.local.email }, {

                            'profile.videoURL' : url

                        }, function(err, user) {
                            if(err){
                              console.log(err)
                            }

                            discover.addUrls(user)
                            response.redirect('/profile');
                        })

                    }
                });
            }

            putObject()
        });
        //change password page
        app.get('/change-password', function(req, res) {
            res.render('changepassword.ejs', { message: req.flash('loginMessage') });
            }
        );

        app.post('/changepassword', function(req, res) {
            console.log("REQUEST OBJECT", req.body);
          if(req.body.origPassword === req.body.newPassword){
            res.status(409).send('Please enter a valid new password')
          } else if (req.body.origPassword !== req.body.newPassword && req.body.newPassword === req.body.confirmPassword && req.body.newPassword.length > 12) {
          //find user based on email
          //compare hash or 'origPassword' field to PW stored in data
          //if match, update with new hash of new PW
            User.findOne({ 'local.email' : req.body.email }, function (err, user) {
              if(err){
                console.log(err)
              }
              if(bcrypt.compareSync(req.body.origPassword, user.local.password)){
                newPass = user.generateHash(req.body.newPassword);

                User.findOneAndUpdate({ 'local.email' : req.body.email }, {
                  'local.password' : newPass
                }, function(err, user) {
                  if(err){
                    console.log('Database error', err)
                  }
                  console.log('Reset successful')
                  res.status(200).send('Password has been successfully changed!')
                })
              } else {
                res.status(409).send('Incorrect Password')
              }
            }
          )
        } else {
            res.status(409).send('Please enter a new password with more than 12 characters.')
        }
        }); //end post =========================


        //=============================================================
        //forgot password route to update & email password
        //=============================================================
        app.post('/forgotpassword', function(req, res) {

            let email = req.body.email;

            let randomPassword = randomString.generate({ length: 12, charset: 'alphabetic'});

            let hashedPassword = bcrypt.hashSync(randomPassword);

            //find user based on email
              User.findOne({ 'local.email' : req.body.email }, function (err, user) {
                if(err){
                  console.log(err)
                }

                //create and save random string password using randomstring
                else { User.findOneAndUpdate({ 'local.email' : req.body.email }, {

                    'local.password' : hashedPassword

                  }, function(err, user) {
                    if(err){
                      console.log(err)
                    }
                    console.log(user)

                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                nodemailer.createTestAccount((err, account) => {

                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: emailAuth.email,
                            pass: emailAuth.password
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Wan2Date" <owner@officialwan2date.com>', // sender address
                        to: email, // list of receivers
                        subject: 'Password Reset', // Subject line
                        text: `Here is your new password: ${randomPassword}. Please log in and change your password.`,
                        html: `<img src="https://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_100,w_150,f_auto,q_auto/v1/1315144/wan2datelogo.png2_rptyrh.png"/><br/><b>Hello!</b> <br/> <p> Here is your new password. <ul>${randomPassword}</ul> <br/> Please log in to your account and update it!</p> <br/> <p>Thanks, <br/> Wan2Date Team </p>` // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                      });
                    });

                    res.redirect('/login')
                  })
                }
              }
            )
          });

      // =============================================================================
      // DISCOVER GET ROUTE =========================================================
      // =============================================================================

          app.get('/discover', isLoggedIn, function(req, res) {
            //Here, establish location and sexual preference of loggedinusr
            let userLocation   = req.user.profile.location
            let userGender     = req.user.profile.gender
            let userPreference = req.user.profile.sexualPreference

            console.log(userLocation, userGender, userPreference)

            //call to discover Users
            discover.discoverUser(req.user, res)
          })

        // LOGOUT ==============================
        app.get('/logout', function(req, res) {
            req.logout();
            res.clearCookie('connect.sid')
            res.redirect('/signup')
        });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

        // locally --------------------------------
            // LOGIN ===============================
            // show the login form
            app.get('/login', function(req, res) {
                res.render('login.ejs', { message: req.flash('loginMessage') });
            });

            app.get('/login-failure', function(req, res) {
                let errorMessage = {
                    status: 409,
                    message: "Wrong email or password."
                }
                res.status(500).send(errorMessage);
            });

            // process the login form
            app.post('/login', passport.authenticate('local-login', {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/login-failure', // redirect back to the signup page if there is an error
                // failureFlash : true // allow flash messages
            }));

            app.get('/signup-failure', function(req, res) {
                let errorMessage = {
                    status: 409,
                    message: "Email already taken"
                }
                res.status(500).send(errorMessage);
            });

            app.get('/signup', function(req, res) {
                res.render('signup.ejs', { message: req.flash('signupMessage') })
            })

            // process the signup form
            app.post('/signup', passport.authenticate('local-signup', {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/signup-failure', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));


        // facebook -------------------------------

            // send to facebook to do the authentication
            app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

            // handle the callback after facebook has authenticated the user
            app.get('/auth/facebook/callback',
                passport.authenticate('facebook', {
                    successRedirect : '/profile',
                    failureRedirect : '/signup'
                }));


    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

        // locally --------------------------------
            app.get('/connect/local', function(req, res) {
                res.render('connect-local.ejs', { message: req.flash('loginMessage') });
            });
            app.post('/connect/local', passport.authenticate('local-signup', {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));

        // facebook -------------------------------

            // send to facebook to do the authentication
            app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

            // handle the callback after facebook has authorized the user
            app.get('/connect/facebook/callback',
                passport.authorize('facebook', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));


    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

        // local -----------------------------------
        app.get('/unlink/local', function(req, res) {
            var user            = req.user;
            user.local.email    = undefined;
            user.local.password = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });

        // facebook -------------------------------
        app.get('/unlink/facebook', function(req, res) {
            var user            = req.user;
            user.facebook.token = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });

    };

    // route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.user) {
            // console.log("REQUEST DATA:", req._passport.session.user)
            return next();
        } else {
            res.status(302).send('redirect');
            }
    }
