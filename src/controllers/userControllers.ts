import User from "../models/user";
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"

// import { cloudinary } from "../config/cloudinary.js"


import { Request, Response } from 'express';



//Signup
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("Please fill in all fields");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("This email already exists");
        }

        const hashedPassword = await hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(200).send({ message: "Account created successfully!" });

    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
};

//Login
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body

//         const user = await User.findOne({ email })

//         if (!user) {
//             throw new Error("User not found")
//         }
//         //comparing the user passwords
//         const isMatch = await compare(password, user.password)

//         if (!isMatch) {
//             throw new Error("Passwords don't match")
//         }

//         const token = jwt.sign({
//             userId: user._id, email: user.email, username: user.username
//         }, process.env.JWT_SECRET, { expiresIn: "30d" })

//         res.status(200).send({
//             token, id: user.id
//         })
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { userId } = req.user

//         // console.log(userId);

//         if (userId.toString() !== id) {
//             throw new Error("You can only update your account!")
//         }

//         let profileUrl = ""

//         if (req.file) {
//             //check if the profile picture was provied

//             const image = await cloudinary.uploader.upload(req.file.path)

//             profileUrl = image.secure_url //get the secure url of the uploaded image
//         }

//         const { profilePic, ...others } = req.body

//         const updatedFields = { ...others }//create a copy if the others files

//         if (profileUrl) {

//             //add the profile image to the update files
//             updatedFields.profilePicture = profileUrl
//         }


//         //update the user in the database
//         const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
//             new: true
//         })

//         res.status(200).send({ user: updatedUser })

//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// const updateUserPassword = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { userId } = req.user
//         const { currentPassword, newPassword } = req.body

//         if (userId.toString() !== id) {
//             throw new Error("You can only update your account!")
//         }

//         const user = await User.findById(userId)

//         if (!user) {
//             throw new Error("User not found")
//         }

//         const isMatch = await compare(currentPassword, user.password)

//         if (!isMatch) {
//             throw new Error("Passwords don't match")
//         }

//         const hashePassword = await hash(newPassword, 10)

//         user.password = hashePassword

//         user.save()
//         res.status(200).send({ message: "Password updated succesfully!" })
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// const getUser = async (req, res) => {
//     try {
//         const { userId } = req.params
//         const user = await User.findById(userId)

//         if (!user) {
//             throw new Error("User not found")
//         }

//         //removing sensitive data from the user object
//         const { password, friendRequests, ...userData } = user.toObject()

//         res.status(200).send({ user: userData })
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

// const deleteUser = async (req, res) => {
//     try {
//         const { userId } = req.user
//         const { id } = req.params

//         if (userId.toString() !== id) {
//             throw new Error("You can only delete your profile")
//         }

//         await User.findByIdAndDelete(userId)

//         res.status(200).send({ message: "Account Deleted" })
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// }

export { createUser }
// loginUser, updateUser, updateUserPassword,  getUser, deleteUser }