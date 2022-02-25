const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const process = require("process");
const imageDetails = []
const axios = require('axios')

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config();
}
require("./utils/connectdb");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : [];

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/users", userRouter);

app.get("/", function (req, res) {
    res.send({ status: "success" });
});

app.post("/images/Johnny", async (req, res) => {
    imageDetails.push(req.body[0])
    try {
        const response = await axios.post("http://localhost:5000/", imageDetails)
    } catch (e) {
        console.log('error');
    }
    res.sendStatus(200)
})

//Start the server in port 8081

const server = app.listen(process.env.PORT || 4000, function () {
    const port = server.address().port;

    console.log("App started at port:", port);
});
