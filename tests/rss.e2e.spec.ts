import App from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
import UserRegisterDto from '../src/users/dto/user-register.dto';
import UserLoginDto from '../src/users/dto/user-login.dto';
import RssCreateDto from '../src/rss/dto/rss-create.dto';

let app: App;

beforeAll(async () => {
    const bootstrap = await boot;
    app = bootstrap.app;
});

describe('/rss tests', () => {
    it('should not send rss without login', async () => {
        const res = await request(app.app).get('/rss/get');
        expect(res.statusCode).toBe(401);
    });

    it('should send empty rss with login', async () => {
        const loginDto: UserRegisterDto = {
            email: 'mail@mail.ru',
            name: 'testName',
            password: '123321',
        };
        const loginRes = await request(app.app).post('/users/login').send(loginDto);
        expect(loginRes.statusCode).toBe(200);
        const jwt = loginRes.body.jwt;
        const rssRes = await request(app.app).get('/rss/get').set('Authorization', `Bearer ${jwt}`);
        expect(rssRes.statusCode).toBe(204);
    });

    it('should send rss with login', async () => {
        const loginDto: UserLoginDto = {
            email: 'haha@a.ru',
            password: '123321',
        };
        const loginRes = await request(app.app).post('/users/login').send(loginDto);
        expect(loginRes.statusCode).toBe(200);
        const jwt = loginRes.body.jwt;
        const rssRes = await request(app.app).get('/rss/get').set('Authorization', `Bearer ${jwt}`);
        expect(rssRes.statusCode).toBe(200);
    });

    it('should not create rss without login', async () => {
        const rss: RssCreateDto = {
            link: 'https://link.ru',
        };
        const res = await request(app.app).post('/rss/create').send(rss);
        expect(res.statusCode).toBe(401);
    });

    it('should create rss with login', async () => {
        const loginDto: UserLoginDto = {
            email: 'haha@a.ru',
            password: '123321',
        };
        const rss: RssCreateDto = {
            link: 'https://link.ru',
        };
        const loginRes = await request(app.app).post('/users/login').send(loginDto);
        expect(loginRes.statusCode).toBe(200);
        const jwt = loginRes.body.jwt;
        const rssRes = await request(app.app)
            .post('/rss/create')
            .set('Authorization', `Bearer ${jwt}`)
            .send(rss);
        expect(rssRes.statusCode).toBe(201);
    });
});

afterAll(async () => {
    app.close();
});
