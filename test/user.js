const { chai, app, should } = require('./testConfig');

const testUser = {
    userName: "pnguyen5",
    fullName: "Nguyen D. Phong",
    email: "pnguyen5@conncoll.edu",
    description: "Phong Nguyen the Tester", 
    gender: "M",
    password: "12345678",
    passwordConfirm: "12345678",
}

describe("User Authentication", () => {

	describe("/api/auth/login - Failed Login", () => {
		it("Log in shoud fail with unregistered user", (done) => {
		chai.request(app)
			.post("/api/auth/login")
			.send({ "email": testUser.email, "password": testUser.password })
			.end((err, res) => {

				res.should.have.status(404);
				res.body.should.have.property("error").eql("Missing credentials !");

				done();
			});
		});
	});


	describe("/api/auth/login - Sign up User", () => {
		it("it shoud add a new user", (done) => {
		chai.request(app)
			.post("/api/auth/signup")
			.send(testUSer)
			.end((err, res) => {
				
				res.should.have.status(200);
				res.body.should.have.property("message").eql("Successfully Signed Up!");
				testUser.token = res.body.token;

				done();
			});
		});
	});

	describe("/api/auth/login - log in User", () => {
		it("it shoud authenticate an exisiting user", (done) => {
		chai.request(app)
			.post("/api/auth/login")
			.send({ "email": testUser.email, "password": testUser.password })
			.end((err, res) => {
				
				res.should.have.status(200);
				res.body.should.have.property("message").eql("Successfully Authenticated!");
				testUser.token = res.body.token;

				done();
			});
		});
	});


});

