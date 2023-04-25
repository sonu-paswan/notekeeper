const router = require('express').Router();
const notes = require('../models/notes.model');

router.route('/').get((req,res)=>{
    notes.find()
    .then(docsNotes=>res.json(docsNotes))
    .catch(err=>res.status(400).json(err));
})

router.route('/add').post((req,res)=>{
    const title=req.body.title;
    const content=req.body.content;

    const newNote= new notes({
        title,
        content,
    })
    newNote.save()
    .then(()=>res.json("note added"))
    .catch(err=>res.status(400).json(err));
})

// router.route('/update/:id').post((req,res)=>{
//     const title = req.body.
//     notes.findByIdAndUpdate(req.params.id)
//     .then()
// })

router.route('/delete/:id').delete((req,res)=>{
    notes.findByIdAndDelete(req.params.id)
    .then(()=>res.json("note deleted!"))
    .catch(err=>res.status(400).json(err));
})

module.exports = router;