const express = require('express');
const router = express.Router();
const database = require('./database');

router.post("/search", (req, res) => {
    try {
        let db = database.getConnection();
        var selectQuery = `SELECT * from restaurants r where 1=1 `;

        if (req.body.searchValue) {
            selectQuery += ` and (r.name LIKE "%${req.body.searchValue}%" or r.cuisines LIKE "%${req.body.searchValue}%") `;
        }

        if (req.body.hasTableBooking) {
            selectQuery += ` and r.hasTableBooking = "Yes" `;
        }

        if (req.body.hasOnlineDelivery) {
            selectQuery += ` and r.hasOnlineDelivery = "Yes" `;
        }

        if (req.body.cuisine) {
            selectQuery += ` and r.cuisines LIKE "%${req.body.cuisine}%" `;
        }

        if (req.body.sortType == 'ratingHighToLow') {
            selectQuery += ` order by r.avgRating desc`;
        }
        else if (req.body.sortType == 'ratingLowToHigh') {
            selectQuery += ` order by r.avgRating `;
        }
        else if (req.body.sortType == 'costHighToLow') {
            selectQuery += ` order by r.avgCostForTwo desc`;
        }
        else if (req.body.sortType == 'costLowToHigh') {
            selectQuery += ` order by r.avgCostForTwo `;
        }
        else if (req.body.sortType == 'votesHighToLow') {
            selectQuery += ` order by r.votes desc`;
        }
        else if (req.body.sortType == 'votesLowToHigh') {
            selectQuery += ` order by r.votes `;
        }
       
        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                db.close()
                return res.status(500).json({
                    status: false,
                    message: err.message
                });
            }

            var respObj = {
                status: true,
                message: "success."
            }
            db.close()
            respObj.total = rows.length;
            respObj.data = rows;
            return res.status(200).json(respObj);
        });
        
    } catch (e) {
        db.close()
        console.log(e.message);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});

router.get("/getCuisines", (req, res) => {
    try {
        let db = database.getConnection();
        var selectQuery = `SELECT distinct cuisines as cuisine from restaurants`;

        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                db.close()
                return res.status(500).json({
                    status: false,
                    message: err.message
                });
            }

            var respObj = {
                status: true,
                message: "success."
            }

            respObj.total = rows.length;
            data = []
            rows.forEach(element => {
                if (element.cuisine) {
                    element.cuisine.split(",").forEach(item => {
                        data.push(item.trim());
                    })
                }
            })
            db.close()
            respObj.data = data;
            return res.status(200).json(respObj);
        });
    } catch (e) {
        db.close()
        console.log(e.message);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});

router.get("/getRestaurants", (req, res) => {
    try {
        let db = database.getConnection();
        var selectQuery = `SELECT distinct name from restaurants`;
        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                db.close()
                return res.status(500).json({
                    status: false,
                    message: err.message
                });
            }

            var respObj = {
                status: true,
                message: "success."
            }

            respObj.total = rows.length;
            data = []
            rows.forEach(item => {
                data.push(item.name.trim());
            })
            respObj.data = data;
            db.close();
            return res.status(200).json(respObj);
        });
    } catch (e) {
        db.close()
        console.log(e.message);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});

module.exports = router;