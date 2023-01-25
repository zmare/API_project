const express = require('express');
const sequelize = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.id;

    let spots = await Spot.findAll({
        where: {
            ownerId: userId
        }
    })

    res.json(spots);
})

router.get('/', async (req, res) => {
    let spotsList = await Spot.findAll({
        include: [
            {
                model: SpotImage
            },
            {
                model: Review,
            }
        ]
    })

    let spots = [];
    spotsList.forEach(spot => {
        spots.push(spot.toJSON());
    })

    spots.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }

            if (image.preview === false) {
                console.log(spot.id)
                spot.previewImage = "no image found"
            }

        })

        delete spot.SpotImages;

    })

    res.json({ spots });
})










module.exports = router;