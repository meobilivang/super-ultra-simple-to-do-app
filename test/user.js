const { chai, server, should, testUser } = require('./testConfig');
const UserModel = require('../models/userModel');

// const testUser = {
//     userName: "pnguyen5",
//     fullName: "Nguyen D. Phong",
//     email: "pnguyen5@conncoll.edu",
//     description: "Phong Nguyen the Tester", 
//     gender: "M",
//     password: "12345678",
//     passwordConfirm: "12345678",
// }

describe("User Authentication", () => {
	
	before((done) => {
		server.on("app-started", function(){
			done();
		});
	});

	describe("/api/auth/signup - Sign up User", () => {

		/**
		 * Remove Test User if alreay exist in Db
		 */
		before((done) => {
			UserModel.findOneAndDelete({ userName: {$eq: testUser.userName } }, (err, res) => {
				done();
			});
		});

		it("it shoud add a new user", (done) => {
			chai.request(server)
				.post("/api/auth/signup")
				.send(testUser)
				.then((res) => {
		
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Successfully Signed Up!");
					testUser.token = res.body.token;

					done();
                }).catch(err => {
                    console.log(err);
                });
		});
	});

	describe("/api/auth/login - Log in User", () => {ss
		it("it shoud authenticate an exisiting user", (done) => {
			chai.request(server)
				.post("/api/auth/login")
				.send({ "userName": testUser.userName, "password": testUser.password })
				.then((res) => {

					res.should.have.status(200);
					res.body.should.have.property("message").eql("Successfully Authenticated!");
					testUser.token = res.body.token;

					done();
                }).catch(err => {
                    console.log(err);
                });
		});
	});


});

