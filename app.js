const keyPublishable = "pk_test_iWLERCzEFtcm8FqGf3TChNB7";
const keySecret = "sk_test_GUq9td1vOJ8D6ewr3ytLDeJn";

const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));

app.get("/", (req, res) =>
res.render("index.pug", {keyPublishable}));

app.post("/charge", (req, res) => {
let amount = 500;

stripe.customers.create({
   email: req.body.stripeEmail,
  source: req.body.stripeToken
})
.then(customer =>
  stripe.charges.create({
    amount,
    description: "Sample Charge",
       currency: "usd",
       customer: customer.id
  }))
.then(charge => res.render("charge.pug"));
});

app.listen(process.env.PORT, process.envIP);