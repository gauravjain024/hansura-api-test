import express, { Request, Response } from "express";
import { client } from "./clients/graphql-client";
import { generateJWT } from "./auth/jwt";
import { FIND_USERS, GET_USERS } from "./gql-queries/user-queries";
import { validJWTNeeded } from "./middlewares/auth"

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON in request bodies
app.use(express.json());


app.get("/users/list", validJWTNeeded, async (req: Request, res: Response) => {
    const result = await client.request(
        GET_USERS   
      );
      res.send(result);
});


app.get("/users/find", validJWTNeeded, async (req: Request, res: Response) => {
    const result = await client.request(
        FIND_USERS,{
            radius: 1
        }   
      );
      res.send(result);
});


app.post("/auth/login", async (req: Request, res: Response) => {
    const { username, password } = req.body as Record<string, string>;
    let userLoggedin = false;
    if(username == 'admin' && password == 'admin'){
        userLoggedin = true;
    }
  
    if (!userLoggedin) {
      res.sendStatus(401);
      return;
    }
  

    if (userLoggedin) {
      res.send({
        token: generateJWT({
          defaultRole: "user",
          allowedRoles: ["user"],
          claims: {
            "X-User-Id": 'admin',
          },
        }),
      });
    } else {
      res.sendStatus(401);
    }
  });
  

app.listen(port, () => {
  console.log(`Auth server running on port ${port}.`);
});
