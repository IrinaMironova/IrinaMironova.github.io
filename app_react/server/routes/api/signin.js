const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

const tokenToEmail = [];

module.exports = (app) => {
  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }


    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });
  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        const userKeyValue = { key: doc._id, value: email };
        tokenToEmail.push(userKeyValue);

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and it's not deleted.

    UserSession.find({
      _id: token
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.findOneAndUpdate({
      _id: token
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

  app.post('/api/account/save', (req, res) => {
    const { body } = req;
    const { groupMarkers } = body;
    const { query } = req;
    const { token } = query;
    const array = tokenToEmail.filter( item => item.key == token);

    if (array.length === 1) {
      const mail = array[0].value;
      User.findOneAndUpdate({
        email: mail
      }, {$set:{groupMarkers: groupMarkers}}, (err, users) => {
        if (err) {
          console.log('err 2:', err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: 'Error: nosuccess'
          });
        }
        return res.send({
          success: true,
          message: 'success'
        });
      });
    }
  });


  app.get('/api/account/load', (req, res) => {
    const { query } = req;
    const { token } = query;
    const array = tokenToEmail.filter( item => item.key == token);
    if (array.length === 1) {
      const mail = array[0].value;
      User.find({
        email: mail
      }, (err, users) => {
        if (err) {
          console.log('err 2:', err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: 'Error: nosuccess'
          });
        }
        const user = users[0];
        return res.send(user.groupMarkers);
      });
    }
  });
};