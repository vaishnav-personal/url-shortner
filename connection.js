const mongoose=require("mongoose");

async function CreateMongoServer(url)
{
    return mongoose.connect(url);
}
module.exports={CreateMongoServer};