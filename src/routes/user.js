import { Router } from "express";

import bcrypt from 'bcrypt';

import db from "../models";

const router = Router();

router.get('/', async (req, res) => {
    const users = await db.user.findAll({
        attributes: {
            exclude: ['password'],
        },

    });
    if (users) {
        return res.status(200).json(users);
    }

    return res.sendStatus(404);
    
});

router .post('/register', async(req, res) => {
    console.log(req.body);

    const user = await db.user.findOne({ where: {email: req.body.email } });
    console.log('check user exsit', user);

    if (user === null) {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        console.log('Hashed password', encryptedPassword);

        const createdUser = await db.user.create({
            email: req.body.email,
            password: encryptedPassword,

        });
        return res.status(200).json(createdUser);
    }

    return res.status(404).json({ msg: 'user already exsit' })
});

router.post('/login', async(req, res) => {
    const user = await db.user.findOne({ where: { email: req.body.email }});

    if (user === null) {
        return res.status(404).json({ msg: "Email not found"});
    }

    const convertString = JSON.stringify(user);

    const passwordData = JSON.parse(convertString);
    const hash = bcrypt.compareSync(req.body.password, passwordData.password);
    if (hash === true) {
        return res.status(200).json({ msg: "Logged in successfully" });

    }
    return res.status(404).json({ msg: "password is incorrect" });
});

/*
router.get('/', async (req, res) => {
    const users = await db.user.findAll({
        attributes: {
            exclude: ['password'],
        },
    });
    if (users) {
        return res.status(200).json(users);
    }
    return res.sendStatus(404);
});
router.post('/register', async(req, res) => {
    console.log(req.body);
    
    const user = await db.user.findOne({ where: { email: req.body.email } });
    console.log('check user exist', user);
    
    if (user === null) {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        console.log('Hashed password', encryptedPassword);
       
        const createdUser = await db.user.create({
            email: req.body.email,
            password: encryptedPassword,
        });

        return res.status(200).json(createdUser);
    }

    return res.status(404).json({ msg: 'User already exist' });
});

router.post('/login', async(req, res) => {
    const user = await db.user.findOne({ where: { email: req.body.email }});

    if (user === null) {
        return res.status(404).json({ msg: "Email not found"});
    }

    const convertString = JSON.stringify(user);
    const passwordData = JSON.parse(convertString);
    const hash = bcrypt.compareSync(req.body.password, passwordData.password);
    if (hash === true) {
        return res.status(200).json({ msg: "Logged in Successfully" });
    }
    return res.status(404).json({ msg: "Password is incorrect" });
});
*/
export default router;
