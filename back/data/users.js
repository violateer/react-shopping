import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: '路人甲',
        email: 'lurenjia@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: '路人乙',
        email: 'lurenyi@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
];

export default users;