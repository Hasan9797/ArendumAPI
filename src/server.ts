import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userRoute from "@/routes/user.route";
import authRoute from "@/routes/auth.route";
import categoryRoute from "@/routes/category.route";
import driverRoute from "@/routes/driver.route";
import clientRoute from "@/routes/client.route";

//Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/driver', driverRoute);
app.use('/api/client', clientRoute);
// app.use('/api/deposit',);
// app.use('/api/payment',);
// app.use('/api/region',);
// app.use('/api/structure',);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});