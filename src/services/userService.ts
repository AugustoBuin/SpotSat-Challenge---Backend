import User from '../models/User';

interface UserData {
    username: string;
    password: string;
}

const createUser = async (data: Partial<UserData>) => {
    return await User.create(data);
};

const getAllUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id: string) => {
    return await User.findByPk(id);
};

const getUserByName = async (username: string) => {
    return await User.findOne({ where: { username } });
};

const updateUser = async (id: string, data: Partial<UserData>) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    if (data.username) user.username = data.username;
    if (data.password) user.password = data.password;

    await user.save();
    return user;
};

const deleteUser = async (id: string) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return true;
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByName,
};
