import User from '../models/user.model.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please fill all the fields' });
  }

  const existingUser = await User.findOne({ email, name });
  if (existingUser) {
    res.status(401).json({ message: 'User already exists' });
  }

  const newUser = new User({ name, email, password });

  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.error;
  }
};



export const login = async (req, res, next) => {
    const {email, password } = req.body;

    if(!email || !password){
        res.status(400).json({message: 'Please fill all the fields'})
    }
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
}



export const update = async (req, res) => {
    const user  = User.findById(req.params.id);
    if(!user){
        res.status(404).json({message: 'User not found'})
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedUser);

}
