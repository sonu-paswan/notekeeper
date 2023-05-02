const router = require('express').Router();
const notes = require('../models/notes.model');

router.route('/').get((req,res)=>{
    notes.find()
    .then(docsNotes=>res.json(docsNotes))
    .catch(err=>res.status(400).json(err));
})

router.route('/:id').get((req,res)=>{
    const id= req.params.id;
    notes.findById(id)
    .then(particularNote=>res.json(particularNote))
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

router.route('/update/:id').post((req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    notes.findByIdAndUpdate(req.params.id)
    .then(notes=>{
        // console.log(notes);
        notes.title=title;
        notes.content=content;
        notes.save()
        .then(()=>res.json("successfully updated"))
        .catch((err)=>res.json(err));
    })
    .catch(err=>res.json(err));
})

router.route('/delete/:id').delete((req,res)=>{
    notes.findByIdAndDelete(req.params.id)
    .then(()=>res.json("note deleted!"))
    .catch(err=>res.status(400).json(err));
})

module.exports = router;