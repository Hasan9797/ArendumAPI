import express, { Request, Response } from "express";

const app = express();


const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userRoutes from "@/routes/user.route";

//Routes
app.use('/api/users', userRoutes);
// app.use('/api/client',);
// app.use('/api/driver',);
// app.use('/api/deposit',);
// app.use('/api/payment',);
// app.use('/api/region',);
// app.use('/api/structure',);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});