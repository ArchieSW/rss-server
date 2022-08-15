import App from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
import UserRegisterDto from '../src/users/dto/user-register.dto';

let app: App;

beforeAll(async () => {
    const bootstrap = await boot;
    app = bootstrap.app;

    const registerDto: UserRegisterDto = {
        email: 'mail@mail.ru',
        name: 'testName',
        password: '123321',
    };
    const res = await request(app.app).post('/user/register').send(registerDto);
    const jwt = res.body.jwt;
    const rssRes = await request(app.app)
        .post('/rss/create')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ link: 'https://link.ru' });
});

describe('/user tests', () => {
    it('should not send /info without login', async () => {
        const res = await request(app.app).get('/user/info').send();
        expect(res.statusCode).toBe(401);
    });

    it('should not register user with wrong email', async () => {
        const registerDto: UserRegisterDto = {
            email: 'mail',
            name: 'Ya',
            password: '1',
        };
        const res = await request(app.app).post('/user/register').send(registerDto);
        expect(res.statusCode).toBe(400);
    });

    it('should not register user with wrong name', async () => {
        const registerDto = {
            email: 'mail@mail.ru',
            name: 100,
            password: '1',
        };
        const res = await request(app.app).post('/user/register').send(registerDto);
        expect(res.statusCode).toBe(400);
    });

    it('should not register user with wrong password type', async () => {
        const registerDto = {
            email: 'mail@mail.ru',
            name: '100',
            password: 100,
        };
        const res = await request(app.app).post('/user/register').send(registerDto);
        expect(res.statusCode).toBe(400);
    });

    it('should register user', async () => {
        const random = Math.floor(Math.random() * 999999);
        const registerDto: UserRegisterDto = {
            email: `${random}@mail.ru`,
            name: 'testName',
            password: '123321',
        };
        const res = await request(app.app).post('/user/register').send(registerDto);
        expect(res.statusCode).toBe(200);
    });

    it('should not register existing user', async () => {
        const registerDto: UserRegisterDto = {
            email: 'mail@mail.ru',
            name: 'testName',
            password: '123321',
        };
        const res = await request(app.app).post('/user/register').send(registerDto);
        expect(res.statusCode).toBe(422);
    });

    it('should not login with wrong password', async () => {
        const loginDto: UserRegisterDto = {
            email: 'mail@mail.ru',
            name: 'testName',
            password: '12332',
        };
        const res = await request(app.app).post('/user/login').send(loginDto);
        expect(res.statusCode).toBe(401);
    });

    it('should login with correct data', async () => {
        const loginDto: UserRegisterDto = {
            email: 'mail@mail.ru',
            name: 'testName',
            password: '123321',
        };
        const res = await request(app.app).post('/user/login').send(loginDto);
        expect(res.statusCode).toBe(200);
    });

    it('should send /info with right jwt', async () => {
        const loginDto: UserRegisterDto = {
            email: 'mail@mail.ru',
            name: 'testName',
            password: '123321',
        };
        const res = await request(app.app).post('/user/login').send(loginDto);
        const jwt = res.body.jwt;
        const res2 = await request(app.app).get('/user/info').set('Authorization', `Bearer ${jwt}`);
        expect(res2.body.email).toBe(loginDto.email);
        expect(res2.body.name).toBe(loginDto.name);
    });
});

afterAll(async () => {
    await app.close();
});
