require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const cardModel = require("./src/models/card.model")

connectToDB()

app.post("/api/card", async (req, res) => {
    const { title, description } = req.body

    const newCard = await cardModel.create(
        { title, description }
    )

    res.status(201).json({
        msg: "card created suff",
        newCard
    })
})

app.get("/api/card", async(req,res)=>{
    const card = await cardModel.find()

    res.status(200).json({
        msg:"card fetched",
        card
    })
})

app.delete("/api/card/:id",async(req,res)=>{
    const {id} = req.params
    const deleteNote = await cardModel.findByIdAndDelete(id)
    res.status(200).json({
        msg:"card deleted",
        deleteNote
    })
}) 

app.patch("/api/card/:id",async(req,res)=>{
    const {id} = req.params
    const{title, description}= req.body
    const updateNote = await cardModel.findByIdAndUpdate(id,{title,description})
    res.status(200).json({
        msg:"card updated",
        updateNote
    })
})

app.put("/api/card/:id",async(req,res)=>{
    const {id} = req.params
    const{title, description}= req.body
    const updateNote = await cardModel.findByIdAndUpdate(id,{title,description})
    res.status(200).json({
        msg:"card updated",
        updateNote
    })
})


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})