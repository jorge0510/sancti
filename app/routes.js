module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      const userId = req.user._id; 

      db.collection('favorites')
        .find({ userId: userId.toString() })
        .toArray((err, favorites) => {
          if (err) return res.status(500).send('Database error');
          res.render('profile.ejs', {
            user : req.user,
            favorites: favorites
          })
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// Favorites ===============================================================

app.get('/favorites', isLoggedIn, (req, res) => {
  const userId = req.user._id; 

  db.collection('favorites')
    .find({ userId: userId.toString() })
    .toArray((err, favorites) => {
      if (err) return res.status(500).send('Database error');
      res.json(favorites);
    });
});


app.post('/favorites', (req, res) => {
    const { saintName, userId } = req.body;

    const favorite = { saintName, userId };

    const favoritesCollection = db.collection('favorites');

    favoritesCollection.findOne(favorite, (err, found) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Database error');
      }

      if (found) {
        // If exists, DELETE it
        favoritesCollection.deleteOne(favorite, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Delete error');
          }
          console.log('favorite removed');
          res.redirect('/profile');
        });
      } else {
        // If not exists, INSERT it
        favoritesCollection.insertOne(favorite, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Insert error');
          }
          console.log('favorite saved');
          res.redirect('/profile');
        });
      }
    });
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

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
