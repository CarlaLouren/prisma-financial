import express from "express"
import path from "path"


const app = express()


app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(express.static (path.join(path.resolve(),"public")));
app.locals.publicPath="/public"



app.listen(3001, () => {
    console.log(" 🚀 Rodando no localhost:3001 🚀 ");
  });
  
