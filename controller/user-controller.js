import User from '../model/user-schema.js';


export const userSignup =async(request,response) => {
    try {

       const exists= await User.findOne({ username: request.body.username});

        if(exists){
            return response.status(401).json({ message: 'Username already exist' });
        }

        const user =request.body;
        const newUser = new User(user);
        await newUser.save();

        response.status(200).json({message: user});
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

export const userLogin = async(request,response) => {
    try{
        const phone = request.body.phone;
        const password = request.body.password;

        let user = await User.findOne({ phone: phone, password: password});
        if(user){
            return response.status(200).json({data : user});
        }
        else{
            return response.status(401).json('Invalid Login');
        }
    }
    catch (error) {
        response.status(500).json('Error', error.message);
    }
}