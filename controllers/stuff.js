const modelSauce = require('../models/modelSauce');

exports.createThing = (req, res, next) => {
    const sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const newSauce = new modelSauce({
        name: sauce.name,
        description: sauce.description,
        heat: sauce.heat,
        likes: 0,
        dislikes: 0,
        imageUrl: url + '/images/' + req.file.filename,
        mainPepper: sauce.mainPepper,
        usersLiked: [],
        usersDisliked: [],
        userId: sauce.userId
      });
    newSauce.save().then(
        () =>{
          res.status(201).json({
            message: 'Post saves successfully!'
          });
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
    );
};

exports.getOneThing = (req, res, next) => {
    modelSauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.modifyThing = (req, res, next) => {
    const thing = new modelSauce({
         _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    modelSauce.updateOne({_id: req.params.id}, thing).then(
        () => {
         res.status(201).json({
            message: 'Thing updated successfully!'
         });
        }
    ).catch(
        (error) => {
         res.status(400).json({
            error: error
        });
        }
    );
    };
  
exports.deleteThing = (req, res, next) => {
  modelSauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      if (!sauce) {
        return res.status(404).json({
          error: new Error('No such thing!')
        });
      }
      if (sauce.userId !== req.auth.userId) {
        return res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      modelSauce.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    } 
  );
};
//Returns an array of all sauces in the database:
exports.getAllStuff = (req, res, next) => {
    modelSauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };