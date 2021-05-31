const { chai, app, should } = require('./testConfig');
const BoardModel = require("../models/boardModel");

const testUser = {
    userName: "pnguyen5",
    fullName: "Nguyen Duc Phong",
    email: "pnguyen5@conncoll.edu",
    description: "Phong Nguyen the Tester", 
    gender: "M",
    password: "12345678",
    passwordConfirm: "12345678",
}

describe("User CRUD tests", () => {

	describe("Failed Login", () => {
		chai.request(app)
			.post("/api/auth/login")
			.send({ "email": testUser.email, "password": testUser.password })
			.end((err, res) => {
				
				res.body.should.be.a('object');
				res.should.have.status(400);
				res.body.should.have.property("message").eql("Wrong Credentials");

				done();
			});
	};


	//describe("Sign Up new Account", () => {
		//chai.request(app)
			//.post("/api/auth/signup")
			//.end((err, res) => {
				
				//res.should.have.status(200);
				//res.body.should.be.a('object');
				//res.body.should.have.property("message").eql("Successfully Signed Up!");
				//testUser.token = res.body.token;

				//done();
			//});
	//};

};

