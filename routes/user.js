var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');
var firestore = require('./../firestore.js');
var db = firestore.db;

var collection = "users";

router.get('/', async (req, res) => {
    const users = await db.collection(collection).get();
    var userData = users.docs.map(u => u.data());
    return res.json(userData);
  });
   
  router.get('/:userId', async (req, res) => {
    let userDoc = await db.collection(collection).doc(req.params.userId).get();
    const user = userDoc.data();
    return res.json(user);
  });
   
  router.post('/', async (req, res) => {
    const user = req.body;
   
    var ref = await db.collection(collection).add({
        ...user,
        createDate: admin.firestore.Timestamp.now(),
        lastUpdate: admin.firestore.Timestamp.now()
    });
   
    return res.json({id: ref.id});
  });

  router.put('/:userId', async (req, res) => {
    const user = db.collection(collection).doc(req.params.userId);

    const update = await user.update({
        ...req.body,
        lastUpdate: admin.firestore.Timestamp.now()
    });
   
    return res.sendStatus(200);
  });
   
  router.delete('/:userId', async (req, res) => {
    const user = db.collection(collection).doc(req.params.userId);

    const deleteResponse = await user.delete();

    return res.sendStatus(200);
  });

module.exports = router