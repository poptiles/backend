const express = require('express');
const router = express.Router();
const json = require('../helpers/jsonresponse');
const Banner = require('../models').banner;
const { auth, authorize } = require('../middleware/auth')
const fs = require('fs')
const { customAlphabet } = require('nanoid')
let imagesUrl = [];

//get banner info
router.get('/', async (req, res) => {
    const banner = await Banner.findOne({ where: { id: 1 } })
    json(res, 200, "", banner)
})

//update banner
router.put('/', auth, authorize(), async (req, res) => {
    const { text } = req.body
    let banner = await Banner.findOne({ where: { id: 1 } })
    let delImagesUrl = banner.toJSON().images
    delImagesUrl = delImagesUrl.split(',')
    for (let i = 0; i < 3; i++) {
        delImages(delImagesUrl[i].slice(delImagesUrl[i].indexOf("images") + 7))
    }
    saveImages(req);
    console.log(imagesUrl);
    let imagesTemp = imagesUrl[0] + "," + imagesUrl[1] + "," + imagesUrl[2];
    if (!banner) {
        banner = await Banner.create({ id: 1, images: imagesTemp, text: text })
    } else {
        await Banner.update({ images: imagesTemp, text: text }, { where: { id: 1 } })
        banner = await Banner.findOne({ where: { id: 1 } })
    }
    imagesUrl = []
    json(res, 202, "", banner)
})

//helper for images

const saveImages = (req) => {
    for (let i = 0; i < req.files.images.length; i++) {
        let file = req.files.images[i];
        let date = Date.now();
        const nanoid = customAlphabet('1234567890', 3)
        let fileName = `${date}${nanoid()}${file.name.slice(file.name.indexOf("."))}`;
        const newpath = 'public/assets/upload/ordered_tiles/' + fileName;
        file.mv(newpath, (err) => {
            if (err) {
                console.log(err)
                return json(res, 500, err.message)
            }
        })
        // url.push("" + fileName);
        imagesUrl.push(`${req.protocol}://${req.get("host")}/images/${fileName}`);
    }
}
const delImages = (filename) => {
    let path = 'public/assets/upload/ordered_tiles/' + filename;
    fs.unlink(path, function (err) {
        if (err) {
            // throw err;
        }
    })
}

module.exports = router;