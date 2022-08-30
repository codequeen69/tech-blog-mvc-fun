const router = require('express').Router();
const homeRoutes= require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
;
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

router.use('/dashboard', dashboardRoutes);

//if we make a request to an endpoint that doesn't exist 404 error
router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;