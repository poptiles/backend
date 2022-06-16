const express = require('express');
const router = express.Router();
const json = require('../helpers/jsonresponse');
const Photos = require('../models').photos;
const fs = require('fs');



router.get('/images', async (req, res) => {
    const { order_no } = req.query
    const photo = await Photos.findAll({ where: { order_no } })
    if (!photo) return json(res, 404, 'Not found')
    json(res, 200, '', photo)
})


router.post('/upload-images', async (req, res) => {
    let url = [];
    // Save Uploaded Files
    if (!req.files.images.length) { //single file
        let file = req.files.images;
        let date = Date.now();
        let fileName = date + "" + 0 + file.name;
        const newpath = 'public/assets/upload/ordered_tiles/' + fileName;
        file.mv(newpath, (err) => {
            if (err) {
                console.log(err)
                return json(res, 500, err.message)
            }
        })
        url.push(`${req.protocol}://${req.get("host")}/images/${fileName}`);
    } else { //multiple file
        for (let i = 0; i < req.files.images.length; i++) {
            let file = req.files.images[i];
            let date = Date.now();
            let fileName = date + "" + i + file.name;
            const newpath = 'public/assets/upload/ordered_tiles/' + fileName;
            file.mv(newpath, (err) => {
                if (err) {
                    console.log(err)
                    return json(res, 500, err.message)
                }
            })
            // url.push("" + fileName);
            url.push(`${req.protocol}://${req.get("host")}/images/${fileName}`);
        }
    }
    res.status(200).json({ status: "200", urls: url })
})


router.delete('/delete-image', async (req, res) => {
    let path = 'public/assets/upload/ordered_tiles/' + req.body.filename;
    fs.unlink(path, function (err) {
        if (err) {
            throw err;
        }
    })
    res.status(200).json({ status: "200", message: "File Deleted Successfully" })
})

module.exports = router;