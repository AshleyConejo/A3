let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Test = require('../models/test');

router.get('/', async (req,res,next)=>{ //< Mark function as async
    try{
       const testClass = await Test.find(); //< Use of await keyword
       res.render('tests', {
          title: 'Book List', 
          testClass: testClass
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('tests', {
          error: 'Error on server'
       });
    }
 });

/*add operation*/
router.get('/add', async (req, res, next) => {
    try {
        const testClass = await Test.find();
        res.render('test/add', {
            title: 'Add Test',
            testClass: testClass
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    
});

router.post('/add', async (req, res, next) => {
    try {
        let newTest = {
            "Class": req.body.Class,
            "CRN": req.body.CCRN,
            "Date": req.body.Date,
            "Time": req.body.Time
        };

        await Test.create(newTest);
        res.redirect('/test-list');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let testToEdit = await Test.findById(id).exec();
        res.render('edit', { title: 'Edit Test', test: testToEdit });
    } catch (err) {
        console.log(err);
        res.end(err);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updateTest = {
            "Class": req.body.Class,
            "CRN": req.body.CCRN,
            "Date": req.body.Date,
            "Time": req.body.Time
        };

        await Test.updateOne({ _id: id }, updateTest).exec();
        res.redirect('/test-list');
    } catch (err) {
        console.log(err);
        res.end(err);
    }
});

/*delete operation*/


router.get('/delete/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        const result = await Test.deleteOne({ _id: (id) });

        if (result.deletedCount === 0) {
            // Handle the case where no documents were deleted (possibly the test was not found)
            return res.status(404).send('Test not found or no changes were made');
        }

        res.redirect('/test-list');  // Corrected the path for redirection
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;



