const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/6c8d992ccb";

    const option = {
        method: "post",
        auth: "pankaj1:94784382983759f50204b839ed411e92-us11"
    }

    const request = https.request(url, option, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));

            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res) {
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.")
})





// API Keys
// 94784382983759f50204b839ed411e92-us11

// LIST ID 
// 6c8d992ccb